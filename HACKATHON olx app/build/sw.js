var cacheName = 'OlxApp';
var filesToCache = [
  '/',
  './index.html',
  './pages/home.html',
  './pages/signin.html.html',
  './pages/signup.html',
  './css/style.css',
  './css/bootstrap.min.css',
  './js/auth.js',
  './js/bootstrap.min.js',
  './js/home.js',
  './js/jquery.min.js',
  './js/pr.js',  
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});