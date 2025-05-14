# Módulo: Pedidos

## ✅ Descripción General

Este módulo permite al Empleado IA recibir, interpretar y registrar pedidos de productos a través de mensajes de WhatsApp. Utiliza IA para interpretar lenguaje natural, valida los productos disponibles contra la base de datos, y genera una confirmación automatizada al cliente.

---

## 🧠 Flujo Conversacional

1. **Cliente inicia conversación con un mensaje natural**  
   _Ejemplo: “Hola, quiero comprar 2 cámaras y un motor de portón”_

2. **El sistema detecta que es un posible pedido**  
   - Usa `utils/esPedido.ts` para decidir si debe activar este flujo.

3. **IA estructura el mensaje en items**  
   - Utiliza OpenAI o OpenRouter.
   - Respuesta esperada: JSON con nombre del producto, cantidad, observaciones.

4. **Se verifica contra la base de datos**  
   - Solo se permiten productos activos en stock.
   - Si un producto no está, se ofrece una alternativa similar si existe.

5. **Se guarda el pedido preliminar en la base de datos**  
   - En estado `pendiente`.

6. **Se responde al cliente con el resumen del pedido y se le pide confirmación**  
   _“Recibimos tu pedido: 2 cámaras Hikvision, 1 motor para portón. ¿Confirmás?”_

7. **Una vez confirmado, se cambia el estado a `confirmado` y se notifica al sistema**  
   - Puede derivarse a humano si el cliente agrega preguntas no relacionadas.

---

## ⚙️ Decisiones Técnicas

- ✅ Procesamiento de IA desacoplado por capa (`libs/ia`) con fallback.
- ✅ Validación contra productos en PostgreSQL (tabla `productos`).
- ✅ Almacenamiento de pedidos (`tabla pedidos`) y mensajes (`tabla mensajes`).
- ✅ Modularizado por tipo de función: `handlers`, `state`, `utils`.

---

## 🔄 Personalización

- Se puede activar/desactivar el módulo “Pedidos” desde un panel de control.
- Se pueden definir productos disponibles para pedido automático.
- El comportamiento se adapta por empresa (en multi-tenant).

---

## 💡 Ideas Futuras

- Confirmación de stock en tiempo real.
- Envío automático de cotización PDF o link de pago.
- Panel visual para empleados humanos para tomar el pedido manualmente si se deriva.
- Clasificación de pedidos por urgencia o tipo de producto.
- Registro de métricas: pedidos por cliente, producto más solicitado, etc.

---

## 📌 Estado

> 🟢 **En desarrollo – etapa básica funcional completa**
