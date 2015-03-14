---
layout: post
title: "Implementing SVG"
date:  2015-03-14
categories: svg
---
SVG has started to gain traction in the front end scene in the last few months<sup>1</sup>, thanks in part to the amazing work of some very smart people. For some time now, I've wanted a way to replace icon fonts with more a semantic, accessible and performant solution while maintaining the resolution independence and ease of use that comes with using icon fonts. So, I decided to explore the world of SVG and find a solution that is easy to implement & maintain, performant, accessible and cross-browser compatible.
<!--more-->

I'm writing somewhat specifically with regards to using SVGs to create an icon set; by this I mean: multiple icons that serve as both decoration and as content images to be used in all areas of a website (global elements or otherwise).

Here are all the ways I explored implementing SVGs, and a pros & cons list for each.

* Sprite
* Background image
  * path
  * data uri, embed svg
  * data uri
* <use>
* inline <svg>
* <img>
* Others
** icon packs (iconic, evil icons)

Perhaps the most important thing I learned while investigating these various options is that there are trade offs and sacrifices that you will have to make. No one solution is perfect, nor is one solution the best in every scenario. You have to determine what's most important to you (e.g., performance, maintainability, browser support, level of interactivity), and decide which implementation you should pursue.

<style type="text/css">
  .svg-method {
    -webkit-columns: 2 200px;
       -moz-columns: 2 200px;
            columns: 2 200px;
    -webkit-column-gap: 4em;
       -moz-column-gap: 4em;
            column-gap: 4em;
    -webkit-column-rule: 1px dotted #ddd;
       -moz-column-rule: 1px dotted #ddd;
            column-rule: 1px dotted #ddd;
  }
</style>

<section class="svg-method">
  ###Sprite
  **Pros**

  * Single HTTP Request
  * Can be sized using background-size
  * Easy to add to markup (`<i class="icon icon--feed"></i>`)

  **Cons**

  * Have to duplicate icon & change fill color if you want interaction states (can't change attrs at all)
  * Creates an abundance of selectors
  * Complex build steps
  * If resizing with background-size, background-position needs updated too.

</section>

<section class="svg-method">
###Background Image (Path)
**Pros**

* Easy to add to markup (`<i class="icon icon--feed"></i>`)
* Easily sized using background-size

**Cons**

* Multiple HTTP requests
* Can't tweak (fill, stroke,etc)

</section>

<section class="svg-method">
###Background Image - Data Uri (Embed SVG)
**Pros**

* Reduced HTTP requests
* Easy to add to markup (`<i class="icon icon--feed"></i>`)

**Cons**

* Requires selectors to have redundant code
* IE
* Can only change SVG attrs on the fly by duplicating selector (hover, active, etc)

</section>

<section class="svg-method">
###Background Image - Data Uri (Base 64)
**Pros**

* Reduced HTTP requests
* Simple to add to existing selectors or to markup ("<i class="icon icon--feed"></i>)

**Cons**

* Bad for Performance
* Can't tweak (fill, stroke,etc)
* Illegible

</section>

<section class="svg-method">
###SVG <use>
**Pros**

* All svg shapes into one central location
* Easy to style

**Cons**

* Duplicated markup on every page (unless Ajax'ed, but suffers from cross browser inconsistencies, and JS for icons, CORS)
* Added markup to display a single element

</section>

<section class="svg-method">
###<img>
**Pros**

* Easy to include
* Can be resized easily

**Cons**

* Each <img> adds an HTTP request
* Can't be styled at all

</section>


##TL;DR

* There is no one size fits all solution
* I'd almost always stay away from base64 encoded SVGs
* If you care most about ease of _implementation & maintainability_: **background image (path)** or **<img src>**
* If you care most about _performance_: **sprite** or **background-image (embed)**
* If you care most about _interaction_: **<use>** or **background-image (embed)**

##Wrap Up
Hopefully that helps breakdown the pros & cons of the various SVG implementation methods available today. If I missed something or you have questions or comments, please send me a tweet or email me.

###Footnotes:
[1]: http://www.google.com/trends/explore#q=svg
