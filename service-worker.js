const CACHE_NAME = 'police-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts/app.js',
  '/scripts/theory.js',
  '/scripts/simulator.js',
  '/scripts/exam.js',
  '/scripts/homework.js',
  '/scripts/pwa.js'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
