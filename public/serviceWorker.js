"use strict";

const proofCacheFiles = ["index.html", "style.css"];

// const cacheAssets = async () => {
//   caches.open("cache-v1").then(function (cache) {
//     return cache.addAll(proofCacheFiles);
//   });
// }

const cacheAssets = async () => {
  const cache = await caches.open("cache-v1");
  console.log("From SW: Caching app shell and content");
  await cache.addAll(proofCacheFiles);
};

//Listen to install and activate events
self.addEventListener("install", (event) => {
  console.log("From SW: Install Event", event);
  event.waitUntil(cacheAssets());
});

//Good place to clear up older versions of cache
self.addEventListener("activate", (event) => {
  console.log("From SW: Active Event", event);
  event.waitUntil(
    caches.keys().then((keyList) => {
      Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          caches.delete(key);
        })
      );
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Check cache but fall back to network
      return response || fetch(event.request);
    })
  );
});

//  (async () => {
//    const r = await caches.match(e.request);
//    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
//    if (r) {
//      return r;
//    }
//    const response = await fetch(e.request);
//    const cache = await caches.open(cacheName);
//    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//    cache.put(e.request, response.clone());
//    return response;
//  })();
