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
    const { correo, password } = createUserDto;

    const usuarioExistente = await this.usuarioRepo.findOneBy({ correo });
    if (usuarioExistente) {
      throw new UnauthorizedException('El correo ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = this.usuarioRepo.create({
      ...createUserDto,
      password: hash,
    });

    const usuarioGuardado = await this.usuarioRepo.save(nuevoUsuario); 
    return {
      id: usuarioGuardado.id,
      correo: usuarioGuardado.correo,
      mensaje: 'Usuario creado exitosamente',
    };
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepo.findOneBy({ correo: loginDto.correo });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(loginDto.password, usuario.password);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { correo: usuario.correo, id: usuario.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
      },
    };
  }
}
