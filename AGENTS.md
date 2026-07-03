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
