module Jekyll
  class JsSnippet < Liquid::Block
    safe true

    def initialize()
      super
      @id = 0
    end

    def render(context)
      text = super
      @id = @id + 1
      "<div class='js-snippet' id='js-snippet--#{@id}'>
        <pre><code>#{text}</code></pre>
        <button class='js-snippet__execute'>Run</button>
      </div>"
    end
  
  end
end
  
Liquid::Template.register_tag('js_snippet', Jekyll::JsSnippet)
