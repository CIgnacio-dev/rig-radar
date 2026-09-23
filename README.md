# 📡 RigRadar — Enterprise Hardware Price Tracking & Aggregator Platform

![RigRadar CI/CD Pipeline](https://github.com/CIgnacio-dev/rig-radar/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/State-Zustand-764ABC?style=flat)
![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18?style=flat&logo=vitest)

**RigRadar** es una plataforma web de alto rendimiento diseñada para la agregación, comparación y seguimiento de precios de componentes de hardware informático en tiempo real. 

El proyecto fue construido bajo **patrones de arquitectura limpia (Clean Architecture)** y estándares enterprise de diseño de software para garantizar escalabilidad, reusabilidad de componentes, tipado estricto y excelente desempeño en renderizado (SSR/CSR).

---

## 📸 Vista Previa e Interfaz

- **Tema:** Dark / Tech Dashboard nativo optimizado para evitar la fatiga visual.
- **Filtros en Tiempo Real:** Selección por categoría, marca, rango de precio y búsqueda con *debounce*.
- **Visualización:** Gráficos interactivos de historial de precios a 30 días impulsados por Recharts.

---

## 🎯 Pilares y Patrones de Arquitectura

1. **Repository Pattern (Abstracción de Capa de Datos):** Desacoplamiento total entre la UI y las fuentes de datos mediante contratos de interfaz (`IProductRepository`). Incluye simulación asíncrona de red, latencia controlada y manejo de fallos.
2. **Bidirectional URL-to-State Synchronization:** Sincronización transparente de dos vías entre el estado global (`Zustand`) y la barra de direcciones (`URLSearchParams`) para permitir URLs compartibles y navegables.
3. **Resiliencia de UI (Error Boundaries & Suspense Skeletons):** Carga progresiva sin parpadeo (Layout Shift / CLS) usando Skeletons animados y captura declarativa de excepciones con `error.tsx` y `not-found.tsx`.
4. **Hydration-Safe Persistence:** Uso de `useSyncExternalStore` y el middleware `persist` de Zustand para almacenamiento sin *hydration mismatches* en `localStorage`.
5. **Debounce Optimization:** Control de eventos de entrada en el buscador global para evitar renders innecesarios.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Framework Base** | Next.js 15 (App Router, Server & Client Components) |
| **Lenguaje** | TypeScript (Modo Estricto / Strict Type Checking) |
| **Estilos & UI** | Tailwind CSS v4 (Dark Mode, Responsivo, Design Tokens) |
| **Gestión de Estado** | Zustand + Middleware `persist` |
| **Visualización** | Recharts (Line Charts interactivos) |
| **Testing** | Vitest + React Testing Library + JSDOM |
| **CI/CD** | GitHub Actions (Lint, Type-Check, Unit Test, Build Validation) |

---

## 🏗️ Estructura del Proyecto

```text
rig-radar/
├── .github/
│   └── workflows/
│       └── ci.yml             # Pipeline de Integración Continua (CI/CD)
├── src/
│   ├── app/                   # Rutas del App Router de Next.js
│   │   ├── error.tsx          # Error Boundary Global
│   │   ├── loading.tsx        # Shell de Carga Inicial
│   │   ├── not-found.tsx      # Handler para Rutas 404
│   │   ├── page.tsx           # Catálogo Principal con Filtros
│   │   └── product/[id]/      # Ficha de Detalle y Gráfico de Precios
│   ├── components/
│   │   ├── features/          # Componentes de Negocio (FilterSidebar, SearchBar, etc.)
│   │   └── ui/                # UI Atómica Reutilizable (ProductCard, Skeletons, etc.)
│   ├── hooks/                 # Custom Hooks (useSyncFiltersWithUrl, useIsHydrated)
│   ├── services/              # Repository Pattern (productRepository, mockData)
│   ├── store/                 # Global State (useFilterStore, useFavoritesStore)
│   └── types/                 # Definiciones de Tipos TypeScript
├── vitest.config.ts           # Configuración del entorno de pruebas
└── README.md


🚦 Primeros Pasos (Local Setup)
Prerrequisitos
Node.js: v20.x o superior

npm: v10.x o superior

Instalación y Ejecución
Clonar el repositorio:

Bash
git clone [https://github.com/CIgnacio-dev/rig-radar.git](https://github.com/CIgnacio-dev/rig-radar.git)
cd rig-radar
Instalar dependencias:

Bash
npm install --legacy-peer-deps
Iniciar el servidor de desarrollo:

Bash
npm run dev
Abre http://localhost:3000 en tu navegador.

🧪 Pruebas y Calidad de Código
Ejecutar la suite de pruebas unitarias con Vitest:

Bash
npm run test
Ejecutar el validador estático de código (ESLint):

Bash
npm run lint
Ejecutar la verificación estricta de tipos de TypeScript:

Bash
npx tsc --noEmit
Construir la versión de producción:

Bash
npm run build
⚙️ CI/CD Pipeline (GitHub Actions)
El repositorio incluye un flujo de automatización configurado en .github/workflows/ci.yml que valida cada push o pull request en las ramas principales ejecutando secuencialmente:

ESLint Verification

TypeScript Type Checking

Vitest Unit Testing Suite

Next.js Production Build Validation

📄 Licencia
Este proyecto está distribuido bajo la licencia MIT. Desarrollado por Carlos Ignacio Roa Troncoso (@CIgnacio-dev).