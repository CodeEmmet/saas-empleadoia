// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {}

  async findOneByEmail(correo: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ correo });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }
  
}

