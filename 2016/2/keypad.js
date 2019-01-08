class Keypad {
    constructor(keypad_size = 3) {
        this.grid = Array(keypad_size)
            .fill()
            .map(row => Array(keypad_size).fill());

        for (let n = 1; n <= keypad_size ** 2; n++) {
            let y = Math.floor((n - 1) / keypad_size);
            let x = (n - 1) % keypad_size;
            this.grid[y][x] = n;
        }
    }

    press(instructions, starting_point = [1, 1]) {
        let [x, y] = starting_point;
        let steps = instructions.split('');

        steps.forEach(step => {
            switch (step) {
                case 'U':
                    if (y > 0) y--;
                    break;

                case 'D':
                    if (y < this.grid.length - 1) y++;
                    break;

                case 'L':
                    if (x > 0) x--;
                    break;

                case 'R':
                    if (x < this.grid[0].length - 1) x++;
                    break;
            }
        });

        return {
            x,
            y,
            num: this.grid[y][x]
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