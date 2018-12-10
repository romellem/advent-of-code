### Advent of Code

{% assign posts_2018 = site.pages | where: "year", 2018 | sort:"day" %}
<ul>
    <li>2018
        <ul>
            {% for page in posts_2018 %}
                <li><a href="{{ page.path | relative_url }}">Day {{ page.day }}</a></li>
            {% endfor %}
        </ul>
    </li>
</ul>

<!-- - [2018]({{ "/2018/day/1" | relative_url }}) -->

