---
layout: post
title: Chrome Filmstrip & Improving Page Speed
date:  2015-06-19
description: "Enable an experimental feature of Chrome to see how quickly your site is loading."
---

You may have heard of the wonderful site, [WebpageTest](http://webpagetest.org), when researching ways to improve your site performance. One of the most useful features (in my opinion) is the Filmstrip; it shows you incremental screenshots of the browser rendering your site, so you can see how quickly users are able to start consuming content. As of the past couple of months, you can enable similar functionality in Chrome!
<!--more-->

##What Is Filmstrip?
Simply put, the Filmstrip is a series of images that display what a page rendered at that specific millisecond of the page load lifecycle.
<video style="max-width:100%" src="/assets/videos/chrome-filmstrip/filmstrip.mp4" preload autoplay loop></video>

##Getting Filmstrip in Chrome

<div class="iframe-container">
	<iframe src="https://www.youtube.com/embed/5HZWE8-V-Fo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
<br>
First, make sure you have [Chrome Canary](https://www.google.com/chrome/browser/canary.html). Then, follow these steps:

* Go to the Chrome Flags page (chrome://flags/#enable-devtools-experiments)
* Click "Enable" under the heading "Enable Developer Tools experiments"
* Open the Dev Tools window, click the gear icon in the top right
* Click the "Experiments" link in the left side navigation
* Hit your "Shift" key 6 times, rather quickly, to show super secret options
* Check "Filmstrip in Network and Timeline Panel" to enable

You're ready to go! The filmstrip feature is now enabled. Here are the remaining steps:

* Close the options panel and head to the "Network" tab.
* Click the video camera icon. You should see a message that says: "No frames recorded. Reload page to start recording."
* **While the Dev Tools window is still focused**, hit Cmd/Ctrl + R to reload the page. (This will not work if you have the main part of the browser focused)
* Once the page is loaded, you should see incremental images of your site loading, along with the time in which each frame was rendered.

You can then click on a specific frame, then use your arrow keys to go forward or back.

I recommend enabling the "Disable cache" option at the top of the Network panel. This ensures that on each page load, Chrome will request assets new every time, just like a first time visitor to your site would be doing.

##Goals
By seeing when and how your site is painting to the screen, you can begin to find ways of improving your performance.

###Time to First Byte
If the first few seconds of the page load are a blank white screen, you need to work on improving the _Time to First Byte_. This is typically a symptom of an overloaded server (especially common if you use a shared server), or inefficient code (such as a poorly written database query) or memory leaks. [See this post for more details](http://www.websiteoptimization.com/speed/tweak/time-to-first-byte/).

###Custom Fonts
If your site is loading quickly but your text is not visible until very late, I'd assume you're using a custom font. This side effect makes your site _feel_ slower; the term being used to address this issue is **perceived performance**. In order to make your site feel faster and allow users to start reading content immediately, you can use a web font loader, which will allow you to:

* Render your content using a web safe font stack, such as `html { font-family: Arial, Helvetica, sans-serif }`, by default
* Once the web font loader has detected that your custom fonts have successfully downloaded & parsed, add a class to the `html` or `body` tag, like so:
    * Add some CSS that swaps the default font stack out for the custom font, e.g.: `html.fonts-loaded { font-family: "Open Sans", sans-serif }`

I'd highly recommend the [FontFaceOnload library](https://github.com/zachleat/font-family-reunion/blob/master/test/lib/fontfaceonload.js) by Zach Leat; I've used it with great success recently. Simply include the FontFaceOnload library, and the following snippet:

{% highlight js %}
FontFaceOnload("Open Sans", {
  success: function() {
    if ( !document.documentElement.classList.contains( "fonts-loaded" ) ) {
      document.documentElement.classList.add( "fonts-loaded" );
    }
  }
});
{% endhighlight %}<br>
The `success` method above is invoked when each variation of Open Sans that is included has completely loaded. Then, it checks to see if the `<html>` element has a class of `fonts-loaded`; if it does not, it continues and will append the class to the element, thus enabling the `html.fonts-loaded` styles as described above.

###Lazy Loading Images
The last tip I'll share is in regards to images. If you have analytics installed on your site, try to find the most common screen sizes that are visiting your site. Pick an average **height** that encompasses the majority of your visitors - this will become your "fold"<sup><a name="fold-link" href="#fold">1</a></sup>. If there are images below the fold when your page loads, you are wasting precious bandwidth and HTTP requests that could be used for other resources. I suggest to use a library like [Echo.js](https://github.com/toddmotto/echo), [Lazyr.js](https://github.com/callmecavs/layzr.js/tree/master) or [whtevr](https://github.com/callumacrae/whtevr) to lazy load your images only when they are in the viewport.

Finally, are you aware that roughly [50%+ of a page's weight is images](http://www.webperformancetoday.com/2014/12/02/page-bloat-update-average-top-1000-web-page-1795-kb-size/)? I hope you are compressing your images. If you're not, there's no excuse - there are a [myriad of tools (web, app and build tool based)](http://addyosmani.com/blog/image-optimization-tools/) that will make the process ridiculously simple.

##This is Just the Beginning
To be honest, this post started off as a quick little post to introduce an awesome little feature in Chrome Canary. It quickly (d)evolved into a performance post. However, I have barely scratched the surface as to what you can, and arguably should, be doing. Other avenues to pursue include:

* Critical Path rendering
* Asynchronous loading of JS and CSS
* Concatenation & minification
* Cache, gzip, CDN

The list of performance considerations is continuing to grow. Hopefully now you understand a little a bit more of the why and how to improve performance. After all, [it's everyone's job](http://alistapart.com/article/improving-ux-through-front-end-performance).

Feel free to reach out to me via [Twitter](https://twitter.com/damon_bauer) or [email](mailto:hello@damonbauer.me) if you need some help improving your site's performance.

_A special thanks goes out to [@elijahmanor](http://twitter.com/elijahmanor) for showing me the Chrome Filmstrip feature in the first place._

<hr class="footnote-separator">

<a name="fold"></a>

1. I know, I know. The [fold](http://thereisnopagefold.com/) [doesn't](http://iampaddy.com/lifebelow600/) [exist](http://www.lukew.com/ff/entry.asp?1946). That's why I said to use data from your site to determine a rough estimate of your user base. [&#8617;](#fold-link)
