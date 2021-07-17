const { partTwoInput } = require('./input');

const offset = parseInt(partTwoInput.slice(0, 7).join(''), 10);
const slice_to_iterate = partTwoInput.slice(offset);
for (let j = 0; j < 100; j++) {
	// We don't need to do anything with the last number so start at 2nd the last
	for (let i = slice_to_iterate.length - 2; i >= 0; i--) {
		slice_to_iterate[i] = (slice_to_iterate[i + 1] + slice_to_iterate[i]) % 10;
	}
}

console.log('8 digits:', slice_to_iterate.slice(0, 8).join(''));

/*

Here's the trick:

Let's say your 12 digits number is `123456789123`.
Look at the table after you get past the "halfway point" down the list:

|  # |   1  |   2  |   3  |   4  |   5  |   6  |   7  |   8  |   9  |   1  |   2  |   3  |
|----|------|------|------|------|------|------|------|------|------|------|------|------|
|  1 |   1  |      |  -3  |      |   5  |      |  -7  |      |   9  |      |  -2  |      |
|  2 |      |   2  |   3  |      |      |  -6  |  -7  |      |      |   1  |   2  |      |
|  3 |      |      |   3  |   4  |   5  |      |      |      |  -9  |  -1  |  -2  |      |
|  4 |      |      |      |   4  |   5  |   6  |   7  |      |      |      |      |  -3  |
|  5 |      |      |      |      |   5  |   6  |   7  |   8  |   9  |      |      |      |
|  6 |      |      |      |      |      |   6  |   7  |   8  |   9  |   1  |   2  |      |
|  7 |      |      |      |      |      |      |  *7* |  *8* |  *9* |  *1* |  *2* |  *3* |
|  8 |      |      |      |      |      |      |      |  *8* |  *9* |  *1* |  *2* |  *3* |
|  9 |      |      |      |      |      |      |      |      |  *9* |  *1* |  *2* |  *3* |
| 10 |      |      |      |      |      |      |      |      |      |  *1* |  *2* |  *3* |
| 11 |      |      |      |      |      |      |      |      |      |      |  *2* |  *3* |
| 12 |      |      |      |      |      |      |      |      |      |      |      |  *3* |

Starting from row 7 on down, all the numbers are added together! No 0s, no -1s, just the numbers
added.

Since our "offset" is more than halfway through our full list, we can just immediately jump to the offset
and compute those numbers on down.

Now adding up all those numbers in the triangle is still a _lot._ But there is another trick!

Look at the very last number, 3. let's call it A.

Go up one row, we have 2 + (3). But wait, 3 is A. So we have 2 + A. Let's call that B.

Go up another row, we have 1 + 2 + (3) -> 1 + (2 + A) -> 1 + B. Call that C.

You see where this is going. Go up another row, 9 + 1 + 2 + (3),
9 + 1 + (2 + A) -> 9 + (1 + B) -> 9 + C. Call that D.

And so on.

The other trick is, we only need to store the last digit each time we start from the bottom
and loop up.

Consider

    n + ...           = x_n      n + x_n-1 = x_n
        d + c + b + a = x_4      d + x_3   = x_4
            c + b + a = x_3  =>  c + x_2   = x_3
                b + a = x_2      b + x_1   = x_2
                    a = x_1      a         = x_1

Let `x_n` = `D_i..D_1D_0`, where `D_n` is a single digit.

Clearly `(x_n)mod 10 = D_0`, aka the last digit.

Let `l + x_n` be the next line up we want to add. So `l` is a single digit number.

I'm saying we should only care about the last digit of all that addition, so I want to show that

    (l + x_n)mod 10 = (l + D_0)mod 10.

From the "Addition Property" of modular arithmetic, we know that

    (a + b)mod_n = [(a)mod_n + (b)mod_n]mod_n

So, expanding `(l + x_n)mod 10` is

    (l + x_n)mod_10 = ((l)mod_10 + (x_n)mod_10)mod_10.
    
    # Well `(l)mod_10` is just `l`, since `l` is less than 10 (aka a single digit).
    
    (l + x_n)mod_10 = ((l)       + (x_n)mod_10)mod_10.
    
    # Add (x_n)mod_10 = D_0
    
    (l + x_n)mod_10 = (l         + D0         )mod_10.

QED ∎

*/
