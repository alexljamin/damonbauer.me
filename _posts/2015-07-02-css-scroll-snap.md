---
layout: post
title: CSS Scroll Snapping
date:  2015-07-02
description: "CSS continues to blur the lines between style and interaction; a relatively new property called 'scroll-snap' is no exception."
excerpt: '<p>From Sergey Gospodarets:</p>
<blockquote>
  Scroll snapping is used widely for a better separation of the provided content (vertical full height pages) or, for example, to emulate galleries behavior.<br>
  &hellip;<br>
  Can you imagine how easy would be creating such effects using CSS only? Meet the <a href="http://dev.w3.org/csswg/css-snappoints/">CSS Scroll Snap Points specification</a>!
</blockquote>'
---

From Sergey Gospodarets:

> Scroll snapping is used widely for a better separation of the provided content (vertical full height pages) or, for example, to emulate galleries behavior.
>
> &hellip;
>
> Can you imagine how easy would be creating such effects using CSS only? Meet the [CSS Scroll Snap Points specification][1]!

I've built a site or two in the past that used this "snapping to content regions" interaction. [jQuery][2] and plugins like [Waypoints][3] make it pretty easy to accomplish.

This sort of interaction driven by CSS continues to blur the lines between style and interaction; I'm undecided as to what side of the fence I'm on regarding the topic. Also, [browser support][4] isn't good yet, so a JavaScript implementation is more reliable anyway.

[Read more about CSS scroll snapping at Sergey's blog][5].

[1]: http://dev.w3.org/csswg/css-snappoints/
[2]: http://jquery.com
[3]: http://imakewebthings.com/waypoints/
[4]: http://caniuse.com/#feat=css-snappoints
[5]: http://blog.gospodarets.com/css-scroll-snap/
