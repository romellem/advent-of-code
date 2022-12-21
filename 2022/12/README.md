# Answers

| Part 1 | Part 2 |
| ------ | ------ |
|  `394` |  `388` |

## --- Day 12: Hill Climbing Algorithm ---

You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.

You ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where `a` is the lowest elevation, `b` is the next-lowest, and so on up to the highest elevation, `z`.

Also included on the heightmap are marks for your current position (`S`) and the location that should get the best signal (`E`). Your current position (`S`) has elevation `a`, and the location that should get the best signal (`E`) has elevation `z`.

You'd like to reach `E`, but to save energy, you should do it in _as few steps as possible_. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be _at most one higher_ than the elevation of your current square; that is, if your current elevation is `m`, you could step to elevation `n`, but not to elevation `o`. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)

For example:

<pre><code><b>S</b>abqponm
abcryxxl
accsz<b>E</b>xk
acctuvwj
abdefghi
</code></pre>

Here, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the `e` at the bottom. From there, you can spiral around to the goal:

    v..v<<<<
    >v.vv<<^
    .>vv>E^^
    ..v>>>^^
    ..>>>>>^
    

In the above diagram, the symbols indicate whether the path exits each square moving up (`^`), down (`v`), left (`<`), or right (`>`). The location that should get the best signal is still `E`, and `.` marks unvisited squares.

This path reaches the goal in _`31`_ steps, the fewest possible.

_What is the fewest steps required to move from your current position to the location that should get the best signal?_

## --- Part Two ---

As you walk up the hill, you suspect that the Elves will want to turn this into a hiking trail. The beginning isn't very scenic, though; perhaps you can find a better starting point.

To maximize exercise while hiking, the trail should start as low as possible: elevation `a`. The goal is still the square marked `E`. However, the trail should still be direct, taking the fewest steps to reach its goal. So, you'll need to find the shortest path from _any square at elevation `a`_ to the square marked `E`.

Again consider the example from above:

<pre><code><b>S</b>abqponm
abcryxxl
accsz<b>E</b>xk
acctuvwj
abdefghi
</code></pre>

Now, there are six choices for starting position (five marked `a`, plus the square marked `S` that counts as being at elevation `a`). If you start at the bottom-left square, you can reach the goal most quickly:

    ...v<<<<
    ...vv<<^
    ...v>E^^
    .>v>>>^^
    >^>>>>>^
    

This path reaches the goal in only _`29`_ steps, the fewest possible.

_What is the fewest steps required to move starting from any square with elevation `a` to the location that should get the best signal?_
