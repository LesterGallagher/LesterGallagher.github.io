---
title: html2js-loader
date: 2018-11-14 12:32
image: "/uploads/android-chrome-256x256.png"
author: ''
description: This webpack loader exports HTML to javascript instructions. Create javascript
  functions by writing HTML templates.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
[![GitHub license](https://img.shields.io/github/license/LesterGallagher/html2js-loader.svg)](https://github.com/LesterGallagher/html2js-loader/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/LesterGallagher/html2js-loader.svg)](https://github.com/LesterGallagher/html2js-loader/issues)
[![Twitter](https://img.shields.io/twitter/url/https/www.npmjs.com/package/html2js-loader.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhtml2js-loader)

[![npm](/uploads/npm.png)](https://www.npmjs.com/package/html2js-loader)

<div align="center">
<a href="https://github.com/webpack/webpack">
<img width="200" height="200" vspace="" hspace="25"
src="https://worldvectorlogo.com/logos/webpack.svg">
</a>
<a href="https://html2js.esstudio.site">
<img width="200" height="200" vspace="" hspace="25"
src="https://html2js.esstudio.site/android-chrome-256x256.png">
</a>
</div>

Exports HTML to javascript instructions. Create javascript functions from HTML templates.

Dynammicly creating HTML in javascript is actually quiete easy right? You just save the html as a string and use ".innerHTML" to insert it into the document. Well, if you're doing that a lot it can get slow. The browser has to parse the HTML string everytime. This also means that you're putting HTML snippets in you're javascript code, which violates the "separation of concerns" priniciple. Putting HTML strings in your javascript also prevents you're editor/IDE from giving intellisense, code-completion, linting, etc. A solution would be to convert these html strings to javascript instructions:

```javascript
// from

document.querySelector('#some-selector').innerHTML = `
<article>
	<h2>My dynamically generated html</h2>
</article>
`
```

```javascript
```

## Install

```bash
npm i -D html2js-loader
```

## Usage

Add the html2js-loader to your webpack.config.js.

```js
{
  test: /\.html$/,
  use: {
    loader: 'html2js-loader',
    options: {}
  }
}
```

Now, simply import/require any html. For example:

```html
<!-- templates/list.html -->
<ul role="list">
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
</ul>
```

```js
const createList = require('./templates/list.html');

document.body.appendChild(createList());
```

this will be converted to the following javascript:

```javascript
  function createNode() {
  var e_0 = document.createElement("ul");
  e_0.setAttribute("role", "list");
  var e_1 = document.createElement("li");
  e_1.appendChild(document.createTextNode("Item one"));
  e_0.appendChild(e_1);
  var e_2 = document.createElement("li");
  e_2.appendChild(document.createTextNode("Item two"));
  e_0.appendChild(e_2);
  var e_3 = document.createElement("li");
  e_3.appendChild(document.createTextNode("Item three"));
  e_0.appendChild(e_3);
  return e_0;
}
```

You can use this online tool: [html2js.esstudio.site](https://html2js.esstudio.site) which will convert your html to javascript on the fly.

The loader will optimize this code by injecting the following base code into your bundle:

```javascript
module.exports = {
    document_createDocumentFragment: () => {
        return document.createDocumentFragment();
    },
    document_createElement: name => {
        return document.createElement(name);
    },
    document_createTextNode: text => {
        return document.createTextNode(text);
    },
    appendChild: (parent, child) => {
        parent.appendChild(child);
    },
    setAttribute: (elem, key, value) => {
        elem.setAttribute(key, value);
    }
};
```

This will enable the compiler to name mangle these function calls. For example if we convert the following html:

```html
<ul role="list">
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
</ul>
```

That will produce the following minified base code (this will only be included once):

```javascript
var a=function(e){return document.createElement(e)},b=function(e){return document.createTextNode(e)},c=function(e,f,g){return e.setAttribute(f,g)},d=function(e,f){return e.appendChild(f)}
```

And the following minified javascript instructions for the html template:

```javascript
var e=a("ul");c(e,"role","list");var f=a("li");d(f,b("Item one"));d(e,f);f=a("li");d(f,b("Item two"));d(e,f);f=a("li");d(f,b("Item three"));d(e,f);
```