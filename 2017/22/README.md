# Answers

| Part 1 |   Part 2  |
|--------|-----------|
| `5256` | `2511345` |

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

-----------------

## --- Part Two ---

As you go to remove the virus from the infected nodes, it _evolves_ to resist your attempt.

Now, before it infects a clean node, it will _weaken_ it to disable your defenses. If it encounters an infected node, it will instead _flag_ the node to be cleaned in the future. So:

*   _Clean_ nodes become _weakened_.
*   _Weakened_ nodes become _infected_.
*   _Infected_ nodes become _flagged_.
*   _Flagged_ nodes become _clean_.

Every node is always in exactly one of the above states.

The virus carrier still functions in a similar way, but now uses the following logic during its bursts of action:

*   Decide which way to turn based on the _current node_:
    *   If it is _clean_, it turns _left_.
    *   If it is _weakened_, it does _not_ turn, and will continue moving in the same direction.
    *   If it is _infected_, it turns _right_.
    *   If it is _flagged_, it _reverses_ direction, and will go back the way it came.
*   Modify the state of the _current node_, as described above.
*   The virus carrier moves _forward_ one node in the direction it is facing.

Start with the same map (still using `.` for _clean_ and `#` for infected) and still with the virus carrier starting in the middle and facing _up_.

Using the same initial state as the previous example, and drawing _weakened_ as `W` and _flagged_ as `F`, the middle of the infinite grid looks like this, with the virus carrier's position again marked with `[ ]`:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . # . . .
    . . . #[.]. . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

This is the same as before, since no initial nodes are _weakened_ or _flagged_. The virus carrier is on a clean node, so it still turns left, instead _weakens_ the node, and moves left:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . # . . .
    . . .[#]W . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

The virus carrier is on an infected node, so it still turns right, instead _flags_ the node, and moves up:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . .[.]. # . . .
    . . . F W . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

This process repeats three more times, ending on the previously-flagged node and facing right:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . W W . # . . .
    . . W[F]W . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

Finding a flagged node, it reverses direction and _cleans_ the node:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . W W . # . . .
    . .[W]. W . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

The _weakened_ node becomes infected, and it continues in the same direction:

    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . W W . # . . .
    .[.]# . W . . . .
    . . . . . . . . .
    . . . . . . . . .
    . . . . . . . . .
    

Of the first `100` bursts, `26` will result in _infection_. Unfortunately, another feature of this evolved virus is _speed_; of the first `10000000` bursts, `2511944` will result in _infection_.

Given your actual map, after `10000000` bursts of activity, _how many bursts cause a node to become infected_? (Do not count nodes that begin infected.)
