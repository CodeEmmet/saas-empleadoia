# Módulo: Postventa

## ✅ Descripción General

Este módulo atiende mensajes de clientes que ya compraron un producto y tienen consultas sobre garantía, fallas, soporte o cambios. Facilita la atención inicial y organiza las solicitudes para que un humano continúe si es necesario.

---

## 🧠 Flujo Conversacional

1. **El cliente informa un problema postventa**
   _Ej: “Compré una cámara y no anda”, “El motor hace ruido raro”_

2. **La IA recoge los datos clave:**
   - Número de compra (si lo tiene).
   - Fecha aproximada.
   - Descripción del problema.

3. **Genera un ticket automático con estado `pendiente`**
   - Puede clasificarse: `garantía`, `asistencia`, `reclamo`.

4. **Se responde al cliente con un mensaje de seguimiento**
   _“Registramos tu caso, un técnico te va a contactar en breve”_

---

## ⚙️ Reglas Técnicas

- No intenta resolver el problema técnico en profundidad (se deriva).
- Registra en la base de datos todos los mensajes relacionados.
- Cambia el estado de conversación a `#HUMANO`.

---

## 🔄 Personalización

- Se puede agregar una lista de preguntas para completar diagnóstico.
- Integrable con sistemas de tickets externos (Trello, Notion, etc.).

---

## 📌 Estado

> 🔴 **Pendiente de desarrollo – planificado pero no implementado aún**
