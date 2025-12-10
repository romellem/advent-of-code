# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| `4776487744`    | ` `    |

## --- Day 9: Movie Theater ---

You slide down the [firepole](https://en.wikipedia.org/wiki/Fireman%27s_pole) in the corner of the playground and land in the North Pole base movie theater!

The movie theater has a big tile floor with an interesting pattern. Elves here are redecorating the theater by switching out some of the square tiles in the big grid they form. Some of the tiles are _red_; the Elves would like to find the largest rectangle that uses red tiles for two of its opposite corners. They even have a list of where the red tiles are located in the grid (your puzzle input).

For example:

    7,1
    11,1
    11,7
    9,7
    9,5
    2,5
    2,3
    7,3
    

Showing red tiles as `#` and other tiles as `.`, the above arrangement of red tiles would look like this:

    ..............
    .......#...#..
    ..............
    ..#....#......
    ..............
    ..#......#....
    ..............
    .........#.#..
    ..............
    

You can choose any two red tiles as the opposite corners of your rectangle; your goal is to find the largest rectangle possible.

For example, you could make a rectangle (shown as `O`) with an area of `24` between `2,5` and `9,7`:

<pre><code>..............
.......#...#..
..............
..#....#......
..............
..<b>O</b>OOOOOOO....
..OOOOOOOO....
..OOOOOOO<b>O</b>.#..
..............
</code></pre>

Or, you could make a rectangle with area `35` between `7,1` and `11,7`:

<pre><code>..............
.......<b>O</b>OOOO..
.......OOOOO..
..#....OOOOO..
.......OOOOO..
..#....OOOOO..
.......OOOOO..
.......OOOO<b>O</b>..
..............
</code></pre>

You could even make a thin rectangle with an area of only `6` between `7,3` and `2,3`:

<pre><code>..............
.......#...#..
..............
..<b>O</b>OOOO<b>O</b>......
..............
..#......#....
..............
.........#.#..
..............
</code></pre>

Ultimately, the largest rectangle you can make in this example has area _`50`_. One way to do this is between `2,5` and `11,1`:

<pre><code>..............
..OOOOOOOOO<b>O</b>..
..OOOOOOOOOO..
..OOOOOOOOOO..
..OOOOOOOOOO..
..<b>O</b>OOOOOOOOO..
..............
.........#.#..
..............
</code></pre>

Using two red tiles as opposite corners, _what is the largest area of any rectangle you can make?_

-----------------

## --- Part Two ---

The Elves just remembered: they can only switch out tiles that are _red_ or _green_. So, your rectangle can only include red or green tiles.

In your list, every red tile is connected to the red tile before and after it by a straight line of _green tiles_. The list wraps, so the first red tile is also connected to the last red tile. Tiles that are adjacent in your list will always be on either the same row or the same column.

Using the same example as before, the tiles marked `X` would be green:

    ..............
    .......#XXX#..
    .......X...X..
    ..#XXXX#...X..
    ..X........X..
    ..#XXXXXX#.X..
    .........X.X..
    .........#X#..
    ..............
    

In addition, all of the tiles _inside_ this loop of red and green tiles are _also_ green. So, in this example, these are the green tiles:

    ..............
    .......#XXX#..
    .......XXXXX..
    ..#XXXX#XXXX..
    ..XXXXXXXXXX..
    ..#XXXXXX#XX..
    .........XXX..
    .........#X#..
    ..............
    

The remaining tiles are never red nor green.

The rectangle you choose still must have red tiles in opposite corners, but any other tiles it includes must now be red or green. This significantly limits your options.

For example, you could make a rectangle out of red and green tiles with an area of `15` between `7,3` and `11,1`:

<pre><code>..............
.......OOOO<b>O</b>..
.......OOOOO..
..#XXXX<b>O</b>OOOO..
..XXXXXXXXXX..
..#XXXXXX#XX..
.........XXX..
.........#X#..
..............
</code></pre>

Or, you could make a thin rectangle with an area of `3` between `9,7` and `9,5`:

<pre><code>..............
.......#XXX#..
.......XXXXX..
..#XXXX#XXXX..
..XXXXXXXXXX..
..#XXXXXX<b>O</b>XX..
.........OXX..
.........<b>O</b>X#..
..............
</code></pre>

The largest rectangle you can make in this example using only red and green tiles has area _`24`_. One way to do this is between `9,5` and `2,3`:

<pre><code>..............
.......#XXX#..
.......XXXXX..
..<b>O</b>OOOOOOOXX..
..OOOOOOOOXX..
..OOOOOOO<b>O</b>XX..
.........XXX..
.........#X#..
..............
</code></pre>

Using two red tiles as opposite corners, _what is the largest area of any rectangle you can make using only red and green tiles?_
