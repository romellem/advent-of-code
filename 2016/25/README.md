# Answers

| Part 1 |
|--------|
|  `192` |

## --- Day 25: Clock Signal ---

You open the door and find yourself on the roof. The city sprawls away from you for miles and miles.

There's not much time now - it's already Christmas, but you're nowhere near the North Pole, much too far to deliver these stars to the sleigh in time.

However, maybe the _huge antenna_ up here can offer a solution. After all, the sleigh doesn't need the stars, exactly; it needs the timing data they provide, and you happen to have a massive signal generator right here.

You connect the stars you have to your prototype computer, connect that to the antenna, and begin the transmission.

Nothing happens.

You call the service number printed on the side of the antenna and quickly explain the situation. "I'm not sure what kind of equipment you have connected over there," he says, "but you need a clock signal." You try to explain that this is a signal for a clock.

"No, no, a [clock signal](https://en.wikipedia.org/wiki/Clock_signal) - timing information so the antenna computer knows how to read the data you're sending it. An endless, alternating pattern of `0`, `1`, `0`, `1`, `0`, `1`, `0`, `1`, `0`, `1`...." He trails off.

You ask if the antenna can handle a clock signal at the frequency you would need to use for the data from the stars. "There's _no way_ it can! The only antenna we've installed capable of _that_ is on top of a top-secret Easter Bunny installation, and you're _definitely_ not-" You hang up the phone.

You've extracted the antenna's clock signal generation [assembunny](https://adventofcode.com/2016/day/12) code (your puzzle input); it looks mostly compatible with code you worked on [just recently](https://adventofcode.com/2016/day/23).

This antenna code, being a signal generator, uses one extra instruction:

*   `out x` _transmits_ `x` (either an integer or the _value_ of a register) as the next value for the clock signal.

The code takes a value (via register `a`) that describes the signal to generate, but you're not sure how it's used. You'll have to find the input to produce the right signal through experimentation.

_What is the lowest positive integer_ that can be used to initialize register `a` and cause the code to output a clock signal of `0`, `1`, `0`, `1`... repeating forever?

-----------------

## --- Part Two ---

The antenna is ready. Now, all you need is the _fifty stars_ required to generate the signal for the sleigh, but you don't have enough.

You look toward the sky in desperation... suddenly noticing that a lone star has been installed at the top of the antenna! Only _49 more_ to go.

### Transmit the signal

You activate all fifty stars and transmit the signal. The star atop the antenna begins to glow.

_Suddenly, you see the sleigh fly past you!_

Looks like Santa was already waiting for your signal.
