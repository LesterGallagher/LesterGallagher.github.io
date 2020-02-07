---
lang: en
layout: post
title: Authenticating Firebase JWT Tokens
image: "/uploads/OAuth 2.0.png"
date: 2020-02-07 00:00:00 +0100
author: Sem Postma
description: Verify and decode Firebase JWT tokens using node.js without dependencies.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
ref: authenticating-firebase-jwt-tokens

---
You don't need the firebase admin module to verify and decode firebase JWT tokens. In the example below you can find a full implementation of this, just using the default node.js modules (http, https and crypto).

{% gist b5b6492ddb805d71daa5e60f32c7788c %}