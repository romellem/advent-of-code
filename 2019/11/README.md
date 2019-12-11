# Answers

| Part 1 |   Part 2   |
|--------|------------|
| `2883` | `LEPCPLGZ` |

## --- Day 11: Space Police ---

On the way to Jupiter, you're [pulled over](https://www.youtube.com/watch?v=KwY28rpyKDE) by the _Space Police_.

"Attention, unmarked spacecraft! You are in violation of Space Law! All spacecraft must have a clearly visible _registration identifier_! You have 24 hours to comply or be sent to [Space Jail](https://www.youtube.com/watch?v=BVn1oQL9sWg&t=5)!"

Not wanting to be sent to Space Jail, you radio back to the Elves on Earth for help. Although it takes almost three hours for their reply signal to reach you, they send instructions for how to power up the _emergency hull painting robot_ and even provide a small [Intcode program](9) (your puzzle input) that will cause it to paint your ship appropriately.

There's just one problem: you don't have an emergency hull painting robot.

You'll need to build a new emergency hull painting robot. The robot needs to be able to move around on the grid of square panels on the side of your ship, detect the color of its current panel, and paint its current panel _black_ or _white_. (All of the panels are currently _black_.)

The Intcode program will serve as the brain of the robot. The program uses input instructions to access the robot's camera: provide `0` if the robot is over a _black_ panel or `1` if the robot is over a _white_ panel. Then, the program will output two values:

*   First, it will output a value indicating the _color to paint the panel_ the robot is over: `0` means to paint the panel _black_, and `1` means to paint the panel _white_.
*   Second, it will output a value indicating the _direction the robot should turn_: `0` means it should turn _left 90 degrees_, and `1` means it should turn _right 90 degrees_.

After the robot turns, it should always move _forward exactly one panel_. The robot starts facing _up_.

The robot will continue running for a while like this and halt when it is finished drawing. Do not restart the Intcode computer inside the robot during this process.

For example, suppose the robot is about to start running. Drawing black panels as `.`, white panels as `#`, and the robot pointing the direction it is facing (`< ^ > v`), the initial state and region near the robot looks like this:

    .....
    .....
    ..^..
    .....
    .....
    

The panel under the robot (not visible here because a `^` is shown instead) is also black, and so any input instructions at this point should be provided `0`. Suppose the robot eventually outputs `1` (paint white) and then `0` (turn left). After taking these actions and moving forward one panel, the region now looks like this:

    .....
    .....
    .<#..
    .....
    .....
    

Input instructions should still be provided `0`. Next, the robot might output `0` (paint black) and then `0` (turn left):

    .....
    .....
    ..#..
    .v...
    .....
    

After more outputs (`1,0`, `1,0`):

    .....
    .....
    ..^..
    .##..
    .....
    

The robot is now back where it started, but because it is now on a white panel, input instructions should be provided `1`. After several more outputs (`0,1`, `1,0`, `1,0`), the area looks like this:

    .....
    ..<#.
    ...#.
    .##..
    .....
    

Before you deploy the robot, you should probably have an estimate of the area it will cover: specifically, you need to know the _number of panels it paints at least once_, regardless of color. In the example above, the robot painted _`6` panels_ at least once. (It painted its starting panel twice, but that panel is [still only counted once](https://www.youtube.com/watch?v=KjsSvjA5TuE); it also never painted the panel it ended on.)

Build a new emergency hull painting robot and run the Intcode program on it. _How many panels does it paint at least once?_

-----------------

## --- Part Two ---

You're not sure what it's trying to paint, but it's definitely not a _registration identifier_. The Space Police are getting impatient.

Checking your external ship cameras again, you notice a white panel marked "emergency hull painting robot starting panel". The rest of the panels are _still black_, but it looks like the robot was expecting to _start on a white panel_, not a black one.

Based on the Space Law Space Brochure that the Space Police attached to one of your windows, a valid registration identifier is always _eight capital letters_. After starting the robot on a single _white panel_ instead, _what registration identifier does it paint_ on your hull?
