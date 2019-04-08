const scramble = (password, instructions) => {
    let orig_password = password;

    for (let instruction of instructions) {
        let { type } = instruction;

        let pos_a, pos_b, pass_arr;

        /**
         * 0: abcde
         * 1: ebcda
         * 2: edcba
         * 3: abcde
         * 4: bcdea
         * 5: bdeac <- wrong
         * 6: abdec
         * 7: ecabd
         * 8: decab
         */

        switch (type) {
            case 'swap':
                if (instruction.letters) {
                    // Search for the letters and swap at those indices
                    let [char_a, char_b] = instruction.letters;
                    pos_a = password.indexOf(char_a);
                    pos_b = password.indexOf(char_b);
                } else {
                    // Otherwise we already have the positions
                    [pos_a, pos_b] = instruction.positions;
                }

                pass_arr = password.split('');
                let temp_a = pass_arr[pos_a];
                pass_arr[pos_a] = pass_arr[pos_b];
                pass_arr[pos_b] = temp_a;
                password = pass_arr.join('');
                break;

            case 'move':
                [pos_a, pos_b] = instruction.positions;
                pass_arr = password.split('');
                let a = pass_arr[pos_a];
                pass_arr[pos_a] = null;
                pass_arr = pass_arr.filter(v => v !== null);

                pass_arr.splice(pos_b, 0, a);
                password = pass_arr.join('');
                break;

            case 'reverse':
                [pos_a, pos_b] = instruction.positions;
                let span = password.slice(pos_a, pos_b + 1);
                let reversed_span = span
                    .split('')
                    .reverse()
                    .join('');

                password = password.replace(span, reversed_span);
                break;

            case 'rotate':
                if (instruction.left !== undefined) {
                    let steps = instruction.left;
                    let left_half = password.substr(0, steps);
                    let right_half = password.substr(steps);

                    password = right_half + left_half;
                } else {
                    // Rotate to the right (by value or letter position)
                    let steps;
                    if (instruction.letter) {
                        let position = password.indexOf(instruction.letter);
                        steps = 1 + position;
                    } else {
                        steps = instruction.right;
                    }
                    let right_half = password.substr(-1 * steps);
                    let left_half = password.substr(0, steps + 1);

                    password = right_half + left_half;
                }
                break;

            default:
                let error = `Unknown type ${type}`;
                console.log(instruction);
                throw error;
        }
    }

    return password;
};

module.exports = scramble;
