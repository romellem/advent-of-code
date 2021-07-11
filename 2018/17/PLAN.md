```
Let `drips` be a Set of Points, tracking:
 - x
 - y
init'd with a drip at 500,0

Loop through drips until we have no more, with each one:

if cell below is greater than max,
    delete drip and bail

if cell below current drip is SAND,
    mark map below current as FLOWING
    move drip down 1
if cell below current drip is CLAY or SETTLED,
    Move left, checking floor below continually to remain CLAY or SETTLED
        If we eventually meet CLAY or SETTLED to the left,
            var barrier_left = {x,y} of barrier
        else
            var flow_left = {x,y} of where the drip would start
    Move right, checking floor below continually to stay CLAY or SETTLED
        If we eventually meet CLAY or SETTLED to the right,
            var barrier_right = {x,y}
        else
            var flow_right = {x,y} of where the drip would start
    If barrier_left AND barrier_right
        Mark from barrier_left to barrier_right to be SETTLED
        move drip up 1
    else if barrier_left AND flow_right
        mark from barrier_left to flow_right to be FLOWING
        move drip to flow_right
    else if barrier_right AND flow_left
        mark from flow_left to barrier_right to be FLOWING
        move drip to flow_left
     else if flow_left AND flow_right
        mark from flow_left to flow_right to be FLOWING
        move drip to flow_left
        push new drip to flow_right

```
