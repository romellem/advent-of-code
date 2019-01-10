# Answers

| Part 1  | Part 2 |
|---------|--------|
| `38628` | ` ` |

## --- Day 10: Knot Hash ---

You come across some programs that are trying to implement a software emulation of a hash based on knot-tying. The hash these programs are implementing isn't very strong, but you decide to help them anyway. You make a mental note to remind the Elves later not to invent their own cryptographic functions.

This hash function simulates tying a knot in a circle of string with 256 marks on it. Based on the input to be hashed, the function repeatedly selects a span of string, brings the ends together, and gives the span a half-twist to reverse the order of the marks within it. After doing this many times, the order of the marks is used to build the resulting hash.

      4--5   pinch   4  5           4   1
     /    \  5,0,1  / \/ \  twist  / \ / \
    3      0  -->  3      0  -->  3   X   0
     \    /         \ /\ /         \ / \ /
      2--1           2  1           2   5
    

To achieve this, begin with a _list_ of numbers from `0` to `255`, a _current position_ which begins at `0` (the first element in the list), a _skip size_ (which starts at `0`), and a sequence of _lengths_ (your puzzle input). Then, for each length:

*   _Reverse_ the order of that _length_ of elements in the _list_, starting with the element at the _current position_.
*   _Move_ the _current position_ forward by that _length_ plus the _skip size_.
*   _Increase_ the _skip size_ by one.

The _list_ is circular; if the _current position_ and the _length_ try to reverse elements beyond the end of the list, the operation reverses using as many extra elements as it needs from the front of the list. If the _current position_ moves past the end of the list, it wraps around to the front. _Lengths_ larger than the size of the _list_ are invalid.

Here's an example using a smaller list:

Suppose we instead only had a circular list containing five elements, `0, 1, 2, 3, 4`, and were given input lengths of `3, 4, 1, 5`.

*   The list begins as `[0] 1 2 3 4` (where square brackets indicate the _current position_).
*   The first length, `3`, selects `([0] 1 2) 3 4` (where parentheses indicate the sublist to be reversed).
*   After reversing that section (`0 1 2` into `2 1 0`), we get `([2] 1 0) 3 4`.
*   Then, the _current position_ moves forward by the _length_, `3`, plus the _skip size_, 0: `2 1 0 [3] 4`. Finally, the _skip size_ increases to `1`.

*   The second length, `4`, selects a section which wraps: `2 1) 0 ([3] 4`.
*   The sublist `3 4 2 1` is reversed to form `1 2 4 3`: `4 3) 0 ([1] 2`.
*   The _current position_ moves forward by the _length_ plus the _skip size_, a total of `5`, causing it not to move because it wraps around: `4 3 0 [1] 2`. The _skip size_ increases to `2`.

*   The third length, `1`, selects a sublist of a single element, and so reversing it has no effect.
*   The _current position_ moves forward by the _length_ (`1`) plus the _skip size_ (`2`): `4 [3] 0 1 2`. The _skip size_ increases to `3`.

*   The fourth length, `5`, selects every element starting with the second: `4) ([3] 0 1 2`. Reversing this sublist (`3 0 1 2 4` into `4 2 1 0 3`) produces: `3) ([4] 2 1 0`.
*   Finally, the _current position_ moves forward by `8`: `3 4 2 1 [0]`. The _skip size_ increases to `4`.

In this example, the first two numbers in the list end up being `3` and `4`; to check the process, you can multiply them together to produce `12`.

However, you should instead use the standard list size of `256` (with values `0` to `255`) and the sequence of _lengths_ in your puzzle input. Once this process is complete, _what is the result of multiplying the first two numbers in the list_?
