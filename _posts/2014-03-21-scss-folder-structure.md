---
layout: post
title: Scss/Sass Folder Structure
date:  2014-03-21
categories: scss
description: "Explaining the how and why behind my Sass folder structure."
---

The following is how I set up my Sass folders for my projects. This is a jumping off point for new projects, so I am at liberty to add or remove Sass files as I see fit. By no means is it an end-all solution, but I find it works well to get going quickly. I feel like there is definitely room for improvement, so please feel free to chime in with suggestions!

<!--more-->

##The Structure
Inside of my main `/sass/` folder lives:

* home.scss
* style.scss
* sub.scss
* partials/

The three `.scss` files are what get compiled to CSS and subsequently what I link to in my HTML. Their contents are simply `@import` statements of Sass partials, which is where most of the files I use live. I really like breaking things into logical chunks; for instance, I know if I have to edit navigation in the header, I simply go to the header navigation partial and edit. Having things in modular pieces keeps things organized and has less of a chance for files to get overly cluttered.

##Partials
The /partials folder looks like this:

* home/
  * **_content.scss**: Content that is unique to the home page.
* sub/
  * **_content.scss**: Content that is unique to the sub pages.
* **_content.scss**: Any content areas that will are consistent throughout the entire site.
* **_extends.scss**: Holds any `@extend` that I might be using. Typically I utilize this by adding fonts to a silent class, like `%OpenSans`.
* **_footer.scss**: Styles for the footer.
* **_global.scss**: Contains things like global box sizing, standard link `:hover` & `:focus` styles, etc.
* **_header.scss**: Styles for the header.
* **_header_navigation.scss**: Styles for header navigation. This gets imported inside of `_header.scss`.
* **_mixins.scss**: Mixins that I have gleaned or written.
* **_variables.scss**: Colors, breakpoint sizes, and Susy grid configurations are all things you can find here.
That’s pretty much it. Again, this is just my starting point. I usually end up with a few more partials, such as a `_home_slider.scss`, `_forms.scss` or `_print.scss`.

##A Word of Caution
Like most things, I’ve found that moderation is key. Over-fragmenting (is that a thing?) my partial files usually causes headaches down the road, especially when coming back to a project to make changes. For example, I was previously creating a `_layout.scss` partial and putting widths, floats, borders, etc. on elements (such as the header).

Since `_layout.scss` was intended strictly for building the structure of the page, I felt “dirty” putting decoration styles in the same location, so I had to create a `_header.scss` partial. Then I would have to reference `header { ... }` multiple times in multiple files and keep track of where I put certain styles (when do I consider a border layout vs. decoration?). I’ve found it easier and faster to put everything dealing with the header (layout, typography, decoration, etc) into one partial.
