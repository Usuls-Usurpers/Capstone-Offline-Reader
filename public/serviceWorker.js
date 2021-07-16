"use strict";

const proofCacheFiles = [
  //   "client/swRegister.js",
  //   "public/favicon.ico",
  ".",
  "index.html",
  "style.css",
];

function cacheAssets() {
  caches.open("cache-v1").then(function (cache) {
    //caches.open returns a promise that will resolve to a cache
    return cache.addAll(proofCacheFiles);
  });
}

//Listen to install and activate events
self.addEventListener("install", (event) => {
  console.log("From SW: Install Event", event);
  event.waitUntil(cacheAssets());
});

//Good place to clear up older versions of cache
// just before a new service worker is activated
self.addEventListener("activate", (event) => {
  console.log("From SW: Active Event", event);
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Check cache but fall back to network
      return response || fetch(event.request);
    })
  );
});
