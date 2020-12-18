# Answers

|      Part 1      |       Part 2      |
| ---------------- | ----------------- |
| `75592527415659` | `360029542265462` |

## --- Day 18: Operation Order ---

As you look out the window and notice a heavily-forested continent slowly appear over the horizon, you are interrupted by the child sitting next to you. They're curious if you could help them with their math homework.

Unfortunately, it seems like this "math" [follows different rules](https://www.youtube.com/watch?v=3QtRK7Y2pPU&t=15) than you remember.

The homework (your puzzle input) consists of a series of expressions that consist of addition (`+`), multiplication (`*`), and parentheses (`(...)`). Just like normal math, parentheses indicate that the expression inside must be evaluated before it can be used by the surrounding expression. Addition still finds the sum of the numbers on both sides of the operator, and multiplication still finds the product.

However, the rules of _operator precedence_ have changed. Rather than evaluating multiplication before addition, the operators have the _same precedence_, and are evaluated left-to-right regardless of the order in which they appear.

For example, the steps to evaluate the expression `1 + 2 * 3 + 4 * 5 + 6` are as follows:

<pre><code><b>1 + 2</b> * 3 + 4 * 5 + 6
  <b>3   * 3</b> + 4 * 5 + 6
      <b>9   + 4</b> * 5 + 6
         <b>13   * 5</b> + 6
             <b>65   + 6</b>
                 <b>71</b>
</code></pre>

Parentheses can override this order; for example, here is what happens if parentheses are added to form `1 + (2 * 3) + (4 * (5 + 6))`:

<pre><code>1 + <b>(2 * 3)</b> + (4 * (5 + 6))
<b>1 +    6</b>    + (4 * (5 + 6))
     7      + (4 * <b>(5 + 6)</b>)
     7      + <b>(4 *   11   )</b>
     <b>7      +     44</b>
            <b>51</b>
</code></pre>

Here are a few more examples:

*   `2 * 3 + (4 * 5)` becomes _`26`_.
*   `5 + (8 * 3 + 9 + 3 * 4 * 3)` becomes _`437`_.
*   `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))` becomes _`12240`_.
*   `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2` becomes _`13632`_.

Before you can help with the homework, you need to understand it yourself. _Evaluate the expression on each line of the homework; what is the sum of the resulting values?_

-----------------

## --- Part Two ---

You manage to answer the child's questions and they finish part 1 of their homework, but get stuck when they reach the next section: _advanced_ math.

Now, addition and multiplication have _different_ precedence levels, but they're not the ones you're familiar with. Instead, addition is evaluated _before_ multiplication.

For example, the steps to evaluate the expression `1 + 2 * 3 + 4 * 5 + 6` are now as follows:

<pre><code><b>1 + 2</b> * 3 + 4 * 5 + 6
  3   * <b>3 + 4</b> * 5 + 6
  3   *   7   * <b>5 + 6</b>
  <b>3   *   7</b>   *  11
     <b>21       *  11</b>
         <b>231</b>
</code></pre>

Here are the other examples from above:

*   `1 + (2 * 3) + (4 * (5 + 6))` still becomes _`51`_.
*   `2 * 3 + (4 * 5)` becomes _`46`_.
*   `5 + (8 * 3 + 9 + 3 * 4 * 3)` becomes _`1445`_.
*   `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))` becomes _`669060`_.
*   `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2` becomes _`23340`_.

_What do you get if you add up the results of evaluating the homework problems using these new rules?_
