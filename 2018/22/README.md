# Answers

| Part 1 | Part 2 |
|--------|--------|
| `8681` | `1070` |

## --- Day 22: Mode Maze ---
--------------------------

This is it, your final stop: the year \-483. It's snowing and dark outside; the only light you can see is coming from a small cottage in the distance. You make your way there and knock on the door.

A portly man with a large, white beard answers the door and invites you inside. For someone living near the North Pole in -483, he must not get many visitors, but he doesn't act surprised to see you. Instead, he offers you some milk and cookies.

After talking for a while, he asks a favor of you. His friend hasn't come back in a few hours, and he's not sure where he is. Scanning the region briefly, you discover one life signal in a cave system nearby; his friend must have taken shelter there. The man asks if you can go there to retrieve his friend.

The cave is divided into square _regions_ which are either dominantly _rocky_, _narrow_, or _wet_ (called its _type_). Each region occupies exactly one _coordinate_ in `X,Y` format where `X` and `Y` are integers and zero or greater. (Adjacent regions can be the same type.)

The scan (your puzzle input) is not very detailed: it only reveals the _depth_ of the cave system and the _coordinates of the target_. However, it does not reveal the type of each region. The mouth of the cave is at `0,0`.

The man explains that due to the unusual geology in the area, there is a method to determine any region's type based on its _erosion level_. The erosion level of a region can be determined from its _geologic index_. The geologic index can be determined using the first rule that applies from the list below:

*   The region at `0,0` (the mouth of the cave) has a geologic index of `0`.
*   The region at the coordinates of the target has a geologic index of `0`.
*   If the region's `Y` coordinate is `0`, the geologic index is its `X` coordinate times `16807`.
*   If the region's `X` coordinate is `0`, the geologic index is its `Y` coordinate times `48271`.
*   Otherwise, the region's geologic index is the result of multiplying the erosion _levels_ of the regions at `X-1,Y` and `X,Y-1`.

A region's _erosion level_ is its _geologic index_ plus the cave system's _depth_, all [modulo](https://en.wikipedia.org/wiki/Modulo_operation) `20183`. Then:

*   If the _erosion level modulo `3`_ is `0`, the region's type is _rocky_.
*   If the _erosion level modulo `3`_ is `1`, the region's type is _wet_.
*   If the _erosion level modulo `3`_ is `2`, the region's type is _narrow_.

For example, suppose the cave system's depth is `510` and the target's coordinates are `10,10`. Using `%` to represent the modulo operator, the cavern would look as follows:

*   At `0,0`, the geologic index is `0`. The erosion level is `(0 + 510) % 20183 = 510`. The type is `510 % 3 = 0`, _rocky_.
*   At `1,0`, because the `Y` coordinate is `0`, the geologic index is `1 * 16807 = 16807`. The erosion level is `(16807 + 510) % 20183 = 17317`. The type is `17317 % 3 = 1`, _wet_.
*   At `0,1`, because the `X` coordinate is `0`, the geologic index is `1 * 48271 = 48271`. The erosion level is `(48271 + 510) % 20183 = 8415`. The type is `8415 % 3 = 0`, _rocky_.
*   At `1,1`, neither coordinate is `0` and it is not the coordinate of the target, so the geologic index is the erosion level of `0,1` (`8415`) times the erosion level of `1,0` (`17317`), `8415 * 17317 = 145722555`. The erosion level is `(145722555 + 510) % 20183 = 1805`. The type is `1805 % 3 = 2`, _narrow_.
*   At `10,10`, because they are the target's coordinates, the geologic index is `0`. The erosion level is `(0 + 510) % 20183 = 510`. The type is `510 % 3 = 0`, _rocky_.

Drawing this same cave system with rocky as `.`, wet as `=`, narrow as `|`, the mouth as `M`, the target as `T`, with `0,0` in the top-left corner, `X` increasing to the right, and `Y` increasing downward, the top-left corner of the map looks like this:

<pre><code><b>M</b>=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===<b>T</b>===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||
</code></pre>

Before you go in, you should determine the _risk level_ of the area. For the rectangle that has a top-left corner of region `0,0` and a bottom-right corner of the region containing the target, add up the risk level of each individual region: `0` for rocky regions, `1` for wet regions, and `2` for narrow regions.

In the cave system above, because the mouth is at `0,0` and the target is at `10,10`, adding up the risk level of all regions with an `X` coordinate from `0` to `10` and a `Y` coordinate from `0` to `10`, this total is `_114_`.

_What is the total risk level for the smallest rectangle that includes `0,0` and the target's coordinates?_

-----------------

## --- Part Two ---

Okay, it's time to go rescue the man's friend.

As you leave, he hands you some tools: a _torch_ and some _climbing gear_. You can't equip both tools at once, but you can choose to use _neither_.

Tools can only be used in certain regions:

*   In _rocky_ regions, you can use the _climbing gear_ or the _torch_. You cannot use _neither_ (you'll likely slip and fall).
*   In _wet_ regions, you can use the _climbing gear_ or _neither_ tool. You cannot use the _torch_ (if it gets wet, you won't have a light source).
*   In _narrow_ regions, you can use the _torch_ or _neither_ tool. You cannot use the _climbing gear_ (it's too bulky to fit).

You start at `0,0` (the mouth of the cave) with _the torch equipped_ and must reach the target coordinates as quickly as possible. The regions with negative `X` or `Y` are solid rock and cannot be traversed. The fastest route might involve entering regions beyond the `X` or `Y` coordinate of the target.

You can _move to an adjacent region_ (up, down, left, or right; never diagonally) if your currently equipped tool allows you to enter that region. Moving to an adjacent region takes _one minute_. (For example, if you have the _torch_ equipped, you can move between _rocky_ and _narrow_ regions, but cannot enter _wet_ regions.)

You can _change your currently equipped tool or put both away_ if your new equipment would be valid for your current region. Switching to using the _climbing gear_, _torch_, or _neither_ always takes _seven minutes_, regardless of which tools you start with. (For example, if you are in a _rocky_ region, you can switch from the _torch_ to the _climbing gear_, but you cannot switch to _neither_.)

Finally, once you reach the target, you need the _torch_ equipped before you can find him in the dark. The target is always in a _rocky_ region, so if you arrive there with _climbing gear_ equipped, you will need to spend seven minutes switching to your torch.

For example, using the same cave system as above, starting in the top left corner (`0,0`) and moving to the bottom right corner (the target, `10,10`) as quickly as possible, one possible route is as follows, with your current position marked `X`:

<pre><code>Initially:
<em>X</em>=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Down:
M=.|=.|.|=.|=|=.
<em>X</em>|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Right:
M=.|=.|.|=.|=|=.
.<em>X</em>=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Switch from using the torch to neither tool:
M=.|=.|.|=.|=|=.
.<em>X</em>=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Right 3:
M=.|=.|.|=.|=|=.
.|=|<em>X</em>|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Switch from using neither tool to the climbing gear:
M=.|=.|.|=.|=|=.
.|=|<em>X</em>|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Down 7:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..<em>X</em>==..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Right:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..=<em>X</em>=..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Down 3:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||.<em>X</em>.|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Right:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||..<em>X</em>|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Down:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.<em>X</em>..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Right 4:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===T===||
=|||...|==..|=.|
=.=|=.=..=<em>X</em>||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Up 2:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===<em>X</em>===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||

Switch from using the climbing gear to the torch:
M=.|=.|.|=.|=|=.
.|=|=|||..|.=...
.==|....||=..|==
=.|....|.==.|==.
=|..==...=.|==..
=||.=.=||=|=..|=
|.=.===|||..=..|
|..==||=.|==|===
.=..===..=|.|||.
.======|||=|=.|=
.===|=|===<em>X</em>===||
=|||...|==..|=.|
=.=|=.=..=.||==|
||=|=...|==.=|==
|=.=||===.|||===
||.|==.|.|.||=||
</code></pre>

This is tied with other routes as the _fastest way to reach the target_: _`45`_ minutes. In it, `21` minutes are spent switching tools (three times, seven minutes each) and the remaining `24` minutes are spent moving.

_What is the fewest number of minutes you can take to reach the target?_
