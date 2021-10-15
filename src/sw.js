var CACHE_NAME = "static-cache";
var urlsToCache = [
  ".",
  "index.html",
  "styles.css",
  "majifest.json",
  "index.js",
  "favicon.ico",
  "confetti.js",
];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
