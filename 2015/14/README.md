# Answers

| Part 1 | Part 2 |
|--------|--------|
| `2640` | ` ` |

## --- Day 14: Reindeer Olympics ---

This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must rest occasionally to recover their energy. Santa would like to know which of his reindeer is fastest, and so he has them race.

Reindeer can only either be _flying_ (always at their top speed) or _resting_ (not moving at all), and always spend whole seconds in either state.

For example, suppose you have the following Reindeer:

*   Comet can fly _14 km/s for 10 seconds_, but then must rest for _127 seconds_.
*   Dancer can fly _16 km/s for 11 seconds_, but then must rest for _162 seconds_.

After one second, Comet has gone 14 km, while Dancer has gone 16 km. After ten seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the eleventh second, Comet begins resting (staying at 140 km), and Dancer continues on for a total distance of 176 km. On the 12th second, both reindeer are resting. They continue to rest until the 138th second, when Comet flies for another ten seconds. On the 174th second, Dancer flies for another 11 seconds.

In this example, after the 1000th second, both reindeer are resting, and Comet is in the lead at _`1120`_ km (poor Dancer has only gotten `1056` km by that point). So, in this situation, Comet would win (if the race ended at 1000 seconds).

Given the descriptions of each reindeer (in your puzzle input), after exactly `2503` seconds, _what distance has the winning reindeer traveled_?
