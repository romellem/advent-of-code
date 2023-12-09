# Answers

|   Part 1  |   Part 2   |
| --------- | ---------- |
| `2449062` | `33149631` |


## --- Day 6: Wait For It ---

The ferry quickly brings you across Island Island. After asking around, you discover that there is indeed normally a large pile of sand somewhere near here, but you don't see anything besides lots of water and the small island where the ferry has docked.

As you try to figure out what to do next, you notice a poster on a wall near the ferry dock. "Boat races! Open to the public! Grand prize is an all-expenses-paid trip to _Desert Island_!" That must be where the sand comes from! Best of all, the boat races are starting in just a few minutes.

You manage to sign up as a competitor in the boat races just in time. The organizer explains that it's not really a traditional race - instead, you will get a fixed amount of time during which your boat has to travel as far as it can, and you win if your boat goes the farthest.

As part of signing up, you get a sheet of paper (your puzzle input) that lists the _time_ allowed for each race and also the best _distance_ ever recorded in that race. To guarantee you win the grand prize, you need to make sure you _go farther in each race_ than the current record holder.

The organizer brings you over to the area where the boat races are held. The boats are much smaller than you expected - they're actually _toy boats_, each with a big button on top. Holding down the button _charges the boat_, and releasing the button _allows the boat to move_. Boats move faster if their button was held longer, but time spent holding the button counts against the total race time. You can only hold the button at the start of the race, and boats don't move until the button is released.

For example:

    Time:      7  15   30
    Distance:  9  40  200
    

This document describes three races:

*   The first race lasts 7 milliseconds. The record distance in this race is 9 millimeters.
*   The second race lasts 15 milliseconds. The record distance in this race is 40 millimeters.
*   The third race lasts 30 milliseconds. The record distance in this race is 200 millimeters.

Your toy boat has a starting speed of _zero millimeters per millisecond_. For each whole millisecond you spend at the beginning of the race holding down the button, the boat's speed increases by _one millimeter per millisecond_.

So, because the first race lasts 7 milliseconds, you only have a few options:

*   Don't hold the button at all (that is, hold it for _`0` milliseconds_) at the start of the race. The boat won't move; it will have traveled _`0` millimeters_ by the end of the race.
*   Hold the button for _`1` millisecond_ at the start of the race. Then, the boat will travel at a speed of `1` millimeter per millisecond for 6 milliseconds, reaching a total distance traveled of _`6` millimeters_.
*   Hold the button for _`2` milliseconds_, giving the boat a speed of `2` millimeters per millisecond. It will then get 5 milliseconds to move, reaching a total distance of _`10` millimeters_.
*   Hold the button for _`3` milliseconds_. After its remaining 4 milliseconds of travel time, the boat will have gone _`12` millimeters_.
*   Hold the button for _`4` milliseconds_. After its remaining 3 milliseconds of travel time, the boat will have gone _`12` millimeters_.
*   Hold the button for _`5` milliseconds_, causing the boat to travel a total of _`10` millimeters_.
*   Hold the button for _`6` milliseconds_, causing the boat to travel a total of _`6` millimeters_.
*   Hold the button for _`7` milliseconds_. That's the entire duration of the race. You never let go of the button. The boat can't move until you let go of the button. Please make sure you let go of the button so the boat gets to move. _`0` millimeters_.

Since the current record for this race is `9` millimeters, there are actually _`4`_ different ways you could win: you could hold the button for `2`, `3`, `4`, or `5` milliseconds at the start of the race.

In the second race, you could hold the button for at least `4` milliseconds and at most `11` milliseconds and beat the record, a total of _`8`_ different ways to win.

In the third race, you could hold the button for at least `11` milliseconds and no more than `19` milliseconds and still beat the record, a total of _`9`_ ways you could win.

To see how much margin of error you have, determine the _number of ways you can beat the record_ in each race; in this example, if you multiply these values together, you get _`288`_ (`4` \* `8` \* `9`).

Determine the number of ways you could beat the record in each race. _What do you get if you multiply these numbers together?_

-----------------

## --- Part Two ---

As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad [kerning](https://en.wikipedia.org/wiki/Kerning). There's really _only one race_ - ignore the spaces between the numbers on each line.

So, the example from before:

    Time:      7  15   30
    Distance:  9  40  200
    

...now instead means this:

    Time:      71530
    Distance:  940200
    

Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for _`71530` milliseconds_ and the record distance you need to beat is _`940200` millimeters_. You could hold the button anywhere from `14` to `71516` milliseconds and beat the record, a total of _`71503`_ ways!

_How many ways can you beat the record in this one much longer race?_
