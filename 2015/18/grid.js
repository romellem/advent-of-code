const ON = '#';
const OFF = '.';

class Light {
    constructor(initial_state, [x, y]) {
        this.on = initial_state === ON;

        this.x = x;
        this.y = y;
    }
}

class Grid {
    constructor(initial_grid_state, [size_x = 100, size_y = 100]) {
        this.grid = Array(size_y)
            .fill()
            .map((r, y) =>
                Array(size_x)
                    .fill()
                    .map((c, x) => new Light(initial_grid_state[y][x], [x, y]))
            );
    }

    getNeighbors(x, y) {
        // prettier-ignore
        let neighbors = [
            [y - 1, x],     // top
            [y - 1, x + 1], // top right
            [y, x + 1],     // right
            [y + 1, x + 1], // bottom right
            [y + 1, x],     // bottom
            [y + 1, x - 1], // bottom left
            [y, x - 1],     // left
            [y - 1, x - 1], // top left
        ].filter(([_y, _x]) => (_x < 0 || _y < 0 ? false : true));

        return neighbors.map(([_y, _x]) => this.grid[_y][_x]);
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
                        if (n.on) neighbors_on++;
                        else neighbors_off++;
                    });

                    if (cell.on) {
                        // A light which is _on_ stays on when 2 or 3 neighbors are on,
                        // and turns off otherwise.
                        new_grid_state[y][x] = neighbors_on === 2 || neighbors_on === 3;
                    } else {
                        // A light which is _off_ turns on if exactly 3 neighbors are on,
                        // and stays off otherwise.
                        new_grid_state[y][x] = neighbors_off === 3;
                    }
                }
            }

            // Update our real grid
            for (let y = 0; y < this.grid.length; y++) {
                for (let x = 0; x < this.grid[0].length; x++) {
                    this.grid[y][x] = new_grid_state[y][x];
                }
            }
        }
    }

    // Default state is ON
    countLightsInState(state = true) {
        let lights_in_state = 0;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                if (this.grid[y][x].on === state) {
                    lights_in_state++;
                }
            }
        }

        return lights_in_state;
    }
}

module.exports = Grid;
