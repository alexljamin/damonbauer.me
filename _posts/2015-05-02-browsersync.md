---
layout: post
title: What is BrowserSync and How Do You Use it?
date:  2015-05-02
description: "Edit and test your website faster and more consistently by automatically injecting changes and synchroning interactions by using BrowserSync."
---

If you've not used [BrowserSync](http://browsersync.io) in your daily workflow, you're missing out. It's become an indispensible tool for me in the past two years by improving efficiency and reducing cross browser inconsistencies. In this post, I'll introduce BrowserSync and explore a few use cases that I use on a regular basis.
<!--more-->

##What is BrowserSync?
From the [website](http://browsersync.io):

> BrowserSync makes your tweaking and testing faster by synchronising file changes and interactions across multiple devices.

By connecting any number of devices & browsers a BrowserSync created URL can:

* **Scroll on one browser**; other browsers follow the scroll to the same point
* **Click links**; other browsers load the clicked URL
* **Fill out & submit forms**; other browsers submit
* **Test responsive designs**; see your site rendered on different devices at one time
* **Change HTML, CSS & JS**; automatically inject those new files without a page refresh

***All of this is available free and is open source.***

Having the ability to perform the actions listed above has helped me become a better tester of my own work before sending it to my QA team. I've been able to test faster, more consistently and more accurately.

##A Basic Implementation of BrowserSync
It's incredibly simple to get a basic BrowserSync setup running, assuming you have NPM installed already. If you don't, [do that now](http://blog.npmjs.org/post/85484771375/how-to-install-npm).

**From the command line, enter your project's directory & install BrowserSync:**

{% highlight bash %}
$ npm install browser-sync --save-dev
{% endhighlight %}<br>
**Start BrowserSync:**

{% highlight bash %}
$ browser-sync start --files "app/css/*.css, app/js/*.js" --server
{% endhighlight %}<br>
That's it! This will start a BrowserSync instance, spin up a local web server and watch `.css` & `.js` files, injecting them into the browser whenever changes are made.

##BrowserSync & Rails
Since Rails handles assets using the asset pipeline and has it's own web server, you might think BrowserSync can't work with this environment&hellip;but it can! The only caveat is that when a file changes, it will cause a full browser refresh instead of just injecting the new file. Let's head back to the command line, where we'll use a new BrowserSync flag:

{% highlight bash %}
$ browser-sync start --proxy localhost:3000 --files "app/assets/stylesheets/**/*.scss, app/assets/javascripts/**/*.js, app/views/**/*.html.erb"
{% endhighlight %}<br>
In this setup, we've dropped the `--server` flag in favor of the `--proxy` flag. This tells BrowserSync to watch an already existing site (in this case, localhost:3000) instead of creating it's own.  We're also watching the asset pipeline for changes to `scss` & `js` files as well as the Rails "views" `erb` files.

##BrowserSync & Build Tools
So far, we've looked at using BrowserSync from the command line, which is a quick and easy way of using it. If you are using a build tool such as [Gulp](http://gulpjs.com), [Grunt](http://gruntjs.com/) or [NPM scripts](https://docs.npmjs.com/misc/scripts), BrowserSync can be integrated into these as well.

A most basic implementation using Gulp looks like the following:

{% highlight javascript %}
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
{% endhighlight %}<br>
Here is a more useful setup, which watches changes to `.scss` files, compiles to `.css` and injects the changes using BrowserSync:

{% highlight javascript %}
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
{% endhighlight %}<br>
_These examples are from the BrowserSync [documentation](http://www.browsersync.io/docs/gulp/)._

##Wrap Up
There are lots of other things that BrowserSync gives you out of the box that I haven't gone into in this post. All of the [options](http://www.browsersync.io/docs/options/), [api](http://www.browsersync.io/docs/api/) and [recipes](http://www.browsersync.io/docs/recipes/) are available on the BrowserSync website.

I've been using this tool for a little over two years; I've seen it grow into a solid, continually improved resource that just keeps getting better. It has a healthy amount of [activity on GitHub](https://github.com/BrowserSync/browser-sync/pulse/monthly), which is important for the life of an open source project. The [folks](https://twitter.com/browsersync) behind BrowserSync are doing wonderful things; here's to much more of it to come!
