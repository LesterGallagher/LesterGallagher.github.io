
document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.getElementsByClassName('lazyload'));
  var active = false;

  function lazyLoad() {
    if (active === false) {
      active = true;
      setTimeout(function () {
        for (var i = lazyImages.length - 1; i >= 0; i--) {
          if (lazyImages[i].classList.contains('loaded') === false
            && lazyImages[i].getBoundingClientRect().top <= window.innerHeight + 600 
            && lazyImages[i].getBoundingClientRect().bottom >= -200) {
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
});