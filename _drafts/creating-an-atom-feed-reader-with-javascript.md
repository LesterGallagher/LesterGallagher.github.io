---
title: Creating an Atom feed reader with Javascript
date: 2018-10-30 21:26:22 +0100
image: "/uploads/rssreader.jpg"
description: Atom is a type of webfeed like RSS. The Atom format was developed as
  an alternative to RSS. In this tutorial we will learn how create an Atom feed reader
  with javascript.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
First of all, Atom is an extension of XML, just like RSS. Atom uses the `.atom` and `.xml` extensions and the `application/atom+xml` mimetype. Below is an example of an Atom feed from [https://americanhorrorstory.style/](AHS Blog). Having an atom feed on your website is a good idea, you can get more exposure via rss readers like [https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Famericanhorrorstory.style%2Ffeed](Feedly), NewsBlur or [NewsFeeder (a website/app i created))](https://esstudio.site/newsfeeder/).

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




