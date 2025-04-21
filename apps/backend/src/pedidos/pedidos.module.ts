import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Cliente } from '../clientes/cliente.entity';
import { Producto } from '../productos/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoItem, Cliente, Producto])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}

