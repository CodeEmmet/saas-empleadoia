import { IsEnum } from 'class-validator';

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
}

export class UpdatePedidoDto {
  @IsEnum(EstadoPedido)
  estado: EstadoPedido;
}
