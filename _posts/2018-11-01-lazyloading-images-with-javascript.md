---
title: Lazy loading images with Javascript
date: 2018-11-01 00:00:00 +0000
image: "/uploads/giphy.gif"
author: ''
description: Lazy Loading doesn't have to be hard. This is a very simple example/tutorial
  on how to do lazy loading. Lazy loading works best if you have to load in a lot
  of large images which slows down the page load.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
Lazy Loading doesn't have to be hard. This is a very simple example/tutorial on how to do lazy loading. Lazy loading works best if you have to load in a lot of large images which slows down the page load.

The only requirement for this implementation is, that you have to have to native image width and native image height. This can easilfy be done server-side.

### The HTML

```html
<img width="500" data-width="6000" data-height="4000" data-src="www.example.com/image">
```

### Implementation

Because we don't want the page to wait untill all images are loaded untill showing the page, and we don't want the layout to change everytime an image is loaded in we have to set an initial width, you can also do this with CSS. You want the img element to have the correct size before the image is even loaded.

Now we fill the image to it's correct size using Javascript.

```javascript
var img = document.querySelector('img[data-src]');
var ratio = +img.getAttribute('data-height') / +img.getAttribute('data-width');
  img.style.paddingTop = ratio * img.getBoundingClientRect().width + 'px';
```

After adding some CSS we can see a grey box, the size of the image.

```css
img[data-src] {
  background: #aaa;
```

If you want a nice looking loading animation you can change it to:

```css
img[data-src] {
  background: #aaa url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="#fff" stroke-width="2" fill="none"><circle stroke-opacity=".5" cx="19" cy="19" r="18"/><path xmlns="http://www.w3.org/2000/svg" d="M36 19c0-9.94-8.06-18-18-18" transform="rotate(189.606 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 19 19" to="360 19 19" dur="1s" repeatCount="indefinite"/></path></svg>') no-repeat center center;
}
```

But of courcse, we want to show the image so let's change the javascript to the following. Bassicly we load another image in the background. Once it's loaded we set it's "src" to our initial image's "src" and remove the padding which we used to fill the image initially.

```javascript
var img = document.querySelector('img[data-src]');
var ratio = +img.getAttribute('data-height') / +img.getAttribute('data-width');
  img.style.paddingTop = ratio * img.getBoundingClientRect().width + 'px';
var lazy = new Image();
lazy.onload = function() {
  img.src = lazy.src;
  img.style.paddingTop = 0;
  img.classList.remove('loading');
  img.classList.add('loaded');
}
img.classList.add('loading');
lazy.src = img.getAttribute('data-src'); 
```

But what if we don't want to start loading every image on the page in the background. Let's say we only want to load in the images that are currently visible or we want to wait for some kind of event (click, load, DOMContentLoad, etc.).

```javascript
var img = document.querySelector('img[data-src]');
var ratio = +img.getAttribute('data-height') / +img.getAttribute('data-width');
  img.style.paddingTop = ratio * img.getBoundingClientRect().width + 'px';
var lazy = new Image();
lazy.onload = function() {
  img.src = lazy.src;
  img.style.paddingTop = 0;
  img.classList.remove('loading');
  img.classList.add('loaded');
}

// Wait for some kind of event. In this example i'm using "window.load"

window.addEventListener('load', function() {
  img.classList.add('loading');
  lazy.src = img.getAttribute('data-src'); 
});
```

We can wrap this code in a function and return the actual load callback. This makes it even easier.

```javascript 
function lazyLoad(img) {
  var ratio = +img.getAttribute('data-height') / +img.getAttribute('data-width');
  img.style.paddingTop = ratio * img.getBoundingClientRect().width + 'px';
  var lazy = new Image();
  lazy.onload = function() {
    img.src = lazy.src;
    img.style.paddingTop = 0;
    img.classList.remove('loading');
    img.classList.add('loaded');
  }
  return { load: load }
  function load() { 
    img.classList.add('loading');
    lazy.src = img.getAttribute('data-src'); 
  }
}

var img = document.querySelector('img[data-src]');
var load = lazyLoad(img).load;

// Wait for some kind of event. In this example i'm using "window.load"

window.addEventListener('load', load);
```

And we're done. This is all you need to lazy load images. I've included some extra examples below, their all using the "lazyLoad" function above.

### Start lazy loading images immidiately

<p></p>

```javascript
document.querySelectorAll('img[data-src]').forEach(img => lazyLoad(img).load());
```

### Wait for DOMContentLoaded

<p></p>

```javascript
document.querySelectorAll('img[data-src]').forEach(img => {
  var load = lazyLoad(img).load;
  document.addEventListener('DOMContentLoaded', load);
});
```

### Wait untill image is visible

<p></p>

```javascript
document.querySelectorAll('img[data-src]').forEach(img => {
  var load = lazyLoad(img).load;
  checkViewport();
  window.addEventListener('scroll', checkViewport);
  window.addEventListener('resize', checkViewport);
  window.addEventListener('orientationchange', checkViewport);
  function checkViewport() {
    var rect = img.getBoundingClientRect();
    var isVisible = (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) 
      && ((rect.top + rect.height) >= 0)
      && (rect.left <= (window.innerWidth || document.documentElement.clientWidth)) 
      && ((rect.left + rect.width) >= 0);
    if (isVisible) {
      window.removeEventListener('scroll', checkViewport);
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
      load();
    }
  };
});
```

### Full example

You can try out these examples in [the Codepen](https://codepen.io/Afirus/pen/wYVMOw) below.

<p data-height="413" data-theme-id="0" data-slug-hash="wYVMOw" data-default-tab="js,result" data-user="Afirus" data-pen-title="Easy Lazyloading" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/wYVMOw/">Easy Lazyloading</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

{% include javascript_affiliate.html %}