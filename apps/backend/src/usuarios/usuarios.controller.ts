// src/usuarios/usuarios.controller.ts
import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('usuarios')
@UseGuards(AuthGuard('jwt')) // Protegemos todas las rutas del controlador
export class UsuariosController {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  @Get()
  async findAll() {
    return await this.usuarioRepo.find();
  }

  @Get('total')
  async total() {
    const count = await this.usuarioRepo.count();
    return { total: count };
  }
}
