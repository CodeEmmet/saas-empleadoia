# saas-empleadoia

# SaaS Seguridad Electrónica 🚨

Sistema principal de gestión para empresa de seguridad electrónica: incluye pedidos automáticos por WhatsApp, soporte técnico con IA, control de stock, historial de conversaciones, reportes, métricas, login de empleados, y más.

---

## 🧠 Función principal del sistema

Un **empleado virtual con inteligencia artificial** que:
- Atiende a clientes vía WhatsApp
- Toma pedidos automáticamente
- Resuelve problemas técnicos
- Deriva al personal humano si es necesario
- Recuerda conversaciones anteriores y preferencias de cada cliente
- Verifica stock y sugiere productos alternativos

---

## 📦 Estructura del proyecto

saas-empleadoia/
│
├── apps/
│   ├── backend/
│   └── frontend/
│
├── libs/
│   ├── ia/                  # Lógica para el empleado con IA y manejo de modelos
│   ├── db/                  # Conexión a la base de datos
│   ├── shared/              # Utilidades comunes, tipos, validaciones
│   └── utils/               # Funciones auxiliares reutilizables
│
├── scripts/                 # Scripts para migraciones, carga de datos, etc
│   ├── seed.ts              # Script para poblar datos ficticios (productos, stock, etc.)
│   └── migrate.ts           # Migraciones iniciales o futuras
│
├── docs/                    # Documentación extra, como diagramas, decisiones técnicas
│   ├── plan.md              # Plan general del proyecto
│   └── decisiones.md        # Decisiones técnicas explicadas
│
├── .gitignore
├── README.md
└── package.json

---

## 🚀 Funcionalidades previstas

- 🔐 Login de empleados
- 🧑‍💼 Derivación automática a personal real
- 🗂️ Historial y preferencias del cliente
- 🛒 Verificación de stock y sugerencias automáticas
- 💬 Conversaciones fluidas con IA
- 📈 Reportes y métricas de uso
- 🔧 Gestión técnica
- 📄 Conexión futura con sistema actual y migración de datos

---

## 🧠 IA y canales de entrada

- 🤖 Modelo por defecto: OpenAI
- 🔁 Alternativa y fallback: OpenRouter (con cambio dinámico)
- 📱 Canal actual: WhatsApp
- 🌐 Canal futuro: Web para clientes

---

## 📅 Etapas de desarrollo

1. **Inicialización del repositorio y estructura**
2. Backend con NestJS: módulos de clientes, productos, stock, conversaciones
3. Frontend con React: login, dashboard, pedidos, métricas
4. Integración con WhatsApp (`whatsapp-web.js`)
5. Integración con IA (OpenAI/OpenRouter)
6. Persistencia de conversaciones, análisis de intenciones
7. Sistema de sugerencias basado en historial y gustos
8. Validaciones de stock y alternativas
9. Reportes y métricas
10. Conexión con sistema actual / migración de datos

---

## 🛠️ Cómo correr el proyecto (más adelante)
🚧 En construcción…

---

## ✅ To do inicial

- [x] Crear estructura base del proyecto
- [ ] Inicializar backend (NestJS)
- [ ] Inicializar frontend (React)
- [ ] Integrar GitHub con commits progresivos
