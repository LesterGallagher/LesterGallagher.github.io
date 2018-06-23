
document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.getElementsByClassName('lazyload'));
  var active = false;

  function lazyLoad() {
    if (active === false) {
      active = true;
      setTimeout(function () {
        for (var i = lazyImages.length - 1; i >= 0; i--) {
          if (lazyImages[i].getBoundingClientRect().top <= window.innerHeight && lazyImages[i].getBoundingClientRect().bottom >= 0) {
            (function () {
              var lazyImage = lazyImages[i];
              var img = new Image();
              img.onload = img.onerror = function () {
                lazyImage.src = img.src;
                lazyImage.classList.add('loaded');
              };
              img.src = lazyImage.getAttribute('data-src');
            })();
            lazyImages.splice(i, 1);
          }
        }
        if (lazyImages.length === 0) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationchange", lazyLoad);
        }
        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
  lazyLoad();

  var preloads = document.getElementsByClassName('preload');
  for (var i = 0; i < preloads.length; i++) {
    if (preloads[i].getAttribute('as') === 'style') preloads[i].setAttribute('rel', 'stylesheet');
    if (preloads[i].getAttribute('as') === 'script') document.head.appendChild(document.createElement('script')).src = preloads[i].href;
  }
});