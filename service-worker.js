const CACHE_NAME = 'market-forecast-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install: Pre-cache core assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate: Delete old caches and take control immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open tabs
  );
});

// Fetch: NETWORK-FIRST strategy
// Always try network first for fresh content.
// Only fall back to cache if network fails (offline).
self.addEventListener('fetch', event => {
  // Skip non-GET requests and cross-origin API calls
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('yahoo.com') ||
      event.request.url.includes('generativelanguage.googleapis.com') ||
      event.request.url.includes('market-proxy.')) {
    return; // Let browser handle API calls normally (no caching)
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Got a valid network response — cache it for offline use
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed (offline) — serve from cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          // If navigating and nothing cached, serve index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
