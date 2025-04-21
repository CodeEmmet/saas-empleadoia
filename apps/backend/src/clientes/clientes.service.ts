import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  // Crear un nuevo cliente
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clientesRepository.create(createClienteDto);
    return this.clientesRepository.save(cliente);
  }

  // Obtener todos los clientes
  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  // Obtener un cliente por su ID
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  // Actualizar un cliente
  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    if (cliente) {
      Object.assign(cliente, updateClienteDto);
      return this.clientesRepository.save(cliente);
    }
    throw new Error(`Cliente con ID ${id} no encontrado`);
  }

  // Eliminar un cliente
  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    if (cliente) {
      await this.clientesRepository.remove(cliente);
    } else {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }
  }
}

