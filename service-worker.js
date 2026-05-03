// service-worker.js
// Версія кешу змінена, щоб браузер підтягнув оновлені файли.

const CACHE_NAME = 'police-v3-final-2026-05-03';

const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './scripts/app.js',
  './scripts/theory.js',
  './scripts/simulator.js',
  './scripts/exam.js',
  './scripts/homework.js',
  './scripts/pwa.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.warn('Cache install error:', error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone).catch(() => {});
        });

        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
