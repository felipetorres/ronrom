const VERSION = 'ronrom-5fa71710d1';
const FILES = ["./","./fonts/baloo2-224589.woff2","./fonts/dmmono-42078d.woff2","./fonts/dmmono-9bb717.woff2","./fonts/nunito-b8db19.woff2","./icons/apple-touch-icon.png","./icons/favicon-32.png","./icons/favicon-64.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-192.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest","./three.module.min.js"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))),
  );
});
