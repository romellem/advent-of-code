# Answers

| Part 1 |  Part 2 |
| ------ | ------- |
|  `706` | `19331` |

## --- Day 15: Rambunctious Recitation ---

You catch the airport shuttle and try to book a new flight to your vacation island. Due to the storm, all direct flights have been cancelled, but a route is available to get around the storm. You take it.

While you wait for your flight, you decide to check in with the Elves back at the North Pole. They're playing a _memory game_ and are ever so excited to explain the rules!

In this game, the players take turns saying _numbers_. They begin by taking turns reading from a list of _starting numbers_ (your puzzle input). Then, each turn consists of considering the _most recently spoken number_:

*   If that was the _first_ time the number has been spoken, the current player says _`0`_.
*   Otherwise, the number had been spoken before; the current player announces _how many turns apart_ the number is from when it was previously spoken.

So, after the starting numbers, each turn results in that player speaking aloud either _`0`_ (if the last number is new) or an _age_ (if the last number is a repeat).

For example, suppose the starting numbers are `0,3,6`:

*   _Turn 1_: The `1`st number spoken is a starting number, _`0`_.
*   _Turn 2_: The `2`nd number spoken is a starting number, _`3`_.
*   _Turn 3_: The `3`rd number spoken is a starting number, _`6`_.
*   _Turn 4_: Now, consider the last number spoken, `6`. Since that was the first time the number had been spoken, the `4`th number spoken is _`0`_.
*   _Turn 5_: Next, again consider the last number spoken, `0`. Since it _had_ been spoken before, the next number to speak is the difference between the turn number when it was last spoken (the previous turn, `4`) and the turn number of the time it was most recently spoken before then (turn `1`). Thus, the `5`th number spoken is `4 - 1`, _`3`_.
*   _Turn 6_: The last number spoken, `3` had also been spoken before, most recently on turns `5` and `2`. So, the `6`th number spoken is `5 - 2`, _`3`_.
*   _Turn 7_: Since `3` was just spoken twice in a row, and the last two turns are `1` turn apart, the `7`th number spoken is _`1`_.
*   _Turn 8_: Since `1` is new, the `8`th number spoken is _`0`_.
*   _Turn 9_: `0` was last spoken on turns `8` and `4`, so the `9`th number spoken is the difference between them, _`4`_.
*   _Turn 10_: `4` is new, so the `10`th number spoken is _`0`_.

(The game ends when the Elves get sick of playing or dinner is ready, whichever comes first.)

Their question for you is: what will be the _`2020`th_ number spoken? In the example above, the `2020`th number spoken will be `436`.

Here are a few more examples:

*   Given the starting numbers `1,3,2`, the `2020`th number spoken is `1`.
*   Given the starting numbers `2,1,3`, the `2020`th number spoken is `10`.
*   Given the starting numbers `1,2,3`, the `2020`th number spoken is `27`.
*   Given the starting numbers `2,3,1`, the `2020`th number spoken is `78`.
*   Given the starting numbers `3,2,1`, the `2020`th number spoken is `438`.
*   Given the starting numbers `3,1,2`, the `2020`th number spoken is `1836`.

Given your starting numbers, _what will be the `2020`th number spoken?_

-----------------

## --- Part Two ---

Impressed, the Elves issue you a challenge: determine the `30000000`th number spoken. For example, given the same starting numbers as above:

*   Given `0,3,6`, the `30000000`th number spoken is `175594`.
*   Given `1,3,2`, the `30000000`th number spoken is `2578`.
*   Given `2,1,3`, the `30000000`th number spoken is `3544142`.
*   Given `1,2,3`, the `30000000`th number spoken is `261214`.
*   Given `2,3,1`, the `30000000`th number spoken is `6895259`.
*   Given `3,2,1`, the `30000000`th number spoken is `18`.
*   Given `3,1,2`, the `30000000`th number spoken is `362`.

Given your starting numbers, _what will be the `30000000`th number spoken?_
