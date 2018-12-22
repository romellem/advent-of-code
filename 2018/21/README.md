# Answers

|   Part 1   |  Part 2   |
|------------|-----------|
| `11474091` | `4520776` |

## --- Day 21: Chronal Conversion ---

You should have been watching where you were going, because as you wander the new North Pole base, you trip and fall into a very deep hole!

Just kidding. You're falling through time again.

If you keep up your current pace, you should have resolved all of the temporal anomalies by the next time the device activates. Since you have very little interest in browsing history in 500-year increments for the rest of your life, you need to find a way to get back to your present time.

After a little research, you discover two important facts about the behavior of the device:

First, you discover that the device is hard-wired to always send you back in time in 500-year increments. Changing this is probably not feasible.

Second, you discover the _activation system_ (your puzzle input) for the time travel module. Currently, it appears to _run forever without halting_.

If you can cause the activation system to _halt_ at a specific moment, maybe you can make the device send you so far back in time that you cause an [integer underflow](https://cwe.mitre.org/data/definitions/191.html) _in time itself_ and wrap around back to your current time!

The device executes the program as specified in [manual section one](16) and [manual section two](19).

Your goal is to figure out how the program works and cause it to halt. You can only control _register `0`_; every other register begins at `0` as usual.

Because time travel is a dangerous activity, the activation system begins with a few instructions which verify that _bitwise AND_ (via `bani`) does a _numeric_ operation and _not_ an operation as if the inputs were interpreted as strings. If the test fails, it enters an infinite loop re-running the test instead of allowing the program to execute normally. If the test passes, the program continues, and assumes that _all other bitwise operations_ (`banr`, `bori`, and `borr`) also interpret their inputs as _numbers_. (Clearly, the Elves who wrote this system were worried that someone might introduce a bug while trying to emulate this system with a scripting language.)

_What is the lowest non-negative integer value for register `0` that causes the program to halt after executing the fewest instructions?_ (Executing the same instruction multiple times counts as multiple instructions executed.)

-----------------

## --- Part Two ---

In order to determine the timing window for your underflow exploit, you also need an upper bound:

_What is the lowest non-negative integer value for register `0` that causes the program to halt after executing the most instructions?_ (The program must actually halt; running forever does not count as halting.)
