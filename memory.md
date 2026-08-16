# DOMIS™ — MEMORY.MD
## Estado actual del proyecto · Actualizado: 16 agosto 2026

---

## ESTADO WEB (domis.cl) — AHORA MISMO

**Producción (domis.cl):** verificado con curl hoy — 200 OK, email de contacto correcto (`arielom@domis.cl`). Online incluye al menos hasta commit `9c927ab`.

**`main` local está 2 commits adelante de `origin/main`, sin pushear:**
- `f062418` — docs: instructivo marketing conectando skills genéricos con agentes DOMIS™
- `d3d079c` — fix: página 404 real (`NotFound.tsx` + ruta wildcard) + prerender noindex dedicado para `/calculator` (URL fantasma indexada 404 en GSC, sin ruta SPA ni prerender propio — caía al shell home con meta duplicada). `tsc -b` limpio. CLAUDE.md migrado al formato estándar de agencia (import de protocolos PharosLab).

**Pendiente:** `git push` para disparar auto-deploy Vercel de ambos commits. No incluye cambio visual/UX — solo afecta crawlers sin JS y la URL fantasma `/calculator`.

### Sesión 30-jul
Email de contacto corregido `ariel@domis.cl` → `arielom@domis.cl` en 5 archivos (index.html, GarantiaFAQ, CasePage, ArticuloBuyerAgent, ContactModal). Commit `9c927ab`, pusheado y verificado en producción.

### Sesión 6-jul — bug real de fondo en el prerender, arreglado

Se instaló el skill `geo` (repo público `geo-seo-claude`, `~/.claude/skills/geo/`) como
capa de auditoría GEO/AEO adicional al checklist propio de PharosLab. Primera
corrida real contra domis.cl (no contra un cliente de prueba) encontró que el
prerender de 1-jul (`b35aa8b`, dado por CERRADO en su momento) tenía un bug de
fondo nunca detectado: `scripts/prerender.ts` clonaba `dist/index.html` completo
a cada ruta e inyectaba solo `<title>/<meta>/schema` por string — el body real
(`<div id="root">`) quedaba VACÍO en todas las rutas, con un mismo bloque
genérico oculto (`aria-hidden`, 378 palabras, contenido de home) como único
texto visible a un crawler sin JS (GPTBot, ClaudeBot, PerplexityBot no
ejecutan JS). O sea: cada artículo de blog tenía meta/schema correctos pero
CERO palabras propias citables por una IA — el fix de junio solo había
resuelto la mitad del problema.

**Fix real (no parche):** `scripts/prerender.ts` reescrito completo, mismo
patrón que `hogar-senior-web/scripts/prerender.js` — levanta un server
estático local + Chrome headless (`puppeteer` local / `puppeteer-core` +
`@sparticuz/chromium` en Vercel), visita cada ruta, espera a que
React+Helmet terminen de renderizar, y captura el HTML real resultante en
vez de clonar el shell. Contenido de artículos pasa de 378 palabras
genéricas a 1400+ palabras propias por ruta. HowTo schema de
`ArticuloNegociacion`/`ArticuloDepartamento` (nunca existió client-side, era
inyección estática pura) preservado via función `injectHowTo()` aplicada
después de la captura, para no perderlo con el cambio de mecanismo.
Verificado local: 18/18 rutas, 1 solo `<title>` por ruta (sin duplicados),
`tsc -b` y `eslint scripts/prerender.ts` limpios. Commit `82ccf1a`.

Reporte completo del hallazgo: `GEO-AUDIT-REPORT.md` (raíz del proyecto).

**Diseño/UX: sin cambios.** El cliente monta con `ReactDOM.createRoot`
(no `hydrateRoot`) — el HTML prerenderizado solo lo ve un crawler sin JS,
un usuario real con navegador siempre ve el render de React normal, JS
pisa el HTML estático al montar.

### Sesión 5-jul — qué se hizo
1. **Pusheados los 3 commits que quedaron colgados desde 3-jul** (`3af72fd` fix Tailwind, `b0e88dd` docs, `90db01e` fix seguridad — keys/password del PCF-15 movidas a serverless, npm audit fix 1 vulnerabilidad crítica). Estaban verificados hace 2 días pero nunca se pusharon — el fix de seguridad estuvo sin deployar todo ese tiempo.
2. **HowTo schema (`ArticuloNegociacion`, `ArticuloDepartamento`) — bug de raíz arreglado.** Estaba implementado como `useEffect` que inyecta el `<script>` en el DOM client-side — nunca llegaba al HTML que recibe un crawler antes de ejecutar JS (mismo patrón de bug que el blog invisible de junio). Movido a `scripts/prerender.ts` (`buildArticleHeadTags` ahora acepta `howTo` opcional, mismo mecanismo que Article/Breadcrumb). Verificado con curl en producción: HowTo presente en el HTML servido.
3. Commit `4214a73` — build + prerender corridos, 17/17 rutas OK, deploy confirmado Ready en Vercel.

### Pendiente real (no falso positivo)
- **`ArticuloChecklistUsada` — HowTo nunca se implementó**, ni siquiera client-side. El memory viejo lo daba por hecho junto a los otros 2, pero el código nunca lo tuvo. Si se quiere HowTo ahí, hay que escribir los steps desde cero (no es solo mover código existente).

### Bug real encontrado y arreglado (3 jul) — `3af72fd`
Desde el commit `b35aa8b` (1 jul) se eliminó el script `cdn.tailwindcss.com` de `index.html` asumiendo que el build vía PostCSS ya generaba las clases utilitarias (Tailwind v4). **Era falso**: faltaba `postcss.config.js` y el paquete `@tailwindcss/postcss`. El CSS compilado solo traía variables de tema (~20KB, cero `.flex`, `.hidden`, `.bg-*`) — toda la web quedaba sin estilo (texto plano apilado).
- Fix: `npm install -D @tailwindcss/postcss` + nuevo `postcss.config.js` con `@tailwindcss/postcss` + `autoprefixer`.
- Verificado: CSS pasa de 20KB → 103KB con utilidades reales. Build + prerender 17 rutas limpio. Screenshot local (`localhost:4445`) idéntico a domis.cl online.
- Este bug es la causa de que el trabajo del 1-jul nunca se haya podido subir a producción sin romper el sitio — no era el footer de Antigravity, era este.

### Implementado y verificado (evidencia real, en el commit 3af72fd)
- Schema JSON-LD: LocalBusiness + RealEstateAgent + ProfessionalService + FAQPage + WebSite + Person + Review + ItemList
- Meta tags dinámicos por ruta vía react-helmet-async (BlogLayout, CasePage, BlogIndex, BuyerAgentLanding)
- GA4 (G-T7YTDDXRVB), Microsoft Clarity (vgpwn25857), Meta Pixel (2021341692090214)
- 12 artículos blog + 3 casos + landing bilingüe /buyer-agent-chile
- Prerender estático de 17 rutas (`scripts/prerender.ts`, post-build)
- Tailwind CDN duplicado eliminado, Person deduplicado en @graph, noscript movido a body

---

## RECOVERY POINTS (git tags, local + GitHub)

| Tag | Commit | Qué es | Cómo restaurar |
|-----|--------|--------|----------------|
| `punto-0-live-27jun` | `637a35b` | Viejo — ya no es lo que está online, quedó como referencia histórica | `vercel promote mi-proyecto-web-v2-gwg3m2c4j-ariel-oms-projects.vercel.app --scope ariel-oms-projects` |
| `punto-1-fix-tailwind-2jul` | `3af72fd` | Fix Tailwind + SEO 1-jul. **Ya pusheado y deployado (5-jul)**, dejó de ser recovery point futuro | `git reset --hard punto-1-fix-tailwind-2jul` + `git push` |

**Estado online ahora:** `4214a73` (5-jul) — security fix + HowTo fix incluidos. Si hace falta rollback, ese es el commit de referencia "bueno conocido", no `637a35b`.

**Protocolo de emergencia:** ver `AGENTS.md` en la raíz del proyecto. Regla de oro: **nunca `vercel --prod` manual**, publicar solo con `git push` a `main` (Vercel git-connect activo).

**Carpeta correcta del proyecto:** `/Users/mac/Proyectos/Domis` (única con git + Vercel conectado).
**Carpetas a borrar (pendiente Ariel confirmar):** `DOMIS_WEB` y `DOMIS_WEB V2` — Vite vacíos sin git, no son la web real.

---

## DECISIÓN — RESUELTA (5-jul)

~~¿Pushear `3af72fd` a `main`?~~ Ya se pusheó, deployado y verificado con curl. Ver sección arriba.

**Pendiente real que queda:**
1. Confirmar indexación GSC post-deploy (bloqueado — no hay verificación GSC en el código, ver PENDIENTE ARIEL abajo)
2. HowTo schema en `ArticuloChecklistUsada` — nunca se implementó (ver nota arriba)

---

## INCIDENTES CERRADOS (2-3 jul 2026)

1. **Antigravity rompió footer** (2 jul) — logo PharosLab interactivo en `Footer.tsx` + `index.css`, deployado, rollback con `vercel promote` a 27-jun. Resuelto.
2. **Intento de limpieza de deuda técnica salió mal** (3 jul) — se creó rama `cleanup/tech-debt-27jun` en worktree separado para sacar Tailwind CDN "duplicado" + archivos muertos. Sacar el CDN rompió el styling completo (confirmado con screenshots) porque el build PostCSS estaba roto (ver bug arriba). Rama y worktree borrados por completo, nunca tocó `main` ni producción. Lección: el CDN no era duplicado, era el único mecanismo funcionando.
3. **pharoslab.cl caído** (2 jul, resuelto en otro chat) — 2 carpetas locales viejas deployando al mismo proyecto Vercel. Fix: rollback + `vercel git connect` en los 4 proyectos + corrección de email de commit (bloqueaba deploys en plan Hobby).

---

## PHAROSLAB — DOMIS REGISTRADO COMO CLIENTE (1 jul 2026)
- Escenario B / Plan Growth. Ficha: `/Users/mac/Agencia-PharosLab/clientes/domis/CLAUDE.md`
- Auditoría técnica: `/Users/mac/Agencia-PharosLab/clientes/domis/AUDITORIA-DOMIS.md`
- Registro proyecto: `/Users/mac/Agencia-PharosLab/proyectos/domis.md`

---

## PENDIENTE — ARIEL (no es código)
0. **`/calculator` en GSC** — tras el próximo `git push` (deploy del fix noindex), validar la corrección en Search Console (URL Inspection → Validate Fix) para que GSC deje de reportarla como 404.
1. **Google Business Profile** 🔴 CRÍTICO — no encontrado en búsqueda web. Crear en business.google.com, categoría "Agente inmobiliario"
2. **Reviews Google** 🔴 CRÍTICO — pedir a Carolina, Andrea, Felipe, Javier, Alejandro
3. **Confirmar GSC** — sin verificación visible en código, confirmar acceso
4. **LinkedIn article** — backlink desde perfil de Ariel
5. **Instagram bio** — link directo a domis.cl (no Linktree)

---

## META ADS — PENDIENTE
- Análisis performance con MCP Meta Ads
- Lanzamiento video "Alejandro C" — sin watermark CapCut, subtítulos español, 9:16

---

## REGLAS CRÍTICAS (recordatorio)
- Regla #2: Precios Fase 1 SÍ se publican (usada $1.900/m², nueva $1.800/m², S+A $2.200/m²)
- Regla #6: NUNCA publicar $400.000 fee activación
- Regla #7: NUNCA mencionar HousePricing ni Propiteq
- Regla #3: NUNCA decir "si no ahorramos no cobramos"
