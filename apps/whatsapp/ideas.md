# Temas frecuentes que un cliente puede consultar al Empleado IA

## 🛒 1. Realizar un pedido
- Comprar productos específicos (cámaras, alarmas, sensores, DVR/NVR, kits).
- Repetir un pedido anterior.
- Confirmar pedido armado por el asistente.

## 🔍 2. Consultar sobre productos
- Diferencias entre modelos.
- Recomendaciones de marcas.
- Uso o instalación básica.

## 📞 3. Soporte técnico
- Problemas con alarmas, cámaras o equipos instalados.
- Consultas sobre configuración o reinicio.
- Solicitud de contacto con soporte humano.

## 📦 4. Consultar stock o disponibilidad
- Ver si hay productos disponibles en tiempo real.
- Consultas tipo: “¿Tienen cámaras IP con visión nocturna?”

## 💰 5. Consultar precios o promociones
- Pedir presupuesto de productos o kits.
- Preguntar por descuentos activos.

## 🔁 6. Repetir un pedido
- “Quiero lo mismo que la última vez.”
- “Mandame lo que siempre compro.”

## 📅 7. Coordinar entrega o instalación
- Consultar plazos de entrega.
- Pedir agendar una instalación con técnico.

## 🧾 8. Pedir factura o comprobante
- Solicitud de Factura A o B.
- Envío de comprobante digital por WhatsApp o email.

## 🧑‍💼 9. Derivación a humano
- Cliente lo solicita directamente.
- El bot detecta que no puede resolver la situación.

## ❓ 10. Otras consultas generales
- Horarios de atención.
- Ubicación de la empresa.
- Métodos de pago aceptados.


| Funcionalidad                     | Tipo                                                 | Justificación |
|-----------------------------------|------------------------------------------------------|---------------|
| 🛒 Hacer pedidos                  | **IA + lógica estructurada**                        | La IA interpreta el pedido, lo convierte en estructura (producto + cantidad), y se guarda. |
| 🔍 Consultas sobre productos      | **IA**                                              | GPT responde bien con datos que le des, si los productos están en tu base. |
| 📞 Soporte técnico                | **Chatbot estructurado + IA (solo si no entiende)** | Evitás que dé soluciones incorrectas, con flujo guiado y fallback a IA. |
| 📦 Stock y precios                | **Estructurado**                                    | Que consulte tu DB directamente; GPT no debería inventar esto. |
| 🔁 Pedidos anteriores             | **Estructurado**                                    | IA puede sugerir si no hay coincidencia, pero la lógica debe ser firme. |
| 📅 Coordinación                   | **Semi-estructurado**                               | IA puede sugerir fechas, pero lo ideal es integrar calendario. |
| 🧾 Facturación                    | **Estructurado**                                    | Clave mantener precisión, sin IA. |
| 🧑‍💼 Derivación                     | **Regla estructurada**                              | Cuando el cliente lo diga o la IA detecte frustración. |
| ❓ Consultas generales            | **IA**                                              | Ideal para este tipo de interacciones. |