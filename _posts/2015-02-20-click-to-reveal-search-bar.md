---
layout: post
title: "Click to Reveal Search Bar"
date:  2015-02-20
categories: scss
---
In the interest in of feature parity between desktop & mobile experiences, I’ve recently been working on adding search to the mobile view of my employer’s website, [daveramsey.com](http://daveramsey.com). The following is an explanation of why and how I am going about adding an click-to-reveal search bar on small screens.
<!--more-->

##What Exactly Am I Talking About?
The concept of this idea is very simple, and I guarantee you’ve seen and used something similar in the past. Esentially, my aim is to click on a search icon and have the input textbox animate and be in focus.

Here’s a quick demonstration of what we’ll build:
![Demonstration of the search bar in action]({{ site.url }}/assets/images/search-demo.gif)

##Why a Click-to-Reveal Search Bar?
There are a couple of reasons why I wanted to add search to small screens. The first, as mentioned above, is feature parity. I’m striving to make the code base, content and experience aligned across all screen sizes. Secondly, it saves space & declutters the interface while being visually interesting and provides value to the consumer. I’d consider this a win on all accounts!

##How do you build it?
Knowing the reason behind this idea and the basic concept of how it should work, lets get started.

###HTML
{% highlight html %}
<form class="Search">
  <input type="text" class="Search-box" id="Search-box" placeholder="Search this site...">
  <label for="Search-box" class="Search-box-label">
    <span class="Search-icon">Search</span>
  </label>
  <span class="Search-close">
    <i class="Search-close-icon">Close</i>
  </span>
</form>
{% endhighlight %}<br>

Inside of a `form`, there are three DOM elements:

* `input type="text"`, where a user types their search query
* `label`, associated with the input field
* `span`, that holds the close button

**The most important part of this code, _the part that enables the whole concept_, is the `label for="Search-box"` code.** The this attribute ties to the ID of the input field. If you didn’t know, the `for` attribute of the `label` allows a user to click the label and focus into the associated `input` field.

###Scss
{% highlight scss %}
.Search-box {
  float: right;
  width: 50%;
  height: 100%;
  border: 0;
  outline: 0;
  padding-left: 0.75rem;
  font-style: italic;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform ease 500ms;

  &:focus {
    transform: translateY(0);
    opacity: 1;

    + .Search-box-label {
      z-index: -1;
      opacity: 0;
    }

    ~ .Search-close {
      z-index: 3;
      opacity: 1;
    }
  }
}

.Search-box-label,
.Search-close {
  position: absolute;
  right: 0;
  z-index: 2;
  cursor: pointer;
  height: 100%;
  width: 3rem;
  transition: opacity ease 250ms 250ms;
}

.Search-close {
  opacity: 0;
  z-index: 0;
}

.Search-icon,
.Search-close-icon {
  @extend %hide-text;
  @extend %icon;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("data:image/svg+xml;utf8,...");
}

.Search-close-icon {
  background-image: url("data:image/svg+xml;utf8,...");
}

%hide-text {
  text-indent: 100%;
  overflow: hidden;
}

%icon {
  display: block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
}
{% endhighlight %}><br>

Let’s start at the top. I’ll be stripping the above code down to the relevant positioning properties, not including extra code that I included just for styling purposes.

{% highlight scss %}
.Search-box {
  transform: translateY(-100%);
  opacity: 0;
  transition: transform ease 500ms;
{% endhighlight %}<br>

After pairing the code down, we’re left with only: setting the opacity to 0, pulling the input box up (akin to `top` or `margin-top`, and setting a transition to ease the input box in.

{% highlight scss%}
.Search-box-label,
.Search-close {
  position: absolute;
  right: 0;
  z-index: 2;
  transition: opacity ease 250ms 250ms;
}
{% endhighlight %}<br>
For the icons (magnifying glass, close button), I position them absolutely to the right, set the z-index to a specific number (it doesn’t matter at this point), and set a transition; this time, the transition has a bit of a delay (the second of the `250ms`). The delay is so that the icons don’t fade in/out before the input box has time to animate in.

The other code simply positions the icons inside of their containers. You can use any method you choose, but I find the above to be simplest.

{% highlight scss %}
.Search-box {
  ...

  &:focus {
    transform: translateY(0);
    opacity: 1;

    + .Search-box-label {
      z-index: -1;
      opacity: 0;
    }

    ~ .Search-close {
      z-index: 3;
      opacity: 1;
    }
  }
}
{% endhighlight %}<br>
Here’s where this idea comes to life. Recall from above: a `label for` attribute that’s associated to an `input` with a matching ID will focus that input when the label is clicked.

The label contains the magnifying glass icon, which, when clicked, applies focus to the input box. The scss above repositions & increases opacity when the input box is in the `:focus` state. This brings the input box into view.

The label (targeted with the [adjacent sibling](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_selectors) "`+`" selector) fades out and goes behind everything with `z-index` for good measure.

The close button (targeted with the [general sibling](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors) "`~`" selector) fades in and sits on top of the input box (since it has `z-index: 2` and the close button has `z-index: 3`). When the close button is clicked/tapped, the input box loses focus and all of the elements return to their default state.

##Demo
Now that you’ve seen the why and the how, check out a [live version](http://codepen.io/damonbauer/full/OPvKPG/); feel free to fork the pen and make it your own!

<p data-height="268" data-theme-id="12496" data-slug-hash="OPvKPG" data-default-tab="result" data-user="damonbauer" class='codepen'></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
