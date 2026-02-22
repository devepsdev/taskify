# Taskify — Gestor de tareas Full Stack

Aplicación web de gestión de tareas construida con **Django REST Framework** en el backend y **Next.js 15** en el frontend. Permite realizar operaciones CRUD completas sobre tareas, incluyendo marcarlas como completadas.

---

## Tecnologías

### Backend

| Tecnología | Versión |
|---|---|
| Python | 3.x |
| Django | 5.2.4 |
| Django REST Framework | 3.16.0 |
| django-cors-headers | 4.7.0 |
| SQLite3 | — |

### Frontend

| Tecnología | Versión |
|---|---|
| Next.js | 15.4.5 |
| React | 19.1.0 |
| TailwindCSS | 4 |
| Font Awesome | 6.4.0 |

---

## Estructura del proyecto

```
Taskify/
├── .gitignore
├── Django_REST_Framework/       # Backend (API REST)
│   ├── .env                     # Variables de entorno — no subir al repo
│   ├── taskapi/                 # Configuración del proyecto Django
│   │   ├── settings.py          # Lee SECRET_KEY y DEBUG desde .env
│   │   └── urls.py
│   ├── tasks/                   # Aplicación principal
│   │   ├── models.py            # Modelo Task
│   │   ├── serializers.py       # Serializer DRF
│   │   ├── api.py               # ViewSet y lógica de la API
│   │   └── urls.py              # Rutas de la app
│   ├── manage.py
│   └── requirements.txt
│
├── taskify-frontend-main/       # Frontend (Next.js)
│   ├── .env.local               # URL del backend para desarrollo — no subir al repo
│   ├── .env.production          # URL del backend para el build de producción
│   ├── next.config.mjs          # output: export, trailingSlash, images unoptimized
│   └── src/app/
│       ├── layout.js            # Layout raíz (carga Font Awesome CDN)
│       ├── globals.css          # Estilos globales y sistema de diseño
│       ├── page.jsx             # Página de inicio (presentación del proyecto)
│       ├── tasks/
│       │   └── page.jsx         # Orquestador: estado, lógica de API y composición
│       └── components/
│           ├── FormTask.jsx     # Modal de creación y edición de tareas
│           ├── ListTask.jsx     # Stats + grid de tarjetas
│           └── TaskCard.jsx     # Tarjeta individual de tarea
│
└── README.md
```

---

## API Endpoints

Base URL: `http://localhost:8000/api/`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/tasks/` | Listar todas las tareas |
| `POST` | `/api/tasks/` | Crear una nueva tarea |
| `GET` | `/api/tasks/{id}/` | Obtener una tarea por ID |
| `PUT` | `/api/tasks/{id}/` | Actualizar una tarea |
| `DELETE` | `/api/tasks/{id}/` | Eliminar una tarea |
| `POST` | `/api/tasks/{id}/done/` | Alternar estado de completado |

> La API es pública (`AllowAny`). No requiere autenticación.

### Modelo Task

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | BigAutoField | Identificador único (auto) |
| `title` | CharField (200) | Título de la tarea |
| `description` | TextField | Descripción (opcional) |
| `done` | BooleanField | Estado de completado (default: false) |
| `created_at` | DateTimeField | Fecha de creación (auto) |

---

## Arquitectura del frontend

El frontend sigue una arquitectura cliente con separación clara de responsabilidades:

| Archivo | Rol |
|---|---|
| `tasks/page.jsx` | Orquestador. Gestiona todo el estado (`tasks`, `loading`, `error`, `formData`, `editingTask`, `showModal`) y las llamadas a la API. Compone `ListTask` y `FormTask`. |
| `components/ListTask.jsx` | Presentacional. Recibe las tareas y callbacks como props. Renderiza las 3 tarjetas de estadísticas, el estado de carga, el estado vacío y el grid de `TaskCard`. |
| `components/TaskCard.jsx` | Presentacional. Muestra los datos de una tarea y delega las acciones (completar, editar, eliminar) al orquestador mediante callbacks. Sin estado propio. |
| `components/FormTask.jsx` | Modal de creación y edición. Recibe `formData`, `editingTask`, `showModal` y `onSubmit` como props. Retorna `null` cuando el modal está cerrado. |

Todas las peticiones a la API se realizan en el cliente mediante `fetch`. No se utiliza SSR para los datos de tareas.

---

## Diseño

El sistema de diseño está definido en `globals.css` e implementa la estética del prototipo original (`index.html`):

- **Fondo**: gradiente `#667eea → #4b93a2`
- **Tarjetas**: glassmorphism con `backdrop-filter: blur` y borde semitransparente
- **Animaciones**: `fadeInDown`, `fadeInUp`, `slideInRight` en la carga inicial
- **Botones de acción**: gradientes independientes por tipo (completar, editar, eliminar)
- **Botón flotante (FAB)**: acceso rápido para crear tareas desde cualquier punto de la página
- **Modal**: overlay semitransparente con formulario de creación y edición
- **Iconos**: Font Awesome 6.4.0 cargado vía CDN en el layout

---

## Instalación y ejecución local

### Requisitos previos

- Python 3.x
- Node.js 18+

### 1. Clonar el repositorio

```bash
git clone https://github.com/devepsdev/taskify.git
cd Taskify
```

### 2. Variables de entorno del backend

Crea el archivo `Django_REST_Framework/.env` (no se incluye en el repositorio):

```env
DJANGO_SECRET_KEY=tu-clave-secreta-aqui
DJANGO_DEBUG=True
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

> `python-dotenv` carga este archivo automáticamente al arrancar Django.
> `CORS_ALLOWED_ORIGINS` acepta varios orígenes separados por coma.

### 3. Backend

```bash
cd Django_REST_Framework
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

El servidor se ejecutará en `http://localhost:8000`.

### 4. Variables de entorno del frontend

Crea el archivo `taskify-frontend-main/.env.local` (no se incluye en el repositorio):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

> Esta variable se embebe en el bundle en tiempo de build, no en runtime.

### 5. Frontend

```bash
cd taskify-frontend-main
npm install
npm run dev
```

El frontend se ejecutará en `http://localhost:3000`.

---

## Despliegue en producción (Apache + servidor propio)

### 1. Variables de entorno del backend

Crea o actualiza `Django_REST_Framework/.env` en el servidor:

```env
DJANGO_SECRET_KEY=clave-segura-generada-para-produccion
DJANGO_DEBUG=False
CORS_ALLOWED_ORIGINS=https://deveps.ddns.net
```

### 2. Backend

```bash
cd Django_REST_Framework
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
```

Sirve la aplicación con **Gunicorn** o **uWSGI** detrás de Apache/Nginx.

### 3. Frontend

El archivo `taskify-frontend-main/.env.production` (incluido en el repositorio) ya apunta al backend de producción:

```env
NEXT_PUBLIC_BACKEND_URL=https://deveps.ddns.net
```

Genera el export estático y cópialo al directorio de Apache:

```bash
cd taskify-frontend-main
npm install
npm run build        # genera out/ con .env.production activo
cp -r out/* /var/www/html/
```

#### Por qué funciona con Apache sin configuración adicional

`next.config.mjs` tiene `trailingSlash: true`, por lo que Next.js genera:

```
out/
├── index.html          →  /
└── tasks/
    └── index.html      →  /tasks/
```

Apache sirve `index.html` por defecto en cada directorio, por lo que las rutas funcionan sin reglas de reescritura adicionales.

---

## Funcionalidades

- Crear, editar y eliminar tareas mediante modal
- Marcar tareas como completadas o pendientes
- Panel de estadísticas en tiempo real (total, completadas, pendientes)
- Estado vacío con llamada a la acción
- Spinner de carga durante el fetch inicial
- Botón flotante (FAB) para crear tareas desde cualquier scroll
- Diseño responsivo con glassmorphism y animaciones CSS

---

## Demo

![Demo de la aplicación](public/Animation.gif)

---

## Autor

**Enrique Pérez** — 2025
