# Answers

| Part 1  | Part 2  |
| ------- | ------- |
| `82440` | `20774` |

## --- Day 4: Giant Squid ---

You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you _can_ see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play [bingo](<https://en.wikipedia.org/wiki/Bingo_(American_version)>)?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is _marked_ on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board _wins_. (Diagonals don't count.)

The submarine has a _bingo subsystem_ to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

    7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

    22 13 17 11  0
     8  2 23  4 24
    21  9 14 16  7
     6 10  3 18  5
     1 12 20 15 19

     3 15  0  2 22
     9 18 13 17  5
    19  8  7 25 23
    20 11 10 24  4
    14 21 16 12  6

    14 21 17 24  4
    10 16 15  9 19
    18  8 23 26 20
    22 11 13  6  5
     2  0 12  3  7

After the first five numbers are drawn (`7`, `4`, `9`, `5`, and `11`), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

<pre><code>22 13 17 <b>11</b>  0         3 15  0  2 22        14 21 17 24  <b>4</b>
 8  2 23  <b>4</b> 24         <b>9</b> 18 13 17  <b>5</b>        10 16 15  <b>9</b> 19
21  <b>9</b> 14 16  <b>7</b>        19  8  <b>7</b> 25 23        18  8 23 26 20
 6 10  3 18  <b>5</b>        20 <b>11</b> 10 24  <b>4</b>        22 <b>11</b> 13  6  <b>5</b>
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  <b>7</b>
</code></pre>

After the next six numbers are drawn (`17`, `23`, `2`, `0`, `14`, and `21`), there are still no winners:

<pre><code>22 13 <b>17</b> <b>11</b>  <b>0</b>         3 15  <b>0</b>  <b>2</b> 22        <b>14</b> <b>21</b> <b>17</b> 24  <b>4</b>
 8  <b>2</b> <b>23</b>  <b>4</b> 24         <b>9</b> 18 13 <b>17</b>  <b>5</b>        10 16 15  <b>9</b> 19
<b>21</b>  <b>9</b> <b>14</b> 16  <b>7</b>        19  8  <b>7</b> 25 <b>23</b>        18  8 <b>23</b> 26 20
 6 10  3 18  <b>5</b>        20 <b>11</b> 10 24  <b>4</b>        22 <b>11</b> 13  6  <b>5</b>
 1 12 20 15 19        <b>14</b> <b>21</b> 16 12  6         <b>2</b>  <b>0</b> 12  3  <b>7</b>
</code></pre>

Finally, `24` is drawn:

<pre><code>22 13 <b>17</b> <b>11</b>  <b>0</b>         3 15  <b>0</b>  <b>2</b> 22        <b>14</b> <b>21</b> <b>17</b> <b>24</b>  <b>4</b>
 8  <b>2</b> <b>23</b>  <b>4</b> <b>24</b>         <b>9</b> 18 13 <b>17</b>  <b>5</b>        10 16 15  <b>9</b> 19
<b>21</b>  <b>9</b> <b>14</b> 16  <b>7</b>        19  8  <b>7</b> 25 <b>23</b>        18  8 <b>23</b> 26 20
 6 10  3 18  <b>5</b>        20 <b>11</b> 10 <b>24</b>  <b>4</b>        22 <b>11</b> 13  6  <b>5</b>
 1 12 20 15 19        <b>14</b> <b>21</b> 16 12  6         <b>2</b>  <b>0</b> 12  3  <b>7</b>
</code></pre>

At this point, the third board _wins_ because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: `_14 21 17 24 4_`).

The _score_ of the winning board can now be calculated. Start by finding the _sum of all unmarked numbers_ on that board; in this case, the sum is `188`. Then, multiply that sum by _the number that was just called_ when the board won, `24`, to get the final score, `188 * 24 = _4512_`.

To guarantee victory against the giant squid, figure out which board will win first. _What will your final score be if you choose that board?_

-----------------

## --- Part Two ---

On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to _figure out which board will win last_ and choose that one. That way, no matter which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after `13` is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to `148` for a final score of `148 * 13 = _1924_`.

Figure out which board will win last. _Once it wins, what would its final score be?_
