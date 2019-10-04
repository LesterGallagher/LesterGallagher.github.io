document.addEventListener("DOMContentLoaded", function () {
  var lazyElements = [].slice.call(document.getElementsByClassName("lazyload"));
  var active = false;

  function lazyLoad() {
    if (active === false) {
      active = true;
      setTimeout(function () {
        for (var i = lazyElements.length - 1; i >= 0; i--) {
          if (
            !lazyElements[i].classList.contains("loaded") &&
            lazyElements[i].getBoundingClientRect().top <=
            window.innerHeight + +(lazyElements[i].hasAttribute('data-lazyload-top') 
              ? lazyElements[i].getAttribute('data-lazyload-top') 
              : 1200)
          ) {
            var lazy = lazyElements[i];
            var event = document.createEvent('Event');
            event.initEvent('lazyload', true, true);
            lazy.dispatchEvent(event);

            lazyElements.splice(i, 1);
          }
        }

        if (lazyElements.length === 0) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationchange", lazyLoad);
        }

        active = false;
      }, 200);
    }
  }

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
  lazyLoad();
});


