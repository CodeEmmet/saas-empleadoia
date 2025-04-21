import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // Crear un cliente
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clientesService.create(createClienteDto);
  }

  // Obtener todos los clientes
  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  // Obtener un cliente por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  // Actualizar un cliente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.clientesService.update(id, updateClienteDto);
  }

  // Eliminar un cliente
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.clientesService.remove(id);
  }
}
