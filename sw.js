// Service Worker برای پشتیبانی آفلاین PWA برنامه دفتر
const CACHE_NAME = 'daftar-pwa-v1.4';
const ASSETS = ['./', './index.html', './css/styles.css', './js/app.js', './manifest.json'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});
