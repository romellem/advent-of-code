# Answers

| Part 1 | Part 2 |
|--------|--------|
| ` ` | ` ` |

## --- Day 17: Two Steps Forward ---

You're trying to access a secure vault protected by a `4x4` grid of small rooms connected by doors. You start in the top-left room (marked `S`), and you can access the vault (marked `V`) once you reach the bottom-right room:

    #########
    #S| | | #
    #-#-#-#-#
    # | | | #
    #-#-#-#-#
    # | | | #
    #-#-#-#-#
    # | | |  
    ####### V
    

Fixed walls are marked with `#`, and doors are marked with `-` or `|`.

The doors in your _current room_ are either open or closed (and locked) based on the hexadecimal [MD5](https://en.wikipedia.org/wiki/MD5) hash of a passcode (your puzzle input) followed by a sequence of uppercase characters representing the _path you have taken so far_ (`U` for up, `D` for down, `L` for left, and `R` for right).

Only the first four characters of the hash are used; they represent, respectively, the doors _up, down, left, and right_ from your current position. Any `b`, `c`, `d`, `e`, or `f` means that the corresponding door is _open_; any other character (any number or `a`) means that the corresponding door is _closed and locked_.

To access the vault, all you need to do is reach the bottom-right room; reaching this room opens the vault and all doors in the maze.

For example, suppose the passcode is `hijkl`. Initially, you have taken no steps, and so your path is empty: you simply find the MD5 hash of `hijkl` alone. The first four characters of this hash are `ced9`, which indicate that up is open (`c`), down is open (`e`), left is open (`d`), and right is closed and locked (`9`). Because you start in the top-left corner, there are no "up" or "left" doors to be open, so your only choice is _down_.

Next, having gone only one step (down, or `D`), you find the hash of `hijkl_D_`. This produces `f2bc`, which indicates that you can go back up, left (but that's a wall), or right. Going right means hashing `hijkl_DR_` to get `5745` - all doors closed and locked. However, going _up_ instead is worthwhile: even though it returns you to the room you started in, your path would then be `DU`, opening a _different set of doors_.

After going `DU` (and then hashing `hijkl_DU_` to get `528e`), only the right door is open; after going `DUR`, all doors lock. (Fortunately, your actual passcode is not `hijkl`).

Passcodes actually used by Easter Bunny Vault Security do allow access to the vault if you know the right path. For example:

*   If your passcode were `ihgpwlah`, the shortest path would be `DDRRRD`.
*   With `kglvqrro`, the shortest path would be `DDUDRLRRUDRD`.
*   With `ulqzkmiv`, the shortest would be `DRURDRUDDLLDLUURRDULRLDUUDDDRR`.

Given your vault's passcode, _what is the shortest path_ (the actual path, not just the length) to reach the vault?
