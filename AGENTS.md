# Reglas de este proyecto (domis.cl)

## Prohibido
- **NUNCA** correr `vercel --prod` o `vercel deploy --prod` manualmente desde esta carpeta.
  Publica a domis.cl al instante, sin revisión.
- No hacer `vercel link` a otro proyecto, ni tocar `.vercel/project.json`.

## Cómo probar cambios
- Correr local: `npm run dev` (o el script equivalente) — no toca producción.
- Si querés una URL real de preview: `vercel deploy` (SIN `--prod`).

## Cómo publicar a producción (el único método permitido)
1. Commit en rama `main`.
2. `git push`.
3. Vercel deploya automático a domis.cl.

## Info del proyecto
- Repo: github.com/arielolivaresm-Domis/domis-web
- Rama de producción: `main`
- Dominio: domis.cl
- Proyecto Vercel: `mi-proyecto-web-v2` (org: ariel-oms-projects)

## Protocolo de emergencia (si algo rompe producción)
**Opción A — vos mismo, sin código, en 1 minuto:**
1. vercel.com/dashboard → proyecto `mi-proyecto-web-v2` → tab **Deployments**
2. Buscá el último deploy **Ready** de ANTES de que empezara el problema
3. Click **⋯** al lado de ese deploy → **Promote to Production**
4. Confirmá — el sitio vuelve al instante, sin rebuild ni espera

**Opción B — pedirle a un agente (Claude, etc.):**
"Volvé domis.cl a como estaba antes de [hora/evento]" — el agente revisa
`vercel ls mi-proyecto-web-v2` y promueve el deploy correcto.

**Nunca** intentar arreglar en caliente editando código directo en producción.
Primero rollback, después se investiga con calma en local.
