# Answers

|    Part 1    | Part 2 |
| ------------ | ------ |
| `1969958987` | `1068` |

## --- Day 9: Mirage Maintenance ---

You ride the camel through the sandstorm and stop where the ghost's maps told you to stop. The sandstorm subsequently subsides, somehow seeing you standing at an _oasis_!

The camel goes to get some water and you stretch your neck. As you look up, you discover what must be yet another giant floating island, this one made of metal! That must be where the _parts to fix the sand machines_ come from.

There's even a [hang glider](https://en.wikipedia.org/wiki/Hang_gliding) partially buried in the sand here; once the sun rises and heats up the sand, you might be able to use the glider and the hot air to get all the way up to the metal island!

While you wait for the sun to rise, you admire the oasis hidden here in the middle of Desert Island. It must have a delicate ecosystem; you might as well take some ecological readings while you wait. Maybe you can report any environmental instabilities you find to someone so the oasis can be around for the next sandstorm-worn traveler.

You pull out your handy _Oasis And Sand Instability Sensor_ and analyze your surroundings. The OASIS produces a report of many values and how they are changing over time (your puzzle input). Each line in the report contains the _history_ of a single value. For example:

    0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45
    

To best protect the oasis, your environmental report should include a _prediction of the next value_ in each history. To do this, start by making a new sequence from the _difference at each step_ of your history. If that sequence is _not_ all zeroes, repeat this process, using the sequence you just generated as the input sequence. Once all of the values in your latest sequence are zeroes, you can extrapolate what the next value of the original history should be.

In the above dataset, the first history is `0 3 6 9 12 15`. Because the values increase by `3` each step, the first sequence of differences that you generate will be `3 3 3 3 3`. Note that this sequence has one fewer value than the input sequence because at each step it considers two numbers from the input. Since these values aren't _all zero_, repeat the process: the values differ by `0` at each step, so the next sequence is `0 0 0 0`. This means you have enough information to extrapolate the history! Visually, these sequences can be arranged like this:

    0   3   6   9  12  15
      3   3   3   3   3
        0   0   0   0
    

To extrapolate, start by adding a new zero to the end of your list of zeroes; because the zeroes represent differences between the two values above them, this also means there is now a placeholder in every sequence above it:

<pre><code>0   3   6   9  12  15   <b>B</b>
  3   3   3   3   3   <b>A</b>
    0   0   0   0   <b>0</b>
</code></pre>

You can then start filling in placeholders from the bottom up. `A` needs to be the result of increasing `3` (the value to its left) by `0` (the value below it); this means `A` must be _`3`_:

<pre><code>0   3   6   9  12  15   B
  3   3   3   3   <b>3</b>   <b>3</b>
    0   0   0   0   <b>0</b>
</code></pre>

Finally, you can fill in `B`, which needs to be the result of increasing `15` (the value to its left) by `3` (the value below it), or _`18`_:

<pre><code>0   3   6   9  12  <b>15</b>  <b>18</b>
  3   3   3   3   3   <b>3</b>
    0   0   0   0   0
</code></pre>

So, the next value of the first history is _`18`_.

Finding all-zero differences for the second history requires an additional sequence:

    1   3   6  10  15  21
      2   3   4   5   6
        1   1   1   1
          0   0   0
    

Then, following the same process as before, work out the next value in each sequence from the bottom up:

<pre><code>1   3   6  10  15  21  <b>28</b>
  2   3   4   5   6   <b>7</b>
    1   1   1   1   <b>1</b>
      0   0   0   <b>0</b>
</code></pre>

So, the next value of the second history is _`28`_.

The third history requires even more sequences, but its next value can be found the same way:

<pre><code>10  13  16  21  30  45  <b>68</b>
   3   3   5   9  15  <b>23</b>
     0   2   4   6   <b>8</b>
       2   2   2   <b>2</b>
         0   0   <b>0</b>
</code></pre>

So, the next value of the third history is _`68`_.

If you find the next value for each history in this example and add them together, you get _`114`_.

Analyze your OASIS report and extrapolate the next value for each history. _What is the sum of these extrapolated values?_

-----------------

## --- Part Two ---

Of course, it would be nice to have _even more history_ included in your report. Surely it's safe to just _extrapolate backwards_ as well, right?

For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the _beginning_ of your sequence of zeroes, then fill in new _first_ values for each previous sequence.

In particular, here is what the third example history looks like when extrapolating back in time:

<pre><code><b>5</b>  10  13  16  21  30  45
  <b>5</b>   3   3   5   9  15
   <b>-2</b>   0   2   4   6
      <b>2</b>   2   2   2
        <b>0</b>   0   0
</code></pre>

Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: _`5`_.

Doing this for the remaining example data above results in previous values of _`-3`_ for the first history and _`0`_ for the second history. Adding all three new values together produces _`2`_.

Analyze your OASIS report again, this time extrapolating the _previous_ value for each history. _What is the sum of these extrapolated values?_
