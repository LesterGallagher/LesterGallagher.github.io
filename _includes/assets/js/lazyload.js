
document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.getElementsByClassName('lazyload'));
  var active = false;

  function lazyLoad () {
    if (active === false) {
      active = true;

      setTimeout(function () {
        for (var i = lazyImages.length - 1; i >= 0; i--) {
          var lazyImage = lazyImages[i];
          if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) {
            lazyImage.setAttribute('src', lazyImage.getAttribute('data-src'));
            lazyImage.classList.add('loaded');
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
  for(var i = 0; i < preloads.length; i++) {
    if (preloads[i].getAttribute('as') === 'style') preloads[i].setAttribute('rel', 'stylesheet');
  }
});