# Answers

| Part 1 | Part 2 |
| ------ | ------ |
|  `974` |  `646` |

## --- Day 5: Binary Boarding ---

You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

Instead of [zones or groups](https://www.youtube.com/watch?v=oAHbLRjF0vo), this airline uses _binary space partitioning_ to seat people. A seat might be specified like `FBFBBFFRLR`, where `F` means "front", `B` means "back", `L` means "left", and `R` means "right".

The first 7 characters will either be `F` or `B`; these specify exactly one of the _128 rows_ on the plane (numbered `0` through `127`). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the _front_ (`0` through `63`) or the _back_ (`64` through `127`). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

For example, consider just the first seven characters of `FBFBBFFRLR`:

*   Start by considering the whole range, rows `0` through `127`.
*   `F` means to take the _lower half_, keeping rows `0` through `63`.
*   `B` means to take the _upper half_, keeping rows `32` through `63`.
*   `F` means to take the _lower half_, keeping rows `32` through `47`.
*   `B` means to take the _upper half_, keeping rows `40` through `47`.
*   `B` keeps rows `44` through `47`.
*   `F` keeps rows `44` through `45`.
*   The final `F` keeps the lower of the two, _row `44`_.

The last three characters will be either `L` or `R`; these specify exactly one of the _8 columns_ of seats on the plane (numbered `0` through `7`). The same process as above proceeds again, this time with only three steps. `L` means to keep the _lower half_, while `R` means to keep the _upper half_.

For example, consider just the last 3 characters of `FBFBBFFRLR`:

*   Start by considering the whole range, columns `0` through `7`.
*   `R` means to take the _upper half_, keeping columns `4` through `7`.
*   `L` means to take the _lower half_, keeping columns `4` through `5`.
*   The final `R` keeps the upper of the two, _column `5`_.

So, decoding `FBFBBFFRLR` reveals that it is the seat at _row `44`, column `5`_.

Every seat also has a unique _seat ID_: multiply the row by 8, then add the column. In this example, the seat has ID `44 * 8 + 5 = _357_`.

Here are some other boarding passes:

*   `BFFFBBFRRR`: row `70`, column `7`, seat ID `567`.
*   `FFFBBBFRRR`: row `14`, column `7`, seat ID `119`.
*   `BBFFBBFRLL`: row `102`, column `4`, seat ID `820`.

As a sanity check, look through your list of boarding passes. _What is the highest seat ID on a boarding pass?_

-----------------

## --- Part Two ---

_Ding!_ The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

_What is the ID of your seat?_
