---
lang: en
title: Editing Netlify CMS config.yml from Netlify CMS without plugins
image: "/uploads/netlify-cms-cms-edit.png"
date: 2019-06-08T22:00:00.000+00:00
author: Sem Postma
description: While expereminting I decided to see how much i could stretch the netlify-cms
  capabilities regarding...
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
While expereminting I decided to see how much i could stretch the netlify-cms capabilities regarding [this issue](https://github.com/netlify/netlify-cms/issues/341).

Turns out you can almost do it. It wasn't completely possible due to these 2 issues:

* [self-referential / circular data structures cause "RangeError: Maximum call stack size exceeded" error](https://github.com/netlify/netlify-cms/issues/2360)
* [Hidden fields don't work when added through a list widget with variable types](https://github.com/netlify/netlify-cms/issues/2363)

Because netlify cms can't handle self-referential / circular data structures in the config.yml the file becomes very big and fields only work 1 depth down. For example my config can't handle an object in an object in an object. You can get around this by increasing the depth but the file will become exponantially bigger. As it is, the file already has \~5000 😵 lines of code. Ofcourse the upside is that you don't have to look at it anymore...

Don't use this in production. This could lead to data loss. This is an experiment and not a viable solution.

Add this to your config.yml:

<div style="max-height: 1000px">
<script src="https://gist-it.appspot.com/https://github.com/LesterGallagher/netlify-cms-config-generator/blob/master/config.yml"></script>
</div>

I created a small [node utilify](https://github.com/LesterGallagher/netlify-cms-config-generator) for creating the config from 2 different files:

The "partial-config" file:

<div style="max-height: 1000px">
<script src="https://gist-it.appspot.com/http://github.com/LesterGallagher/netlify-cms-config-generator/blob/master/partial-config.yml"></script>
</div>

And the "fields" file:

<div style="max-height: 1000px">
<script src="https://gist-it.appspot.com/https://github.com/LesterGallagher/netlify-cms-config-generator/blob/master/fields.yml"></script>
</div>

Feel free to fork, tweak or otherwise change the code.