var a, atr, anchors = document.getElementsByTagName('a');
for (var i = 0; i < anchors.length; i++) {
    a = anchors[i];
    a.addEventListener('click', function (e) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            var id = this.getAttribute('href').replace('#', '');
            var el = document.getElementById(id);
            if (el !== null) {
                scrollToAnim(window.offsetTop(el), function () {
                    el.focus();
                    if (document.activeElement === el) {
                        return false;
                    } else {
                        el.setAttribute('tabindex', '-1');
                        el.focus();
                    };
                }, 800);
                return false;
            }
        }
    });
}
// easing functions http://goo.gl/5HLl8
function easeInOutQuad (t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

function offsetTop (elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}

function scrollToAnim(to, callback, duration) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }
    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }
    var start = position(),
        change = to - start,
        currentTime = 0,
        increment = 20;
    duration = (typeof (duration) === 'undefined') ? 500 : duration;
    var animateScroll = function () {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        var val = easeInOutQuad(currentTime, start, change, duration);
        // move the document.body
        move(val);
        // do the animation unless its over
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback && typeof (callback) === 'function') {
                // the animation is done so lets callback
                callback();
            }
        }
    };
    animateScroll();
}