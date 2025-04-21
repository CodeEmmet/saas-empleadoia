import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { PedidoItem } from './pedido-item.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.id)
  cliente: Cliente;

  @OneToMany(() => PedidoItem, item => item.pedido, { cascade: true })
  items: PedidoItem[];

  @Column({ default: 'pendiente' })
  estado: string; // pendiente, confirmado, entregado, cancelado

  @Column({ nullable: true })
  formaPago: string; // efectivo, transferencia, etc.

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  creadoEn: Date;
}
