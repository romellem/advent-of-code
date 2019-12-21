# Answers

| Part 1 |  Part 2 |
|--------|---------|
| ` ` | ` ` |

## --- Day 21: Springdroid Adventure ---

You lift off from Pluto and start flying in the direction of Santa.

While experimenting further with the tractor beam, you accidentally pull an asteroid directly into your ship! It deals significant damage to your hull and causes your ship to begin tumbling violently.

You can send a droid out to investigate, but the tumbling is causing enough [artificial gravity](https://en.wikipedia.org/wiki/Artificial_gravity) that one wrong step could send the droid through a hole in the hull and flying out into space.

The clear choice for this mission is a droid that can _jump_ over the holes in the hull - a _springdroid_.

You can use an [Intcode](https://adventofcode.com/2019/day/9) program (your puzzle input) running on an [ASCII-capable](https://adventofcode.com/2019/day/17) computer to [program](https://en.wikipedia.org/wiki/Programmable_read-only_memory) the springdroid. However, springdroids don't run Intcode; instead, they run a simplified assembly language called _springscript_.

While a springdroid is certainly capable of navigating the artificial gravity and giant holes, it has one downside: it can only remember at most _15_ springscript instructions.

The springdroid will move forward automatically, constantly thinking about _whether to jump_. The springscript program defines the logic for this decision.

Springscript programs only use [Boolean values](https://en.wikipedia.org/wiki/Boolean_data_type), not numbers or strings. Two registers are available: `T`, the _temporary value_ register, and `J`, the _jump_ register. If the jump register is _true_ at the end of the springscript program, the springdroid will try to jump. Both of these registers start with the value _false_.

Springdroids have a sensor that can detect _whether there is ground_ at various distances in the direction it is facing; these values are provided in _read-only registers_. Your springdroid can detect ground at four distances: one tile away (`A`), two tiles away (`B`), three tiles away (`C`), and four tiles away (`D`). If there is ground at the given distance, the register will be _true_; if there is a hole, the register will be _false_.

There are only _three instructions_ available in springscript:

*   `AND X Y` sets `Y` to _true_ if both `X` and `Y` are _true_; otherwise, it sets `Y` to _false_.
*   `OR X Y` sets `Y` to _true_ if at least one of `X` or `Y` is _true_; otherwise, it sets `Y` to _false_.
*   `NOT X Y` sets `Y` to _true_ if `X` is _false_; otherwise, it sets `Y` to _false_.

In all three instructions, the second argument (`Y`) needs to be a _writable register_ (either `T` or `J`). The first argument (`X`) can be _any register_ (including `A`, `B`, `C`, or `D`).

For example, the one-instruction program `NOT A J` means "if the tile immediately in front of me is not ground, jump".

Or, here is a program that jumps if a three-tile-wide hole (with ground on the other side of the hole) is detected:

    NOT A J
    NOT B T
    AND T J
    NOT C T
    AND T J
    AND D J
    

The Intcode program expects ASCII inputs and outputs. It will begin by displaying a prompt; then, input the desired instructions one per line. End each line with a newline (ASCII code `10`). _When you have finished entering your program_, provide the command `WALK` followed by a newline to instruct the springdroid to begin surveying the hull.

If the springdroid _falls into space_, an ASCII rendering of the last moments of its life will be produced. In these, `@` is the springdroid, `#` is hull, and `.` is empty space. For example, suppose you program the springdroid like this:

    NOT D J
    WALK
    

This one-instruction program sets `J` to _true_ if and only if there is no ground four tiles away. In other words, it attempts to jump into any hole it finds:

    .................
    .................
    @................
    #####.###########
    
    .................
    .................
    .@...............
    #####.###########
    
    .................
    ..@..............
    .................
    #####.###########
    
    ...@.............
    .................
    .................
    #####.###########
    
    .................
    ....@............
    .................
    #####.###########
    
    .................
    .................
    .....@...........
    #####.###########
    
    .................
    .................
    .................
    #####@###########
    

However, if the springdroid successfully makes it across, it will use an output instruction to indicate the _amount of damage to the hull_ as a single giant integer outside the normal ASCII range.

Program the springdroid with logic that allows it to survey the hull without falling into space. _What amount of hull damage does it report?_
