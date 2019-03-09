/**
 * Had to cheat for this one, looked up the algorithm on the
 * reddit solution thread. Seeing the algorithm, it makes total
 * sense but honestly not sure how long it would have taken me
 * to come up with that one.
 *
 * I've copied the post in its entirety below.
 *
 * @see https://www.reddit.com/r/adventofcode/comments/5hbygy/2016_day_9_solutions/dazentu/
 */

/*
    In short the idea is to give each character in the input a weight, or
    multiplier if you will. Then for each character, as the input is read,
    increase its weight according to the decompression markers. This is roughly
    the steps taken:

    - Initialise all characters weights to 1
    - Scan input one character at a time and
    - if it's a normal character, count its weight towards the total length
    - if it's the beginning of a marker, read the marker and multiply character
        weights forward in the input, according to the values of the marker.
    - Print out the value of length

    -----------------------------------------------------------------------------

    Using the second example from the puzzle description
    as an input; "X(8x2)(3x3)ABCY", the algorithm would run as follows:

    1.

    Weights: [111111111111111], length:  0

    "X(8x2)(3x3)ABCY"
    ^

    X is a normal character, so we add its weight to length.

    2.

    Weights: [111111111111111], length:  1

    "X(8x2)(3x3)ABCY"
    ^

    ( is the beginning of a marker, so we read it and update the following
    weights according to its values.

    3.

    Weights: [111111222222221], length:  1

    "X(8x2)(3x3)ABCY"
        ^

    ( is the beginning of a marker, so we read it and update the following
    weights according to its values.

    4.

    Weights: [111111222226661], length:  1

    "X(8x2)(3x3)ABCY"
                ^

    A is a normal character, so we add its weight to length.

    5.

    Weights: [111111222226661], length:  7

    "X(8x2)(3x3)ABCY"
                ^

    B is a normal character, so we add its weight to length.

    6.

    Weights: [111111222226661], length:  13

    "X(8x2)(3x3)ABCY"
                ^

    C is a normal character, so we add its weight to length.

    7.

    Weights: [111111222226661], length:  19

    "X(8x2)(3x3)ABCY"
                ^

    Y is a normal character, so we add its weight to length.

    8.

    Weights: [111111222226661], length:  20

    "X(8x2)(3x3)ABCY"
                    ^

    We're at the end of input, so we read out the final result to be 20.
*/

const decompress = str => {
    let weights = Array(str.length).fill(1);
    let total_length = 0;

    let in_marker = false;

    // Use objects so I can set my `filling` variable by reference.
    let chars = { val: '' },
        repeat = { val: '' };

    let filling;

    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        if (char === '(') {
            in_marker = true;

            // Reset temp parsing variables
            chars.val = '';
            repeat.val = '';

            // Reference `chars` that I am currently parsing
            filling = chars;
        } else if (in_marker) {
            if (char === 'x') {
                // Finished parsing `chars`, start parsing `repeat` next
                filling = repeat;
            } else if (char === ')') {
                // No longer in the marker
                in_marker = false;

                // Parse our numbers
                let chars_int = parseInt(chars.val);
                let repeat_int = parseInt(repeat.val);

                // Update the weights accordingly
                for (let c = 1; c <= chars_int; c++) {
                    weights[i + c] *= repeat_int;
                }
            } else {
                // Extract the relevant characer into either `chars.val` or `repeat.val`
                filling.val += char;
            }
        } else {
            // Regular letter, add its weight to our total
            total_length += weights[i];
        }
    }

    return total_length;
};

module.exports = decompress;
