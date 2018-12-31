const ON = '#';
const OFF = '.';

class Grid {
    constructor(initial_grid_state, stuck_corners = false) {
        this.grid = JSON.parse(JSON.stringify(initial_grid_state));
        this.stuck_corners = stuck_corners;

        if (this.stuck_corners) {
            let y = this.grid.length - 1;
            let x = this.grid[0].length - 1;

            this.grid[0][0] = true;
            this.grid[y][0] = true;
            this.grid[y][x] = true;
            this.grid[0][x] = true;
        }
    }

    coordIsCorner(x, y) {
        if (y === 0 || y === this.grid.length - 1) {
            return x === 0 || x === this.grid[0].length - 1;
        }

        return false;
    }

    getNeighbors(x, y) {
        // prettier-ignore
        let neighbors = [
            [x, y - 1],     // top
            [x + 1, y - 1], // top right
            [x + 1, y],     // right
            [x + 1, y + 1], // bottom right
            [x, y + 1],     // bottom
            [x - 1, y + 1], // bottom left
            [x - 1, y],     // left
            [x - 1, y - 1], // top left
        ].filter(([_x, _y]) => typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined');

        return neighbors.map(([_x, _y]) => this.grid[_y][_x]);
    }

    tick(steps = 1) {
        for (let s = 0; s < steps; s++) {
            let new_grid_state = Array(this.grid.length)
                .fill()
                .map(() => Array(this.grid[0].length).fill());

            for (let y = 0; y < this.grid.length; y++) {
                for (let x = 0; x < this.grid[0].length; x++) {
                    let cell = this.grid[y][x];

                    let neighbors = this.getNeighbors(x, y);
                    let neighbors_on = 0;
                    let neighbors_off = 0;

                    neighbors.forEach(n => {
                        if (n) neighbors_on++;
                        else neighbors_off++;
                    });

                    // For part two, the four corner are always in the ON state
                    if (this.stuck_corners && this.coordIsCorner(x, y)) {
                        new_grid_state[y][x] = true;
                    } else if (cell) {
                        // A light which is _on_ stays on when 2 or 3 neighbors are on,
                        // and turns off otherwise.
                        new_grid_state[y][x] = neighbors_on === 2 || neighbors_on === 3;
                    } else {
                        // A light which is _off_ turns on if exactly 3 neighbors are on,
                        // and stays off otherwise.
                        new_grid_state[y][x] = neighbors_on === 3;
                    }
                }
            }

            // Update our real grid
            this.grid = new_grid_state;
        }
    }

    // Default state is ON
    countLightsInState(state = true) {
        let lights_in_state = 0;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                if (this.grid[y][x] === state) {
                    lights_in_state++;
                }
            }
        }

        return lights_in_state;
    }

    printGrid() {
        let grid_str = this.grid.map(row => row.map(c => (c ? ON : OFF)).join('')).join('\n');

        console.log(grid_str + '\n');
    }
}

module.exports = Grid;
