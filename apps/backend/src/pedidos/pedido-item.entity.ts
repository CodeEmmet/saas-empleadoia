import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Producto } from '../productos/producto.entity';
import { Pedido } from './pedido.entity';

@Entity()
export class PedidoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.items)
  pedido: Pedido;

  @ManyToOne(() => Producto)
  producto: Producto;

  @Column()
  cantidad: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precioUnitario: number;
}
