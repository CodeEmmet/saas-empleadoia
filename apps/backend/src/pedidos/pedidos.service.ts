import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cliente } from '../clientes/cliente.entity';
import { Producto } from '../productos/producto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoItem) private itemRepo: Repository<PedidoItem>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.clienteRepo.findOneBy({ id: createPedidoDto.clienteId });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    let total = 0;
    const items: PedidoItem[] = [];

    for (const item of createPedidoDto.items) {
      const producto = await this.productoRepo.findOneBy({ id: item.productoId });
      if (!producto) throw new NotFoundException(`Producto ${item.productoId} no encontrado`);

      const pedidoItem = this.itemRepo.create({
        producto,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
      });

      total += item.cantidad * producto.precio;
      items.push(pedidoItem);
    }

    const pedido = this.pedidoRepo.create({
      cliente,
      items,
      estado: 'pendiente',
      formaPago: createPedidoDto.formaPago || '',
      total,
    });

    return this.pedidoRepo.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      relations: ['cliente', 'items', 'items.producto'],
      order: { creadoEn: 'DESC' },
    });
  }
  
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) {
      throw new Error(`Pedido con ID ${id} no encontrado`);
    }
    return pedido;
  }

  async updateEstado(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    pedido.estado = updatePedidoDto.estado;
    return this.pedidoRepo.save(pedido);
  }
}
