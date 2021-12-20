# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| `4145` | ` ` |

## --- Day 18: Snailfish ---

You descend into the ocean trench and encounter some [snailfish](https://en.wikipedia.org/wiki/Snailfish). They say they saw the sleigh keys! They'll even tell you which direction the keys went if you help one of the smaller snailfish with his _math homework_.

Snailfish numbers aren't like regular numbers. Instead, every snailfish number is a _pair_ - an ordered list of two elements. Each element of the pair can be either a regular number or another pair.

Pairs are written as `[x,y]`, where `x` and `y` are the elements within the pair. Here are some example snailfish numbers, one snailfish number per line:

    [1,2]
    [[1,2],3]
    [9,[8,7]]
    [[1,9],[8,5]]
    [[[[1,2],[3,4]],[[5,6],[7,8]]],9]
    [[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
    [[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]
    

This snailfish homework is about _addition_. To add two snailfish numbers, form a pair from the left and right parameters of the addition operator. For example, `[1,2]` + `[[3,4],5]` becomes `[[1,2],[[3,4],5]]`.

There's only one problem: _snailfish numbers must always be reduced_, and the process of adding two snailfish numbers can result in snailfish numbers that need to be reduced.

To _reduce a snailfish number_, you must repeatedly do the first action in this list that applies to the snailfish number:

*   If any pair is _nested inside four pairs_, the leftmost such pair _explodes_.
*   If any regular number is _10 or greater_, the leftmost such regular number _splits_.

Once no action in the above list applies, the snailfish number is reduced.

During reduction, at most one action applies, after which the process returns to the top of the list of actions. For example, if _split_ produces a pair that meets the _explode_ criteria, that pair _explodes_ before other _splits_ occur.

To _explode_ a pair, the pair's left value is added to the first regular number to the left of the exploding pair (if any), and the pair's right value is added to the first regular number to the right of the exploding pair (if any). Exploding pairs will always consist of two regular numbers. Then, the entire exploding pair is replaced with the regular number `0`.

Here are some examples of a single explode action:

<!--
*   `[[[[_[9,8]_,1],2],3],4]` becomes `[[[[_0_,_9_],2],3],4]` (the `9` has no regular number to its left, so it is not added to any regular number).
*   `[7,[6,[5,[4,_[3,2]_]]]]` becomes `[7,[6,[5,[_7_,_0_]]]]` (the `2` has no regular number to its right, and so it is not added to any regular number).
*   `[[6,[5,[4,_[3,2]_]]],1]` becomes `[[6,[5,[_7_,_0_]]],_3_]`.
*   `[[3,[2,[1,_[7,3]_]]],[6,[5,[4,[3,2]]]]]` becomes `[[3,[2,[_8_,_0_]]],[_9_,[5,[4,[3,2]]]]]` (the pair `[3,2]` is unaffected because the pair `[7,3]` is further to the left; `[3,2]` would explode on the next action).
*   `[[3,[2,[8,0]]],[9,[5,[4,_[3,2]_]]]]` becomes `[[3,[2,[8,0]]],[9,[5,[_7_,_0_]]]]`.
-->

*   <code>[[[[<b>[9,8]</b>,1],2],3],4]</code> becomes <code>[[[[<b>0</b>,<b>9</b>],2],3],4]</code> (the <code>9</code> has no regular number to its left, so it is not added to any regular number).
*   <code>[7,[6,[5,[4,<b>[3,2]</b>]]]]</code> becomes <code>[7,[6,[5,[<b>7</b>,<b>0</b>]]]]</code> (the <code>2</code> has no regular number to its right, and so it is not added to any regular number).
*   <code>[[6,[5,[4,<b>[3,2]</b>]]],1]</code> becomes <code>[[6,[5,[<b>7</b>,<b>0</b>]]],<b>3</b>]</code>.
*   <code>[[3,[2,[1,<b>[7,3]</b>]]],[6,[5,[4,[3,2]]]]]</code> becomes <code>[[3,[2,[<b>8</b>,<b>0</b>]]],[<b>9</b>,[5,[4,[3,2]]]]]</code> (the pair <code>[3,2]</code> is unaffected because the pair <code>[7,3]</code> is further to the left; <code>[3,2]</code> would explode on the next action).
*   <code>[[3,[2,[8,0]]],[9,[5,[4,<b>[3,2]</b>]]]]</code> becomes <code>[[3,[2,[8,0]]],[9,[5,[<b>7</b>,<b>0</b>]]]]</code>.

To _split_ a regular number, replace it with a pair; the left element of the pair should be the regular number divided by two and rounded _down_, while the right element of the pair should be the regular number divided by two and rounded _up_. For example, `10` becomes `[5,5]`, `11` becomes `[5,6]`, `12` becomes `[6,6]`, and so on.

Here is the process of finding the reduced result of `[[[[4,3],4],4],[7,[[8,4],9]]]` + `[1,1]`:

<!--
    after addition: [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]
    after explode:  [[[[0,7],4],[7,[[8,4],9]]],[1,1]]
    after explode:  [[[[0,7],4],[15,[0,13]]],[1,1]]
    after split:    [[[[0,7],4],[[7,8],[0,13]]],[1,1]]
    after split:    [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]
    after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]
-->
<pre><code>after addition: [[[[<b>[4,3]</b>,4],4],[7,[[8,4],9]]],[1,1]]
after explode:  [[[[0,7],4],[7,[<b>[8,4]</b>,9]]],[1,1]]
after explode:  [[[[0,7],4],[<b>15</b>,[0,13]]],[1,1]]
after split:    [[[[0,7],4],[[7,8],[0,<b>13</b>]]],[1,1]]
after split:    [[[[0,7],4],[[7,8],[0,<b>[6,7]</b>]]],[1,1]]
after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]
</code></pre>

Once no reduce actions apply, the snailfish number that remains is the actual result of the addition operation: `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`.

The homework assignment involves adding up a _list of snailfish numbers_ (your puzzle input). The snailfish numbers are each listed on a separate line. Add the first snailfish number and the second, then add that result and the third, then add that result and the fourth, and so on until all numbers in the list have been used once.

For example, the final sum of this list is `[[[[1,1],[2,2]],[3,3]],[4,4]]`:

    [1,1]
    [2,2]
    [3,3]
    [4,4]
    

The final sum of this list is `[[[[3,0],[5,3]],[4,4]],[5,5]]`:

    [1,1]
    [2,2]
    [3,3]
    [4,4]
    [5,5]
    

The final sum of this list is `[[[[5,0],[7,4]],[5,5]],[6,6]]`:

    [1,1]
    [2,2]
    [3,3]
    [4,4]
    [5,5]
    [6,6]
    

Here's a slightly larger example:

    [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
    [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
    [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
    [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
    [7,[5,[[3,8],[1,4]]]]
    [[2,[2,2]],[8,[8,1]]]
    [2,9]
    [1,[[[9,3],9],[[9,0],[0,7]]]]
    [[[5,[7,4]],7],1]
    [[[[4,2],2],6],[8,7]]
    

The final sum `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]` is found after adding up the above snailfish numbers:

      [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
    + [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
    = [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
    
      [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
    + [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
    = [[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]
    
      [[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]
    + [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
    = [[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]
    
      [[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]
    + [7,[5,[[3,8],[1,4]]]]
    = [[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]
    
      [[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]
    + [[2,[2,2]],[8,[8,1]]]
    = [[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]
    
      [[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]
    + [2,9]
    = [[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]
    
      [[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]
    + [1,[[[9,3],9],[[9,0],[0,7]]]]
    = [[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]
    
      [[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]
    + [[[5,[7,4]],7],1]
    = [[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]
    
      [[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]
    + [[[[4,2],2],6],[8,7]]
    = [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]
    

To check whether it's the right answer, the snailfish teacher only checks the _magnitude_ of the final sum. The magnitude of a pair is 3 times the magnitude of its left element plus 2 times the magnitude of its right element. The magnitude of a regular number is just that number.

For example, the magnitude of `[9,1]` is <code>3\*9 + 2\*1 = <b>29</b></code>; the magnitude of `[1,9]` is <code>3\*1 + 2\*9 = <b>21</b></code>. Magnitude calculations are recursive: the magnitude of `[[9,1],[1,9]]` is <code>3*29 + 2*21 = <b>129</b></code>.

Here are a few more magnitude examples:

*   `[[1,2],[[3,4],5]]` becomes _`143`_.
*   `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]` becomes _`1384`_.
*   `[[[[1,1],[2,2]],[3,3]],[4,4]]` becomes _`445`_.
*   `[[[[3,0],[5,3]],[4,4]],[5,5]]` becomes _`791`_.
*   `[[[[5,0],[7,4]],[5,5]],[6,6]]` becomes _`1137`_.
*   `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]` becomes _`3488`_.

So, given this example homework assignment:

    [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
    [[[5,[2,8]],4],[5,[[9,9],0]]]
    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
    [[[[5,4],[7,7]],8],[[8,3],8]]
    [[9,3],[[9,9],[6,[4,9]]]]
    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
    

The final sum is:

    [[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]

The magnitude of this final sum is _`4140`_.

Add up all of the snailfish numbers from the homework assignment in the order they appear. _What is the magnitude of the final sum?_
