---
---

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
                    "{{"" | absolute_url }}",
                    "{{"/css/style.css" | absolute_url }}",
                    "{{"/css/bootstrap.min.css" | absolute_url }}",
                    "{{"/css/responsive.css" | absolute_url }}",
                    "{{"/css/font-awesome.min.css" | absolute_url }}",
                    "{{"/css/effects/set2.css" | absolute_url }}",
                    "{{"/css/effects/normalize.css" | absolute_url }}",
                    "{{"/css/effects/component.css" | absolute_url }}",
                    "{{"/css/highlight.css" | absolute_url }}",
                    "{{"/js/jquery.min.js" | absolute_url }}",
                    "{{"/js/nav.js" | absolute_url }}",
                    "{{"/js/custom.js" | absolute_url }}",
                    "{{"/js/smoothscroll.js" | absolute_url }}",
                    "{{"/js/bootstrap.min.js" | absolute_url }}",
                    "{{"/js/effects/masonry.pkgd.min.js" | absolute_url }}",
                    "{{"/js/effects/imagesloaded.js" | absolute_url }}",
                    "{{"/js/effects/classie.js" | absolute_url }}",
                    "{{"/js/effects/AnimOnScroll.js" | absolute_url }}",
                    "{{"/js/effects/modernizr.custom.js" | absolute_url }}",
                    "{{"/js/html5shiv.js" | absolute_url }}",
                    "{{"/images/logo.png" | absolute_url }}",
                    "{{"/images/home-images/portfolio.jpg" | absolute_url }}",
                    "https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic",
                    "{{"/assets/minima-social-icons.svg" | absolute_url }}",
                    "{{"/manifest.json" | absolute_url }}",
                    "{{"/about" | absolute_url }}",
                    "{{"/blog" | absolute_url }}",
                    "{{"/contact" | absolute_url }}"
                ]
            );
        })
    );
});