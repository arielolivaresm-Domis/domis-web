const CACHE_NAME = 'pcf15-domis-v1';

// URLs externas que NO se cachean (requieren red)
const SKIP_CACHE = [
  'googleapis.com',
  'maps.googleapis.com',
  'generativelanguage.googleapis.com',
  'googletagmanager.com',
  'clarity.ms',
  'mindicador.cl',
  'esm.sh'
];

// Assets del app shell que se pre-cachean
const APP_SHELL = [
  '/',
  '/pcf-15tm',
  '/index.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL).catch(() => {
        // Si falla alguno, no bloqueamos la instalación
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // No cachear: requests externos (Google, CDN APIs, etc.)
  if (SKIP_CACHE.some((domain) => url.hostname.includes(domain))) {
    return; // Deja que el navegador maneje normalmente (falla si offline)
  }

  // No cachear: métodos que no sean GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Navegación (HTML): Network-first con fallback a cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // Assets estáticos (JS, CSS, imágenes): Cache-first con fallback a red
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
