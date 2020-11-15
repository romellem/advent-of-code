```liquid
{% js_snippet %}
console.log('hello world!');
{% endjs_snippet %}
```

```html
<div class="js-snippet">
	<pre><code contenteditable="true">console.log('hello world!');</code></pre>
	<button class="js-snippet__execute">Run</button>
</div>
```

TODO

1. Create script that loops over DOM and adds 'click' listeners to our snippets.
2. That handler will:
   a. Use https://github.com/gh-canon/stack-snippet-console to create a new "virtual console"
   b. Take the contents of the code and add to an new inline script
   c. inject that script to execute it
3. Later, use https://highlightjs.org/usage/ to async (web worker, debounced) highlight the contenteditable code block.
4. Consider exposing some variable (e.g. `importedInput`) that I can destructure `{ input }` from.
