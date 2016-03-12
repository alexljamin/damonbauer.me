---
layout: post
title: Getting Every Other Pair in a Ruby Array
date:  2016-03-11
description: "I needed to do something to every other pair of elements in a collection in Ruby. Here's how I did it."
---

On a side project I'm working on, I am building a page that has a collection of cards on it in the ["media object" format][1]. To break up the collection, since there are ~ 16 cards in total, I am using flexbox's `flex-direction: row-reverse` to swap the order of the cards for every other pair of cards. Here's a demo of what I'm referring to:

<div class="codepen">
  <p data-height="430" data-theme-id="12496" data-slug-hash="PNzepX" data-default-tab="result" data-user="damonbauer" class="codepen">See the Pen <a href="http://codepen.io/damonbauer/pen/PNzepX/">Card Component Demo</a> by Damon Bauer (<a href="http://codepen.io/damonbauer">@damonbauer</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div><br>

On the Ruby (Rails) side, I've got an instance variable, `@items`, that contains all of the items I want to iterate over. Also, I have a partial that contains the markup for a card. The partial accepts a parameter, `is_reversed`, that can be `true` or `false`. Here's what that partial include looks like:

{% highlight erb %}
<%= render "components/card", { item: item, is_reversed: reversed } %>
{% endhighlight %}<br>

## Getting Pairs

At this point, I've got the front end figured out, and the Rails partial is rendering a card for each item in `@items`. Now, for every other pair of items in the collection, I want to set `is_reversed` to `true`, so I can apply the `Card--reversed` CSS class to it. Here's how I figured out how to do that:

{% highlight erb %}
<% @items.each_slice(2).to_a.each_with_index do |pair, index| -%>
  <% reversed = index.odd? ? true : false %>
  <% pair.each do |item| -%>
    <%= render "components/card", { item: item, is_reversed: reversed } %>
  <% end -%>
<% end -%>
{% endhighlight %}<br>


On `@items`, I call `.each_slice(2)` [(docs)][2]. This iterates over `@items`, breaking it up into slices of 2 items. Once that's complete, I store _that_ as an array, so I get an array of arrays, like so:

{% highlight ruby %}
[
  [Item, Item],
  [Item, Item],
  [Item, Item],
  ...
]
{% endhighlight %}<br>

## Flagging As "Reversed"

So now I have an array whose items are arrays of 2 items each. Since I want to know if the array of 2 items is in an "odd" or "even" position in the parent array (so I can mark it as "reversed" or not), I iterate over the whole array with `.each_with_index` [(docs)][3].

Now, I set a variable, `reversed`, using a ternary operator. I'm checking to see if the index of the current iteration through the parent array is "odd" (using `.odd?`). If it is an odd index, I set the `reversed` variable to `true`.

After that, I iterate over the pair of items; for each of them, I call the `render` partial, passing the value of the `reversed` variable to it.

Finally, in the partial, I add the `Card--reversed` class if `reversed` is true:

{% highlight erb %}
<div class="Card<%= " Card--reversed" if is_reversed %>">
{% endhighlight %}<br>

## Conclusion

Until this time, I'd never heard of `.each_slice`. Using it works, but to be honest, this solution doesn't feel great because I'm doing 3 different `each` calls in order to add a CSS class. Maybe it could be accomplished with `.each_with_index` and checking the `index` against a modulus?

If you have a way to clean this up, I'd love to hear about it - send me a [tweet][4] or an [email][5]!

[1]: https://philipwalton.github.io/solved-by-flexbox/demos/media-object/
[2]: http://ruby-doc.org/core-2.2.0/Enumerable.html#method-i-each_slice
[3]: http://ruby-doc.org/core-2.2.0/Enumerable.html#method-i-each_with_index
[4]: https:/twitter.com/damon_bauer
[5]: mailto:hello@damonbauer.me
