---
layout: post
title: "Organizing Jekyll Pages"
date:  2015-03-28
categories: jekyll
description: "Move static pages into a central folder for better folder structure & organization using Jekyll."
---

I realize I'm pretty late to the game, but [Jekyll](http://jekyllrb.com) is great. I've tried various blogging platforms & tools in the past, but since making the switch to Jekyll a few months ago, I've been encouraged to keep writing. One thing that has bugged me about using Jekyll is the way it's set up to handle static pages. No more!

<!--more-->

By default, Jekyll allows you to add pages instead of posts by simply [adding folders](http://jekyllrb.com/docs/pages/) to the root directory. However, I'm not fond of littering the root directory with lots of extra folders. Instead, I'd prefer to follow the same folder paradigm, which would allow for putting static pages in a `_pages` directory. Setting this up is actually pretty simple.

<style type="text/css">
@media screen and (min-width: 50em) {
  .col-wrap {
    display: flex;
  }

  .col-wrap .col {
    flex: 1;
    width: 50%;
  }
}
</style>

<section class="col-wrap">
<div class="col">
{% markdown %}
We'll go from this:<br>
![The old folder structure](/assets/images/jekyll-pages/old.png)
{% endmarkdown %}
</div>

<div class="col">
{% markdown %}
to this:<br>
![The new folder structure](/assets/images/jekyll-pages/new.png)
{% endmarkdown %}
</div>
</section>

The first thing to do is add a folder called `_pages` to your site's root folder (at the same level as `_posts`, `_layouts`, etc).

##Update Jekyll Config
The next step is to add your new `_pages` directory to the list of folders Jekyll will process when building. Modify your `_config.yml` to list a hash of "includes":

```
include: ["_pages"]
```

I follow the pattern of keeping [dates out of URLs](http://mattgemmell.com/permalinks/), and I think you should too. To keep your URL structure as clean as possible, you need to update the `permalinks` configuration as well. Place this change in `_config.yml` as well.

```
permalink: /:title/
```

This will make your site's URLs succinct and easy to read; in my opinion, there isn't a reason not to make this simple change.

##Build a Page
Now you're ready to make some pages. In your new `_pages` directory, create another folder, say `about`; create an `index.html` or `index.md` inside the folder.

In addition to any normal YAML front matter your pages/posts usually needs, you'll need to add the following:

```
permalink: "/about/"
```

Notice the forward slashes before and after the name of the page. They are mandatory in both spots. The permalink should match the name of the folder that this file lives in.

##Jekyll Build (or Serve)
The last step is to build or serve your site. You should be familiar with this task, but if you aren't, open your command line and run `jekyll build` or `jekyll serve`. You'll probably want to attach the `--watch` flag to either command to automatically process new changes to pages or posts.

That's all there is to it! Pretty easy, right? With just a couple of modifications to your `_config.yml`, you can better organize your site's pages and folder structure.
