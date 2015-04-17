---
layout: post
title: 'Is There a &ldquo;Better&rdquo; Text Decoration?'
date:  2015-04-17
categories: css
description: "Using some clever CSS3, you can mimic text-decoration to make some interesting design effects."
---

Are you looking to change the thickness, color, opacity or position of `text-decoration`? While the following technique isn't _actually_ using this property, I'm going to demonstrate a way to fake some neat visual changes that simulate this property and take it a step further.
<!--more-->

##Limitations of text-decoration
There are a few CSS properties that exist to modify the default `text-decoration` styles, including:

* [text-decoration-color](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color)
* [text-decoration-line](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line)
* [text-decoration-style](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style)

The bad news is that these properties are currently [only supported by Firefox](http://caniuse.com/#search=text-decoration-color) (and latest Safari with prefixes). Even if you were OK with only supporting this limited set of browsers, you still can't change properties such as animation, opacity or thickness.

##A New Way
I looked at [Wired](http://wired.com/) & [The Bold Italic](http://www.thebolditalic.com/) as inspiration for this technique. As I saw these implementations, I knew there had to be a different way to make text-decoration more stylish!

By using `box-shadow` on a piece of text, you can. Even better, `box-shadow` has full access to modifying properties like opacity, animations, colors, height, etc! [The example below](http://codepen.io/damonbauer/pen/mJbyVm?editors=110) demos this technique.

For an anchor, I've applied `text-decoration: none` to hide the browser default underlining. Then, I've added `box-shadow: 0 -25px 0 coral inset`. Setting the *vertical offset* (-25px) pulls the box-shadow up underneath the text & gives the underline it's height. Setting *inset* puts the underline at the baseline of the text.

You may choose to not disable the underline & feature detect if the browser supports `box-shadow` to progressively enhance the users experience. You could do this with [Modernizr](http://modernizr.com), for instance. This would look something like:

{% highlight css %}
a {
  text-decoration: underline
}

html.box-shadow a {
  text-decoration: none;
  box-shadow: 0 -25px 0 coral inset;
}
{% endhighlight %}<br>

##Demo

<p data-height="380" data-theme-id="12496" data-slug-hash="mJbyVm" data-default-tab="result" data-user="damonbauer" class='codepen'>See the Pen <a href='http://codepen.io/damonbauer/pen/mJbyVm/'>Thick "text-decoration"</a> by Damon Bauer (<a href='http://codepen.io/damonbauer'>@damonbauer</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script><br>

As you can see in the demo, hovering over the text changes the color & height of the underline with a smooth transition. The standard `text-decoration` can't do that! It becomes very trivial to make changes to the underlining when using media queries, too. Resizing the window & zooming don't break this technique, either.

##Caveats

There are a few small caveats that should be noted before implementing this solution.

* Text being underlined must be `display: inline`
* Browser has to support [`box-shadow`](http://caniuse.com/#search=box-shadow); this is actually better than the `text-decoration-*` properties listed above, though.

So far, the only downside I've found to this method refers to the first bullet point above. If you want to constrain the width of the text element, you must do that with a parent element because of the `display: inline` requirement.
