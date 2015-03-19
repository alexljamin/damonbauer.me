---
layout: post
title: "Implementing an SVG Icon System"
date:  2015-03-14
categories: svg
---
In the last few months, <abbr title="Scalable Vector Graphics">SVG</abbr> has started to once again gain traction in the world of front end development<sup><a href="#footnote-1" name="fn-1">1</a></sup>, thanks in part to the amazing work of some [very](https://css-tricks.com/mega-list-svg-information/) [smart](http://sarasoueidan.com/articles/index.html) [people](http://tutorials.jenkov.com/svg/svg-and-css.html). For some time now, I've wanted a way to replace icon fonts with more a semantic, accessible and performant solution while maintaining the resolution independence and ease of use that comes with using them. I've been exploring the world of SVG and trying to find a solution that is easy to implement & maintain, light, and cross-browser compatible.
<!--more-->

I'm writing with regards to using SVGs to create an icon system; more specifically, displaying multiple icons that serve as both decoration and as content images to be used in all areas of a website (global elements or otherwise).

Here are all the ways I explored implementing SVGs and a pros/cons list for each. This is by no means exhaustive; rather, it's  a high-level summary of the positives and negatives I personally encountered:

* CSS sprite [#](#sprite)
* Background image
  * path [#](#bg-path)
  * data uri, embed svg [#](#bg-embed)
  * data uri [#](#bg-data)
* `<use>` [#](#use)
* inline `<svg>` [#](#inline)
* `<img>` [#](#img)
* Icon Packs [#](#packs)

<style type="text/css">
  h3 {
    color: #DD6A68;
  }

  .pro-con-list {
    padding-bottom: 2rem;
    border-bottom: 1px dotted #585B5E;
  }

  .pro-con-list .col {
    clear: both;
    padding: 0 1rem;
    margin-top: 0.5rem;
    text-align: left;
  }

  @media screen and (min-width: 50em) {
    .pro-con-list {
      display: flex;
    }

    .pro-con-list .col {
      flex: 1;
      width: 50%;
    }
  }

  .pro-con-list p,
  .pro-con-list ul { margin-bottom: 0 }
</style>

<a name="sprite"></a>
<h3>CSS sprite</h3>
<section class="pro-con-list">
<div class="col">
{% markdown %}
**Pros**

  * Single HTTP request
  * Can be sized using background-size
  * Easy to add to markup<br>(`<i class="icon icon--feed"></i>`)
{% endmarkdown %}
</div>
<div class="col">
{% markdown %}
**Cons**

  * No control over interaction states (unless you duplicate & modify selectors)
  * Only feasible way to add/edit icons is with a build tool
  * If resizing with background-size, background-position needs updated too
{% endmarkdown %}
</div>
</section>

<a name="bg-path"></a>
<h3>Background Image (Path)</h3>
<section class="pro-con-list">
<div class="col">
{% markdown %}
**Pros**

* Can be sized using background-size
* Easy to add to markup<br>(`<i class="icon icon--feed"></i>`)
{% endmarkdown %}
</div>
<div class="col">
{% markdown %}
**Cons**

* Multiple HTTP requests
* No control over interaction states
{% endmarkdown %}
</div>
</section>

<a name="bg-embed"></a>
<h3>Background Image - Data Uri (Embed SVG)</h3>
<section class="pro-con-list">
<div class="col">
{% markdown %}
**Pros**

* Reduced HTTP requests
* Easy to add to markup<br>(`<i class="icon icon--feed"></i>`)
{% endmarkdown %}
</div>
<div class="col">
{% markdown %}
**Cons**

* Leads to larger CSS files because you can only change SVG attributes by duplicating selector & `svg`
* IE doesn't have the best support (> IE9?)
{% endmarkdown %}
</div>
</section>

<a name="bg-data"></a>
<h3>Background Image - Data Uri (Base 64)</h3>
<section class="pro-con-list">
<div class="col">
{% markdown %}
**Pros**

* Reduced HTTP requests
* Simple to add to existing selectors or to markup ("<i class="icon icon--feed"></i>)
{% endmarkdown %}
</div>
<div class="col">
{% markdown %}
**Cons**

* [Bad for Performance](https://css-tricks.com/probably-dont-base64-svg/)
* Leads to larger CSS files because you can only change SVG attributes by duplicating selector & `svg`
* Creates illegible & unmaintainable CSS
{% endmarkdown %}
</div>
</section>

<a name="use"></a>
<h3>SVG &lt;use&gt;</h3>
<section class="pro-con-list">
<div class="col">
{% markdown %}
**Pros**

* All `svg` shapes in one central location
* Easy to style; you can access the different parts of the `svg` (e.g. path) and modify attributes (e.g. fill, stroke)
{% endmarkdown %}
</div>
<div class="col">
{% markdown %}
**Cons**

* Requires more markup to display:<br>`<svg><use xlink:href="#icon--feed" /></svg>`
* Duplicated `svg` block on every page load, not the best in regards to&nbsp;performance<sup><a href="#footnote-2" name="fn-2">2</a></sup>
{% endmarkdown %}
</div>
</section>

<a name="img"></a>
<h3>&lt;img&gt;</h3>
<section class="pro-con-list">
<div class="col">
{% markdown %}
**Pros**

* Easy to include
* Can be resized easily
{% endmarkdown %}
</div>
<div class="col">
{% markdown %}
**Cons**

* Each `<img>` adds an HTTP request
* Can't modify styles
{% endmarkdown %}
</div>
</section>

<a name="packs"></a>

###Icon Packs (e.g. [Iconic](http://useiconic.com), [Evil Icons](http://evil-icons.io))
"Off the shelf" icon packs are starting to become more popular, and for good reason. These authors have put lots of time and effort creating some wonderful products that are easy to use and are well supported in most browsers.

If you do decide to use an icon pack, be sure to take a critical look at your site's performance. Most of the icon packs I researched required JavaScript to create an Ajax request for every icon on a page. In my opinion, the benefit of easier development is not worth the extra HTTP requests and a momentary flash of the icons loading. I personally do not like having to use JavaScript just to load icons.

##The Truth of the Matter
Perhaps the most important thing I learned while investigating these various options is that there are trade offs and sacrifices that you will have to make. No single solution is perfect, nor is one solution the best in every scenario. You have to determine what's most important to you (e.g., performance, maintainability, browser support, level of interactivity), and decide which implementation you should pursue.

##TL;DR

* There is no one size fits all solution
* I'd almost always stay away from base64 encoded SVGs in your CSS
* If you care most about:
  * _ease of implementation & maintainability_: choose **background image (path)** or **&lt;img&gt;**
  * _performance_: choose **sprite** or **background-image (embed)**
  * _interaction_: choose **&lt;use&gt;** or **background-image (embed)**

In my quest to replace icon fonts, I went followed down the **CSS sprite** path the furthest. The system I came up with was brittle, hard to work with and ultimately too complex to maintain long term. I ended up sticking with icon fonts for the time being.

<hr class="footnote-separator">

<a name="footnote-1"></a>
<a name="footnote-2"></a>

1. [Google Trends showing fall and rise of SVG searches](http://www.google.com/trends/explore#q=svg) [&#8617;](#fn-1)
2. Unless you [Ajax the block of SVG onto the page](https://css-tricks.com/svg-use-external-source/). However, doing so suffers from cross browser inconsistencies and requires JS for loading icons. Requires CORS to be set up properly if serving from a CDN. [&#8617;](#fn-2)
