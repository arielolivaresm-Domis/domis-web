import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AddressInfo } from 'node:net';
import type { Browser } from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const shellPath = path.join(distDir, 'index.html');

if (!fs.existsSync(shellPath)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

// Routes to prerender, mapped to their output file relative to dist/.
// `/pcf-15tm` (client portal) is intentionally excluded — disallowed in
// robots.txt, not meant to be indexed or cited.
const ROUTES: { route: string; out: string }[] = [
  { route: '/', out: 'index.html' },
  { route: '/buyer-agent-chile', out: 'buyer-agent-chile/index.html' },
  { route: '/casos/carolina-la-reina', out: 'casos/carolina-la-reina/index.html' },
  { route: '/casos/andrea-providencia', out: 'casos/andrea-providencia/index.html' },
  { route: '/casos/felipe-las-condes', out: 'casos/felipe-las-condes/index.html' },
  { route: '/blog', out: 'blog/index.html' },
  { route: '/blog/que-revisar-al-comprar-propiedad-usada-santiago', out: 'blog/que-revisar-al-comprar-propiedad-usada-santiago/index.html' },
  { route: '/blog/garantia-propiedades-nuevas-chile', out: 'blog/garantia-propiedades-nuevas-chile/index.html' },
  { route: '/blog/buyer-agent-chile', out: 'blog/buyer-agent-chile/index.html' },
  { route: '/blog/como-negociar-precio-propiedad-usada-santiago', out: 'blog/como-negociar-precio-propiedad-usada-santiago/index.html' },
  { route: '/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago', out: 'blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago/index.html' },
  { route: '/blog/fallas-ocultas-casas-usadas-santiago', out: 'blog/fallas-ocultas-casas-usadas-santiago/index.html' },
  { route: '/blog/ampliaciones-sin-permiso-chile', out: 'blog/ampliaciones-sin-permiso-chile/index.html' },
  { route: '/blog/camara-termica-inspeccion-inmobiliaria', out: 'blog/camara-termica-inspeccion-inmobiliaria/index.html' },
  { route: '/blog/errores-comprar-propiedad-usada-santiago', out: 'blog/errores-comprar-propiedad-usada-santiago/index.html' },
  { route: '/blog/inspector-de-propiedades-santiago', out: 'blog/inspector-de-propiedades-santiago/index.html' },
  { route: '/blog/vicios-ocultos-propiedad-chile', out: 'blog/vicios-ocultos-propiedad-chile/index.html' },
  { route: '/blog/como-inspeccionar-departamento-antes-de-comprar-santiago', out: 'blog/como-inspeccionar-departamento-antes-de-comprar-santiago/index.html' },
];

// HowTo schema for these two articles has no client-side source (no Helmet,
// no useEffect) — ArticuloNegociacion.tsx and ArticuloDepartamento.tsx say so
// explicitly in their own header comments. It only ever existed as a static
// injection in this script, so a real-browser capture alone would silently
// drop it. Injected into the captured HTML below, keyed by route.
interface HowToSchema {
  name: string;
  description: string;
  step: { '@type': 'HowToStep'; position: number; name: string; text: string }[];
}

const HOWTO_BY_ROUTE: Record<string, { url: string; howTo: HowToSchema }> = {
  '/blog/como-inspeccionar-departamento-antes-de-comprar-santiago': {
    url: 'https://www.domis.cl/blog/como-inspeccionar-departamento-antes-de-comprar-santiago',
    howTo: {
      name: 'Cómo inspeccionar un departamento antes de comprarlo en Santiago',
      description: 'Proceso técnico paso a paso para inspeccionar un departamento usado en Santiago antes de firmar la promesa.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Solicita documentación legal antes de la visita', text: 'Pide escritura, certificado de dominio CBR, planos DOM aprobados, certificado de recepción final, certificado de no deuda de gastos comunes y avalúo fiscal SII.' },
        { '@type': 'HowToStep', position: 2, name: 'Mide la superficie real con medidor láser', text: 'Compara los metros medidos físicamente contra lo declarado en escritura y avalúo SII. Logias o terrazas cerradas sin permiso inflan la superficie declarada sin existir legalmente.' },
        { '@type': 'HowToStep', position: 3, name: 'Inspecciona con cámara térmica FLIR', text: 'La cámara térmica detecta humedad oculta en muros y techo aunque la superficie parezca seca. Imprescindible para filtración desde el piso superior.' },
        { '@type': 'HowToStep', position: 4, name: 'Revisa instalaciones eléctricas y tablero del edificio', text: 'Verifica el tablero interior del departamento y el tablero del edificio. Un departamento con instalación correcta puede tener problemas si el tablero del edificio está subdimensionado.' },
        { '@type': 'HowToStep', position: 5, name: 'Verifica niveles y fisuras con nivelador láser Bosch', text: 'Detecta hundimientos, desplomes o fisuras estructurales no visibles a simple vista. El nivelador Bosch confirma si hay movimiento diferencial en la losa.' },
      ],
    },
  },
  '/blog/como-negociar-precio-propiedad-usada-santiago': {
    url: 'https://www.domis.cl/blog/como-negociar-precio-propiedad-usada-santiago',
    howTo: {
      name: 'Cómo negociar el precio de una propiedad usada en Santiago',
      description: 'Proceso paso a paso para negociar con evidencia técnica documentada antes de firmar la promesa.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Auditoría técnica antes de cualquier oferta', text: 'Contrata una inspección técnica PCF-15™ antes de negociar. Sin evidencia técnica, cualquier rebaja es especulación.' },
        { '@type': 'HowToStep', position: 2, name: 'Valoriza cada hallazgo en UF', text: 'Cada falla detectada se valoriza según costo real de reparación. Convierte problemas en argumentos con cifras concretas que el vendedor no puede refutar.' },
        { '@type': 'HowToStep', position: 3, name: 'Cruza con tasación de mercado', text: 'Compara el precio publicado contra avalúo fiscal, datos catastrales y operaciones cerradas reales en la zona. Identifica la brecha entre precio pedido y valor de mercado.' },
        { '@type': 'HowToStep', position: 4, name: 'Define 3 escenarios de negociación', text: 'Prepara oferta agresiva, moderada y conservadora. Nunca entres con una sola cifra — la contraparte siempre tiene margen de respuesta.' },
        { '@type': 'HowToStep', position: 5, name: 'Presenta el informe antes de la promesa', text: 'Entrega el informe técnico firmado por Constructor Civil antes de firmar. Tiene peso legal y comercial que una opinión verbal no puede refutar.' },
      ],
    },
  },
};

function injectHowTo(html: string, route: string): string {
  const entry = HOWTO_BY_ROUTE[route];
  if (!entry) return html;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${entry.url}#howto`,
    ...entry.howTo,
  };
  const tag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  return html.replace('</head>', `${tag}</head>`);
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
};

// Home ('/') has no <Helmet> (LandingPage in App.tsx sets nothing dynamic) —
// its title/meta/canonical/OG/Twitter are hardcoded in the source index.html
// and must be served as-is. Every other route (blog articles, blog index,
// casos, buyer-agent) DOES render a <Helmet> with its own title/meta/OG/
// Twitter tags client-side — serving them the raw shell would leave the
// static home tags in place *alongside* Helmet's, producing duplicate
// <title>/<meta> elements in the captured HTML. So non-home routes get the
// shell with those static tags stripped first, letting Helmet be the only
// source. The site-wide JSON-LD graph (LocalBusiness/FAQ/Reviews/Person) is
// intentionally left in place on every route — Helmet only adds an
// additional Article/BreadcrumbList script, it doesn't conflict with it.
function stripStaticHeadMeta(html: string): string {
  return html
    .replace(/<title>[^<]*<\/title>\n?/g, '')
    .replace(/<meta name="description"[^>]*>\n?/g, '')
    .replace(/<link rel="canonical"[^>]*>\n?/g, '')
    .replace(/<meta property="og:[^>]*>\n?/g, '')
    .replace(/<meta name="twitter:[^>]*>\n?/g, '');
}

// The pristine build shell, served for every route so the SPA can boot and
// render client-side before we capture and persist its output. Cached up
// front so overwriting dist/index.html mid-run doesn't affect later routes.
const shellHtml = fs.readFileSync(shellPath, 'utf-8');
const strippedShellHtml = stripStaticHeadMeta(shellHtml);

function startServer(): Promise<http.Server> {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    const ext = path.extname(pathname);
    const filePath = path.join(distDir, pathname);

    if (ext && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(pathname === '/' ? shellHtml : strippedShellHtml);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function prerenderRoute(browser: Browser, baseUrl: string, route: string): Promise<string> {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.url().startsWith(baseUrl)) {
      req.continue();
    } else {
      req.abort();
    }
  });

  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('h1', { timeout: 10000 });
  // Let mount-triggered animations settle so we capture final content
  // instead of a mid-transition frame.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const html = await page.content();
  await page.close();
  return html;
}

// Vercel's build environment (Amazon Linux) is missing shared libraries
// (libnspr4.so etc.) that full `puppeteer`'s bundled Chrome needs — it only
// works there via `puppeteer-core` + `@sparticuz/chromium`, a Chromium build
// packaged with those libraries for serverless/Lambda-style environments.
// Locally (macOS/dev), plain `puppeteer` still works fine, so branch on
// `process.env.VERCEL`, which Vercel sets automatically during builds.
async function getBrowser(): Promise<Browser> {
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = (await import('puppeteer-core')).default;
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    }) as unknown as Browser;
  }
  const puppeteer = (await import('puppeteer')).default;
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function main() {
  const server = await startServer();
  const { port } = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await getBrowser();

  const results: { out: string; html: string }[] = [];
  try {
    for (const { route, out } of ROUTES) {
      process.stdout.write(`[prerender] rendering ${route} ... `);
      const html = injectHowTo(await prerenderRoute(browser, baseUrl, route), route);
      results.push({ out, html });
      console.log(`${html.length} bytes`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  for (const { out, html } of results) {
    const outPath = path.join(distDir, out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
  }

  console.log(`[prerender] wrote ${results.length} prerendered pages to dist/.`);
  if (results.length < ROUTES.length) process.exit(1);
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
