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
I saw this question on stackoverflow: [Need Client side spell checker for DIV](https://stackoverflow.com/questions/6252358/need-client-side-spell-checker-for-div). There are not a lot of libraries available that will allow you to do this but I did find an older library called [bjspell](http://code.google.com/p/bjspell) which does the job. Let's start with writing the HTML. We need a contenteditable div with the spellcheck attribute set to false. This is because we don't want to use the default browser spellchecking, we want our own implementation. 

```html
<div id="text" contenteditable spellcheck="false"></div>

<button id="check" disabled>Check</button>
<button id="reset">Reset</button>
```

It's best to add some css rules to the contenteditbale div because we want to style it as an inputfield. The minimum height is required because otherwise the div will collapse to height = 0. Also, let's add some styling to correct and misspelled words so users can spot their spelling mistakes.

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

Let's load in bjspell from the [bjspell repository](https://github.com/maheshmurag/bjspell). In this example I'm using the en_US dictionary. The available dictionaries are de_DE, en_GB, en_USE, es_ES, fr_FR, it_IT. You can also compile your own but that's beyond the scope of this tutorial. 

```javascript
var check =  document.querySelector('#check');
var div = document.querySelector('#text');use 
var reset = document.querySelector('#reset');

var dictionary = 'https://rawcdn.githack.com/maheshmurag/bjspell/master/dictionary.js/en_US.js';
var lang = BJSpell(dictionary, function() {
  check.disabled = false;
});
```

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

```javascript
reset.addEventListener('click', function() {
  div.innerText = div.innerText;
});
```

<p data-height="265" data-theme-id="0" data-slug-hash="VEGdqo" data-default-tab="js,result" data-user="Afirus" data-pen-title="Client-side spellchecking, contenteditable DIV" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/VEGdqo/">Client-side spellchecking, contenteditable DIV</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>



