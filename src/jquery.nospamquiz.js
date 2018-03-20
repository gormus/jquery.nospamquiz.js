;(function(factory) {

  "use strict";

  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  }
  else if (typeof exports !== "undefined") {
    module.exports = factory(require("jquery"));
  }
  else {
    factory(jQuery);
  }

}(function($) {
  var instanceId = 0;

  var NoSpamQuiz = {
    init: function(settings, el) {
      var dataSettings;

      this.el = el;
      this.$el = $(el);
      this.name = "nospamquiz";
      this.defaults = {
        headlineMarkup: "<h2></h2>",
        headline: "Quiz",
        introMarkup: "<p></p>",
        intro: "Please answer the following questions to enable the form.",
        questions: [],
        failureMarkup: "<p></p>",
        failure: "You must answer all questions correctly.",
        prize: this.$el.next(),
        onComplete: null
      };
      this.instanceId = instanceId++;

      dataSettings = this.$el.data(this.name) || {};

      this.options = $.extend({}, this.defaults, settings, dataSettings);

      if (typeof this.options.prize === "string") {
        this.options.prize = $(this.options.prize);
      }

      this._build();

      return this;
    },

    _build: function() {
      var e = this.el,
          $e = this.$el,
          o = this.options,
          n = this.name,
          id = this.instanceId;

      o.prize.hide();

      var correctId = o.questions.map(function(q) { return q.correctAnswer; }).join("");
      var storageName = n + location.pathname + id;

      if ((localStorage.getItem(storageName) === correctId) || (o.questions.length === 0) ){
        $e.hide();
        o.prize.show();
      }

      if (o.headline) {
        var headlineMarkup = $(o.headlineMarkup).text(o.headline);
        $e.append(headlineMarkup);
      }

      if (o.intro) {
        var introMarkup = $(o.introMarkup).text(o.intro);
        $e.append(introMarkup);
      }

      var _buildAnswer = function(text, name, value) {
        var label = document.createElement("label");
        var input = label.appendChild(document.createElement("input"));

        label.appendChild(document.createTextNode(text));

        input.type = "radio";
        input.name = name;
        input.value = value;

        return label;
      };

      var dl = document.createElement("dl");

      o.questions.forEach(function(question, index) {
        var dt = document.createElement("dt");
        var dd = document.createElement("dd");
        dl.appendChild(dt).textContent = question.question;
        dl.appendChild(dd);

        question.choices
          .map(function(label, val) { return label && _buildAnswer(label, n + "-" + index, val); })
          .sort(function() { return 0.5 - Math.random(); })
          .forEach(function(node) { node && dd.appendChild(node); });
      });

      var failureMarkup = $(o.failureMarkup).text(o.failure);

      e.appendChild(dl);

      e.addEventListener("change", function() {
        var checked = o.questions.map(function(q, i) {
          return dl.querySelector("input[name=\"" + n + "-" + i + "\"]:checked");
        });

        var correct = o.questions.every(function(q, i) {
          return checked[i] && Number(checked[i].value) === Number(q.correctAnswer);
        });

        var failure = !correct && checked.filter(Boolean).length === o.questions.length;
        var _onComplete = o.onComplete;

        if (correct) {
          localStorage.setItem(storageName, correctId);
          $e.hide("slow");
          o.prize.show("slow");

          if ($.isFunction(_onComplete)) {
            _onComplete.call(this);
          }
        }
        else if (failure) {
          $e.append(failureMarkup);
        }
      });
    }
  };

  $.fn.nospamquiz = function(options) {
    if (this.length) {
      return this.each(function() {
        var obj = Object.create(NoSpamQuiz);
        obj.init(options, this);
        $.data(this, "nospamquiz", obj);
      });
    }
  };
}));
