---
título: Instructivo de Marketing — DOMIS™
consolidado: 4 agosto 2026
relación con otros documentos: NO reemplaza `Copy_DOMIS.md`, `Contenido_DOMIS.md`
        ni `CRM_DOMIS.md` — estos 3 siguen siendo la fuente de verdad de voz,
        marca, paleta y calificación de leads. Este documento conecta esos 3
        agentes propios con el arsenal de skills de marketing genéricos
        (Instagram, Meta Ads, Google Ads, landing pages, positioning) ya
        disponibles globalmente en Claude Code.
---

# Instructivo de Marketing — DOMIS™

## 0. Regla base — qué manda sobre qué

Los skills de este documento son **capa táctica/framework**, no reemplazan
nunca a los 3 agentes propios de DOMIS™:

- `Copy_DOMIS.md` manda en **voz, marco psicológico (Tracy/Cialdini), reglas
  de redacción** (cliente=héroe, nunca mencionar fees/precios).
- `Contenido_DOMIS.md` manda en **paleta visual** (`#0A0A0A` / `#00FFFF` /
  `#FFFFFF`), formatos y dimensiones.
- `CRM_DOMIS.md` manda en **calificación de leads** (zonas, rango UF,
  scoring, scripts de respuesta).

Un skill genérico puede sugerir estructura, ángulo o táctica de plataforma —
nunca puede pisar la voz de marca ni inventar cifras/casos que no estén
validados en `CLAUDE.md` (Carolina $141M, Andrea $68M, Felipe $39M).

---

## 1. Arsenal disponible (global, symlinked, sin instalar nada por proyecto)

Instalado y auditado con SkillSpector 4 ago 2026 desde el hub de
PharosLab — vive en `~/.claude/skills/`, disponible automáticamente en
cualquier sesión de Claude Code, incluida esta.

### Instagram
- `instagram-content-generation`, `instagram-research`
- **Uso:** research de qué formato/ángulo funciona en el nicho inmobiliario
  premium, generación de variantes de estructura de post/reel. El copy final
  y la paleta siempre pasan por `Copy_DOMIS` + `Contenido_DOMIS` antes de
  publicar.

### Meta Ads (Facebook/Instagram)
- `facebook-ads`, `meta-ad-creative-generation`
- **Uso:** estructura de campaña, segmentación de audiencia, testing
  A/B de creativos. El copy del ad sigue el framework PAS de `Copy_DOMIS`
  (Headline → Problema/Agitación/Solución → CTA).

### Google Ads — canal nuevo, no cubierto hasta ahora
- `google-ads`, `google-ads-strategy`
- **Por qué importa:** los 3 agentes propios de DOMIS™ están diseñados
  100% para Instagram/Meta. Google Ads (búsqueda) es un canal de intención
  alta sin cubrir — alguien buscando "comprar departamento Las Condes" o
  "cómo negociar precio departamento" es un lead más caliente que el
  scroll pasivo de Instagram. Recomendado evaluarlo como canal adicional
  de captación, con landing propia (ver punto siguiente).

### Landing pages
- `landing-page-design`, `landing-page-copywriter`
- **Uso:** página de aterrizaje dedicada para tráfico de Google Ads/Meta Ads
  (ej. calculadora de sobrepago estimado, o página de "Auditoría PCF-15™"
  con los 3 casos reales como prueba social). Paleta y voz de marca se
  mantienen vía `Contenido_DOMIS`/`Copy_DOMIS`, el skill aporta estructura
  de conversión (above-the-fold, CTA, prueba social).

### Posicionamiento de marca/mercado
- `brand-positioning`, `gtm-positioning-strategy`
- **Uso:** afinar el ángulo "primer Buyer's Agent Técnico de Chile" frente
  a corredores tradicionales o competidores que aparezcan — no para
  reescribir el posicionamiento ya definido en `CLAUDE.md`, sino para
  stress-testearlo si la conversión baja o entra competencia directa.

### Marketing general / soporte
- `paid-ads`, plugin completo `marketing-skills` (ads, social,
  competitor-profiling, launch, referrals, etc.)
- **Uso:** apoyo puntual, ej. `competitor-profiling` si aparece otro
  "buyer's agent" en Chile, `referrals` para el programa de referidos si se
  arma uno con clientes pasados.

### Agentes (subagent_type, para trabajo pesado/paralelo)
- Instagram Curator, Paid Social Strategist, Ad Creative Strategist,
  Social Media Strategist, Paid Media Auditor.
- **Uso:** delegar auditorías o generación masiva de variantes cuando el
  volumen lo justifique (ej. 20 variantes de ad para testing), siempre
  con el brief de marca de `Copy_DOMIS`/`Contenido_DOMIS` como input.

---

## 2. Flujo recomendado para una pieza nueva (post, ad, o landing)

1. **Brief de marca primero:** `Copy_DOMIS` (copy) + `Contenido_DOMIS`
   (visual) generan la base — voz, paleta, formato.
2. **Skill de plataforma como segunda capa** (opcional, solo si hace falta
   estructura/táctica que los agentes propios no cubren): `instagram-content-generation`,
   `landing-page-copywriter`, `google-ads-strategy`, etc.
3. **Checklist de marca antes de publicar** (de `Contenido_DOMIS`):
   fondo `#0A0A0A`, cifras en `#00FFFF`, sin stock photos genéricas, sin
   mencionar fees/precios del servicio.
4. **CRM_DOMIS sigue igual, sin cambios** — cualquier lead que entre por
   Google Ads/landing nueva se califica con el mismo sistema de scoring
   (zona + rango UF + urgencia + señales), no hace falta un CRM distinto
   por canal.

---

## 3. Qué NO hacer

- No dejar que un skill genérico invente cifras de ahorro o casos —
  solo los 3 casos reales validados (`CLAUDE.md`) o los que Ariel confirme.
- No mezclar paleta: si un skill de landing/diseño sugiere colores propios,
  se pisan con la paleta DOMIS™ siempre.
- No exponer tramos de precio ni estructura de honorarios en ningún
  formato (ad, landing, post) — regla ya definida en `CLAUDE.md`, aplica
  igual a cualquier canal nuevo.
