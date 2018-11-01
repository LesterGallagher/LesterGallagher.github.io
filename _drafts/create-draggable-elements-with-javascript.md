---
title: Create draggable elements with Javascript
date: 2018-08-26 19:26:00 +0000
image: "/uploads/simple draggable elements2.gif"
description: Draggable elements are an important part of modern interfaces. This seemingly
  simple functionality means, loading hundreds of kilobytes of Javascript and CSS.
  But it's actually quite easy to implement with a few lines of javascript.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
There are a lot of libraries that offer this type of functionaly but this often means, loading hundreds of kilobytes of Javascript and CSS. I my case i justed wanted simple sticky note functionaly. I want a draggable element and a "dragger" handle with which I can drag the element. It had to be simple and flexible, extendible, no initialization code, it had to have support for nested draggables and should always stay within the parent element (the draggable area).

### The HTML

Let's begin with creating the draggable area. We will give it a height of 340px, and a border. This makes it easier for the user to see the bounds of the draggable area. The only required elements are: An element with the class "draggable" and within it an element with the class "dragger".

```html
<div style="height: 340px; border: 1px solid #ccc">
  <div class="draggable">
    <div class="dragger"></div>
    <p>Some content for the draggable sticky note.</p>
  </div>
</div>
```

Because there is no initialization code, you can dynammicly add these elements and it will just work.

### The CSS

Here are the CSS rules that I used. The only required rules are that a ".draggable" must have the "position" rule set to "relative" or "absolute". This is because we will manipulate the "left" and "top" CSS rules. If you have multiple draggable elements and you're using "position: absolute", the elements will initially overlap. And if you haven't set a fixed height for the draggable area, the draggable area will collapse to "height = 0" and you're draggable elements will not be visible/work. If you don't understand position absolute or position relative, you can checkout the [W3Schools tutorial on CSS Layout](https://www.w3schools.com/css/css_positioning.asp).

    .draggable {
      width: 300px;
      height: 200px;
      background: #ccc;
      position: relative;
    }
    
    .draggable.dragging {
      user-select: none;
    }
    
    .dragger {
      height: 30px;
      background: #555;
    }
    
    .dragger::before {
      content: "window";
      color: #fff;
      margin: 5px;
      display: inline-block;
    }

### The Javascript

Finnaly, the Javascript. If you don't want to create global variables you can wrap the code in an iffy: `(function(){<code>})()`. This is called an immediately-invoked function expression (or IIFE, pronounced "iffy").

Let's start by listening for "mousedown" events. Then we loop through the event path to see if we clicked on the "dragger" element (the handle). Then we continue untill we find the draggable element. We save the draggable element to the variable "target" and save the cursor position relative to the target position (the "left" and "right" CSS rules). We use slice to get red of the "px" at the end of the CSS rule (`"100px".slice(0, -2) === "100"`). If the CSS rule string is an empty string the minus operator will type coerce it to zero.

Now, let's listen for the "mousemove" event. If the target is null we immediately return. If it's not, we move the element using the CSS "top" and "left" rules. Then we check if the element is within the parent. If it's not, we set change the position so it's clamped inside the parent.

We finish by adding a "mouseup" event and setting the target to null when we've stopped dragging.

```javascript 
var x, y, target = null;

document.addEventListener('mousedown', function(e) {
  var clickedDragger = false;
  for(var i = 0; e.path[i] !== document.body; i++) {
    if (e.path[i].classList.contains('dragger')) {
      clickedDragger = true;
    }
    else if (clickedDragger && e.path[i].classList.contains('draggable')) {
      target = e.path[i];
      target.classList.add('dragging');
      x = e.clientX - target.style.left.slice(0, -2);
      y = e.clientY - target.style.top.slice(0, -2);
      return;
    }
  }
});

document.addEventListener('mouseup', function() {
  if (target !== null) target.classList.remove('dragging');
  target = null;
});

document.addEventListener('mousemove', function(e) {
  if (target === null) return;
  target.style.left = e.clientX - x + 'px';
  target.style.top = e.clientY - y + 'px';
  var pRect = target.parentElement.getBoundingClientRect();
  var tgtRect = target.getBoundingClientRect();

  if (tgtRect.left < pRect.left) target.style.left = 0;
  if (tgtRect.top < pRect.top) target.style.top = 0;
  if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px';
  if (tgtRect.bottom > pRect.bottom) target.style.top = pRect.height - tgtRect.height + 'px';
});
```

### The full example

<p data-height="414" data-theme-id="0" data-slug-hash="rqXxQy" data-default-tab="js,result" data-user="Afirus" data-pen-title="Simple Draggable Elements" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/rqXxQy/">Simple Draggable Elements</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

{% include javascript_affiliate.html %}