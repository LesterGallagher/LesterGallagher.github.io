---
---

var DYNAMIC_CACHE = 'dynamic-cache-v2';
var STATIC_CACHE = 'static-cache-v2'

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
    var cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.addAll(
                [
                    "{{ "/" | absolute_url }}",
                    "{{ "/assets/css/main.css" | absolute_url }}",
                    "{{ "/assets/css/critical.css" | absolute_url }}",
                    "{{ "/assets/img/logo.png" | absolute_url }}",
                    "https://cdn.polyfill.io/v2/polyfill.min.js",
                    "{{ "/assets/js/main.js" | absolute_url }}",
                    "{{ "/assets/minima-social-icons.svg" | absolute_url }}",
                    "{{ "/assets/img/home-images/portfolio.jpg" | absolute_url }}",
                    "{{ "/uploads/my_logo_512.png" | absolute_url }}",
                    "{{ "/about/" | absolute_url }}",
                    "{{ "/blog/" | absolute_url }}",
                    "{{ "/contact/" | absolute_url }}"
                ]
            );
        })
    );
});
