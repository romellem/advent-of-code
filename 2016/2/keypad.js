// prettier-ignore
const SQUARE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';

// prettier-ignore
const DIAMOND = [
    [ ,  , 1,  ,  ],
    [ , 2, 3, 4,  ],
    [5, 6, 7, 8, 9],
    [ , A, B, C,  ],
    [ ,  , D,  ,  ],
];

class Keypad {
    constructor({ type } = {}) {
        this.grid =
            type === 'diamond'
                ? JSON.parse(JSON.stringify(DIAMOND))
                : JSON.parse(JSON.stringify(SQUARE));
    }

    press(instructions, starting_point = [1, 1]) {
        let [x, y] = starting_point;
        let steps = instructions.split('');

        steps.forEach(step => {
            switch (step) {
                case 'U':
                    if (this.grid[y - 1] && this.grid[y - 1][x]) y--;
                    break;

                case 'D':
                    if (this.grid[y + 1] && this.grid[y + 1][x]) y++;
                    break;

                case 'L':
                    if (this.grid[y] && this.grid[y][x - 1]) x--;
                    break;

                case 'R':
                    if (this.grid[y] && this.grid[y][x + 1]) x++;
                    break;
            }
        });

        return {
            x,
            y,
            num: this.grid[y][x],
        };
    }

    pressAll(instructions, initial_starting_point = [1, 1]) {
        let code = [];
        let starting_point = initial_starting_point.slice(0);
        instructions.forEach(instruction => {
            let answer = this.press(instruction, starting_point);
            starting_point = [answer.x, answer.y];
            code.push(answer.num);
        });

        return code.join('');
    }
}

module.exports = Keypad;
