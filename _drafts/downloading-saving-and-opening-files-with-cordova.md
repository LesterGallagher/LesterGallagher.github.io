---
title: Downloading, saving and opening files with Cordova
image: "/uploads/cordova-file-download-and-open.jpeg"
date: 2019-02-16 00:00:00 +0100
author: Sem Postma
description: Downloading/Saving/Opening files with Cordova in javascript and polyfill
  the achor's download attribute for android webview.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---

In the browser, downloading files is actually quite easy.  You can just do:

`<a download="filename.txt" href="data:text/csv;charset=utf-8">Download</a>`

But this doesn't work in webview.

Because of how cordova works we need the [cordova-plugin-file](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/) and the[ cordova-plugin-file-opener2](https://github.com/pwlin/cordova-plugin-file-opener2). The cordova-plugin-file plugin gives us access to the users's file system, and the cordova-plugin-file-opener2 plugin helps us with opening files using an external application (e.g word, excel, etc.).