/**
 * Length of longest non-repeating substring can be recursively
 * defined as below.
 * 
 * @param {Array} arr - Array of primitives to look for the cycle within
 * @param {bool } return_cycle_only - If true, just returns the cycle array.
 *                                    Otherwise, returns an object with `cycle` as well as `index`, which shows the last index where the cycle started.
 *
 * @see https://www.geeksforgeeks.org/longest-repeating-and-non-overlapping-substring/
 * @code
 *     LCSRe(i, j) stores length of the matching and
 *                 non-overlapping substrings ending
 *                 with i'th and j'th characters.
 *
 *     If str[i-1] == str[j-1] && (j-i) > LCSRe(i-1, j-1)
 *          LCSRe(i, j) = LCSRe(i-1, j-1) + 1,
 *     Else
 *          LCSRe(i, j) = 0
 *
 *     Where i varies from 1 to n and
 *           j varies from i+1 to n
 */

const getLongestCycle = (arr, return_cycle_only = false) => {
    // @todo Figure out what `LCSRe` means... (Longest Complete Substring Repeats?)
    let LCSRe = Array(arr.length)
        .fill()
        .map(line => Array(arr.length).fill(0));

    let result = [];
    let result_length = 0;
    let index = 0;
    // building table in bottom-up manner
    for (let i = 1; i <= arr.length; i++) {
        for (let j = i + 1; j <= arr.length; j++) {
            // (j-i) > LCSRe[i-1][j-1] to remove overlapping
            if (arr[i - 1] === arr[j - 1] && LCSRe[i - 1][j - 1] < j - i) {
                LCSRe[i][j] = LCSRe[i - 1][j - 1] + 1;

                // updating maximum length of the
                // substring and updating the finishing
                // index of the suffix
                if (LCSRe[i][j] > result_length) {
                    result_length = LCSRe[i][j];
                    index = Math.max(i, index);
                }
            } else {
                LCSRe[i][j] = 0;
            }
        }
    }

    // If we have non-empty result, then insert all
    // characters from first character to last
    // character of String
    if (result_length > 0) {
        for (let i = index - result_length + 1; i <= index; i++) {
            result.push(arr[i - 1]);
        }
    }

    return return_cycle_only
        ? result
        : {
              index,
              cycle: result,
          };
};

module.exports = getLongestCycle;
