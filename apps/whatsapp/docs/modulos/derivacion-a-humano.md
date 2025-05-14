# Módulo: Derivación a Humano

## ✅ Descripción General

Este módulo permite que el Empleado IA derive automáticamente la conversación a una persona real cuando detecta que no puede continuar la atención de manera adecuada.

---

## 🧠 Flujo Conversacional

1. **El cliente plantea un tema complejo o fuera del alcance**
   _Ej: “Quiero hacer una queja formal” o “¿Podés llamarme ya?”_

2. **La IA intenta clasificar la intención como “necesita humano”**
   - Palabras clave: “hablar con alguien”, “derivame”, “no entiendo”, etc.

3. **Cambio de estado**
   - El sistema cambia el estado de conversación a `#HUMANO`
   - Opcionalmente notifica a un operador.

4. **La IA deja de responder**
   _Ej: “Te paso con un asesor humano que te va a ayudar en breve”_

---

## ⚙️ Reglas Técnicas

- El sistema no borra ni reemplaza mensajes previos.
- Guarda un log de cuándo y por qué se derivó la conversación.
- Opcional: establece prioridad para derivación (urgente, media, baja).

---

## 🔄 Personalización

- Se puede definir qué frases fuerzan una derivación.
- El administrador puede forzar un retorno a `#BOT` en caso de ser necesario.

---

## 📌 Estado

> 🟢 **Implementado – revisión y mejoras pendientes**





# Derivación a Humano

## Objetivo
Transferir la conversación a una persona real cuando el cliente lo solicite o la IA no pueda resolver.

## Tipología
**Regla estructurada**

## Casos para derivar

- 🆘 El cliente lo pide explícitamente (ej. "quiero hablar con alguien").
- ❓ La IA detecta incertidumbre o frustración (ej. repite el mismo mensaje sin éxito).
- 🔐 Casos sensibles: reclamos, errores de facturación, quejas, etc.
- ⛔ Problemas técnicos que la IA no puede resolver.

## Estados

- `#BOT`: la IA gestiona la conversación.
- `#HUMANO`: la conversación está en manos de un operador.

## Flujo

1. La IA identifica la necesidad de derivar.
2. Cambia el estado a `#HUMANO` y deja de responder automáticamente.
3. Opcional: notificación interna al humano asignado.
4. El humano retoma la conversación.

## Observaciones
Debe registrarse el momento de la derivación y el motivo. La IA no debe responder mientras esté en estado `#HUMANO`.

