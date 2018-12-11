# Answers

| Part 1  |   Part 2    |
|---------|-------------|
| `20,54` | `233,93,13` |

## --- Day 11: Chronal Charge ---

You watch the Elves and their sleigh fade into the distance as they head toward the North Pole.

Actually, you're the one fading. The falling sensation returns.

The low fuel warning light is illuminated on your wrist-mounted device. Tapping it once causes it to project a hologram of the situation: a _300x300_ grid of fuel cells and their current power levels, some negative. You're not sure what negative power means in the context of time travel, but it can't be good.

Each fuel cell has a coordinate ranging _from 1 to 300_ in both the X (horizontal) and Y (vertical) direction. In `X,Y` notation, the top-left cell is `1,1`, and the top-right cell is `300,1`.

The interface lets you select _any 3x3 square_ of fuel cells. To increase your chances of getting to your destination, you decide to choose the 3x3 square with the _largest total power_.

The power level in a given fuel cell can be found through the following process:

*   Find the fuel cell's _rack ID_, which is its _X coordinate plus 10_.
*   Begin with a power level of the _rack ID_ times the _Y coordinate_.
*   Increase the power level by the value of the _grid serial number_ (your puzzle input).
*   Set the power level to itself multiplied by the _rack ID_.
*   Keep only the _hundreds digit_ of the power level (so `12_3_45` becomes `3`; numbers with no hundreds digit become `0`).
*   _Subtract 5_ from the power level.

For example, to find the power level of the fuel cell at `3,5` in a grid with serial number `8`:

*   The rack ID is `3 + 10 = _13_`.
*   The power level starts at `13 * 5 = _65_`.
*   Adding the serial number produces `65 + 8 = _73_`.
*   Multiplying by the rack ID produces `73 * 13 = _949_`.
*   The hundreds digit of `_9_49` is `_9_`.
*   Subtracting 5 produces `9 - 5 = _4_`.

So, the power level of this fuel cell is `_4_`.

Here are some more example power levels:

*   Fuel cell at  `122,79`, grid serial number `57`: power level `-5`.
*   Fuel cell at `217,196`, grid serial number `39`: power level  `0`.
*   Fuel cell at `101,153`, grid serial number `71`: power level  `4`.

Your goal is to find the 3x3 square which has the largest total power. The square must be entirely within the 300x300 grid. Identify this square using the `X,Y` coordinate of its _top-left fuel cell_. For example:

For grid serial number `18`, the largest total 3x3 square has a top-left corner of `_33,45_` (with a total power of `29`); these fuel cells appear in the middle of this 5x5 region:

    -2  -4   4   4   4
    -4   4   4   4  -5
     4   3   3   4  -4
     1   1   2   4  -3
    -1   0   2  -5  -2
    

For grid serial number `42`, the largest 3x3 square's top-left is `_21,61_` (with a total power of `30`); they are in the middle of this region:

    -3   4   2   2   2
    -4   4   3   3   4
    -5   3   3   4  -4
     4   3   3   4  -3
     3   3   3  -5  -1
    

_What is the `X,Y` coordinate of the top-left fuel cell of the 3x3 square with the largest total power?_

-----------------

## --- Part Two ---

You discover a dial on the side of the device; it seems to let you select a square of _any size_, not just 3x3. Sizes from 1x1 to 300x300 are supported.

Realizing this, you now must find the _square of any size with the largest total power_. Identify this square by including its size as a third parameter after the top-left coordinate: a 9x9 square with a top-left corner of `3,5` is identified as `3,5,9`.

For example:

*   For grid serial number `18`, the largest total square (with a total power of `113`) is 16x16 and has a top-left corner of `90,269`, so its identifier is `_90,269,16_`.
*   For grid serial number `42`, the largest total square (with a total power of `119`) is 12x12 and has a top-left corner of `232,251`, so its identifier is `_232,251,12_`.

_What is the `X,Y,size` identifier of the square with the largest total power?_
