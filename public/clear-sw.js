// Skript pro vyčištění Service Worker cache
// Spusť v Developer Tools -> Console

(async function clearServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
      await registration.unregister();
      console.log('Service Worker unregistered:', registration.scope);
    }
  }

  // Vyčisti všechny cache
  const cacheNames = await caches.keys();
  for (let cacheName of cacheNames) {
    await caches.delete(cacheName);
    console.log('Cache deleted:', cacheName);
  }

  console.log('✅ Service Worker a cache vyčištěny. Obnov stránku.');
})();