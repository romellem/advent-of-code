> Source - https://old.reddit.com/r/adventofcode/comments/ee0rqi/2019_day_22_solutions/fbnkaju/

Python (24/50): [Part 1](https://github.com/mcpower/adventofcode/blob/501b66084b0060e0375fc3d78460fb549bc7dfab/2019/22/a-p1.py#L20), [competition Part 2](https://github.com/mcpower/adventofcode/blob/501b66084b0060e0375fc3d78460fb549bc7dfab/2019/22/a-p2.py#L20), [improved Part 2](https://github.com/mcpower/adventofcode/blob/501b66084b0060e0375fc3d78460fb549bc7dfab/2019/22/a-improved.py).

Part 2 was very number theoretic for me. As this is Advent of Code, I suspect that there is a way of solving it without requiring knowledge of number theory, but I couldn't think of it.

A key observation to make is that every possible deck can be encoded as a pair of (first number of the deck, or `offset` AND difference between two adjacent numbers, or `increment`). **ALL** numbers here are modulo (cards in deck), or `MOD`.

Then, getting the `n`th number in the sequence can be done by calcuating `offset + increment * n`.

Starting off with `(offset, increment) = (0, 1)`, we can process techniques like this:

*   **deal into new stack**: "reverses the list". If we go left to right, the numbers _increase_ by `increment` every time. If we reverse the list, we instead go from right to left - so numbers should _decrease_ by `increment`! Therefore, negate `increment`. However, we also need to change the first number, taking the new second number as the first number - so we increment `offset` by the new `increment`. In code, this would be:
    
        increment *= -1
        offset += increment
        
    
*   **cut `n` cards**: "shifts the list". We need to move the `n`th card to the front, and the `n`th card is gotten by `offset + increment * n`. Therefore, this is equivalent to incrementing `offset` by `increment * n`. In code, this would be:
    
        offset += increment * n
        
    
*   **deal with increment `n`**: The first card - or `offset` - doesn't change... but how does `increment` change? We already know the first number in the new list (it's `offset`), but what is the second number in the new list? If we have both of them, we can calculate `offset`.  
    The `0`th card in our old list goes to the `0`th card in our new list, `1`st card in old goes to the `n`th card in new list (mod `MOD`), `2`nd card in old goes to the `2*n`th card in new list, and so on. So, the `i`th card in our old list goes to the `i*n`th card in the new list. When is `i*n = 1`? If we "divide" both sides by `n`, we get `i = n^(-1)`... so we calculate the [modular inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse) of `n` mod `MOD`. As all `MOD`s we're using (10007 and 119315717514047) are prime, we can calculate this by doing `n^(MOD - 2)` as `n^(MOD - 1) = 1` due to [Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem).  
    To do exponentiation fast, we can use [exponentiation by squaring](https://en.wikipedia.org/wiki/Modular_exponentiation#Right-to-left_binary_method). Thankfully, Python has this built in - `a^b mod m` can be calculated in Python using `pow(a, b, m)`.  
    Okay, so we know that the second card in the new list is `n^(-1)` in our old list. Therefore, the difference between that and the first card in the old list (and the new list) is `offset + increment * n^(-1) - offset = increment * n^(-1)`. Therefore, we should multiply `increment` by `n^(-1)`. In (Python) code, this would be:
    
        increment *= inv(n)
        
    
    where `inv(n) = pow(n, MOD-2, MOD)`.
    

Okay, so we know how to do one pass of the shuffle. How do we repeat it a huge number of times?

If we take a closer look at how the variables change, we can make two important observations:

*   `increment` is always multiplied by some constant number (i.e. not `increment` or `offset`).
*   `offset` is always incremented by some constant multiple of `increment` _at that point in the process_.

With the first observation, we know that doing a shuffle pass always multiplies `increment` by some constant. However, what about `offset`? It's incremented by a multiple of `increment`... but that `increment` can change during the process! Thankfully, we can use our first observation and notice that:

*   all `increment`s during the process are some constant multiple of `increment` before the process, so
*   `offset` is always incremented by some constant multiple of `increment` _before the process_.

Let `(offset_diff, increment_mul)` be the values of `offset` and `increment` after one shuffle pass starting from `(0, 1)`. Then, _for any `(offset, increment)`_, applying a single shuffle pass is equivalent to:

    offset += increment * offset_diff
    increment *= increment_mul
    

That's not enough - we need to apply the shuffle pass a huge number of times. Using the above, how do we get the `n`th `(offset, increment)` starting at `(0, 1)` with `n=0`?

As `increment` only multiplies by `increment_mul` every time, we can calculate the `n`th `increment` by repeatedly multiplying it `n` times... also known as exponentiation. Therefore:

    increment = pow(increment_mul, n, MOD)
    

What about `offset` though? It depends on `increment`, which changes on each shuffle pass. If we manually write out the formula for `offset` for a couple values of `n`:

    n=0, offset = 0
    n=1, offset = 0 + 1*offset_diff
    n=2, offset = 0 + 1*offset_diff + increment_mul*offset_diff
    n=3, offset = 0 + 1*offset_diff + increment_mul*offset_diff + (increment_mul**2)*offset_diff
    

we quickly see that

    offset = offset_diff * (1 + increment_mul + increment_mul**2 + ... + increment_mul**(n-1))
    

Hey, that thing in the parentheses looks familiar - it's a [geometric series](https://en.wikipedia.org/wiki/Geometric_series)! Using the formula on the Wikipedia page (because I forgot it...), we can rewrite it as

    offset = offset_diff * (1 - pow(increment_mul, iterations, MOD)) * inv(1 - increment_mul)
    

With all of that, we can get the `increment` and `offset` after doing a huge number of shuffles, then get the `2020`th number. Whew!