const sampleInput = {
    password: 'abcde',
    result: 'decab',
    instructions: [
        { type: 'swap', positions: [4, 0] },
        { type: 'swap', letters: ['d', 'b'] },
        { type: 'reverse', positions: [0, 4] },
        { type: 'rotate', left: 1 },
        { type: 'move', positions: [1, 4] },
        { type: 'move', positions: [3, 0] },
        { type: 'rotate', letter: 'b' },
        { type: 'rotate', letter: 'd' },
    ],
};

const input = {
    password: 'abcdefgh',
    instructions: [
        { type: 'swap', letters: ['e', 'h'] },
        { type: 'swap', letters: ['f', 'g'] },
        { type: 'move', positions: [6, 3] },
        { type: 'reverse', positions: [1, 6] },
        { type: 'swap', letters: ['b', 'a'] },
        { type: 'swap', letters: ['a', 'f'] },
        { type: 'rotate', letter: 'e' },
        { type: 'swap', positions: [7, 2] },
        { type: 'rotate', letter: 'e' },
        { type: 'swap', letters: ['c', 'e'] },
        { type: 'rotate', letter: 'f' },
        { type: 'rotate', right: 6 },
        { type: 'swap', letters: ['c', 'f'] },
        { type: 'reverse', positions: [3, 7] },
        { type: 'swap', letters: ['c', 'b'] },
        { type: 'swap', positions: [1, 2] },
        { type: 'reverse', positions: [3, 6] },
        { type: 'swap', letters: ['c', 'a'] },
        { type: 'rotate', left: 0 },
        { type: 'swap', positions: [3, 0] },
        { type: 'swap', letters: ['b', 'e'] },
        { type: 'reverse', positions: [4, 7] },
        { type: 'move', positions: [1, 4] },
        { type: 'swap', positions: [6, 3] },
        { type: 'rotate', left: 6 },
        { type: 'rotate', right: 0 },
        { type: 'move', positions: [7, 3] },
        { type: 'move', positions: [3, 4] },
        { type: 'swap', positions: [3, 2] },
        { type: 'reverse', positions: [1, 6] },
        { type: 'move', positions: [7, 5] },
        { type: 'reverse', positions: [4, 5] },
        { type: 'rotate', letter: 'g' },
        { type: 'swap', positions: [4, 2] },
        { type: 'reverse', positions: [1, 5] },
        { type: 'rotate', letter: 'h' },
        { type: 'rotate', letter: 'f' },
        { type: 'rotate', letter: 'b' },
        { type: 'swap', positions: [1, 4] },
        { type: 'swap', letters: ['b', 'h'] },
        { type: 'rotate', letter: 'e' },
        { type: 'swap', letters: ['a', 'c'] },
        { type: 'swap', positions: [3, 5] },
        { type: 'rotate', right: 6 },
        { type: 'rotate', letter: 'c' },
        { type: 'move', positions: [2, 0] },
        { type: 'swap', letters: ['b', 'e'] },
        { type: 'swap', letters: ['g', 'e'] },
        { type: 'rotate', letter: 'd' },
        { type: 'swap', positions: [6, 5] },
        { type: 'swap', letters: ['b', 'c'] },
        { type: 'rotate', letter: 'e' },
        { type: 'rotate', letter: 'f' },
        { type: 'rotate', letter: 'f' },
        { type: 'move', positions: [7, 0] },
        { type: 'rotate', right: 1 },
        { type: 'rotate', right: 7 },
        { type: 'swap', positions: [5, 6] },
        { type: 'move', positions: [6, 7] },
        { type: 'rotate', letter: 'e' },
        { type: 'swap', positions: [3, 1] },
        { type: 'swap', positions: [4, 3] },
        { type: 'swap', letters: ['f', 'a'] },
        { type: 'swap', positions: [5, 2] },
        { type: 'rotate', letter: 'e' },
        { type: 'rotate', left: 3 },
        { type: 'rotate', left: 1 },
        { type: 'rotate', letter: 'b' },
        { type: 'rotate', left: 6 },
        { type: 'rotate', letter: 'b' },
        { type: 'rotate', right: 7 },
        { type: 'swap', positions: [0, 2] },
        { type: 'swap', positions: [7, 5] },
        { type: 'rotate', left: 3 },
        { type: 'reverse', positions: [4, 5] },
        { type: 'move', positions: [2, 5] },
        { type: 'swap', letters: ['c', 'f'] },
        { type: 'swap', letters: ['g', 'e'] },
        { type: 'rotate', left: 6 },
        { type: 'swap', positions: [4, 6] },
        { type: 'rotate', letter: 'h' },
        { type: 'rotate', left: 2 },
        { type: 'swap', letters: ['c', 'a'] },
        { type: 'rotate', right: 3 },
        { type: 'rotate', left: 6 },
        { type: 'swap', letters: ['b', 'f'] },
        { type: 'swap', positions: [6, 5] },
        { type: 'reverse', positions: [3, 4] },
        { type: 'reverse', positions: [2, 7] },
        { type: 'swap', positions: [7, 4] },
        { type: 'rotate', letter: 'd' },
        { type: 'swap', positions: [5, 3] },
        { type: 'swap', letters: ['c', 'b'] },
        { type: 'swap', positions: [7, 6] },
        { type: 'rotate', letter: 'c' },
        { type: 'reverse', positions: [0, 7] },
        { type: 'reverse', positions: [2, 4] },
        { type: 'rotate', letter: 'f' },
        { type: 'reverse', positions: [1, 4] },
        { type: 'rotate', right: 7 },
    ],
};

const stringInstructionToObject = str => {
    let str_arr = str.split(' ');
    const type = str_arr.shift();
    const instruction = { type };

    const action = str_arr.shift();

    let x, y;
    switch (type) {
        case 'swap':
            [x, , , y] = str_arr;
            if (action === 'position') {
                // swap position a with position y
                instruction.positions = [+x, +y];
            } else {
                // swap letter x with letter y
                instruction.letters = [x, y];
            }
            break;

        case 'move':
            // move position X to position Y
            [x, , , y] = str_arr;
            instruction.positions = [+x, +y];
            break;

        case 'reverse':
            // reverse positions X through Y
            [x, , y] = str_arr;
            instruction.positions = [+x, +y];
            break;

        case 'rotate':
            if (action === 'left') {
                // rotate left X steps
                [x] = str_arr;
                instruction.left = +x;
            } else if (action === 'right') {
                // rotate right X steps
                [x] = str_arr;
                instruction.right = +x;
            } else {
                // rotate based on position of letter X
                [, , , , x] = str_arr;
                instruction.letter = x;
            }
            break;

        default:
    }

    return instruction;
};

const partTwoPassword = 'fbgdceah';

module.exports = {
    sampleInput,
    input,
    stringInstructionToObject,
    partTwoPassword,
};
