# jQuery.noSpamQuiz.js

A simple jQuery plugin to prevent spammers.

## About

This jQuery plugin is based on a Wordpress plugin I stumbled upon, named [NRKbeta Know2Comment](https://github.com/nrkbeta/nrkbetaquiz). It tries to prevent visitors leave comments without actually reading the article first. The idea is very simple but I believe it could be quite powerful.

Before exposing the comment form at the end of the article, it renders a number of pre-defined questions specific to the article it's displayed on. If the visitor answers all the questions correctly, the quiz form would be replaced with the hidden form.

Any user interaction could be bundled with this plugin to ensure participants actually reads the content before they interact with the website.

## Usage

The plugin options can also be defined using the `data-nospamquiz` attribute.

``` html
<div id="comment-form-quiz"
  data-nospamquiz='{
    "prize": "#comment-form",
    "questions": [
      {
        "question": "What is the name of the Wordpress plugin author inspired from?",
        "choices": [
          "Disqus",
          "Know2Comment",
          "Gutenberg"
        ],
        "correctAnswer": 1
      },
      {
        "question": "What is the radius of Earth?",
        "choices": [
          "6,371 kilometers",
          "371 kilometers",
          "200 kilometers"
        ],
        "correctAnswer": 0
      }
    ]
  }'></div>
<hr> <!-- this immediate element cannot be used -->
<hr>
<div id="comment-form"><!-- i.e. Comment form --></div>
```

``` js
$('#comment-form-quiz').nospamquiz({
  headlineMarkup: '<h2 class="h4"></h2>',
  headline: 'Jeopardy',
  intro: 'Please answer the following questions to enable the comment form for this post.',
  onComplete: function() {
    alert('Thank you for all the correct answers. Now you can use the comment form.');
  }
});
```

## Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
headlineMarkup | string | `<h2></h2>` | The quiz header is wrapped with this markup.
headline | string | Quiz | The quiz header text.
introMarkup | string | `<p></p>` | Introduction text wrapping markup.
intro | string | `Please answer the following questions to enable the form.` | Introduction text explaining what the quiz is about.
questions | object | `[]` | Required. JSON object containing the questions.
failureMarkup | string | `<p></p>` | Failure message wrapping markup.
failure | string | `You must answer all questions correctly.` | Failure message text
prize | mixed (jQuery selector / jQuery object) | `this.$el.next()` | The DOM element to be shown upon successful completion. Default is the immediate element in the DOM tree.
onComplete | function | `null` | Callback function.
