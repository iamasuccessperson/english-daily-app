// Minimal offline-support service worker for English Daily.
// Strategy: network-first for the app shell (so a new deploy is picked up
// as soon as the device is online), falling back to the cached copy when
// offline. Everything else (fonts, icons) is cache-first once fetched.
var CACHE_NAME = "english-daily-v1";
var APP_SHELL = ["/", "/index.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){ return cache.addAll(APP_SHELL); })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event){
  var req = event.request;
  if (req.method !== "GET") return;

  var isNavigation = req.mode === "navigate" || (req.destination === "document");

  if (isNavigation){
    event.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put("/index.html", copy); });
        return res;
      }).catch(function(){
        return caches.match("/index.html").then(function(cached){ return cached || caches.match(req); });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function(cached){
      if (cached) return cached;
      return fetch(req).then(function(res){
        if (res && res.status === 200 && req.url.indexOf(self.location.origin) === 0){
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
        }
        return res;
      }).catch(function(){ return cached; });
    })
  );
});
