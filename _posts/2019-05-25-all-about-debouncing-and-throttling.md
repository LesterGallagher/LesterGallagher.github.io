---
lang: en
title: All about debouncing, throttling and batching
image: "/uploads/throttle_debounce.gif"
date: 2019-05-24T22:00:00.000+00:00
author: Sem Postma
description: Failing to properly use debounce or throttle taxing tasks your javascript
  apps (or any other app for that matter) can really hurt performance. In this article
  i'll list some examples of debounce and javascript functions.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
Failing to properly debounce or throttle taxing tasks in your javascript apps (or any other app for that matter) can really hurt performance. In this article i'll list some examples of debounce and javascript functions.

If you are not up to date with debounce and throttle function, you check out[ this css.tricks article](https://css-tricks.com/debouncing-throttling-explained-examples/) by [dcorbacho](https://css-tricks.com/author/dcorbacho/ "https://css-tricks.com/author/dcorbacho/"). A debounce or throttle function is actually just a way of limiting how much a function can be called. The window scroll event for example can fire hundreds of times for every interaction. If you're doing some heavy javascript layout tasks, every time this event is fired, you're website is going to be very janky. Another place where debounce and throttling functions are often used is with limiting ajax calls. Most autocomplete search boxes use some kind of debounce or throttle function because sending a request for every keypress will hurt your app a lot.

I stole the debounce  function from [David Walsh](https://davidwalsh.name/) and the throttle function from a comment on the same article:

> **Niall Campbell**
>
> Throttled can be simply achieved by changing the way the timeout is cleared/set. eg..
>
>     // Returns a function, that, as long as it continues to be invoked, will only
>     // trigger every N milliseconds. If <code>immediate</code> is passed, trigger the 
>     // function on the leading edge, instead of the trailing.
>     function throttle(func, wait, immediate) {
>     	var timeout;
>     	return function() {
>     		var context = this, args = arguments;
>     ...
>
> Note that the timeout is not destroyed and recreated for every call (unlike debouncing). Its destroyed after the timeout has completed and created on the first call after its been destroyed.

In simple terms, the function rate limits the amount of events to a certain time span. Visually a debounce function looks something like this:

![](/uploads/debounce.gif)

The debounce snippet:

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    
    var debounce = function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
    
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
    
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
    
    // window.onscroll = debounce(200)(function() { 
    // 	console.log(window.pageYOffset ) 
    // });

The throttle snippet:

    // Returns a function, that, as long as it continues to be invoked, will only
    // trigger every N milliseconds. If `immediate` is passed, trigger the
    // function on the leading edge, instead of the trailing.
    
    var throttle = function throttle(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
    
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
    
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
    
    
    // window.onscroll = throttle(200)(function() { 
    // 	console.log(window.pageYOffset ) 
    // });

The comments already explain the 'immediate' parameter. The basic difference is that without the 'immediate' parameter the function will wait and then fire. If the 'immediate' parameter is set to true it will fire and then wait. Be aware that if you set the 'immediate' parameter, the function won't always fire at or after the last event because it might still be waiting because of a previous event. If 'immediate' is set to true the function will always fire after or at the last event. This can get you into trouble if you're sending data or if you have to make sure you always have the latest. Only set the 'immediate' parameter if you know what you're doing.

<p class="codepen" data-height="478" data-theme-id="35834" data-default-tab="js,result" data-user="Afirus" data-slug-hash="NVMjJV" style="height: 478px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="NVMjJV">
<span>See the Pen <a href="https://codepen.io/Afirus/pen/NVMjJV/">
NVMjJV</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

In some cases you want to all the data from all of the events but you still want debouncing/throttling behavior:

```javascript
var update = debounce(500)(function(e) {
    // doFakeAjaxRequest(payload);
	console.log(e);
});

let delay = 0;
setTimeout(() => update('All'), delay += 300);
setTimeout(() => update('of'), delay += 300);
setTimeout(() => update('these'), delay += 300);
setTimeout(() => update('arguments'), delay += 600);
setTimeout(() => update('are'), delay += 300);
setTimeout(() => update('not'), delay += 300);
setTimeout(() => update('batched'), delay += 300);
```

If you don't want event data to be lost you can use this function to get all of the arguments since the last time the debounce/throttle function fired:

```javascript
const batched = delayedFunc => func => {
    const stack = [];
    const handler = delayedFunc(() => {
        func(stack);
        stack.splice(0, stack.length);
    });
    return function () {
        stack.push({ context: this, args: arguments });
        handler();
    }
}
```

Use the following snippets:

The debounce snippet:

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    
    var debounce = function debounce(wait, immediate) {
      return function(func) {
        var timeout;
        return function() {
          var context = this,
            args = arguments;
    
          var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
    
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      };
    };
    
    // window.onscroll = debounce(200)(function() { 
    // 	console.log(window.pageYOffset ) 
    // });

The throttle snippet:

    // Returns a function, that, as long as it continues to be invoked, will only
    // trigger every N milliseconds. If `immediate` is passed, trigger the
    // function on the leading edge, instead of the trailing.
    var throttle = function throttle(wait, immediate) {
      return function(func) {
        var timeout;
        return function() {
          var context = this,
            args = arguments;
    
          var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
    
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      };
    };
    
    // window.onscroll = throttle(200)(function() { 
    // 	console.log(window.pageYOffset ) 
    // });

And then change your code to this:

```javascript
var update = batched(debounce(500))(function(stackedEvents) {
	var payload = stackedEvents.map(function(frame) {
		return frame.args[0];
	}).join(' ');
    // doFakeAjaxRequest(payload);
    console.log(payload);
});

let delay = 0;
setTimeout(() => update('All'), delay += 300);
setTimeout(() => update('of'), delay += 300);
setTimeout(() => update('these'), delay += 300);
setTimeout(() => update('arguments'), delay += 600);
setTimeout(() => update('are'), delay += 300);
setTimeout(() => update('being'), delay += 300);
setTimeout(() => update('batched'), delay += 300);
```

Which will result in:

    index.js:85 All of these 
    index.js:85 arguments are being batched

<p> </p>