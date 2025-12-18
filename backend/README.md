# Grupo Lázaro — Backend (Express + SQLite)

Rápido scaffold para el MVP.

Pasos:

1. Instalar Node.js y npm

2. Ir a la carpeta `backend` e instalar dependencias:

```sh
cd backend
npm install
```

3. Crear `.env` copiando `.env.example` y poner `ADMIN_TOKEN` seguro.

4. Ejecutar en desarrollo:

```sh
npx nodemon index.js
```

Endpoints principales:

- `POST /api/stories` — crear historia
- `GET /api/stories` — listar historias aprobadas
- `GET /api/stories/all` — listar todas (admin `x-admin-token`)
- `PATCH /api/stories/:id/approve` — aprobar (admin)
- `DELETE /api/stories/:id` — borrar (admin)

Ejemplo `curl` para aprobar (usar el `ADMIN_TOKEN`):

```sh
curl -X PATCH -H "x-admin-token: TU_TOKEN" https://tu-backend/api/stories/1/approve
```
