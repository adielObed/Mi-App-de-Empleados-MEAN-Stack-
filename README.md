Sistema empresarial robusto para la gestión de estructura organizacional y talento humano, desarrollado con el stack MEAN (MongoDB, Express, Angular, Node.js).

## 🚀 Inicio Rápido

### Requisitos
- Node.js (v18+)
- MongoDB Atlas (o instancia local)

### Backend (API)
1. Navegar a `/api`
2. Crear un archivo `.env` basado en el template (ya incluido).
3. `npm install`
4. `npm start` (Corre en puerto 3000)

### Frontend (Client)
1. Navegar a `/client`
2. `npm install`
3. `npm start` (Corre en puerto 4200 con proxy a la API)

## 🛠️ Tecnologías
- **Frontend**: Angular 18+, Angular Material, Reactive Forms.
- **Backend**: Node.js, Express.js.
- **Base de Datos**: MongoDB via Mongoose.
- **Despliegue**: Optimizado para Vercel.

## 📁 Estructura del Proyecto
- `/api`: Servidor Express y modelos de datos.
- `/client`: Aplicación Angular (Frontend).
- `vercel.json`: Configuración de despliegue monorepo.

## 📋 Módulos
- **Gestión de Estructura**: CRUD de Departamentos.
- **Gestión de Talento**: CRUD de Empleados con validación en tiempo real.
- **Vista Organizacional**: Dashboard maestro que agrupa empleados por área.

*La IA me facilitó el código inicial, pero yo me encargué de aplicarlo y validar que todo funcionara. Fue clave para entender a fondo cómo conectar Angular con Node y Mongo*
