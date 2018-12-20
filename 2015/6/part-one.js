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
            .map(r => Array(x).fill(false));
        return grid;
    }

    followInstructions() {
        this.instructions.forEach(instruction => {
            let [from, to] = instruction.coords;

            for (let y = from[1]; y <= to[1]; y++) {
                for (let x = from[0]; x <= to[0]; x++) {
                    let { action } = instruction;

                    if (action === 'toggle') {
                        this.grid[y][x] = !this.grid[y][x];
                    } else if (action === 'turn on') {
                        this.grid[y][x] = true;
                    } else {
                        // turn off
                        this.grid[y][x] = false;
                    }
                }
            }
        });
    }

    getCountOfOnLights() {
        return this.grid
            .map(row => row.map(v => (v ? 1 : 0)).reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0);
    }
}

let lights = new Lights(input);

console.log(lights.getCountOfOnLights());
