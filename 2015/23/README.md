# Answers

| Part 1 | Part 2 |
|--------|--------|
|  `170` |  `247` |

## --- Day 23: Opening the Turing Lock ---

Little Jane Marie just got her very first computer for Christmas from some unknown benefactor. It comes with instructions and an example program, but the computer itself seems to be malfunctioning. She's curious what the program does, and would like you to help her run it.

The manual explains that the computer supports two [registers](https://en.wikipedia.org/wiki/Processor_register) and six [instructions](https://en.wikipedia.org/wiki/Instruction_set) (truly, it goes on to remind the reader, a state-of-the-art technology). The registers are named `a` and `b`, can hold any [non-negative integer](https://en.wikipedia.org/wiki/Natural_number), and begin with a value of `0`. The instructions are as follows:

*   `hlf r` sets register `r` to _half_ its current value, then continues with the next instruction.
*   `tpl r` sets register `r` to _triple_ its current value, then continues with the next instruction.
*   `inc r` _increments_ register `r`, adding `1` to it, then continues with the next instruction.
*   `jmp offset` is a _jump_; it continues with the instruction `offset` away _relative to itself_.
*   `jie r, offset` is like `jmp`, but only jumps if register `r` is _even_ ("jump if even").
*   `jio r, offset` is like `jmp`, but only jumps if register `r` is `1` ("jump if _one_", not odd).

All three jump instructions work with an _offset_ relative to that instruction. The offset is always written with a prefix `+` or `-` to indicate the direction of the jump (forward or backward, respectively). For example, `jmp +1` would simply continue with the next instruction, while `jmp +0` would continuously jump back to itself forever.

The program exits when it tries to run an instruction beyond the ones defined.

For example, this program sets `a` to `2`, because the `jio` instruction causes it to skip the `tpl` instruction:

    inc a
    jio a, +2
    tpl a
    inc a
    

What is _the value in register `b`_ when the program in your puzzle input is finished executing?

-----------------

## --- Part Two ---

The unknown benefactor is _very_ thankful for releasi-- er, helping little Jane Marie with her computer. Definitely not to distract you, what is the value in register `b` after the program is finished executing if register `a` starts as `1` instead?
