# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Desarrollo local (Vite HMR)
npm run build      # Compilar: tsc -b && vite build
npm run lint       # ESLint
npm run preview    # Preview del build en local
```

La variable de entorno `GEMINI_API_KEY` debe existir en `.env.local` (ya en `.gitignore`).

## Stack

- **React 19** + **TypeScript** + **Vite 7** con `@vitejs/plugin-react-swc` (SWC, no Babel)
- **Tailwind CSS 4** + **Framer Motion** + **Recharts** + **React Router 7**
- **Gemini AI**: `@google/genai` v1 (API unificada) y `@google/generative-ai` v0.24 (legacy)
- **Deploy**: Vercel — SPA con rewrite `"/*" → "/index.html"` en `vercel.json`
- **PWA**: Service Worker manual en `public/sw.js` + `public/manifest.webmanifest` (sin plugin, `vite-plugin-pwa` v1.2 es incompatible con Vite 7)

## Arquitectura

### Dos apps dentro de un mismo proyecto

```
src/
├── App.tsx           # Router raíz: "/" → LandingPage, "/pcf-15tm" → PortalApp
├── index.tsx         # Entry point: ReactDOM + BrowserRouter
├── components/       # Componentes de la landing de ventas DOMIS™
└── pcf-15tm/         # App técnica PCF-15™ (portal de inspectores de campo)
    ├── App.tsx        # Componente raíz del portal técnico
    ├── constants.ts   # ÚNICA fuente de verdad: CFG (precios UF), ITEMS, normativas, comunas
    ├── types.ts       # Interfaces TypeScript del portal
    ├── normativeData.ts
    └── components/    # UI del portal técnico
```

También existe `src/xpcf15/` — copia legacy/experimental del portal, **no está en producción** (no hay ruta activa).

### Portal PCF-15™ (`src/pcf-15tm/`)

El portal es una **SPA de auditoría técnica inmobiliaria** para inspectores de campo. Funciona offline (PWA).

**Flujo de datos:**
1. `constants.ts` exporta `CFG` (precios en UF), `ITEMS`, `DORM_ITEMS`, `BATH_ITEMS`, `STAIR_ITEMS`
2. `App.tsx` consume todo — maneja estado global de auditoría, UF en tiempo real (vía `mindicador.cl`), autenticación por password, modo impresión
3. `AuditRow.tsx` es el componente central: renderiza cada ítem auditable con score, costo calculado y normativa referenciada

**Para actualizar precios UF:** editar solo el objeto `CFG` en `constants.ts` líneas 12-17. El resto del sistema lo referencia automáticamente.

**Modos de impresión:** `'none' | 'fast' | 'normal' | 'full' | 'investor' | 'work_order'` — controlan qué secciones se renderizan al imprimir/exportar PDF.

### Landing DOMIS™ (`src/components/`)

Landing de marketing en `"/"`. Componentes independientes, sin estado compartido (excepto `TabsContext` para las tabs de fases del servicio).

### Path alias

`@` apunta a la raíz del proyecto (no a `src/`). Ejemplo: `import X from '@/src/pcf-15tm/constants'`.

## Consideraciones importantes

- **`index.html` raíz** contiene Schema JSON-LD, Open Graph, Twitter Card, y el registro del Service Worker — tocar con cuidado para no romper SEO ni PWA.
- **Imágenes públicas de logo:** `LogoDomis2.jpg` es la imagen activa en OG/Twitter/Schema. Está en `public/`.
- **UF live:** el portal consulta `https://mindicador.cl/api/uf` al cargar. Si falla, usa el valor por defecto `39700.00` editado por el inspector.
- **APIs externas excluidas del SW cache:** `googleapis.com`, `generativelanguage.googleapis.com`, `googletagmanager.com`, `clarity.ms`, `mindicador.cl`, `esm.sh`.
