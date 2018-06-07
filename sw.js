var DYNAMIC_CACHE = 'dynamic-cache-v1';
var STATIC_CACHE = 'static-cache-v1'

// listen for outgoing network request
self.addEventListener('fetch', function (event) {
    // try to find response object in the cache
    // associated with current request
    event.respondWith(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                if (response) return response;

                return fetch(event.request).then(function (networkResponse) {
                    if (!networkResponse || (networkResponse.status !== 200 && !networkResponse.ok)) {
                        return caches.open(DYNAMIC_CACHE).then(function (dynCache) {
                            return dynCache.match(event.request);
                        }).then(function (dynResponse) {
                            if (dynResponse) return dynResponse;
                            else return networkResponse;
                        });
                    }
                    var cachedResponse = networkResponse.clone();
                    caches.open(DYNAMIC_CACHE).then(function (dynCache) {
                        dynCache.put(event.request, cachedResponse);
                    });
                    return networkResponse;
                });
            });
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('service worker activate');
});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.addAll(
                [
                    ".",
                    "./css/style.css",
                    "./css/bootstrap.min.css",
                    "./css/responsive.css",
                    "./css/font-awesome.min.css",
                    "./css/effects/set2.css",
                    "./css/effects/normalize.css",
                    "./css/effects/component.css",
                    "./css/highlight.css",
                    "./js/jquery.min.js",
                    "./js/nav.js",
                    "./js/custom.js",
                    "./js/smoothscroll.js",
                    "./js/bootstrap.min.js",
                    "./js/effects/masonry.pkgd.min.js",
                    "./js/effects/imagesloaded.js",
                    "./js/effects/classie.js",
                    "./js/effects/AnimOnScroll.js",
                    "./js/effects/modernizr.custom.js",
                    "./js/html5shiv.js",
                    "./images/logo.png",
                    "./images/home-images/portfolio.jpg",
                    "https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic",
                    "./assets/minima-social-icons.svg",
                    "./manifest.json",
                    "./about",
                    "./blog",
                    "./contact"
                ]
            );
        })
    );
});