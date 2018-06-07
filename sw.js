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
                    "http://localhost:4000",
                    "http://localhost:4000/css/style.css",
                    "http://localhost:4000/css/bootstrap.min.css",
                    "http://localhost:4000/css/responsive.css",
                    "http://localhost:4000/css/font-awesome.min.css",
                    "http://localhost:4000/css/effects/set2.css",
                    "http://localhost:4000/css/effects/normalize.css",
                    "http://localhost:4000/css/effects/component.css",
                    "http://localhost:4000/css/highlight.css",
                    "http://localhost:4000/js/jquery.min.js",
                    "http://localhost:4000/js/nav.js",
                    "http://localhost:4000/js/custom.js",
                    "http://localhost:4000/js/smoothscroll.js",
                    "http://localhost:4000/js/bootstrap.min.js",
                    "http://localhost:4000/js/effects/masonry.pkgd.min.js",
                    "http://localhost:4000/js/effects/imagesloaded.js",
                    "http://localhost:4000/js/effects/classie.js",
                    "http://localhost:4000/js/effects/AnimOnScroll.js",
                    "http://localhost:4000/js/effects/modernizr.custom.js",
                    "http://localhost:4000/js/html5shiv.js",
                    "http://localhost:4000/images/logo.png",
                    "http://localhost:4000/images/home-images/portfolio.jpg",
                    "https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic",
                    "http://localhost:4000/assets/minima-social-icons.svg",
                    "http://localhost:4000/manifest.json",
                    "http://localhost:4000/about",
                    "http://localhost:4000/blog",
                    "http://localhost:4000/contact"
                ]
            );
        })
    );
});