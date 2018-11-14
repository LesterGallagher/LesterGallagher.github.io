---
title: Creating an Atom feed reader with Javascript
date: 2018-10-30 20:26:22 +0000
image: "/uploads/rssreader.jpg"
description: Atom is a type of webfeed like RSS. The Atom format was developed as
  an alternative to RSS. In this tutorial we will learn how create an Atom feed reader
  with javascript.
portal_title: NewsFeeder
portal_description: Easily search for news on multiple platforms, find feeds on popular
  websites and more. Also works as a classic RSS/Atom reader.
portal_image: "/uploads/logo-6c4e4d.png"
portal_link: https://esstudio.site/newsfeeder
author: ''

---
First of all, Atom is an extension of XML, just like RSS. Atom uses the `.atom` and `.xml` extensions and the `application/atom+xml` mimetype. Below is an example of an Atom feed from [https://americanhorrorstory.style/](AHS Blog). Having an atom feed on your website is a good idea, you can get more exposure via rss readers like [Feedly](https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Famericanhorrorstory.style%2Ffeed), NewsBlur or [NewsFeeder (a website/app i created)](https://esstudio.site/newsfeeder/).

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
    <generator uri="https://jekyllrb.com/" version="3.7.4">Jekyll</generator>
    <link href="https://americanhorrorstory.style/feed.xml" rel="self" type="application/atom+xml" />
    <link href="https://americanhorrorstory.style/" rel="alternate" type="text/html" hreflang="en" />
    <updated>2018-10-21T21:23:56+02:00</updated>
    <id>https://americanhorrorstory.style/</id>
    <title type="html">American Horror Story Outfits</title>
    <subtitle>This site is an inspiration style guide to some of the iconic American Horror Story characters. Read about the characters and their unique clothing style.</subtitle>
    <author>
        <name>Eva van der Weide</name>
    </author>
    <entry>
        <title type="html">APOCALYPSE - Madison</title>
        <link href="https://americanhorrorstory.style/2018/10/18/apocalypse-madison.html" rel="alternate" type="text/html" title="APOCALYPSE - Madison" />
        <published>2018-10-18T22:09:00+02:00</published>
        <updated>2018-10-18T22:09:00+02:00</updated>
        <id>https://americanhorrorstory.style/2018/10/18/apocalypse-madison</id>
        <content type="html" xml:base="https://americanhorrorstory.style/2018/10/18/apocalypse-madison.html">
          The witches are back! Who would’ve thought the witches from season 3 would make a comeback in season 8 of American Horror Story (named: Apocalypse).</content>
        <author>
            <name>Eva van der Weide</name>
        </author>
        <summary type="html">The witches are back!</summary>
        <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="https://americanhorrorstory.style/images/meta-icons/android-chrome-512x512.png" />
    </entry>
</feed>
```

{% include adsense.html %}

Let's fetch the feed with [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). You can use any valid Atom feed you want.

```javascript
fetch('https://americanhorrorstory.style/feed')
  .then(response => response.text())
  .then(xml => { })
```

We will use the well supported [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) to parse the feed into a document. It's important to set the type to "text/xml", because it will default to "text/html".

```javacript
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xml,"text/xml");
```

Let's log the "xmlDoc" to the console. This will show a list of entry elements, which we need to display our posts.

![Atom Feed console.log](/uploads/rssfeed.PNG)

{% include adsense.html %}

Because the xmlDoc is of type "Document" and not "HTMLDocument", we can't use functions like ".querySelector" so we will use ".getElementsByTagName" to select the entry tags. This will return an array like object. To convert an array like object or iterable object, to an array, use [Array.from(arrayLikeObject)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

```javascript
const html = Array.from(xmlDoc.getElementsByTagName('entry')).map(entry => `<div class="entry"></div>`);
```

This will return an array of strings containing HTML markup for our feed. Now we need to fill up the entry elements with content from the Atom feed. We can make this a bit easier by writing some helper functions.

```javascript
// Get's a single child element by tag name
const t = (entry, tname) => entry.getElementsByTagName(tname)[0];

// Get date from an entry element
const date = entry => new Date(t(entry, 'published').textContent).getDate();

// Strip html tags to remove html tags like b, i, h1, etc.
const html2txt = html => html.replace(/<(?:.|\n)*?>/gm, '');

// Get excerpt from an entry content
const content = entry => html2txt(t(entry, 'content').textContent).slice(0, 200);
```

Now, replace the template string

```javascript
`<div class="entry"></div>`
```

with the template string below.

```javascript
`<div class="entry">
  <div class="timestamp">${date(entry)}</div>
  <a href="${t(entry, 'link').getAttribute('href')}">
  <h2 class="entry-title">${t(entry, 'title').innerHTML}</h2>
  </a>
  <div class="content">${content(entry)}&hellip;</div>
</div>`
```

Let's join the html strings together and put it on the page.

```html
<div id="items">loading........</div>
```

```javascript
document.getElementById('items').innerHTML = html.join('');
```

{% include adsense.html %}

You can checkout the full example, with code below. I've also added some extra css and html markup.

<p data-height="265" data-theme-id="0" data-slug-hash="mzYKYW" data-default-tab="css,result" data-user="Afirus" data-pen-title="Atom Feed Reader" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/mzYKYW/">Atom Feed Reader</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

The RSS reader I talked about earlier is a serverless javascript website/app called [NewsFeeder](https://esstudio.site/newsfeeder/). I't parses Atom and RSS feeds, it's free, it's safe and has no sign-up.

{% include app-portal.html %}

[NewsFeeder on Google Play](https://play.google.com/store/apps/details?id=com.EchoSierraStudio.Newsfeeder).

{% include javascript_affiliate.html %}