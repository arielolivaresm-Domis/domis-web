import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Article meta imports — these are plain TS objects, no JSX, no DOM needed
import { meta as metaInspector } from '../src/components/blog/ArticuloInspector';
import { meta as metaViciosOcultos } from '../src/components/blog/ArticuloViciosOcultos';
import { meta as metaDepartamento } from '../src/components/blog/ArticuloDepartamento';
import { meta as metaErrores } from '../src/components/blog/ArticuloErrores';
import { meta as metaFallasOcultas } from '../src/components/blog/ArticuloFallasOcultas';
import { meta as metaCamaraTermica } from '../src/components/blog/ArticuloCamaraTermica';
import { meta as metaAmpliacione } from '../src/components/blog/ArticuloAmpliacione';
import { meta as metaCuantoCuesta } from '../src/components/blog/ArticuloCuantoCuesta';
import { meta as metaNegociacion } from '../src/components/blog/ArticuloNegociacion';
import { meta as metaBuyerAgent } from '../src/components/blog/ArticuloBuyerAgent';
import { meta as metaGarantias } from '../src/components/blog/ArticuloGarantias';
import { meta as metaChecklist } from '../src/components/blog/ArticuloChecklistUsada';
import { data as dataCarolina } from '../src/components/casos/CasoCarolinaLaReina';
import { data as dataAndrea } from '../src/components/casos/CasoAndreaProvidencia';
import { data as dataFelipe } from '../src/components/casos/CasoFelipeLasCondes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// Blog article meta shape
interface BlogMeta {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
}

// Case page data shape (subset we need)
interface CaseMeta {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  schemaJson: object;
}

function buildArticleHeadTags(meta: BlogMeta): string {
  const headline = meta.title.split('|')[0].trim();
  const image = 'https://www.domis.cl/og-image.jpg';
  const dateStr = meta.datePublished ?? '2026-06-17';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${meta.url}#article`,
        headline,
        description: meta.description,
        url: meta.url,
        datePublished: dateStr,
        dateModified: dateStr,
        inLanguage: 'es-CL',
        author: { '@id': 'https://www.domis.cl/#founder' },
        publisher: { '@id': 'https://www.domis.cl/#business' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': meta.url },
        image,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.domis.cl' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.domis.cl/blog' },
          { '@type': 'ListItem', position: 3, name: headline, item: meta.url },
        ],
      },
    ],
  };

  return `<title>${meta.title}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${meta.url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(headline)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="es_CL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(headline)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildCaseHeadTags(data: CaseMeta): string {
  const caseUrl = `https://www.domis.cl/casos/${data.slug}`;
  const image = 'https://www.domis.cl/og-image.jpg';

  return `<title>${data.metaTitle}</title>
    <meta name="description" content="${esc(data.metaDescription)}" />
    <link rel="canonical" href="${caseUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(data.metaTitle)}" />
    <meta property="og:description" content="${esc(data.metaDescription)}" />
    <meta property="og:url" content="${caseUrl}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="es_CL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(data.metaTitle)}" />
    <meta name="twitter:description" content="${esc(data.metaDescription)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${JSON.stringify(data.schemaJson)}</script>`;
}

const BLOG_TITLE = 'Blog DOMIS™ — Guías técnicas para comprar propiedades en Santiago';
const BLOG_DESC = 'Guías técnicas de DOMIS™ para comprar propiedades usadas en Santiago con certeza: checklist de inspección, negociación, vicios ocultos y más.';
const BLOG_URL = 'https://www.domis.cl/blog';
const BLOG_IMAGE = 'https://www.domis.cl/og-image.jpg';

function buildBlogIndexHeadTags(): string {
  return `<title>${BLOG_TITLE}</title>
    <meta name="description" content="${esc(BLOG_DESC)}" />
    <link rel="canonical" href="${BLOG_URL}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(BLOG_TITLE)}" />
    <meta property="og:description" content="${esc(BLOG_DESC)}" />
    <meta property="og:url" content="${BLOG_URL}" />
    <meta property="og:image" content="${BLOG_IMAGE}" />
    <meta property="og:locale" content="es_CL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(BLOG_TITLE)}" />
    <meta name="twitter:description" content="${esc(BLOG_DESC)}" />
    <meta name="twitter:image" content="${BLOG_IMAGE}" />`;
}

const BUYER_TITLE_EN = "Buyer's Agent in Santiago Chile | Technical Property Inspection | DOMIS™";
const BUYER_DESC_EN = "DOMIS™ is Chile's first Technical Buyer's Agent. We inspect properties with FLIR thermal camera, DJI drone and professional tools, then negotiate the best price exclusively for you.";
const BUYER_URL = 'https://www.domis.cl/buyer-agent-chile';
const BUYER_IMAGE = 'https://www.domis.cl/og-image.jpg';

function buildBuyerAgentHeadTags(): string {
  const buyerSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': BUYER_URL,
        url: BUYER_URL,
        name: "Buyer's Agent in Santiago Chile | DOMIS™",
        description: BUYER_DESC_EN,
        inLanguage: ['es-CL', 'en'],
        isPartOf: { '@id': 'https://www.domis.cl/#website' },
        about: { '@id': 'https://www.domis.cl/#business' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'DOMIS™', item: 'https://www.domis.cl' },
          { '@type': 'ListItem', position: 2, name: "Buyer's Agent Chile", item: BUYER_URL },
        ],
      },
    ],
  };

  return `<title>${BUYER_TITLE_EN}</title>
    <meta name="description" content="${esc(BUYER_DESC_EN)}" />
    <link rel="canonical" href="${BUYER_URL}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(BUYER_TITLE_EN)}" />
    <meta property="og:description" content="${esc(BUYER_DESC_EN)}" />
    <meta property="og:url" content="${BUYER_URL}" />
    <meta property="og:image" content="${BUYER_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(BUYER_TITLE_EN)}" />
    <meta name="twitter:description" content="${esc(BUYER_DESC_EN)}" />
    <meta name="twitter:image" content="${BUYER_IMAGE}" />
    <script type="application/ld+json">${JSON.stringify(buyerSchema)}</script>`;
}

function esc(str: string): string {
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

interface RouteEntry {
  path: string;
  headTags: string;
}

const ROUTES: RouteEntry[] = [
  { path: '/blog', headTags: buildBlogIndexHeadTags() },
  { path: '/blog/inspector-de-propiedades-santiago', headTags: buildArticleHeadTags(metaInspector) },
  { path: '/blog/vicios-ocultos-propiedad-chile', headTags: buildArticleHeadTags(metaViciosOcultos) },
  { path: '/blog/como-inspeccionar-departamento-antes-de-comprar-santiago', headTags: buildArticleHeadTags(metaDepartamento) },
  { path: '/blog/errores-comprar-propiedad-usada-santiago', headTags: buildArticleHeadTags(metaErrores) },
  { path: '/blog/fallas-ocultas-casas-usadas-santiago', headTags: buildArticleHeadTags(metaFallasOcultas) },
  { path: '/blog/camara-termica-inspeccion-inmobiliaria', headTags: buildArticleHeadTags(metaCamaraTermica) },
  { path: '/blog/ampliaciones-sin-permiso-chile', headTags: buildArticleHeadTags(metaAmpliacione) },
  { path: '/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago', headTags: buildArticleHeadTags(metaCuantoCuesta) },
  { path: '/blog/como-negociar-precio-propiedad-usada-santiago', headTags: buildArticleHeadTags(metaNegociacion) },
  { path: '/blog/buyer-agent-chile', headTags: buildArticleHeadTags(metaBuyerAgent) },
  { path: '/blog/garantia-propiedades-nuevas-chile', headTags: buildArticleHeadTags(metaGarantias) },
  { path: '/blog/que-revisar-al-comprar-propiedad-usada-santiago', headTags: buildArticleHeadTags(metaChecklist) },
  { path: '/buyer-agent-chile', headTags: buildBuyerAgentHeadTags() },
  { path: '/casos/carolina-la-reina', headTags: buildCaseHeadTags(dataCarolina) },
  { path: '/casos/andrea-providencia', headTags: buildCaseHeadTags(dataAndrea) },
  { path: '/casos/felipe-las-condes', headTags: buildCaseHeadTags(dataFelipe) },
];

// Strip the static title/meta/canonical/og/twitter from index.html template
// (Helmet handles them client-side; static HTML injects correct ones per route)
function stripStaticHeadMeta(html: string): string {
  return html
    .replace(/<title>[^<]*<\/title>\n?/g, '')
    .replace(/<meta name="description"[^>]*>\n?/g, '')
    .replace(/<link rel="canonical"[^>]*>\n?/g, '')
    .replace(/<meta property="og:[^>]*>\n?/g, '')
    .replace(/<meta name="twitter:[^>]*>\n?/g, '');
}

function main() {
  const templateRaw = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const template = stripStaticHeadMeta(templateRaw);

  let ok = 0;
  for (const { path: route, headTags } of ROUTES) {
    try {
      const html = template.replace('</head>', `    ${headTags}\n  </head>`);
      const outDir = path.join(distDir, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);
      console.log(`✓ ${route}`);
      ok++;
    } catch (err: unknown) {
      console.error(`✗ ${route}:`, (err as Error).message);
    }
  }

  console.log(`\nPrerender: ${ok}/${ROUTES.length} routes`);
  if (ok < ROUTES.length) process.exit(1);
}

main();
