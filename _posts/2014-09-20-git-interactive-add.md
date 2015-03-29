---
layout: post
title: "Git Interactive Add"
date:  2014-09-20
categories: git
description: "Exploring the Git interactive command"
---
There are numerous extra scripts that come with Git that can help you create more meaningful, specific commits to your repositories. One such script is “interactive” add, which I recently discovered while working on a project.

<!--more-->

Simply put, the `git add -i` or `git add --interactive` command allows you to pick and choose certain files to add to a commit, rather than adding all recently changed files. There’s a school of thought (and a right one, in my eyes) that says to commit early and often. The benefits of such an approach are many:

* More succinct, informative commit messages
* Better continuous integration (easier to merge or revert small commits instead of one large commit with numerous changes)
* Separation of concerns: changes to business logic should be separate from formatting changes

##Using git add -i
Instead of duplicating content that already exists, I’m going to defer to [git-scm and their fantastic documentation on the topic of interactive staging.](http://git-scm.com/book/en/Git-Tools-Interactive-Staging)

##A Note On Sausage Making
Seth Roberston’s guide to [Git Best Practices](http://sethrobertson.github.io/GitBestPractices) talks about a concept of “Sausage Making”, where a developer chooses to hide (or show) all the pieces that went into making their product.

I subscribe to committing often to a feature branch; when that branch is ready to merge to master, I like keeping that commit history clean. Since I've been committing early and often to the feature branch, it is littered with commits. When the branch is ready to go into master, I use the `git merge --squash` command. The merge contains all of the feature branch’s commits combined into one, keeping the master branch commit history nice and clean.

Keep your commits small, add useful messages and push them often!
