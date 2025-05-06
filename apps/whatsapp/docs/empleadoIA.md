# Empleado IA - Documento de diseño general

## 🎯 Visión
El Empleado IA es un asistente virtual con inteligencia artificial diseñado para interactuar con clientes vía WhatsApp u otros canales, con el objetivo de responder consultas, tomar pedidos, resolver problemas técnicos y derivar a humanos cuando sea necesario.

Este asistente puede configurarse por empresa y se adapta a diferentes necesidades del rubro de seguridad electrónica y similares.

---

## 🧩 Funcionalidades disponibles

> Cada empresa puede activar o desactivar los módulos que desee usar. No se pueden crear nuevas funcionalidades, pero sí seleccionar cuáles estarán activas.

| Código         | Nombre funcionalidad                 | Descripción                                                               |
|----------------|-------------------------------------|---------------------------------------------------------------------------|
| pedidos        | Realizar pedidos                     | El cliente puede pedir productos directamente.                            |
| consulta_prod  | Consultar productos                  | Descripciones, diferencias, recomendaciones, etc.                         |
| soporte        | Soporte técnico                      | Flujo estructurado para problemas comunes.                                |
| stock          | Consultar stock                      | Verifica disponibilidad en tiempo real.                                   |
| precios        | Consultar precios/promociones        | Devuelve precios cargados y descuentos actuales.                          |
| repetir_pedido | Repetir pedidos anteriores           | Sugiere productos anteriores o repite pedidos.                            |
| coordinacion   | Coordinación de entrega/instalación  | Agenda fechas o informa plazos de entrega.                                |
| factura        | Facturación                          | Envía factura A/B según cliente.                                          |
| derivacion     | Derivar a humano                     | Silencia al bot y permite intervención humana.                            |
| generales      | Consultas generales                  | Horarios, ubicación, formas de pago, etc.                                 |

---

## ⚙️ Configurabilidad por empresa

- Cada empresa tiene su propio conjunto de:
  - Productos
  - Clientes
  - Mensajes de bienvenida y cierre
  - Funcionalidades activadas
  - Preferencias de IA (tono, estilo, temperatura, etc.)

---

## 🤖 Comportamiento inteligente

### 🌐 Conexión con base de productos
- El Empleado IA solo puede recomendar productos **que existan en la base de datos de la empresa**.
- Para comparaciones externas, puede consultar internet, pero debe aclararlo: *"Este modelo no lo tenemos, pero se compara con..."*.

### 🧠 Contexto y memoria
- Se guarda el historial completo de conversaciones.
- Se genera un perfil de hábitos por cliente:
  - Marcas preferidas
  - Frecuencia de compra
  - Productos habituales
  - Problemas técnicos frecuentes

---

## 🔄 Estados de conversación

- `#BOT`: la IA está atendiendo y gestionando.
- `#HUMANO`: la conversación fue derivada a un operador humano y la IA queda inactiva.
- Transiciones:
  - Bot detecta frustración o pedido directo → cambia a `#HUMANO`.
  - El operador puede volver a `#BOT` manualmente.

---

## 🛠️ Próximos pasos

1. Definir el primer flujo conversacional: **pedido de productos**.
2. Crear esquema de configuración por empresa.
3. Documentar módulo por módulo en `docs/modulos/`.

---

