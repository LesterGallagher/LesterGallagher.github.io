---
title: Creating a Javascript spellingchecker with bjspell
date: 2018-10-22 22:11:31 +0200
image: "/uploads/spellchecker.jpg"
description: ''
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---

```html
<div id="text" contenteditable spellcheck="false"></div>
```

```javascript
m 
```

```javascript
lang = BJSpell("./assets/js/" + name + ".js", function() {
  loader(false);
  button(true);
  editor.$runBtn.on('click.spellcheck', runSpellCheck.bind(editor.$elem));
  editor.$elem.on('input.spellcheck change.spellcheck', function() {
  button(true);
  });
  editor.unloadLang = function() {
  editor.$elem.off('spellcheck')
  }
});
```