# Answers

|  Part 1 |      Part 2       |
| ------- | ----------------- |
| `17613` | `175304218462560` |

## --- Day 3: Lobby ---

You descend a short staircase, enter the surprisingly vast lobby, and are quickly cleared by the security checkpoint. When you get to the main elevators, however, you discover that each one has a red light above it: they're all _offline_.

"Sorry about that," an Elf apologizes as she tinkers with a nearby control panel. "Some kind of electrical surge seems to have fried them. I'll try to get them online soon."

You explain your need to get further underground. "Well, you could at least take the escalator down to the printing department, not that you'd get much further than that without the elevators working. That is, you could if the escalator weren't also offline."

"But, don't worry! It's not fried; it just needs power. Maybe you can get it running while I keep working on the elevators."

There are batteries nearby that can supply emergency power to the escalator for just such an occasion. The batteries are each labeled with their [joltage](/2020/day/10) rating, a value from `1` to `9`. You make a note of their joltage ratings (your puzzle input). For example:

    987654321111111
    811111111111119
    234234234234278
    818181911112111
    

The batteries are arranged into _banks_; each line of digits in your input corresponds to a single bank of batteries. Within each bank, you need to turn on _exactly two_ batteries; the joltage that the bank produces is equal to the number formed by the digits on the batteries you've turned on. For example, if you have a bank like `12345` and you turn on batteries `2` and `4`, the bank would produce `24` jolts. (You cannot rearrange batteries.)

You'll need to find the largest possible joltage each bank can produce. In the above example:

*   In <code><b>9</b><b>8</b>7654321111111</code>, you can make the largest joltage possible, _`98`_, by turning on the first two batteries.
*   In <code><b>8</b>1111111111111<b>9</b></code>, you can make the largest joltage possible by turning on the batteries labeled `8` and `9`, producing _`89`_ jolts.
*   In <code>2342342342342<b>7</b><b>8</b></code>, you can make _`78`_ by turning on the last two batteries (marked `7` and `8`).
*   In <code>818181<b>9</b>1111<b>2</b>111</code>, the largest joltage you can produce is _`92`_.

The total output joltage is the sum of the maximum joltage from each bank, so in this example, the total output joltage is `98` + `89` + `78` + `92` = _`357`_.

There are many batteries in front of you. Find the maximum joltage possible from each bank; _what is the total output joltage?_

-----------------

## --- Part Two ---

The escalator doesn't move. The Elf explains that it probably needs more joltage to overcome the [static friction](https://en.wikipedia.org/wiki/Static_friction) of the system and hits the big red "joltage limit safety override" button. You lose count of the number of times she needs to confirm "yes, I'm sure" and decorate the lobby a bit while you wait.

Now, you need to make the largest joltage by turning on _exactly twelve_ batteries within each bank.

The joltage output for the bank is still the number formed by the digits of the batteries you've turned on; the only difference is that now there will be _`12`_ digits in each bank's joltage output instead of two.

Consider again the example from before:

    987654321111111
    811111111111119
    234234234234278
    818181911112111
    

Now, the joltages are much larger:

*   In <code><b>987654321111</b>111</code>, the largest joltage can be found by turning on everything except some `1`s at the end to produce _`987654321111`_.
*   In the digit sequence <code><b>81111111111</b>111<b>9</b></code>, the largest joltage can be found by turning on everything except some `1`s, producing _`811111111119`_.
*   In <code>23<b>4</b>2<b>34234234278</b></code>, the largest joltage can be found by turning on everything except a `2` battery, a `3` battery, and another `2` battery near the start to produce _`434234234278`_.
*   In <code><b>8</b>1<b>8</b>1<b>8</b>1<b>911112111</b></code>, the joltage _`888911112111`_ is produced by turning on everything except some `1`s near the front.

The total output joltage is now much larger: `987654321111` + `811111111119` + `434234234278` + `888911112111` = **`3121910778619`**.

_What is the new total output joltage?_
