```
Let `drips` be a stack

While drips has length

Peek top drip, store as current drip

if cell below is greater than max,
    bail

if current drip is down
    if cell below current drip is SAND,
        push new down drip onto stack, mark map as FLOW
    if cell below current drip is CLAY,
        pop current drip
        push new left/right drip onto stack, mark map as FLOW
    if cell below current drip is REST,
        pop current drip
        push new left/right drip onto stack, mark map as FLOW
if current drip is left/right
    pop current drip
    if CLAY on both left/right
        Mark map as REST in x-axis
    if CLAY on left but not right
        Get clay x and sand cell with sand below x, mark map between as FLOW
        push new down drip onto stack
    if CLAY on right but not left
        Get clay x and sand cell with sand below x, mark map between as FLOW
        push new down drip onto stack
    



[
    [500, 0, down]
    [500, 1, down]
    [500, 2, down]
    [500, 3, down]
    [500, 4, down]
    [500, 5, down]
    [500, 6, down]
]

pop [500, 6, down]
psh [500, 6, left/right]

[
    [500, 0, down]
    [500, 1, down]
    [500, 2, down]
    [500, 3, down]
    [500, 4, down]
    [500, 5, down]
    [500, 6, left/right]
]

pop [500, 6, left/right]

[
    [500, 0, down]
    [500, 1, down]
    [500, 2, down]
    [500, 3, down]
    [500, 4, down]
    [500, 5, down]
]

pop [500, 5, down]
psh [500, 5, left/right]

[
    [500, 0, down]
    [500, 1, down]
    [500, 2, down]
    [500, 3, down]
    [500, 4, down]
    [500, 5, down]
]
```
