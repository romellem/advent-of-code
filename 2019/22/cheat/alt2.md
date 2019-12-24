> [source](https://www.reddit.com/r/adventofcode/comments/eeizke/2019_day_22_everyday_were_shuffling/)

For those who aren't mathemagicians, consider this alternative approach.

Every input list can be consolidated into just a single increment and cut input with some smart shuffling of the shuffling rules.

Be sure to % modulo wherever possible :)

```
deal into stack
deal into stack
===
<nothing>

deal into stack
cut x
===
cut -x
deal into stack

deal into stack
deal with increment x
===
cut -1
deal with increment -x



cut x
deal into stack
===
deal into stack
cut -x

cut x
cut y
===
cut x+y % count

cut x
deal with increment y
===
deal with increment y
cut x*y



deal with increment x
deal with increment y
===
deal with increment x*y
```
