# FuelUp

Una aplicación web moderna para registrar y controlar los repostajes de tu vehículo, permitiéndote analizar el consumo y gasto de combustible de forma visual e intuitiva.

## 🚀 Características

- **Registro de repostajes**: Guarda fácilmente información detallada de cada repostaje incluyendo kilómetros, litros y coste
- **Gráficos visuales**: Visualiza tu consumo mensual y gastos en combustible mediante gráficos interactivos
- **Almacenamiento persistente**: Los datos se guardan de forma segura mediante Vercel KV
- **Usuario identificado**: Cada usuario recibe un UUID único que se almacena localmente
- **Interfaz intuitiva**: Diseño limpio y responsive con formularios validados
- **Sin necesidad de login**: Acceso inmediato sin autenticación

## 🛠️ Tecnologías Utilizadas

**Frontend:**
- **Next.js 14** - Framework React moderno con soporte SSR
- **React 18** - Librería de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **TailwindCSS** - Framework de estilos CSS
- **Radix UI** - Componentes accesibles y primitivos UI
- **React Hook Form** - Gestión eficiente de formularios
- **Zod** - Validación de esquemas con TypeScript

**Gráficos e Interfaces:**
- **Recharts** - Librería de gráficos React
- **Lucide React** - Iconografía moderna
- **React Day Picker** - Selector de fechas accesible

**Backend & Almacenamiento:**
- **Vercel KV** - Base de datos Redis alojada en Vercel
- **Vercel Analytics** - Análisis de uso
- **Vercel Speed Insights** - Monitoreo de rendimiento

## 📋 Estructura del Proyecto

```
fuelup/
├── app/                          # Aplicación Next.js
│   ├── api/                      # Rutas API
│   │   └── user/                 # Endpoint para gestionar datos de usuario
│   ├── layout.tsx                # Layout raíz con metadatos
│   ├── page.tsx                  # Página principal
│   └── global.css                # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── forms/
│   │   └── DefaultUserForm.tsx   # Formulario de registro de repostajes
│   ├── charts/
│   │   └── barChart.tsx          # Gráficos de consumo y gasto
│   └── ui/                       # Componentes UI primitivos
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── modal.tsx
│       └── popover.tsx
├── services/
│   └── UserService.tsx           # Funciones para interactuar con la API
├── lib/
│   └── utils.ts                  # Utilidades y helpers
└── package.json                  # Dependencias del proyecto
```

## 🎯 Componentes Principales

### DefaultUserForm
Formulario reactivo que permite registrar un nuevo repostaje con validación mediante Zod:
- **Kilómetros**: Total de km recorridos (1-2000 km)
- **Litros**: Cantidad de combustible repostado (1-50 litros)
- **Coste**: Precio del repostaje (1-50 euros)
- **Fecha**: Selector de fecha con calendario interactivo

### CustomBarChart
Visualización dual de datos:
- Gráfico de **kilómetros por mes** - Para analizar patrones de uso
- Gráfico de **gasto por mes** - Para control de presupuesto

Agrupa automáticamente los datos por mes y muestra tendencias a lo largo del año.

## 🔌 API

### GET `/api/user`
Obtiene los datos de repostaje de un usuario.
- **Parámetros**: `userId` (UUID del usuario)
- **Respuesta**: JSON con array de repostajes

### POST `/api/user`
Guarda o actualiza los datos de repostaje de un usuario.
- **Body**: `{ userId: string, userData: array }`
- **Respuesta**: Confirmación de guardado

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
git clone <repositorio>
cd fuelup
npm install
```

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

### Build para producción
```bash
npm run build
npm run start
```

## 📦 Dependencias Principales

```json
{
  "next": "^14.2.5",
  "react": "^18.3.1",
  "typescript": "5.5.4",
  "tailwindcss": "^3.4.9",
  "react-hook-form": "^7.52.2",
  "zod": "^3.23.8",
  "recharts": "^2.12.7",
  "@vercel/kv": "^2.0.0"
}
```

## 💾 Almacenamiento de Datos

Los datos se almacenan en dos niveles:
- **Local**: UUID del usuario en `localStorage` bajo la clave `user-uuid`
- **Servidor**: Datos de repostaje en Vercel KV (Redis) asociados al UUID

## 🎨 Estilos

La aplicación utiliza TailwindCSS con un diseño responsive:
- Ancho máximo del 33% del viewport (w-1/3)
- Altura mínima de 80vh
- Centrado automático con `mx-auto`
- Esquema de colores blanco con elementos grises

## 🔒 Privacidad y Seguridad

- No requiere login ni datos personales
- El UUID se genera localmente y se almacena en el navegador
- Los datos están asociados solo al UUID, no a información personal
- Compatible con PWA (Web App Capable)

## 📱 Compatibilidad

- Responsive design para móvil, tablet y desktop
- Compatible con navegadores modernos
- Soporte para PWA en iOS y Android

## 📈 Futuras Mejoras

Posibles características a añadir:
- Exportación de datos en CSV/PDF
- Historial de cambios y eliminación de registros
- Comparativas multianuales
- Alertas de consumo anómalo
- Sincronización entre dispositivos
- Autenticación opcional con contraseña

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.