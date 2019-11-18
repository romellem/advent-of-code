const { stringInstructionToObject } = require('./input');

const scrambleStep = (password, instruction) => {
    if (typeof instruction === 'string') {
        instruction = stringInstructionToObject(instruction);
    }

    let { type } = instruction;

    let pos_a, pos_b, pass_arr;

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
                steps %= password.length;
                let left_half = password.substr(0, steps);
                let right_half = password.substr(steps);

                password = right_half + left_half;
            } else {
                // Rotate to the right (by value or letter position)
                let steps;
                if (instruction.letter) {
                    let position = password.indexOf(instruction.letter);
                    steps = 1 + position + (position >= 4 ? 1 : 0);
                } else {
                    steps = instruction.right;
                }
                steps %= password.length;

                if (steps > 0) {
                    let right_half = password.substr(-1 * steps);
                    let left_half = password.substr(0, password.length - steps);

                    password = right_half + left_half;
                }
            }
            break;

        default:
            let error = `Unknown type ${type}`;
            console.log(instruction);
            throw error;
    }

    return password;
};

const scramble = (password, instructions) => {
    let orig_password = password;

    for (let instruction of instructions) {
        password = scrambleStep(password, instruction);

        if (password.length !== orig_password.length) {
            console.log(instruction);
            let error = `Password increased from "${orig_password}" to "${password}"`;
            throw error;
        }
    }

    return password;
};

/*
    swap position X with position Y
        Inverse is `swap position X with position Y`

    swap letter X with letter Y
        Inverse is `swap letter X with letter Y`

    rotate left X steps
        Inverse is `rotate right X steps`

    rotate right X steps
        Inverse is `rotate left X steps`

    rotate based on position of letter X
        Get position of Letter x
        Get left steps via lookup with position
        Inverse is `rotate left $LOOKUP steps`

    reverse positions X through Y
        Inverse is `reverse positions X through Y`

    move position X to position Y 
        Inverse is `move position Y to position X`
*/

// Unscramble by running inverse action on password
const unscrambleStep = (password, instruction) => {
    if (typeof instruction === 'string') {
        instruction = stringInstructionToObject(instruction);
    }

    let { type } = instruction;

    switch (type) {
        case 'swap':
            password = scrambleStep(password, instruction);
            break;

        case 'move':
            // Inverse is `move position Y to position X`
            const [pos_a, pos_b] = instruction.positions;
            password = scrambleStep(password, { type, positions: [pos_b, pos_a] });
            break;

        case 'reverse':
            password = scrambleStep(password, instruction);
            break;

        case 'rotate':
            if (instruction.left != null) {
                // Inverse is rotate right x steps
                password = scrambleStep(password, { type, right: instruction.left });
            } else if (instruction.right != null) {
                // Inverse is rotate left x steps
                password = scrambleStep(password, { type, left: instruction.right });
            } else {
                // rotate based on position of letter b

                // Couldn't figure out the algo for this, so did this by hand based on 8 char length pass
                const rotate_position_key = {
                    0: 9,
                    6: 8,
                    4: 7,
                    2: 6,
                    7: 4,
                    5: 3,
                    3: 2,
                    1: 1,
                };

                let letter_index = password.indexOf(instruction.letter);
                let left_steps = rotate_position_key[letter_index];

                password = scrambleStep(password, { type, left: left_steps });
            }
            break;

        default:
            let error = `Unknown type ${type}`;
            console.log(instruction);
            throw error;
    }

    return password;
};

const unscramble = (password, instructions) => {
    let orig_password = password;

    for (let i = instructions.length - 1; i >= 0; i--) {
        let instruction = instructions[i];

        password = unscrambleStep(password, instruction);

        if (password.length !== orig_password.length) {
            console.log(instruction);
            let error = `Password increased from "${orig_password}" to "${password}"`;
            throw error;
        }
    }

    return password;
};

module.exports = { scramble, scrambleStep, unscramble, unscrambleStep };
