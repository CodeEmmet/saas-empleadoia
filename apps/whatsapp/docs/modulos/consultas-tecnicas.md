# Módulo: Consultas Técnicas

## ✅ Descripción General

Este módulo permite al Empleado IA responder preguntas técnicas sobre los productos vendidos, guías de instalación, compatibilidades y configuraciones. Utiliza IA y conocimiento cargado previamente para brindar asistencia rápida y clara.

---

## 🧠 Flujo Conversacional

1. **El cliente hace una consulta técnica**
   _Ej: “¿Cómo configuro esta alarma?” o “¿La cámara es compatible con NVR Dahua?”_

2. **La IA busca en su base de conocimientos local**
   - Primero consulta información precargada en archivos o base de datos interna.
   - Si no encuentra respuesta, puede utilizar IA abierta (OpenAI/OpenRouter).

3. **El sistema responde en lenguaje simple**
   _“Sí, la cámara Hikvision modelo DS-2CE72 se puede usar con un NVR Dahua con protocolo ONVIF”_

4. **Si el cliente necesita asistencia personalizada, se deriva a un humano**
   - Cambio de estado: `#HUMANO`

---

## ⚙️ Reglas Técnicas

- Puede acceder a descripciones técnicas cargadas de cada producto.
- Puede incluir enlaces a manuales en PDF o videos.
- Si la pregunta está fuera del alcance (otro proveedor o marca), se ofrece derivación.

---

## 🔄 Personalización

- Los administradores pueden cargar preguntas frecuentes y respuestas.
- Se pueden establecer límites de uso de IA abierta por costo o privacidad.

---

## 📌 Estado

> 🟡 **Parcialmente implementado – falta completar base técnica interna**
