export class CreatePedidoDto {
    clienteId: number;
    formaPago?: string;
    items: {
      productoId: number;
      cantidad: number;
    }[];
  }
  