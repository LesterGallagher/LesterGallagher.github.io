---
lang: en
title: All about debouncing and throttling
image: "/uploads/throttle_debounce.gif"
date: 2019-05-25 00:00:00 +0200
author: Sem Postma
description: All about debouncing and throttling
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
Failing to properly use debounce or throttle taxing tasks your javascript apps (or any other app for that matter) can really hurt performance. In this article i'll list some examples of debounce and javascript functions.

If you are not up to date with debounce and throttle function, you check out[ this css.tricks article](https://css-tricks.com/debouncing-throttling-explained-examples/) by [dcorbacho](https://css-tricks.com/author/dcorbacho/ "https://css-tricks.com/author/dcorbacho/"). A debounce or throttle function is actually just a way of limiting how much a function can be called. The window scroll event for example can fire hundreds of times for every interaction. If you're doing some heavy javascript layout tasks, every time this event is fired, you're websiteis going to be very janky. Another place where debounce and throttling functions are often used is with limiting ajax calls. Most autocomplete search boxes use some kind of debounce or throttle function because sending a request for every keypress will hurt your app a lot.

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
>     		var later = function() {
>     			timeout = null;
>     			if (!immediate) func.apply(context, args);
>     		};
>     		var callNow = immediate && !timeout;
>     		if ( !timeout ) timeout = setTimeout( later, wait );
>     		if (callNow) func.apply(context, args);
>     	};
>     };
>
> Note that the timeout is not destroyed and recreated for every call (unlike debouncing). Its destroyed after the timeout has completed and created on the first call after its been destroyed.

In simple terms, the function rate limits the amount of events to a certain timespan. Visually a debounce function looks something like this:

![](/uploads/debounce.gif)