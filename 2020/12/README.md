# Answers

| Part 1 |  Part 2 |
| ------ | ------- |
|  `439` | `12385` |

## --- Day 12: Rain Risk ---

Your ferry made decent progress toward the island, but the storm came in faster than anyone expected. The ferry needs to take _evasive actions_!

Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route directly to safety, it produced extremely circuitous instructions. When the captain uses the [PA system](https://en.wikipedia.org/wiki/Public_address_system) to ask if anyone can help, you quickly volunteer.

The navigation instructions (your puzzle input) consists of a sequence of single-character _actions_ paired with integer input _values_. After staring at them for a few minutes, you work out what they probably mean:

*   Action _`N`_ means to move _north_ by the given value.
*   Action _`S`_ means to move _south_ by the given value.
*   Action _`E`_ means to move _east_ by the given value.
*   Action _`W`_ means to move _west_ by the given value.
*   Action _`L`_ means to turn _left_ the given number of degrees.
*   Action _`R`_ means to turn _right_ the given number of degrees.
*   Action _`F`_ means to move _forward_ by the given value in the direction the ship is currently facing.

The ship starts by facing _east_. Only the `L` and `R` actions change the direction the ship is facing. (That is, if the ship is facing east and the next instruction is `N10`, the ship would move north 10 units, but would still move east if the following action were `F`.)

For example:

    F10
    N3
    F7
    R90
    F11
    

These instructions would be handled as follows:

*   `F10` would move the ship 10 units east (because the ship starts by facing east) to _east 10, north 0_.
*   `N3` would move the ship 3 units north to _east 10, north 3_.
*   `F7` would move the ship another 7 units east (because the ship is still facing east) to _east 17, north 3_.
*   `R90` would cause the ship to turn right by 90 degrees and face _south_; it remains at _east 17, north 3_.
*   `F11` would move the ship 11 units south to _east 17, south 8_.

At the end of these instructions, the ship's [Manhattan distance](https://en.wikipedia.org/wiki/Manhattan_distance) (sum of the absolute values of its east/west position and its north/south position) from its starting position is `17 + 8` = _`25`_.

Figure out where the navigation instructions lead. _What is the Manhattan distance between that location and the ship's starting position?_

## --- Part Two ---

Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

Almost all of the actions indicate how to move a _waypoint_ which is relative to the ship's position:

*   Action _`N`_ means to move the waypoint _north_ by the given value.
*   Action _`S`_ means to move the waypoint _south_ by the given value.
*   Action _`E`_ means to move the waypoint _east_ by the given value.
*   Action _`W`_ means to move the waypoint _west_ by the given value.
*   Action _`L`_ means to rotate the waypoint around the ship _left_ (_counter-clockwise_) the given number of degrees.
*   Action _`R`_ means to rotate the waypoint around the ship _right_ (_clockwise_) the given number of degrees.
*   Action _`F`_ means to move _forward_ to the waypoint a number of times equal to the given value.

The waypoint starts _10 units east and 1 unit north_ relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

For example, using the same instructions as above:

*   `F10` moves the ship to the waypoint 10 times (a total of _100 units east and 10 units north_), leaving the ship at _east 100, north 10_. The waypoint stays 10 units east and 1 unit north of the ship.
*   `N3` moves the waypoint 3 units north to _10 units east and 4 units north of the ship_. The ship remains at _east 100, north 10_.
*   `F7` moves the ship to the waypoint 7 times (a total of _70 units east and 28 units north_), leaving the ship at _east 170, north 38_. The waypoint stays 10 units east and 4 units north of the ship.
*   `R90` rotates the waypoint around the ship clockwise 90 degrees, moving it to _4 units east and 10 units south of the ship_. The ship remains at _east 170, north 38_.
*   `F11` moves the ship to the waypoint 11 times (a total of _44 units east and 110 units south_), leaving the ship at _east 214, south 72_. The waypoint stays 4 units east and 10 units south of the ship.

After these operations, the ship's Manhattan distance from its starting position is `214 + 72` = _`286`_.

Figure out where the navigation instructions actually lead. _What is the Manhattan distance between that location and the ship's starting position?_
