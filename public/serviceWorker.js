"use strict";

const proofCacheFiles = [
  //   "client/components/AllProducts.js",
  //   "client/store/allProducts.js",
  //   "client/store/index.js",
  //   "client/App.js",
  //   "client/index.js",
  //   "client/Routes.js",
  //   "client/swRegister.js",
  //   "public/favicon.ico",
  ".",
  "index.html",
  "style.css",
  //   "script/seed.js",
  //   "server/api/index.js",
  //   "server/api/products.js",
  //   "server/api/users.js",
  //   "server/db/models/Product.js",
  //   "server/db/models/User.js",
  //   "server/db/db.js",
  //   "server/db/index.js",
  //   "server/app.js",
  //   "server/index.js",
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
