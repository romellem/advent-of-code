# Answers

|  Part 1  |  Part 2  |
|----------|----------|
| ` ` | ` ` |

## --- Day 19: An Elephant Named Joseph ---

The Elves contact you over a highly secure emergency channel. Back at the North Pole, the Elves are busy misunderstanding [White Elephant parties](https://en.wikipedia.org/wiki/White_elephant_gift_exchange).

Each Elf brings a present. They all sit in a circle, numbered starting with position `1`. Then, starting with the first Elf, they take turns stealing all the presents from the Elf to their left. An Elf with no presents is removed from the circle and does not take turns.

For example, with five Elves (numbered `1` to `5`):

      1
    5   2
     4 3
    

*   Elf `1` takes Elf `2`'s present.
*   Elf `2` has no presents and is skipped.
*   Elf `3` takes Elf `4`'s present.
*   Elf `4` has no presents and is also skipped.
*   Elf `5` takes Elf `1`'s two presents.
*   Neither Elf `1` nor Elf `2` have any presents, so both are skipped.
*   Elf `3` takes Elf `5`'s three presents.

So, with _five_ Elves, the Elf that sits starting in position `3` gets all the presents.

With the number of Elves given in your puzzle input, _which Elf gets all the presents?_
