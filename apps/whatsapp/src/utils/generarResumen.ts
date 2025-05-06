import { ProductoPedido } from '../libs/ai/types/producto';

export function generarResumen(productos: ProductoPedido[]): string {
  let resumen = "🛒 Esto es lo que llevo entendido de tu pedido:\n\n";
  productos.forEach((producto, index) => {
    resumen += `${index + 1} 📦 ${producto.cantidad}x ${producto.producto} ${producto.marca ? `(${producto.marca})` : '(Marca no especificada)'} ${producto.caracteristicas.length ? `- ${producto.caracteristicas.join(", ")}` : ''}\n`;
  });
  resumen += `\n✅ ¿Está todo correcto? Responde "si" para confirmar, "agregar" para añadir más o "corregir marca" si falta la marca de algún producto.`;
  return resumen;
}
