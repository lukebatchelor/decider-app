var CACHE_NAME = "static-cache";
var urlsToCache = [
  ".",
  "index.html",
  "styles.css",
  "manifest.json",
  "index.js",
  "favicon.ico",
  "confetti.js",
];
self.addEventListener("install", function (event) {
  console.log("here");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", () => console.log("fetch"));
