# DOMIS™ — MEMORY.MD
## Estado actual del proyecto · Actualizado: 3 julio 2026

---

## ESTADO WEB (domis.cl) — AHORA MISMO

**Producción (domis.cl):** deploy del 27-jun (commit `637a35b`), promovido manualmente vía `vercel promote`. Funciona bien, verificado visualmente contra local.
**`main` local:** commit `3af72fd` — incluye todo el trabajo SEO/prerender del 1-jul (`b35aa8b`) + fix crítico de Tailwind. **Verificado con build+tsc+visual, pero AÚN NO pusheado a GitHub/producción.**

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
| `punto-0-live-27jun` | `637a35b` | Lo que está online AHORA en domis.cl | `vercel promote mi-proyecto-web-v2-gwg3m2c4j-ariel-oms-projects.vercel.app --scope ariel-oms-projects` |
| `punto-1-fix-tailwind-2jul` | `3af72fd` | Fix Tailwind + todo el trabajo SEO 1-jul. Verificado local, sin pushear | `git reset --hard punto-1-fix-tailwind-2jul` + `git push` |

(El tag viejo `punto-0-git-2jul` se borró — quedaba redundante/con protocolo desactualizado.)

**Protocolo de emergencia:** ver `AGENTS.md` en la raíz del proyecto. Regla de oro: **nunca `vercel --prod` manual**, publicar solo con `git push` a `main` (Vercel git-connect activo).

**Carpeta correcta del proyecto:** `/Users/mac/Proyectos/Domis` (única con git + Vercel conectado).
**Carpetas a borrar (pendiente Ariel confirmar):** `DOMIS_WEB` y `DOMIS_WEB V2` — Vite vacíos sin git, no son la web real.

---

## DECISIÓN PENDIENTE — PRÓXIMA SESIÓN

**¿Pushear `3af72fd` a `main`?** Esto dispara auto-deploy en Vercel y CAMBIA domis.cl (pasa del 27-jun al estado con SEO/prerender + fix). Ya está todo verificado (build, tsc, visual idéntico). Es decisión de Ariel, no técnica — falta solo el "dale, sube".

Si se pushea, después:
1. Verificar con curl que domis.cl sirve el prerender correcto por ruta
2. Confirmar GSC indexación post-deploy
3. HowTo schema en 3 artículos (ArticuloNegociacion, ArticuloDepartamento, ArticuloChecklistUsada) — sigue pendiente, nunca se hizo

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
