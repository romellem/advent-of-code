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

    Initially:
    X=.|=.|.|=.|=|=.
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
    X|=|=|||..|.=...
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
    .X=|=|||..|.=...
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
    .X=|=|||..|.=...
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
    .|=|X|||..|.=...
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
    .|=|X|||..|.=...
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
    .=..X==..=|.|||.
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
    .=..=X=..=|.|||.
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
    =|||.X.|==..|=.|
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
    =|||..X|==..|=.|
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
    =.=|=.X..=.||==|
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
    =.=|=.=..=X||==|
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
    .===|=|===X===||
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
    .===|=|===X===||
    =|||...|==..|=.|
    =.=|=.=..=.||==|
    ||=|=...|==.=|==
    |=.=||===.|||===
    ||.|==.|.|.||=||
    

This is tied with other routes as the _fastest way to reach the target_: _`45`_ minutes. In it, `21` minutes are spent switching tools (three times, seven minutes each) and the remaining `24` minutes are spent moving.

_What is the fewest number of minutes you can take to reach the target?_