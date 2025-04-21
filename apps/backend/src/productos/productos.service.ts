import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async create(dto: CreateProductoDto): Promise<Producto> {
    const nuevo = this.productosRepository.create(dto);
    return this.productosRepository.save(nuevo);
  }

  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('Producto no encontrado');
  
    Object.assign(producto, dto);
    return this.productosRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    await this.productosRepository.delete(id);
  }
}
