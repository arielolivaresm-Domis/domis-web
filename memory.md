# DOMIS™ — MEMORY.MD
## Estado actual del proyecto · Actualizado: 27 junio 2026

---

## ESTADO WEB (domis.cl)

**Último commit:** `637a35b` — AEO/SEO knowsAbout + HowTo + FAQPage bilingüe
**Deploy:** Live en Vercel ✅

### Implementado (completo)
- Schema JSON-LD: LocalBusiness + RealEstateAgent + ProfessionalService + FAQPage + WebSite + Person
- alternateName + disambiguatingDescription + knowsAbout (11 temas)
- Meta tags (title, description, OG, canonical)
- GA4 (G-T7YTDDXRVB) + Microsoft Clarity (vgpwn25857)
- Meta Pixel (2021341692090214) — PageView + Lead (WA global) + ViewContent (blog)
- src/utils/pixel.ts — helpers trackLead / trackViewContent / trackContact
- 12 artículos blog con Article + BreadcrumbList + FAQPage schema individual
- HowTo schema: ArticuloNegociacion + ArticuloDepartamento
- FAQPage bilingüe en /buyer-agent-chile (10 preguntas ES+EN)
- Sitemap 18 URLs enviado a GSC ✅
- GSC verificado + artículos indexados manualmente ✅

---

## PENDIENTE — PRÓXIMA SESIÓN

### Ariel debe hacer (no es código):
1. **Google Business Profile** 🔴 PRIORIDAD MÁXIMA
   - business.google.com → "Administrar perfil"
   - Categoría: "Agente inmobiliario" + subcategoría "Servicio de inspección de edificios"
   - Descripción: *"DOMIS™ es el primer Buyer's Agent Técnico de Chile. Auditamos propiedades usadas con cámara térmica FLIR, dron DJI e instrumentos profesionales antes de la compra, y negociamos el mejor precio exclusivamente a favor del comprador."*
   - Subir: logo + foto fachada o instrumento en uso
   - Agregar servicios: Auditoría Técnica PCF-15™ / Negociación Estratégica / Sourcing

2. **Reviews Google** 🔴 PRIORIDAD MÁXIMA
   - Pedirle a Carolina, Andrea, Felipe, Javier y Alejandro que dejen review en GBP
   - 5 reviews reales = señal fuerte para Google + AI engines (ChatGPT/Gemini tiran de GBP)

3. **LinkedIn article**
   - Ariel publica artículo como Constructor Civil mencionando domis.cl
   - Un backlink real vale más que 20 artículos propios

4. **Instagram bio**
   - Link directo a domis.cl (no Linktree)

### Cuando GBP tenga reviews → código pendiente:
- Actualizar `aggregateRating.reviewCount` en index.html con número real

### Código pendiente (baja prioridad):
- Artículo tasación: `/blog/tasacion-banco-menor-precio-compra-que-hacer`
  → NO mencionar HousePricing ni Propiteq (Regla #7)
- CAPI Meta server-side (requiere backend/función Vercel)

---

## META ADS — PENDIENTE
- Análisis performance con MCP Meta Ads
- Lanzamiento video "Alejandro C" (martes)
- Requerimientos video: sin watermark CapCut, subtítulos español, formato 9:16

---

## PHAROSLAB — CREADO ESTA SESIÓN
- Hub central: `/Users/mac/Agencia-PharosLab/`
- Archivos globales: PLAYBOOK-WEB-MAESTRO.md + INFORME-POSICIONAMIENTO-DOMIS.md + CLAUDE-PROYECTO-TEMPLATE.md
- Dr. Rodrigo Olivares M. → `/Users/mac/Dr Rodrigo Olivares M/SEO-AEO-PLAYBOOK.md` listo para ejecutar

---

## REGLAS CRÍTICAS (recordatorio)
- Regla #2: Precios Fase 1 SÍ se publican (usada $1.900/m², nueva $1.800/m², S+A $2.200/m²)
- Regla #6: NUNCA publicar $400.000 fee activación
- Regla #7: NUNCA mencionar HousePricing ni Propiteq
- Regla #3: NUNCA decir "si no ahorramos no cobramos"
