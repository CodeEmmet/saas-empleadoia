# Módulo: Estado de Pedido

## ✅ Descripción General

Este módulo permite al cliente consultar el estado de un pedido ya realizado, ya sea por WhatsApp, en persona o web. Identifica al cliente, busca el pedido en la base y responde con la información actualizada.

---

## 🧠 Flujo Conversacional

1. **El cliente pregunta por su pedido**
   _Ej: “¿Llegó mi pedido?”, “¿Ya salió la cámara que pedí?”_

2. **La IA busca el historial del cliente**
   - Identifica por número o por historial reciente.
   - Si hay más de un pedido, pide aclaración.

3. **Consulta el estado en la base de datos**
   - Estados posibles: `pendiente`, `en preparación`, `enviado`, `entregado`, `cancelado`.

4. **Responde al cliente con el estado actualizado**
   _“Tu pedido 154 está en preparación y saldrá hoy por la tarde.”_

---

## ⚙️ Reglas Técnicas

- Puede mostrar detalles como fecha de entrega estimada, número de envío, etc.
- Solo muestra pedidos relacionados al cliente autenticado.

---

## 🔄 Personalización

- Se pueden establecer mensajes automáticos por cada estado.
- Integrable con logística externa (correo, flete, etc.)

---

## 📌 Estado

> 🟢 **En desarrollo – base implementada, integración con estados en progreso**
