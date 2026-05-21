# Fintech Ops Dashboard

Portal administrativo para gestión y monitoreo de órdenes y pagos, construido como prueba técnica full-stack.

**Demo en vivo →** [fintech-ops-roan.vercel.app](https://fintech-ops-roan.vercel.app/login)
&nbsp;&nbsp;|&nbsp;&nbsp;
**API →** [fintech-ops.onrender.com](https://fintech-ops.onrender.com/docs)
---

## Credenciales de prueba

```
email:    admin@test.com
password: 123456
```

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js (App Router), React, TailwindCSS |
| Backend | FastAPI, SQLAlchemy, SQLite |
| Deploy | Vercel (frontend) + Render (backend) |

---

## Funcionalidades

- Autenticación con JWT
- Dashboard con métricas clave
- Tabla de órdenes con búsqueda, filtros, paginación y sorting
- Vista detalle por orden
- UI responsive (desktop y mobile)

---

## Arquitectura

```
fintech-ops/
├── frontend/
│   ├── app/                  # App Router de Next.js
│   ├── components/
│   │   └── DashboardView/    # Componentes de presentación
│   └── hooks/
│       └── useDashboard.ts   # Lógica desacoplada de la UI
└── backend/
    └── app/
        ├── routers/          # auth, orders
        ├── services/         # Lógica de negocio
        └── models/           # ORM con SQLAlchemy
```

El frontend separa lógica de presentación mediante hooks personalizados. El backend organiza responsabilidades por dominio (routers → servicios → modelos).

---

## Instalación local

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Variables de entorno

Crear `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## API

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/auth/login` | Autenticación, retorna JWT |
| `GET` | `/orders` | Lista de órdenes (búsqueda, filtros, paginación, sorting) |
| `GET` | `/orders/{id}` | Detalle de una orden |

---

## Decisiones técnicas

**SQLite en lugar de PostgreSQL** — suficiente para el scope de una prueba técnica; el cambio a Postgres en producción sería transparente via SQLAlchemy.

**Sin refresh tokens** — se optó por JWT simple para mantener el foco en las funcionalidades del dashboard.

**Sin caching** — prioridad en legibilidad del código sobre optimización prematura.

---

## Mejoras pendientes

- [ ] Refresh tokens
- [ ] Skeleton loading states
- [ ] Dark mode
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Tests (pytest + Playwright)
- [ ] Docker + CI/CD

---

## Autor

**Ezequiel Cruz Paz**
