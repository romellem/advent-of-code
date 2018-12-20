const BAD_STRINGS = ['ab', 'cd', 'pq', 'xy'];
const VOWELS = 'aeiou'.split('');
const double_char_regex = /([a-z])\1/;


/**
 * A nice string is one with all of the following properties:
 *
 * -  It contains at least three vowels (`aeiou` only), like `aei`, `xazegov`, or `aeiouaeiouaeiou`.
 * -  It contains at least one letter that appears twice in a row, like `xx`, `abcdde` (`dd`), or `aabbccdd` (`aa`, `bb`, `cc`, or `dd`).
 * -  It does _not_ contain the strings `ab`, `cd`, `pq`, or `xy`, even if they are part of one of the other requirements.
 *
 */
class NaughtyStringOldRules {
    constructor(string) {
        this.string = string;

        this.isNaughty = this.checkIfStringIsNaughty();
    }

    checkIfStringIsNaughty(string = this.string) {
        // First, check for bad strings
        for (let i = 0; i < BAD_STRINGS.length; i++) {
            let bad_string = BAD_STRINGS[i];
            
            if (string.includes(bad_string)) {
                // string contains a bad string, immediately exit
                return true;
            }
        }

        // Next, check to make sure we have at least three vowels
        let string_vowels = string.split('').filter(c => VOWELS.includes(c))

        if (string_vowels.length < 3) {
            return true;
        }

        // Finally, check to make sure it contains one double string
        if (!double_char_regex.test(string)) {
            return true;
        }

        // If we are here, the string passed, it is not naughty
        return false;
    }
}

const pair_duplicated_regex = /([a-z]{2})[a-z]*\1/;
const letter_repeated_with_middle = /([a-z])[a-z]\1/;

/**
 * Now, a nice string is one with all of the following properties:
 *
 * -  It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
 * -  It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
 *
 */
class NaughtyStringNewRules {
    constructor(string) {
        this.string = string;

        this.isNaughty = this.checkIfStringIsNaughty();
    }

    checkIfStringIsNaughty(string = this.string) {
        // First, for a string pair that is duplicated
        if (!pair_duplicated_regex.test(string)) {
            return true;
        }

        // Finally, the "letter repeated with middle divder" regex
        if (!letter_repeated_with_middle.test(string)) {
            return true;
        }

        // If we are here, the string passed, it is not naughty
        return false;
    }
}

module.exports = {
    NaughtyStringOldRules,
    NaughtyStringNewRules,
};
