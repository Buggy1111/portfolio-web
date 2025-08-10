// Service Worker pro PWA funkcionalita
const CACHE_NAME = 'portfolio-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/logo/logo.svg',
  '/manifest.json'
];

// CSS pro custom scrollbar v PWA
const CUSTOM_CSS = `
/* Custom Scrollbar for PWA */
::-webkit-scrollbar {
  width: 22px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #10b981, #3b82f6);
  border: 2px solid #f1f1f1;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #059669, #2563eb);
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #374151;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #10b981, #3b82f6);
    border: 2px solid #374151;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #059669, #2563eb);
  }
}
`;

// Strategie pro různé typy souborů
const CACHE_STRATEGIES = {
  images: 'cache-first',
  api: 'network-first',
  static: 'cache-first',
  dynamic: 'network-first'
};

// Instalace Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Inject custom CSS for scrollbar
        injectCustomCSS();
        return self.skipWaiting();
      })
  );
});

// Inject custom CSS pro scrollbar
function injectCustomCSS() {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'INJECT_CSS',
        css: CUSTOM_CSS
      });
    });
  });
}

// Aktivace Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Zachycení síťových požadavků
self.addEventListener('fetch', event => {
  const { request } = event;
  
  try {
    const url = new URL(request.url);

    // Ignoruj chrome-extension URLs a další non-HTTP protokoly
    if (!url.protocol.startsWith('http')) {
      return;
    }

    // Ignoruj chrome-extension URLs
    if (url.protocol === 'chrome-extension:') {
      return;
    }

    // Ignoruj development soubory - ty se transformují během buildu
    if (url.pathname.endsWith('.jsx') || url.pathname.startsWith('/src/')) {
      return;
    }

    // Strategie pro obrázky
    if (request.destination === 'image') {
      event.respondWith(cacheFirst(request));
      return;
    }

    // Strategie pro API volání
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request));
      return;
    }

    // Strategie pro statické soubory
    if (request.destination === 'script' || request.destination === 'style') {
      event.respondWith(cacheFirst(request));
      return;
    }

    // Strategie pro navigaci (HTML stránky)
    if (request.mode === 'navigate') {
      event.respondWith(
        networkFirst(request).catch(() => 
          caches.match('/index.html')
        )
      );
      return;
    }

    // Výchozí strategie
    event.respondWith(networkFirst(request));
  } catch (error) {
    console.warn('Error in fetch handler:', error);
    return;
  }
});

// Cache First strategie
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok && networkResponse.status < 400) {
      try {
        const cache = await caches.open(CACHE_NAME);
        // Only cache successful responses
        const responseToCache = networkResponse.clone();
        await cache.put(request, responseToCache);
      } catch (cacheError) {
        console.warn('Failed to cache:', request.url, cacheError);
        // Continue without caching
      }
    }
    return networkResponse;
  } catch (error) {
    console.warn('Network request failed:', request.url, error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline content not available', { status: 503 });
  }
}

// Network First strategie
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok && networkResponse.status < 400) {
      const cache = await caches.open(CACHE_NAME);
      // Only cache successful responses
      const responseToCache = networkResponse.clone();
      cache.put(request, responseToCache).catch(err => {
        console.warn('Failed to cache:', request.url, err);
      });
    }
    return networkResponse;
  } catch (error) {
    // Network failed, trying cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Content not available offline', { status: 503 });
  }
}

// Background sync pro offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    const requests = await getStoredRequests('contact-form');
    for (const request of requests) {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
    }
    await clearStoredRequests('contact-form');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Utility funkce pro IndexedDB
async function getStoredRequests() {
  // Implementace pro získání uložených požadavků
  return [];
}

async function clearStoredRequests() {
  // Implementace pro vymazání uložených požadavků
}

// Push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo/logo.svg',
      badge: '/logo/logo.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Klik na notifikaci
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
});