---
layout: post
title: "Incrementing color SCSS mixin"
date:  2014-01-08
categories: scss responsive
---
Recently, I built a small little [responsive navigation thing](http://codepen.io/motoxer4533/full/FcqEs) for a challenge on [Treehouse](http://teamtreehouse.com). I wanted links that had “incremented” or “stepped” colors from lighter to darker. Rather than figure out each color and place it one by one, I opted to build a small SCSS mixin to do the work for me.

<!-- more -->
{% highlight scss %}
@mixin bgColor($count, $color) {
  $loop_color: $color;
  @for $i from 0 through $count {
    $loop_color: shade($loop_color, 8%);
    &:nth-of-type(#{$i}) > a {
      background-color: $loop_color;
    }
  }
}
{% endhighlight %}<br>

Let’s break it down real quick.

{% highlight scss %}
@mixin bgColor($count, $color)...
{% endhighlight %}<br>
Line 1 opens up our @mixin and allows us to pass in two arguments. If you’re not familiar with mixins, you can [read about them here](http://thesassway.com/intermediate/leveraging-sass-mixins-for-cleaner-code).
{% highlight scss %}
$loop_color: $color;
@for $i from 0 through $count...
{% endhighlight %}<br>

Line 2 sets a variable of `$loop_color` to the color you pass as an argument when calling this mixin (for use later in the mixin). Line 3 is the beginning of the meat of the mixin. We start a `@for` loop that says “for every number from 0 through $count” (where `$count` is what you pass as the first argument in the mixin), apply the following code.
{% highlight scss %}
$loop_color: shade($loop_color, 8%);
{% endhighlight %}<br>

This is where the action gets hot. Every time line 4 is called, it “shades” the `$loop_color` variable by 8%. But since we’re in a `@for` loop, it shades the previously set color by 8%. This is where the “incremented” or “stepped” color is built.
{% highlight scss %}
&:nth-of-type(#{$i}) > a {
  background-color: $loop_color;
}
{% endhighlight %}<br>

Lastly, we need to bind the resulting color of this run through the @for loop to something. In my case, I wanted to set the anchor link inside a list item. So, using the `&:nth-of-type` selector, you can bind the incremented number from the @for loop (`$i`) to the `li:nth-of-type()` selector by using `#{$i}`.

Using this syntax &ndash; `#{}` &ndash; will output the result of the @for loop into your CSS - perfect for automatically choosing the next list item. This is called *interpolation*.

The final piece of this line of code is setting the `background-color` to the resulting shaded color.

##How to Use
Since I wanted to select the direct anchor of a list item (`li:nth-of-type(n) > a`), I used this mixin like so:
{% highlight scss %}
nav {
  li {
    @include bgColor(3, #BADA55);
  }
}
{% endhighlight %}<br>

This is just selecting the list item and calling the mixin with my 2 arguments. In this case, I want to select 3 list items and incrementally shade the color #BADA55. This is the CSS output:
{% highlight scss %}
nav li:nth-of-type(1) > a {
  background-color: #9db847;
}

nav li:nth-of-type(2) > a {
  background-color: #90a941;
}

nav li:nth-of-type(3) > a {
  background-color: #849b3b;
}
{% endhighlight %}<br>


There are many more uses for mixins like this &ndash; you just have to think of how to programatically step through what you would normally do manually. If you have any questions, comments or suggestions, please feel free to [tweet me](https://github.com/{{ site.github_username }}).
