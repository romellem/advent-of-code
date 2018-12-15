const input = require('./input');

class Lights {
    constructor(instructions, x_size = 1000, y_size = 1000) {
        this.instructions = instructions;

        // Initialize all lights to be off
        this.grid = this.createGrid(x_size, y_size);

        this.followInstructions();
    }

    createGrid(x, y) {
        let grid = Array(y)
            .fill()
            .map(r => Array(x).fill(0));
        return grid;
    }

    followInstructions() {
        this.instructions.forEach(instruction => {
            let [from, to] = instruction.coords;

            for (let y = from[1]; y <= to[1]; y++) {
                for (let x = from[0]; x <= to[0]; x++) {
                    let { action } = instruction;

                    if (action === 'toggle') {
                        this.grid[y][x] += 2;
                    } else if (action === 'turn on') {
                        this.grid[y][x] += 1;
                    } else {
                        // turn off
                        this.grid[y][x] -= 1;

                        if (this.grid[y][x] < 0) {
                            this.grid[y][x] = 0;
                        }
                    }
                }
            }
        });
    }

    getTotalBrightness() {
        return this.grid
            .map(row => row.reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0);
    }
}

let lights = new Lights(input);

console.log(lights.getTotalBrightness());
