# Answers

|   Part 1   | Part 2 |
|------------|--------|
| `28781019` |  ` ` |

## --- Day 24: Planet of Discord ---

You land on [Eris](https://en.wikipedia.org/wiki/Eris_(dwarf_planet)), your last stop before reaching Santa. As soon as you do, your sensors start picking up strange life forms moving around: Eris is infested with [bugs](https://www.nationalgeographic.org/thisday/sep9/worlds-first-computer-bug/)! With an over 24-hour roundtrip for messages between you and Earth, you'll have to deal with this problem on your own.

Eris isn't a very large place; a scan of the entire area fits into a 5x5 grid (your puzzle input). The scan shows _bugs_ (`#`) and _empty spaces_ (`.`).

Each _minute_, The bugs live and die based on the number of bugs in the _four adjacent tiles_:

*   A bug _dies_ (becoming an empty space) unless there is _exactly one_ bug adjacent to it.
*   An empty space _becomes infested_ with a bug if _exactly one or two_ bugs are adjacent to it.

Otherwise, a bug or empty space remains the same. (Tiles on the edges of the grid have fewer than four adjacent tiles; the missing tiles count as empty space.) This process happens in every location _simultaneously_; that is, within the same minute, the number of adjacent bugs is counted for every tile first, and then the tiles are updated.

Here are the first few minutes of an example scenario:

    Initial state:
    ....#
    #..#.
    #..##
    ..#..
    #....
    
    After 1 minute:
    #..#.
    ####.
    ###.#
    ##.##
    .##..
    
    After 2 minutes:
    #####
    ....#
    ....#
    ...#.
    #.###
    
    After 3 minutes:
    #....
    ####.
    ...##
    #.##.
    .##.#
    
    After 4 minutes:
    ####.
    ....#
    ##..#
    .....
    ##...
    

To understand the nature of the bugs, watch for the first time a layout of bugs and empty spaces _matches any previous layout_. In the example above, the first layout to appear twice is:

    .....
    .....
    .....
    #....
    .#...
    

To calculate the _biodiversity rating_ for this layout, consider each tile left-to-right in the top row, then left-to-right in the second row, and so on. Each of these tiles is worth biodiversity points equal to _increasing powers of two_: 1, 2, 4, 8, 16, 32, and so on. Add up the biodiversity points for tiles with bugs; in this example, the 16th tile (`32768` points) and 22nd tile (`2097152` points) have bugs, a total biodiversity rating of _`2129920`_.

_What is the biodiversity rating for the first layout that appears twice?_

-----------------

## --- Part Two ---

After careful analysis, one thing is certain: _you have no idea where all these bugs are coming from_.

Then, you remember: Eris is an old [Plutonian](https://adventofcode.com/2019/day/20) settlement! Clearly, the bugs are coming from recursively-folded space.

This 5x5 grid is _only one_ level in an _infinite_ number of recursion levels. The tile in the middle of the grid is actually another 5x5 grid, the grid in your scan is contained as the middle tile of a larger 5x5 grid, and so on. Two levels of grids look like this:

         |     |         |     |     
         |     |         |     |     
         |     |         |     |     
    -----+-----+---------+-----+-----
         |     |         |     |     
         |     |         |     |     
         |     |         |     |     
    -----+-----+---------+-----+-----
         |     | | | | | |     |     
         |     |-+-+-+-+-|     |     
         |     | | | | | |     |     
         |     |-+-+-+-+-|     |     
         |     | | |?| | |     |     
         |     |-+-+-+-+-|     |     
         |     | | | | | |     |     
         |     |-+-+-+-+-|     |     
         |     | | | | | |     |     
    -----+-----+---------+-----+-----
         |     |         |     |     
         |     |         |     |     
         |     |         |     |     
    -----+-----+---------+-----+-----
         |     |         |     |     
         |     |         |     |     
         |     |         |     |     
    

(To save space, some of the tiles are not drawn to scale.) Remember, this is only a small part of the infinitely recursive grid; there is a 5x5 grid that contains this diagram, and a 5x5 grid that contains that one, and so on. Also, the `?` in the diagram contains another 5x5 grid, which itself contains another 5x5 grid, and so on.

The scan you took (your puzzle input) shows where the bugs are _on a single level_ of this structure. The middle tile of your scan is empty to accommodate the recursive grids within it. Initially, no other levels contain bugs.

Tiles still count as _adjacent_ if they are directly _up, down, left, or right_ of a given tile. Some tiles have adjacent tiles at a recursion level above or below its own level. For example:

         |     |         |     |     
      1  |  2  |    3    |  4  |  5  
         |     |         |     |     
    -----+-----+---------+-----+-----
         |     |         |     |     
      6  |  7  |    8    |  9  |  10 
         |     |         |     |     
    -----+-----+---------+-----+-----
         |     |A|B|C|D|E|     |     
         |     |-+-+-+-+-|     |     
         |     |F|G|H|I|J|     |     
         |     |-+-+-+-+-|     |     
     11  | 12  |K|L|?|N|O|  14 |  15 
         |     |-+-+-+-+-|     |     
         |     |P|Q|R|S|T|     |     
         |     |-+-+-+-+-|     |     
         |     |U|V|W|X|Y|     |     
    -----+-----+---------+-----+-----
         |     |         |     |     
     16  | 17  |    18   |  19 |  20 
         |     |         |     |     
    -----+-----+---------+-----+-----
         |     |         |     |     
     21  | 22  |    23   |  24 |  25 
         |     |         |     |     
    

*   Tile 19 has four adjacent tiles: 14, 18, 20, and 24.
*   Tile G has four adjacent tiles: B, F, H, and L.
*   Tile D has four adjacent tiles: 8, C, E, and I.
*   Tile E has four adjacent tiles: 8, D, 14, and J.
*   Tile 14 has _eight_ adjacent tiles: 9, E, J, O, T, Y, 15, and 19.
*   Tile N has _eight_ adjacent tiles: I, O, S, and five tiles within the sub-grid marked `?`.

The rules about bugs living and dying are the same as before.

For example, consider the same initial state as above:

    ....#
    #..#.
    #.?##
    ..#..
    #....
    

The center tile is drawn as `?` to indicate the next recursive grid. Call this level 0; the grid within this one is level 1, and the grid that contains this one is level -1. Then, after _ten_ minutes, the grid at each level would look like this:

    Depth -5:
    ..#..
    .#.#.
    ..?.#
    .#.#.
    ..#..
    
    Depth -4:
    ...#.
    ...##
    ..?..
    ...##
    ...#.
    
    Depth -3:
    #.#..
    .#...
    ..?..
    .#...
    #.#..
    
    Depth -2:
    .#.##
    ....#
    ..?.#
    ...##
    .###.
    
    Depth -1:
    #..##
    ...##
    ..?..
    ...#.
    .####
    
    Depth 0:
    .#...
    .#.##
    .#?..
    .....
    .....
    
    Depth 1:
    .##..
    #..##
    ..?.#
    ##.##
    #####
    
    Depth 2:
    ###..
    ##.#.
    #.?..
    .#.##
    #.#..
    
    Depth 3:
    ..###
    .....
    #.?..
    #....
    #...#
    
    Depth 4:
    .###.
    #..#.
    #.?..
    ##.#.
    .....
    
    Depth 5:
    ####.
    #..#.
    #.?#.
    ####.
    .....
    

In this example, after 10 minutes, a total of _`99`_ bugs are present.

Starting with your scan, _how many bugs are present after 200 minutes?_
