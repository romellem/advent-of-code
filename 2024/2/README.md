# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| `606`  | `644`  |

## --- Day 2: Red-Nosed Reports ---

Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.

While the [Red-Nosed Reindeer nuclear fusion/fission plant](https://adventofcode.com/2015/day/19) appears to contain no sign of the Chief Historian, the engineers there run up to you as soon as they see you. Apparently, they _still_ talk about the time Rudolph was saved through molecular synthesis from a single electron.

They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.

The unusual data (your puzzle input) consists of many _reports_, one report per line. Each report is a list of numbers called _levels_ that are separated by spaces. For example:

    7 6 4 2 1
    1 2 7 8 9
    9 7 6 2 1
    1 3 2 4 5
    8 6 4 4 1
    1 3 6 7 9
    

This example data contains six reports each containing five levels.

The engineers are trying to figure out which reports are _safe_. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:

*   The levels are either _all increasing_ or _all decreasing_.
*   Any two adjacent levels differ by _at least one_ and _at most three_.

In the example above, the reports can be found safe or unsafe by checking those rules:

*   `7 6 4 2 1`: _Safe_ because the levels are all decreasing by 1 or 2.
*   `1 2 7 8 9`: _Unsafe_ because `2 7` is an increase of 5.
*   `9 7 6 2 1`: _Unsafe_ because `6 2` is a decrease of 4.
*   `1 3 2 4 5`: _Unsafe_ because `1 3` is increasing but `3 2` is decreasing.
*   `8 6 4 4 1`: _Unsafe_ because `4 4` is neither an increase or a decrease.
*   `1 3 6 7 9`: _Safe_ because the levels are all increasing by 1, 2, or 3.

So, in this example, _`2`_ reports are _safe_.

Analyze the unusual data from the engineers. _How many reports are safe?_

-----------------

## --- Part Two ---

The engineers are surprised by the low number of safe reports until they realize they forgot to tell you about the Problem Dampener.

The Problem Dampener is a reactor-mounted module that lets the reactor safety systems _tolerate a single bad level_ in what would otherwise be a safe report. It's like the bad level never happened!

Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.

More of the above example's reports are now safe:

*   <code>7 6 4 2 1</code>: _Safe_ without removing any level.
*   <code>1 2 7 8 9</code>: _Unsafe_ regardless of which level is removed.
*   <code>9 7 6 2 1</code>: _Unsafe_ regardless of which level is removed.
*   <code>1 <em>3</em> 2 4 5</code>: _Safe_ by removing the second level, `3`.
*   <code>8 6 <em>4</em> 4 1</code>: _Safe_ by removing the third level, `4`.
*   <code>1 3 6 7 9</code>: _Safe_ without removing any level.

Thanks to the Problem Dampener, _`4`_ reports are actually _safe_!

Update your analysis by handling situations where the Problem Dampener can remove a single level from unsafe reports. _How many reports are now safe?_
