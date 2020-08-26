# Answers

| Part 1 | Part 2 |
|--------|--------|
| ` ` | ` ` |

## --- Day 22: Sporifica Virus ---

Diagnostics indicate that the local _grid computing cluster_ has been contaminated with the _Sporifica Virus_. The grid computing cluster is a seemingly-infinite two-dimensional grid of compute nodes. Each node is either _clean_ or _infected_ by the virus.

To [prevent overloading](https://en.wikipedia.org/wiki/Morris_worm#The_mistake) the nodes (which would render them useless to the virus) or detection by system administrators, exactly one _virus carrier_ moves through the network, infecting or cleaning nodes as it moves. The virus carrier is always located on a single node in the network (the _current node_) and keeps track of the _direction_ it is facing.

To avoid detection, the virus carrier works in bursts; in each burst, it _wakes up_, does some _work_, and goes back to _sleep_. The following steps are all executed _in order_ one time each burst:

*   If the _current node_ is _infected_, it turns to its _right_. Otherwise, it turns to its _left_. (Turning is done in-place; the _current node_ does not change.)
*   If the _current node_ is _clean_, it becomes _infected_. Otherwise, it becomes _cleaned_. (This is done _after_ the node is considered for the purposes of changing direction.)
*   The virus carrier [moves](https://www.youtube.com/watch?v=2vj37yeQQHg) _forward_ one node in the direction it is facing.

Diagnostics have also provided a _map of the node infection status_ (your puzzle input). _Clean_ nodes are shown as `.`; _infected_ nodes are shown as `#`. This map only shows the center of the grid; there are many more nodes beyond those shown, but none of them are currently infected.

The virus carrier begins in the middle of the map facing _up_.

For example, suppose you are given a map like this:

    ..#
    #..
    ...
    

Then, the middle of the infinite grid looks like this, with the virus carrier's position marked with `[ ]`:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . # . . .
    . . . #[.]. . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

The virus carrier is on a _clean_ node, so it turns _left_, _infects_ the node, and moves left:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . # . . .
    . . .[#]# . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

The virus carrier is on an _infected_ node, so it turns _right_, _cleans_ the node, and moves up:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . .[.]. # . . .
    . . . . # . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

Four times in a row, the virus carrier finds a _clean_, _infects_ it, turns _left_, and moves forward, ending in the same place and still facing up:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . #[#]. # . . .
    . . # # # . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

Now on the same node as before, it sees an infection, which causes it to turn _right_, _clean_ the node, and move forward:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . # .[.]# . . .
    . . # # # . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

After the above actions, a total of `7` bursts of activity had taken place. Of them, `5` bursts of activity caused an infection.

After a total of `70`, the grid looks like this, with the virus carrier facing up:

    . . . . . # # . .
    . . . . # . . # .
    . . . # . . . . #
    . . # . #[.]. . #
    . . # . # . . # .
    . . . . . # # . .
    . . . . . . . . .
    . . . . . . . . .
    

By this time, `41` bursts of activity caused an infection (though most of those nodes have since been cleaned).

After a total of `10000` bursts of activity, `5587` bursts will have caused an infection.

Given your actual map, after `10000` bursts of activity, _how many bursts cause a node to become infected_? (Do not count nodes that begin infected.)
