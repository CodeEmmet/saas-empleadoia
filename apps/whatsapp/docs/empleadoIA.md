# Empleado IA - Documento de diseño general

## 🎯 Visión
El Empleado IA es un asistente virtual con inteligencia artificial diseñado para interactuar con clientes vía WhatsApp u otros canales, con el objetivo de responder consultas, tomar pedidos, resolver problemas técnicos y derivar a humanos cuando sea necesario.

Este asistente se adapta a diferentes necesidades del rubro de seguridad electrónica y similares.

---

## 🧩 Funcionalidades disponibles

> Cada empresa puede activar o desactivar los módulos que desee usar. No se pueden crear nuevas funcionalidades, pero sí seleccionar cuáles estarán activas.

| Código         | Nombre funcionalidad                 | Descripción                                                               |
|----------------|--------------------------------------|---------------------------------------------------------------------------|
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

## Optimizar el uso de IA

### Usar contexto limitado y relevante: 
Sugerencia: No envíes todo el historial al modelo. Resumí o seleccioná los últimos mensajes clave (3 a 5 intercambios recientes).
Beneficio: Ahorra tokens y mejora la precisión de la respuesta.

### Elegir el modelo adecuado según el tipo de consulta
Sugerencia: Usá un modelo rápido y barato (como gpt-3.5 o deepseek-coder-mini) para tareas simples, y un modelo más potente (como gpt-4-turbo) sólo si es necesario.
Beneficio: Reduce costos sin sacrificar calidad.

### Implementar un sistema de memoria persistente
Sugerencia: Guardá información clave del cliente (preferencias, productos favoritos, historial) en tu base de datos y reenviála al modelo sólo si es necesario.
Beneficio: Mantenés conversaciones personalizadas sin consumir tokens extra.

### Procesar localmente lo que no necesita IA
Sugerencia: Validación de stock, generación de ID de pedidos, respuestas simples (“Estamos revisando tu pedido”) pueden hacerse sin IA.
Beneficio: Velocidad de respuesta y menor uso de API.

### Aplicar embeddings para memoria avanzada (opcional)
Sugerencia: Usá vectores (embeddings) para buscar información previa relevante y sumar contexto de forma inteligente.
Beneficio: Respuestas más coherentes, especialmente en diálogos largos o soporte técnico.
`Explicación:` Embeddings son representaciones numéricas de texto. Convierten una palabra, frase o documento en un vector (una lista de números). Esto sirve para que la IA "entienda" conceptos y busque similitudes. Estos vectores estarán muy cerca entre sí en el espacio matemático → la IA deduce que son parecidos, aunque no usen las mismas palabras.
`Podés usar embeddings para:`
- Buscar mensajes anteriores relevantes en la conversación (memoria inteligente)
- Responder preguntas frecuentes (FAQ) sin reentrenar modelos
- Buscar productos similares ("no tengo ese, pero tengo esto otro")
- Comparar pedidos anteriores para hacer sugerencias
`¿Cómo se usan?`
- Almacenás textos importantes (productos, preguntas, mensajes) convertidos a embeddings.
- Cuando el usuario dice algo, convertís su mensaje en embedding.
- Buscás los más parecidos con una consulta de similitud (cosine similarity).
- Traés esos textos al modelo como contexto (“Esto puede ayudarte”).

### Cachear respuestas comunes
Sugerencia: Preguntas frecuentes (“¿Cuál es el horario?”, “¿Tienen cámaras Hikvision?”) pueden tener respuestas guardadas o preprocesadas.
Beneficio: Cero uso de IA para esas respuestas.

### Ajustar los parámetros del modelo
Sugerencia: Usá temperature bajo (ej. 0.3) para respuestas más predecibles y consistentes en pedidos, y top_p ajustado.
Beneficio: Mejora la coherencia en respuestas de negocio.