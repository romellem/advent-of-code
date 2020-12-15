# Answers

|      Part 1      |      Part 2     |
| ---------------- | --------------- |
| `11612740949946` | `3394509207186` |

## --- Day 14: Docking Data ---

As your ferry approaches the sea port, the captain asks for your help again. The computer system that runs this port isn't compatible with the docking program on the ferry, so the docking parameters aren't being correctly initialized in the docking program's memory.

After a brief inspection, you discover that the sea port's computer system uses a strange [bitmask](https://en.wikipedia.org/wiki/Mask_(computing)) system in its initialization program. Although you don't have the correct decoder chip handy, you can emulate it in software!

The initialization program (your puzzle input) can either update the bitmask or write a value to memory. Values and memory addresses are both 36-bit unsigned integers. For example, ignoring bitmasks for a moment, a line like `mem[8] = 11` would write the value `11` to memory address `8`.

The bitmask is always given as a string of 36 bits, written with the most significant bit (representing `2^35`) on the left and the least significant bit (`2^0`, that is, the `1`s bit) on the right. The current bitmask is applied to values immediately before they are written to memory: a `0` or `1` overwrites the corresponding bit in the value, while an `X` leaves the bit in the value unchanged.

For example, consider the following program:

    mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0
    

This program starts by specifying a bitmask (`mask = ....`). The mask it specifies will overwrite two bits in every written value: the `2`s bit is overwritten with `0`, and the `64`s bit is overwritten with `1`.

The program then attempts to write the value `11` to memory address `8`. By expanding everything out to individual bits, the mask is applied as follows:

<pre><code>value:  000000000000000000000000000000001011  (decimal 11)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 00000000000000000000000000000<b>1</b>0010<b>0</b>1  (decimal 73)
</code></pre>

So, because of the mask, the value `73` is written to memory address `8` instead. Then, the program tries to write `101` to address `7`:

<pre><code>value:  000000000000000000000000000001100101  (decimal 101)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 00000000000000000000000000000<b>1</b>1001<b>0</b>1  (decimal 101)
</code></pre>

This time, the mask has no effect, as the bits it overwrote were already the values the mask tried to set. Finally, the program tries to write `0` to address `8`:

<pre><code>value:  000000000000000000000000000000000000  (decimal 0)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 00000000000000000000000000000<b>1</b>0000<b>0</b>0  (decimal 64)
</code></pre>

`64` is written to address `8` instead, overwriting the value that was there previously.

To initialize your ferry's docking program, you need the sum of all values left in memory after the initialization program completes. (The entire 36-bit address space begins initialized to the value `0` at every address.) In the above example, only two values in memory are not zero - `101` (at address `7`) and `64` (at address `8`) - producing a sum of _`165`_.

Execute the initialization program. _What is the sum of all values left in memory after it completes?_

-----------------

## --- Part Two ---

For some reason, the sea port's computer system still can't communicate with your ferry's docking program. It must be using _version 2_ of the decoder chip!

A version 2 decoder chip doesn't modify the values being written at all. Instead, it acts as a [memory address decoder](https://www.youtube.com/watch?v=PvfhANgLrm4). Immediately before a value is written to memory, each bit in the bitmask modifies the corresponding bit of the destination _memory address_ in the following way:

*   If the bitmask bit is `0`, the corresponding memory address bit is _unchanged_.
*   If the bitmask bit is `1`, the corresponding memory address bit is _overwritten with `1`_.
*   If the bitmask bit is `X`, the corresponding memory address bit is _floating_.

A _floating_ bit is not connected to anything and instead fluctuates unpredictably. In practice, this means the floating bits will take on _all possible values_, potentially causing many memory addresses to be written all at once!

For example, consider the following program:

    mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1
    

When this program goes to write to memory address `42`, it first applies the bitmask:

<pre><code>address: 000000000000000000000000000000101010  (decimal 42)
mask:    000000000000000000000000000000X1001X
result:  000000000000000000000000000000<b>X1</b>10<b>1X</b>
</code></pre>

After applying the mask, four bits are overwritten, three of which are different, and two of which are _floating_. Floating bits take on every possible combination of values; with two floating bits, four actual memory addresses are written:

<pre><code>000000000000000000000000000000<b>0</b>1101<b>0</b>  (decimal 26)
000000000000000000000000000000<b>0</b>1101<b>1</b>  (decimal 27)
000000000000000000000000000000<b>1</b>1101<b>0</b>  (decimal 58)
000000000000000000000000000000<b>1</b>1101<b>1</b>  (decimal 59)
</code></pre>

Next, the program is about to write to memory address `26` with a different bitmask:

<pre><code>address: 000000000000000000000000000000011010  (decimal 26)
mask:    00000000000000000000000000000000X0XX
result:  00000000000000000000000000000001<b>X</b>0<b>XX</b>
</code></pre>

This results in an address with three floating bits, causing writes to _eight_ memory addresses:

<pre><code>00000000000000000000000000000001<b>0</b>0<b>00</b>  (decimal 16)
00000000000000000000000000000001<b>0</b>0<b>01</b>  (decimal 17)
00000000000000000000000000000001<b>0</b>0<b>10</b>  (decimal 18)
00000000000000000000000000000001<b>0</b>0<b>11</b>  (decimal 19)
00000000000000000000000000000001<b>1</b>0<b>00</b>  (decimal 24)
00000000000000000000000000000001<b>1</b>0<b>01</b>  (decimal 25)
00000000000000000000000000000001<b>1</b>0<b>10</b>  (decimal 26)
00000000000000000000000000000001<b>1</b>0<b>11</b>  (decimal 27)
</code></pre>

The entire 36-bit address space still begins initialized to the value 0 at every address, and you still need the sum of all values left in memory at the end of the program. In this example, the sum is _`208`_.

Execute the initialization program using an emulator for a version 2 decoder chip. _What is the sum of all values left in memory after it completes?_
