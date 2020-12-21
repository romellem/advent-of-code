# Answers

|      Part 1      | Part 2 |
| ---------------- | ------ |
| `17250897231301` | `1576` |

## --- Day 20: Jurassic Jigsaw ---

The high-speed train leaves the forest and quickly carries you south. You can even see a desert in the distance! Since you have some spare time, you might as well see if there was anything interesting in the image the Mythical Information Bureau satellite captured.

After decoding the satellite messages, you discover that the data actually contains many small images created by the satellite's _camera array_. The camera array consists of many cameras; rather than produce a single square image, they produce many smaller square image _tiles_ that need to be _reassembled back into a single image_.

Each camera in the camera array returns a single monochrome _image tile_ with a random unique _ID number_. The tiles (your puzzle input) arrived in a random order.

Worse yet, the camera array appears to be malfunctioning: each image tile has been _rotated and flipped to a random orientation_. Your first task is to reassemble the original image by orienting the tiles so they fit together.

To show how the tiles should be reassembled, each tile's image data includes a border that should line up exactly with its adjacent tiles. All tiles have this border, and the border lines up exactly when the tiles are both oriented correctly. Tiles at the edge of the image also have this border, but the outermost edges won't line up with any other tiles.

For example, suppose you have the following nine tiles:

    Tile 2311:
    ..##.#..#.
    ##..#.....
    #...##..#.
    ####.#...#
    ##.##.###.
    ##...#.###
    .#.#.#..##
    ..#....#..
    ###...#.#.
    ..###..###

    Tile 1951:
    #.##...##.
    #.####...#
    .....#..##
    #...######
    .##.#....#
    .###.#####
    ###.##.##.
    .###....#.
    ..#.#..#.#
    #...##.#..

    Tile 1171:
    ####...##.
    #..##.#..#
    ##.#..#.#.
    .###.####.
    ..###.####
    .##....##.
    .#...####.
    #.##.####.
    ####..#...
    .....##...

    Tile 1427:
    ###.##.#..
    .#..#.##..
    .#.##.#..#
    #.#.#.##.#
    ....#...##
    ...##..##.
    ...#.#####
    .#.####.#.
    ..#..###.#
    ..##.#..#.

    Tile 1489:
    ##.#.#....
    ..##...#..
    .##..##...
    ..#...#...
    #####...#.
    #..#.#.#.#
    ...#.#.#..
    ##.#...##.
    ..##.##.##
    ###.##.#..

    Tile 2473:
    #....####.
    #..#.##...
    #.##..#...
    ######.#.#
    .#...#.#.#
    .#########
    .###.#..#.
    ########.#
    ##...##.#.
    ..###.#.#.

    Tile 2971:
    ..#.#....#
    #...###...
    #.#.###...
    ##.##..#..
    .#####..##
    .#..####.#
    #..#.#..#.
    ..####.###
    ..#.#.###.
    ...#.#.#.#

    Tile 2729:
    ...#.#.#.#
    ####.#....
    ..#.#.....
    ....#..#.#
    .##..##.#.
    .#.####...
    ####.#.#..
    ##.####...
    ##..#.##..
    #.##...##.

    Tile 3079:
    #.#.#####.
    .#..######
    ..#.......
    ######....
    ####.#..#.
    .#...#.##.
    #.#####.##
    ..#.###...
    ..#.......
    ..#.###...

By rotating, flipping, and rearranging them, you can find a square arrangement that causes all adjacent borders to line up:

    #...##.#.. ..###..### #.#.#####.
    ..#.#..#.# ###...#.#. .#..######
    .###....#. ..#....#.. ..#.......
    ###.##.##. .#.#.#..## ######....
    .###.##### ##...#.### ####.#..#.
    .##.#....# ##.##.###. .#...#.##.
    #...###### ####.#...# #.#####.##
    .....#..## #...##..#. ..#.###...
    #.####...# ##..#..... ..#.......
    #.##...##. ..##.#..#. ..#.###...

    #.##...##. ..##.#..#. ..#.###...
    ##..#.##.. ..#..###.# ##.##....#
    ##.####... .#.####.#. ..#.###..#
    ####.#.#.. ...#.##### ###.#..###
    .#.####... ...##..##. .######.##
    .##..##.#. ....#...## #.#.#.#...
    ....#..#.# #.#.#.##.# #.###.###.
    ..#.#..... .#.##.#..# #.###.##..
    ####.#.... .#..#.##.. .######...
    ...#.#.#.# ###.##.#.. .##...####

    ...#.#.#.# ###.##.#.. .##...####
    ..#.#.###. ..##.##.## #..#.##..#
    ..####.### ##.#...##. .#.#..#.##
    #..#.#..#. ...#.#.#.. .####.###.
    .#..####.# #..#.#.#.# ####.###..
    .#####..## #####...#. .##....##.
    ##.##..#.. ..#...#... .####...#.
    #.#.###... .##..##... .####.##.#
    #...###... ..##...#.. ...#..####
    ..#.#....# ##.#.#.... ...##.....

For reference, the IDs of the above tiles are:

<pre><code><b>1951</b>    2311    <b>3079</b>
2729    1427    2473
<b>2971</b>    1489    <b>1171</b>
</code></pre>

To check that you've assembled the image correctly, multiply the IDs of the four corner tiles together. If you do this with the assembled tiles from the example above, you get `1951 * 3079 * 2971 * 1171` = _`20899048083289`_.

Assemble the tiles into an image. _What do you get if you multiply together the IDs of the four corner tiles?_

-----------------

## --- Part Two ---

Now, you're ready to _check the image for sea monsters_.

The borders of each tile are not part of the actual image; start by removing them.

In the example above, the tiles become:

    .#.#..#. ##...#.# #..#####
    ###....# .#....#. .#......
    ##.##.## #.#.#..# #####...
    ###.#### #...#.## ###.#..#
    ##.#.... #.##.### #...#.##
    ...##### ###.#... .#####.#
    ....#..# ...##..# .#.###..
    .####... #..#.... .#......
    
    #..#.##. .#..###. #.##....
    #.####.. #.####.# .#.###..
    ###.#.#. ..#.#### ##.#..##
    #.####.. ..##..## ######.#
    ##..##.# ...#...# .#.#.#..
    ...#..#. .#.#.##. .###.###
    .#.#.... #.##.#.. .###.##.
    ###.#... #..#.##. ######..
    
    .#.#.### .##.##.# ..#.##..
    .####.## #.#...## #.#..#.#
    ..#.#..# ..#.#.#. ####.###
    #..####. ..#.#.#. ###.###.
    #####..# ####...# ##....##
    #.##..#. .#...#.. ####...#
    .#.###.. ##..##.. ####.##.
    ...###.. .##...#. ..#..###
    

Remove the gaps to form the actual image:

    .#.#..#.##...#.##..#####
    ###....#.#....#..#......
    ##.##.###.#.#..######...
    ###.#####...#.#####.#..#
    ##.#....#.##.####...#.##
    ...########.#....#####.#
    ....#..#...##..#.#.###..
    .####...#..#.....#......
    #..#.##..#..###.#.##....
    #.####..#.####.#.#.###..
    ###.#.#...#.######.#..##
    #.####....##..########.#
    ##..##.#...#...#.#.#.#..
    ...#..#..#.#.##..###.###
    .#.#....#.##.#...###.##.
    ###.#...#..#.##.######..
    .#.#.###.##.##.#..#.##..
    .####.###.#...###.#..#.#
    ..#.#..#..#.#.#.####.###
    #..####...#.#.#.###.###.
    #####..#####...###....##
    #.##..#..#...#..####...#
    .#.###..##..##..####.##.
    ...###...##...#...#..###
    

Now, you're ready to search for sea monsters! Because your image is monochrome, a sea monster will look like this:

                      # 
    #    ##    ##    ###
     #  #  #  #  #  #   
    

When looking for this pattern in the image, _the spaces can be anything_; only the `#` need to match. Also, you might need to rotate or flip your image before it's oriented correctly to find sea monsters. In the above image, _after flipping and rotating it_ to the appropriate orientation, there are _two_ sea monsters (marked with **`O`**):

<pre><code>.####...#####..#...###..
#####..#..#.#.####..#.#.
.#.#...#.###...#.##.<b>O</b>#..
#.<b>O</b>.##.<b>O</b><b>O</b>#.#.<b>O</b><b>O</b>.##.<b>O</b><b>O</b><b>O</b>##
..#<b>O</b>.#<b>O</b>#.<b>O</b>##<b>O</b>..<b>O</b>.#<b>O</b>##.##
...#.#..##.##...#..#..##
#.##.#..#.#..#..##.#.#..
.###.##.....#...###.#...
#.####.#.#....##.#..#.#.
##...#..#....#..#...####
..#.##...###..#.#####..#
....#.##.#.#####....#...
..##.##.###.....#.##..#.
#...#...###..####....##.
.#.##...#.##.#.#.###...#
#.###.#..####...##..#...
#.###...#.##...#.##<b>O</b>###.
.<b>O</b>##.#<b>O</b><b>O</b>.###<b>O</b><b>O</b>##..<b>O</b><b>O</b><b>O</b>##.
..<b>O</b>#.<b>O</b>..<b>O</b>..<b>O</b>.#<b>O</b>##<b>O</b>##.###
#.#..##.########..#..##.
#.#####..#.#...##..#....
#....##..#.#########..##
#...#.....#..##...###.##
#..###....##.#...##.##.#
</code></pre>

Determine how rough the waters are in the sea monsters' habitat by counting the number of `#` that are _not_ part of a sea monster. In the above example, the habitat's water roughness is _`273`_.

_How many `#` are not part of a sea monster?_
