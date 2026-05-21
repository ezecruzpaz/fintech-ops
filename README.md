# 💳 Fintech Ops Dashboard

Mini portal administrativo tipo fintech para la gestión y monitoreo de órdenes y pagos.

Este proyecto simula una herramienta interna utilizada por operadores para:
- visualizar transacciones
- monitorear estados de pago
- detectar errores rápidamente
- analizar métricas clave

---

# 🚀 Tech Stack

## Frontend
- Next.js (pendiente)
- TailwindCSS
- shadcn/ui

## Backend
- FastAPI
- SQLAlchemy
- PostgreSQL

## Infraestructura
- Railway (Database & Backend deploy)
- Vercel (Frontend deploy - pendiente)

---

# 🧠 Arquitectura

Proyecto organizado como **monorepo**:

```
fintech-ops/
├── backend/
├── frontend/
├── docs/
├── scripts/
```

---

## 🧩 Backend Architecture

```
backend/app/
├── routes/
├── services/
├── models/
├── schemas/
├── db/
├── main.py
```

---

# ⚙️ Instalación

```bash
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

# ▶️ Ejecutar

```bash
py -m uvicorn app.main:app --reload
```

---

# 🔌 Variables de entorno

```
DATABASE_URL=postgresql://user:password@host:port/db
```

---

# 📡 Endpoints

### GET /orders
- búsqueda
- filtros
- paginación
- sorting

### GET /orders/{id}
- detalle de orden

---

# 🎯 Decisiones técnicas

- FastAPI por rapidez
- PostgreSQL por robustez
- Arquitectura por capas
- Monorepo para separar responsabilidades

---

# ⚖️ Tradeoffs

- No JWT por tiempo
- No Redis en esta versión

---

# 🚀 Mejoras futuras

- JWT + refresh tokens
- Redis caching
- WebSockets
- Tests
- CI/CD

---

# 📦 Deploy

- Backend → Railway
- Frontend → Vercel

---

# 🌿 Git Workflow

```
main → producción
develop → integración
feature/* → desarrollo
```

---

# 👨‍💻 Autor

Ezequiel Cruz Paz
