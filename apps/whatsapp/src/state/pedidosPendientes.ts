import { ProductoPedido } from '../libs/ai/types/producto';

export const pedidosPendientes = new Map<string, ProductoPedido[]>();
export const esperandoAgregar = new Set<string>();
export const esperandoMarca = new Map<string, number>();
