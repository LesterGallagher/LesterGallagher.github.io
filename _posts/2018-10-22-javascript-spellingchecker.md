---
title: Creating a Javascript spellingchecker with bjspell
date: 2018-10-22 20:11:31 +0000
image: "/uploads/spellchecker.jpg"
description: Client-side spellchecker with bjspell in a contenteditable div, using
  javascript. Let's start with writing the HTML. We need a contenteditable div with
  the spellcheck attribute set to false. This is because we don't want to use the
  default browser spellchecking, we want our own implementation.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
author: ''

---
I saw this question on stackoverflow: [Need Client side spell checker for DIV](https://stackoverflow.com/questions/6252358/need-client-side-spell-checker-for-div). There are not a lot of libraries available that will allow you to do this but I did find an older library called [bjspell](http://code.google.com/p/bjspell) which does the job.

BJSpell in production: [spell-checker.site](https://spell-checker.site)

Let's start with writing the HTML. We need a contenteditable div with the spellcheck attribute set to false. This is because we don't want to use the default browser spellchecking, we want our own implementation.

```html
<div id="text" contenteditable spellcheck="false"></div>

<button id="check" disabled>Check</button>
<button id="reset">Reset</button>
```

It's best to add some css rules to the contenteditbale div because we want to style it as an inputfield. The minimum height is required because otherwise the div will collapse to height = 0. Also, let's add some styling to correct and misspelled words, so users can spot their spelling mistakes.

{% include adsense.html %}

```css
#text {
  min-height: 100px;
  border: 1px solid #ccc;
}

#text .correct {
  border-bottom: 2px solid green;
}

#text .misspelled {
  border-bottom: 2px solid red;
}
```

Let's load in bjspell from the [bjspell repository](https://github.com/maheshmurag/bjspell). In this example I'm using the en_US dictionary. The available dictionaries are de_DE, en_GB, en_USE, es_ES, fr_FR, it_IT. You can also compile your own but that's beyond the scope of this tutorial. Call the BJSpell function with url of the dictionary, and a callback. The callback will be fired when bjspell has loaded and parsed the dictionary. In this case, we will set the disabled attriute of the "check button" to false.

```javascript
var check =  document.querySelector('#check');
var div = document.querySelector('#text');use 
var reset = document.querySelector('#reset');

var dictionary = 'https://rawcdn.githack.com/maheshmurag/bjspell/master/dictionary.js/en_US.js';
var lang = BJSpell(dictionary, function() {
  check.disabled = false;
});
```

Next, add a click handler to the "check button". Below is a very simple implementation. You could do a spelling check everytime the div changes, and save/store the user selection and cursor position. In short, we get all words from the div as text. Then we individually check every word for spelling mistakes. If we find a spelling mistake, we add a list of suggestions and save the word as a span element. After we've finished mapping every word, we join the all the span elements together and store it in the div's innerHTML.

{% include adsense.html %}

```javascript
check.addEventListener('click', function() {
  var text = div.innerText;
  var words = text.split(/\s/);
  
  div.innerHTML = words.map(function(word) {
     var correct = lang.check(word);
     var className = correct ? 'correct' : 'misspelled';
     var title = correct 
      ? 'Correct spelling' 
      : `Did you mean ${lang.suggest(word, 5).join(', ')}?`;
     return `<span title="${title}" class="${className}">${word}</span>`;
   }).join(' ');
});
```

We also want a way for our user to reset the div:

```javascript
reset.addEventListener('click', function() {
  div.innerText = div.innerText;
});
```

#### Full example:

<p data-height="265" data-theme-id="0" data-slug-hash="VEGdqo" data-default-tab="js,result" data-user="Afirus" data-pen-title="Client-side spellchecking, contenteditable DIV" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/VEGdqo/">Client-side spellchecking, contenteditable DIV</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

{% include adsense.html %}

A complete spellchecker using BJSpell: [spell-checker.site](https://spell-checker.site)

<br>

{% include javascript_affiliate.html %}