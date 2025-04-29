// apps/whatsapp/src/handlers/messageHandler.ts

import { Message } from 'whatsapp-web.js';
import { procesarConIA } from '../libs/ai/ai';
import { client } from '../client';
import { generarResumen } from '../utils/generarResumen';
import { pedidosPendientes, esperandoAgregar, esperandoMarca } from '../state/pedidosPendientes';

export async function handleIncomingMessage(message: Message) {
  const mensajeLower = message.body.toLowerCase();
  console.log('📩 Mensaje recibido:', message.body);

  // Si hay un producto esperando marca
  if (esperandoMarca.has(message.from)) {
    const pedidos = pedidosPendientes.get(message.from);
    const index = esperandoMarca.get(message.from);

    if (pedidos && index !== undefined && pedidos[index]) {
      pedidos[index].marca = message.body.trim();
      pedidosPendientes.set(message.from, pedidos);
      esperandoMarca.delete(message.from);

      const sinMarca = pedidos.findIndex(p => !p.marca);
      if (sinMarca !== -1) {
        esperandoMarca.set(message.from, sinMarca);
        client.sendMessage(message.from, `Antes de confirmar, necesito saber la marca de: ${pedidos[sinMarca].producto}. ¿Podrías decírmela?`);
        return;
      }

      client.sendMessage(message.from, generarResumen(pedidos));
      return;
    }
  }

  // Si estamos esperando que agregue producto
  if (esperandoAgregar.has(message.from)) {
    const nuevoProducto = await procesarConIA(message.body);
    if (nuevoProducto) {
      const productosPrevios = pedidosPendientes.get(message.from) || [];
      const productosActualizados = [...productosPrevios, ...nuevoProducto];
      pedidosPendientes.set(message.from, productosActualizados);

      esperandoAgregar.delete(message.from);

      await client.sendMessage(message.from, generarResumen(productosActualizados));
    } else {
      await client.sendMessage(message.from, '❌ No pude entender lo que quieres agregar. ¿Podrías intentarlo de nuevo? 😅');
    }
    return;
  }

  // Si el cliente confirma
  if (pedidosPendientes.has(message.from)) {
    if (mensajeLower.includes('si') || mensajeLower.includes('confirmo')) {
      const pedido = pedidosPendientes.get(message.from);
      if (!pedido) {
        console.log('No hay pedido pendiente para este cliente.');
        return;
      }

      const productosSinMarca = pedido.filter(p => !p.marca || p.marca.trim() === '');
      if (productosSinMarca.length > 0) {
        const index = pedido.findIndex(p => !p.marca);
        if (index !== -1) {
          esperandoMarca.set(message.from, index);
          await client.sendMessage(message.from, `🔍 Antes de confirmar, necesito saber la marca de: ${pedido[index].producto}. ¿Podrías decírmela?`);
          return;
        }
      }

      pedidosPendientes.delete(message.from);
      await client.sendMessage(message.from, `✅ ¡Pedido confirmado exitosamente!\n📋 Ya lo registramos en nuestro sistema.\n🙌 ¡Muchas gracias!`);
      console.log('🛒 Pedido final:', pedido);
      return;
    } 
    else if (mensajeLower.includes('agregar')) {
      esperandoAgregar.add(message.from);
      await client.sendMessage(message.from, '✏️ ¡Perfecto! Envía el nuevo producto que quieres agregar.');
      return;
    } 
    else {
      await client.sendMessage(message.from, '🔔 Responde "si" para confirmar, "agregar" para añadir más productos o "corregir marca" para indicar la marca que falta.');
      return;
    }
  }

  // Si es un mensaje nuevo que parece pedido
  const palabrasClavePedido = ['comprar', 'pedido', 'necesito', 'quiero'];
  if (palabrasClavePedido.some(palabra => mensajeLower.includes(palabra))) {
    console.log('🛒 Detectado intento de pedido.');

    const productos = await procesarConIA(message.body);

    if (productos) {
      pedidosPendientes.set(message.from, productos);
      await client.sendMessage(message.from, generarResumen(productos));
    } else {
      await client.sendMessage(message.from, '❌ Lo siento, no entendí tu pedido. ¿Podrías escribirlo de otra manera? 😅');
    }
  }
}
