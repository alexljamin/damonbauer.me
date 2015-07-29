---
layout: post
title: Migrating code from ES3 &rarr; ES5 &rarr; ES6
date:  2015-07-28
description: "A look at how a snippet of code can be written with ES3, ES5 and ES6."
---

I've been trying to find ways to make small gains in my overall understanding of JavaScript. While working on a code sample for a different blog post, I knew there was probably a way to improve what I'd written, so I reached out to [a friend][1] to get some advice.
<!--more-->

##The Code In ES3
I started out with the following code, written with ES3. To be truthful, this example is the level of JavaScript I know and it worked, so it served its purpose. However, knowing that my JavaScript understanding isn't at the level where I want it to be, I didn't want to just end it here.

{% highlight js %}
window.$ = function(selector) {
  return document.querySelector(selector);
};

var setup = function() {
  this.ad = "";
  this.adContainer = $(".Ad");
  this.visibleClass = "is-visible";
  this.adUrl = "//codepen.io/damonbauer/pen/LVgxxN.html";

  var that = this;

  reqwest({ url: that.adUrl, crossOrigin: true })
    .then(function(response) {
      that.ad = response;
    }).fail(function() {
      that.ad = "Ad could not be loaded.";
    }).always(function(response) {
      that.adContainer.innerHTML = that.ad;
  });
};
{% endhighlight %}<br>

While this does work, I wanted to get rid of the `var that = this` for three reasons:

1. **Clutter.** Adding an extra variable assignment adds code and forces context switching.
2. **It looks/feels wrong.** I could use `self` instead of `that`, but that doesn't solve the larger problem.
3. **I haven't seen it used lately.** The biggest reason I wanted to change this is because I don't see this sort of code used much any more. I kept thinking "there has to be better ways of doing this".

##Improved Using ES5
Along with ES5 came [loads of new methods][2], one of which is `Function.prototype.bind()`. From the [MDN docs][3]:

>The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value.

Ben Howdle [explains `bind` way better than I could][4] over at Smashing Magazine. For now, let's look at the previous example and see how `bind` changes it:

{% highlight js %}
var setup = function() {
  // vars...

  reqwest({ url: this.adUrl, crossOrigin: true })
    .then(function(response) {
      this.ad = response;
    }.bind(this)).fail(function() {
      this.ad = "Ad could not be loaded.";
    }.bind(this)).always(function(response) {
      this.adContainer.innerHTML = this.ad;
    }.bind(this))
  };
};
{% endhighlight %}<br>

This works great and we no longer need to store an extra property. I do find it somewhat annoying that `.bind(this)` has to be written for every function, whereas `var that = this` from the first example is only written once. I think it's a small price to pay and I'm willing to do so in this instance.

##Simplified By Writing With ES6
Let's take this to the next level! To use the next example, I'd recommend using [Babel][5] compile ES6 back down to ES5, so browsers that don't yet understand ES6 will still function.

The `=>`, known as the ["fat arrow"][7] can be used to simplify anonymous functions and automatically binds `this` for you.

{% highlight js %}
var setup = function() {
  // vars...

  reqwest({ url: this.adUrl, crossOrigin: true })
    .then((response) => this.ad = response)
    .fail(() => this.ad = "Ad could not be loaded.")
    .always(() => this.adContainer.innerHTML = this.ad);
};
{% endhighlight %}<br>

The first time I saw this, I [did a dance][8]. The conciseness and readability of this code is awesome! What I learned:

* if the function doesn't have any arguments, writing `()` creates an anonymous function
* if the function has one argument, it is written to the left of the fat arrow, with parentheses optionally surrounding the argument
* the function will return the value of the expression to the right of the fat arrow

After seeing this, I'm really excited to start learning more and getting to know ES6.

##Next Steps
I've started to take a more critical look at how I can improve my breadth and depth of knowledge of JavaScript, even in the smaller, more basic tasks. Additionally, I think I'll start doing things like write [ES6 Katas][9], [watch talks][10] and [read][11] [books][12]. If you have any resources/tips for learning ES6 (or advancing in JavaScript understanding in general), I'd love to hear them - [let me know on Twitter][13].

[1]: http://twitter.com/elijahmanor
[2]: http://speakingjs.com/es5/ch25.html
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[4]: http://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
[5]: https://babeljs.io/
[6]: https://github.com/google/traceur-compiler
[7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[8]: http://media3.giphy.com/media/bTzFnjHPuVvva/giphy.gif
[9]: http://es6katas.org/
[10]: https://github.com/ericdouglas/ES6-Learning#talks
[11]: https://leanpub.com/understandinges6/read
[12]: https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond
[13]: http://twitter.com/damon_bauer
