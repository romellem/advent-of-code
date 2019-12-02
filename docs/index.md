---
title:
---

## Table of Contents

{% assign posts_2018 = site.pages | where: "year", 2018 | sort:"day" %}
{% assign posts_2016 = site.pages | where: "year", 2016 | sort:"day" %}
<ul>
    <li>2018
        <ul>
            {% for page in posts_2018 %}
                <li><a href="{{ page.url | relative_url }}">Day {{ page.day }}</a></li>
            {% endfor %}
        </ul>
    </li>
    <li>2016
        <ul>
            {% for page in posts_2016 %}
                <li><a href="{{ page.url | relative_url }}">Day {{ page.day }}</a></li>
            {% endfor %}
        </ul>
    </li>
</ul>
