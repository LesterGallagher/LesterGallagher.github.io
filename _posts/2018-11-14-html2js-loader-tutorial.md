---
title: html2js-loader tutorial
date: 2018-11-14 13:35
image: "/uploads/tut.PNG"
author: ''
description: This tutorial covers how you setup the html2js-loader and webpack. If
  you don't know what html2js does, you can read this blog post or use the online
  converter tool.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
This tutorial covers how you set up the html2js-loader and webpack. If you don't know what html2js does, you can read [this blog post](https://esstudio.site/2018/11/14/html2js-loader.html) or use the [online converter tool](https://html2js.esstudio.site/).

* [Github repo](https://github.com/LesterGallagher/html2js-loader)
* [NPM package](https://www.npmjs.com/package/html2js-loader)

To get started you can use the following instructions.

```bash
npm init
npm i -D html2js-loader webpack webpack-cli
```

or clone the tutorial repository.

```bash
git clone https://github.com/LesterGallagher/html2js-loader-demo-tutorial.git
```

When the loader and webpack have finished installing, add the following line to your scripts:

    "scripts": {
        "start": "webpack --config webpack.config.js --watch"
    }

Create a "webpack.config.js" file.

```js
// webpack.config.js

const path = require('path');

module.exports = {
    context: __dirname,
    entry: path.resolve(__dirname, 'src/index'),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: {
                loader: 'html2js-loader',
                options: {
                    // defaults:

                    // trimWhitespace: false,
                    // removeComments: false,
                    // skipEmptyTextNodes: false
                }
            }
        }]
    }
}
```

Now create a folder called "dist" and add an "index.html" file:

```html
<!-- dist/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>html2js loader tutorial</title>
</head>
<body>
    
    <script src="bundle.js"></script>
</body>
</html>
```

Also, add a folder "src" with a "index.js" file, containing:

```js
// src/index.js

document.write('<h1>Hello World</h1>');
```

That's it, we're finished setting up the project, you can run "npm start" to watch for changes and build your project.

```bash
npm start
```

Open the "index.html" file in your favorite browser (for example chrome) and you should see the text "Hello World".

To use the loader we create an html file in the src folder (I'm going to call it "posts.html" with the following content).

```html
<!-- src/posts.html -->

<h1>Blog Posts</h1>

<section class="posts" itemscope itemtype="http://schema.org/Blog">
    <article itemprop="blogPost">
        <img class="post-image" itemprop="image" src="https://esstudio.site/uploads/simple%20draggable%20elements2.gif"
            alt="&quot;Create draggable elements with Javascript&quot; Thumbnail">
        <h2 class="post-title">Create draggable elements with Javascript</h2>
        <p><small class="post-date">01 NOVEMBER 2018</small></p>
        <a target="_blank" href="https://esstudio.site/2018/11/01/create-draggable-elements-with-javascript.html">View
            more...</a>
    </article>
    <article itemprop="blogPost">
        <img class="post-image" itemprop="image" src="https://esstudio.site/uploads/giphy.gif" alt="&quot;Lazy loading images with Javascript&quot; Thumbnail">
        <h2 class="post-title">Lazy loading images with Javascript</h2>
        <p><small class="post-date">01 NOVEMBER 2018</small></p>
        <a target="_blank" href="https://esstudio.site/2018/11/01/lazyloading-images-with-javascript.html">View more...</a>
    </article>
    <article itemprop="blogPost">
        <img class="post-image" itemprop="image" src="https://esstudio.site/uploads/binaryheap.png" alt="&quot;Implementing Binary Heaps with Javascript&quot; Thumbnail">
        <h2 class="post-title">Implementing Binary Heaps with Javascript</h2>
        <p><small class="post-date">31 OCTOBER 2018</small></p>
        <a target="_blank" href="https://esstudio.site/2018/10/31/implementing-binary-heaps-with-javascript.html">View
            more...</a>
    </article>
    <article itemprop="blogPost">
        <img class="post-image" itemprop="image" src="https://esstudio.site/uploads/rssreader.jpg" alt="&quot;Creating an Atom feed reader with Javascript&quot; Thumbnail">
        <h2 class="post-title">Creating an Atom feed reader with Javascript</h2>
        <p><small class="post-date">30 OCTOBER 2018</small></p>
        <a target="_blank" href="https://esstudio.site/2018/10/30/creating-an-atom-feed-reader-with-javascript.html">View
            more...</a>
    </article>
</section>
```

Let's open "src/index.js" and replace the previous content with:

```javascript
// src/index.js

const createPosts = require('./posts.html');

document.body.appendChild(createPosts());
```

Some optional CSS:

```css
/* dist/style.css */

* {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}

article {
    width: 25%;
    float: left;
    padding: 10px;
}

img {
    max-width: 100%;
}

h1 {
    padding: 10px;
}

@media screen and (max-width: 1000px) {
    article {
        width: 50%;
    }
}

@media screen and (max-width: 500px) {
    article {
        width: 100%;
    }
}
```

{% include javascript_affiliate.html %}