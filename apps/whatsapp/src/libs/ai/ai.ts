import { procesarConOpenAI } from './providers/openai';
import { procesarConOpenRouter } from './providers/openrouter';
import { configuracionIA, ProveedorIA } from './ai.config';
import { ProductoPedido } from './types/producto';

const proveedoresDisponibles: Record<ProveedorIA, (mensaje: string) => Promise<ProductoPedido[] | null>> = {
  openai: procesarConOpenAI,
  openrouter: procesarConOpenRouter,
};

export const procesarConIA = async (mensaje: string): Promise<ProductoPedido[] | null> => {
  for (const proveedor of configuracionIA.ordenPreferido) {
    console.log(`🤖 Intentando procesar con ${proveedor.toUpperCase()}...`);
    const procesar = proveedoresDisponibles[proveedor];
    const resultado = await procesar(mensaje);

    if (resultado) {
      console.log(`✅ Procesado exitosamente con ${proveedor.toUpperCase()}`);
      return resultado;
    } else {
      console.warn(`⚠️ Falló ${proveedor.toUpperCase()}. Probando siguiente proveedor...`);
    }
  }

  console.error('❌ Fallaron todos los proveedores configurados.');
  return null;
};
