import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, correo, password } = createUserDto;

    const usuarioExistente = await this.usuarioRepo.findOneBy({ username });
    if (usuarioExistente) {
      throw new UnauthorizedException('El nombre de usuario ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = this.usuarioRepo.create({
      username,
      correo,
      password: hash,
    });

    const usuarioGuardado = await this.usuarioRepo.save(nuevoUsuario); 
    return {
      id: usuarioGuardado.id,
      username: usuarioGuardado.username,
      correo: usuarioGuardado.correo,
      mensaje: 'Usuario creado exitosamente',
    };
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOneBy({ username });
  }
  

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const usuario = await this.usuarioRepo.findOneBy({ username });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(password, usuario.password);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { id: usuario.id, username: usuario.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        correo: usuario.correo,
      },
    };
  }
}
