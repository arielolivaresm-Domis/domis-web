# GEO Audit Report: DOMIS™ Property Audit

**Audit Date:** 5 julio 2026
**URL:** https://domis.cl
**Business Type:** Local Business (Agencia/Servicios técnicos inmobiliarios)
**Pages Analizadas:** Home + muestra de 2 artículos blog (verificación técnica dirigida, no crawl completo de 50 páginas)
**Método:** curl directo sobre HTML crudo (sin JS) — simula exactamente lo que ve un crawler de IA sin renderizado (GPTBot, ClaudeBot, PerplexityBot no ejecutan JS).

---

## Resumen Ejecutivo

**Hallazgo crítico:** el sitio tiene schema JSON-LD excelente (LocalBusiness + FAQPage + Article + Review + Person, nivel muy por sobre competencia) y metadatos únicos por página (title/description correctos por artículo). Pero el **contenido de texto real de los artículos de blog no existe en el HTML crudo** — todo se renderiza client-side y el fallback estático es un bloque genérico de 378 palabras (contenido de home) idéntico en TODAS las rutas, incluido cada artículo del blog.

Esto contradice el Estándar Técnico propio (`informes/CLAUDE.md`, sección prerender) que exige HTML real por ruta vía Puppeteer postbuild — el prerender de contenido visible no está funcionando en producción, aunque el prerender de meta/schema sí.

**Impacto GEO:** un crawler de IA que lee `/blog/vicios-ocultos-propiedad-chile` recibe title y schema correctos para ESE artículo, pero el cuerpo del texto que debería citar es el blurb genérico de home — no el contenido real sobre vicios ocultos, plazos legales (art. 1860 Código Civil), etc. **AI Citability (25% del score, la categoría de mayor peso) queda severamente golpeada.**

### Score estimado (parcial — categorías verificadas directamente)

| Categoría | Score | Peso | Nota |
|---|---|---|---|
| AI Citability | 25/100 | 25% | Meta/schema OK, pero cuerpo de texto real ausente en crawl sin JS |
| Schema & Structured Data | 92/100 | 10% | Excelente — LocalBusiness+FAQ+Article+Review+Person, mejor que estándar de mercado |
| Technical GEO | 55/100 | 15% | robots.txt permisivo (bien), pero llms.txt falso-positivo (ver crítico) |
| Brand Authority | — | 20% | No verificado en esta pasada (requiere scan Reddit/Wikipedia/YouTube — pendiente) |
| Content E-E-A-T | — | 20% | No verificado en esta pasada (requiere lectura completa de artículos) |
| Platform Optimization | — | 10% | No verificado en esta pasada |

*Score compuesto no calculado — faltan 3 categorías por corrida completa. Esta fue una verificación técnica dirigida, no el audit paralelo de 5 subagentes.*

---

## Hallazgos Críticos (arreglar ya)

### 1. Contenido de blog invisible para crawlers sin JS
- **Qué pasa:** `<div id="root"></div>` llega vacío en TODO el HTML crudo (home y blog por igual). El único texto presente es un `<section aria-hidden="true">` con estilo `clip:rect(0,0,0,0)` — visualmente oculto a usuarios reales Y marcado `aria-hidden="true"` (oculto también a lectores de pantalla).
- **Contenido de ese bloque:** genérico de home (casos de ahorro, 3 fases de servicio) — **idéntico en `/blog/vicios-ocultos-propiedad-chile` que en `/`**. El artículo real (que sí tiene title/meta/schema Article únicos) no aporta ni una palabra de su propio texto al HTML crudo.
- **Por qué importa:** contradice el Estándar Técnico propio (`informes/CLAUDE.md` línea ~477-491) que exige prerender real por ruta via Puppeteer. El prerender parece estar generando solo el `<head>` (meta+schema) por ruta, no el body visible — o el postbuild no está corriendo como se documentó.
- **Fix:** revisar `scripts/prerender.js` en el repo Domis — confirmar que genera HTML de body real por ruta (no solo head), y que el bloque `aria-hidden` no reemplaza al contenido real renderizado. Referencia de patrón correcto: `hogar-senior-web/scripts/prerender.js` (mencionado en CLAUDE.md como el que sí funciona).

### 2. llms.txt es un falso positivo
- **Qué pasa:** `https://domis.cl/llms.txt` devuelve HTTP 200 — pero el contenido es el HTML completo de la home (fallback SPA de Vercel a `index.html` para cualquier ruta no encontrada), no un archivo `llms.txt` real.
- **Por qué importa:** cualquier check automatizado que solo mire el status code (200 = "existe") lo marca como presente cuando en realidad no existe. Un crawler de IA que lo lea recibe HTML donde esperaba texto plano estructurado — inútil.
- **Fix:** crear `public/llms.txt` real (texto plano, formato estándar: nombre, descripción, links a secciones clave) para que el build lo sirva como archivo estático, no como fallback de rutas.

---

## Hallazgos Altos

### 3. robots.txt sin directivas explícitas para crawlers de IA
- Actual: `User-agent: *` / `Allow: /` — permisivo por default, ningún bot de IA bloqueado. Correcto, pero no hay reglas explícitas nombrando GPTBot/ClaudeBot/PerplexityBot/Google-Extended — no es obligatorio (el wildcard ya los cubre) pero dejarlo explícito documenta intención y facilita auditoría futura.
- Fix (opcional, bajo esfuerzo): agregar bloques explícitos `User-agent: GPTBot` / `Allow: /` etc. — cosmético pero clarifica ante cualquier auditor externo (incluido este mismo skill en próximas corridas) que la política es deliberada.

---

## Lo que SÍ está bien (no tocar)

- Schema JSON-LD multinivel — LocalBusiness+RealEstateAgent+ProfessionalService, FAQPage con 12 preguntas reales, Review, Person (founder con credenciales), ItemList de casos con montos — nivel muy superior a competencia local (BigBuda et al no llegan a esto).
- Meta tags únicos por artículo (title, description, OG, Twitter Card) — SÍ se generan correctamente por ruta.
- Sitemap.xml correcto, apunta a `www.domis.cl`, 11 URLs de blog con lastmod real.
- robots.txt no bloquea nada — política permisiva correcta para GEO.

---

## Plan de acción inmediato

1. **Esta semana:** revisar y arreglar `scripts/prerender.js` en repo Domis — confirmar que el body HTML real (no solo head) se genera por ruta. Esto es el fix de mayor impacto — sube Citability de ~25 a potencialmente 80+.
2. **Esta semana:** crear `public/llms.txt` real.
3. **Cuando haya tiempo:** completar categorías no verificadas (Brand Authority, E-E-A-T, Platform Optimization) con corrida completa `/geo audit` para score compuesto real.

---

## Nota metodológica

Esta corrida usó `curl` directo en vez de las 5 subagentes paralelas que define el skill completo (`geo-audit`) — priorizó velocidad y verificación de lo más crítico (lo que un crawler real de IA ve) sobre cobertura completa. Para reporte cliente-ready con las 6 categorías con score, correr `/geo audit https://domis.cl` completo (usa WebFetch + subagentes, más lento pero completo) o `/geo report` para el entregable formateado final.
