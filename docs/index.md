### Advent of Code

{% assign posts_2018 = site.pages | where: "year", 2018 %}
<ul>
{% for page in posts_2018 %}
  <li>{{ page.path }}</li>
{% endfor %}
</ul>

<!-- - [2018]({{ "/2018/day/1" | relative_url }}) -->

