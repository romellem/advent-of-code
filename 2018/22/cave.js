const ROCKY = 0;
const WET = 1;
const NARROW = 2;

let TYPES_LOOKUP = {
    [ROCKY]: '.',
    [WET]: '=',
    [NARROW]: '|',
};

const colors = require('colors');
const distance = require('manhattan');
class Cave {
    constructor(depth, target_coords) {
        /**
         * Used the below code for Part One, due to memory issues, but that can be fixed with
         *
         *     node --max_old_space_size=4096 ./part-one.js`
         *
         */
        // let grid_size = target_coords[0] + target_coords[1] + 2;
        // let grid_size = depth;
        let grid_size = Math.max.apply(null, target_coords) + 50;

        this.depth = depth;
        this.grid = Array(grid_size)
            .fill()
            .map(row => Array(grid_size).fill());
        this.target_x = target_coords[0];
        this.target_y = target_coords[1];

        this.fillGrid();
    }

    fillGrid() {
        // Zig zag walk

        let i = 1,
            j = 1;
        for (let e = 0; e < this.grid.length * this.grid.length; e++) {
            let x = i - 1;
            let y = j - 1;

            // console.log(`${x},${y}`);

            let index;
            if (x === 0 && y === 0) {
                index = 0;
            } else if (x === this.target_x && y === this.target_y) {
                index = 0;
            } else if (y === 0) {
                index = x * 16807;
            } else if (x === 0) {
                index = y * 48271;
            } else {
                index = this.grid[y - 1][x].erosion * this.grid[y][x - 1].erosion;
            }

            let erosion = (index + this.depth) % 20183;
            let type = erosion % 3;

            this.grid[y][x] = {
                index,
                erosion,
                type,
            };

            if ((i + j) % 2 === 0) {
                // Even stripes
                if (j < this.grid.length) j++;
                else i += 2;
                if (i > 1) i--;
            } else {
                // Odd stripes
                if (i < this.grid.length) i++;
                else j += 2;
                if (j > 1) j--;
            }
        }
    }

    getSumOfTypesFromOriginToTarget() {
        let sum = 0;
        for (let y = 0; y <= this.target_y; y++) {
            for (let x = 0; x <= this.target_x; x++) {
                let cell = this.grid[y][x];
                sum += cell.type;
            }
        }

        return sum;
    }

    printGrid(size_x, size_y) {
        size_x = size_x === undefined ? this.depth - 1 : size_x;
        size_y = size_y === undefined ? this.depth - 1 : size_y;

        let grid_str = '';

        for (let y = 0; y < size_y; y++) {
            for (let x = 0; x < size_x; x++) {
                let cell = this.grid[y][x];
                if (x === 0 && y === 0) {
                    grid_str += 'M';
                } else if (x === this.target_x && y === this.target_y) {
                    grid_str += 'T';
                } else {
                    grid_str += TYPES_LOOKUP[cell.type];
                }
            }

            grid_str += '\n';
        }

        return grid_str;
    }

    walkToTarget() {
        let x = 0,
            y = 0,
            previous_cell_x,
            previous_cell_y;
        let equipped = 'torch';
        let current_cell;

        let time_moving = 0;

        const target_coords = [this.target_x, this.target_y];

        let q = 0;
        while (`${x},${y}` !== `${this.target_x},${this.target_y}` && ++q < 60) {
            current_cell = this.grid[y][x];
            const current_distance = distance([x, y], target_coords);

            let left = x > 0 ? (x - 1 === previous_cell_x ? null : [x - 1, y]) : null,
                right =
                    x < this.grid.length - 1
                        ? x + 1 === previous_cell_x
                            ? null
                            : [x + 1, y]
                        : null,
                up = y > 0 ? (y - 1 === previous_cell_y ? null : [x, y - 1]) : null,
                down =
                    y < this.grid.length - 1
                        ? y + 1 === previous_cell_y
                            ? null
                            : [x, y + 1]
                        : null;

            let movements = [
                { coords: left, direction: 'left' },
                { coords: right, direction: 'right' },
                { coords: up, direction: 'up' },
                { coords: down, direction: 'down' },
            ]
                .filter(n => n.coords)
                .map(({ coords, direction }) => {
                    let [to_x, to_y] = coords;
                    let move_to_cell = this.grid[to_y][to_x];

                    let value;
                    if (equipped === 'torch') {
                        // move between rocky (0) and narrow (2) regions
                        value = move_to_cell.type === WET ? 8 : 1;
                    } else if (equipped === 'gear') {
                        // move between rocky (0) and wet (1)
                        value = move_to_cell.type === NARROW ? 8 : 1;
                    } else {
                        // Neither equipped,
                        // move between wet (1) and narrow (2)
                        value = move_to_cell.type === ROCKY ? 8 : 1;
                    }

                    return {
                        coords,
                        distance: distance(coords, target_coords),
                        value,
                        direction,
                        moveToType:
                            move_to_cell.type === ROCKY
                                ? 'ROCKY'
                                : move_to_cell.type === WET
                                ? 'WET'
                                : 'NARROW',
                    };
                });

            // movements.sort((a, b) => {
            //     if (a.value < b.value) return -1;
            //     else if (a.value > b.value) return 1;
            //     else {
            //         if (a.distance < b.distance) return -1;
            //         else if (a.distance > b.distance) return 1;
            //         else return 0;
            //     }
            // });

            movements.sort((a, b) => {
                if (a.distance < b.distance) return -1;
                else if (a.distance > b.distance) return 1;
                else {
                    if (a.value < b.value) return -1;
                    else if (a.value > b.value) return 1;
                    else return 0;
                }
            });

            console.log(
                'With '.yellow +
                    equipped.toUpperCase().magenta +
                    ' equipped, available directions are: '.yellow
            );
            console.log(
                movements
                    .map(m => {
                        let new_distance = m.distance;
                        return (
                            '' +
                            m.direction.cyan +
                            ' to [' +
                            m.coords.join(', ').blue +
                            '], a ' +
                            m.moveToType.magenta +
                            ' type with value of ' +
                            m.value.toString().magenta +
                            ' (' +
                            (new_distance < current_distance ? 'CLOSER'.green : 'FURTHER'.red) +
                            ' by ' +
                            Math.abs(new_distance - current_distance).toString().green +
                            ')'
                        );
                    })
                    .join('\n')
            );
            console.log('');

            // Will this work? I don't know, but take the best movement and see if we have to switch
            let best_movement = movements[0];
            console.log(
                `${best_movement.direction.toUpperCase()} to [${best_movement.coords.join(', ')}]`
            );

            if (best_movement.value > 1) {
                let previously_equipped = equipped;
                // We have to switch, but what to switch to?
                // Some switching is not allowed
                // e.g., For example, if you are in a ROCKY region, you can switch from
                //       the TORCH to the GEAR, but you cannot switch to NEITHER.

                if (equipped === 'torch') {
                    // Switch to NEITHER or GEAR
                    if (current_cell.type === ROCKY) {
                        equipped = 'gear';
                    } else {
                        equipped = 'neither';
                    }
                } else if (equipped === 'gear') {
                    // Switch to TORCH or NEITHER
                    if (current_cell.type === ROCKY) {
                        equipped = 'torch';
                    } else {
                        equipped = 'neither';
                    }
                } else {
                    // Switch to TORCH or GEAR
                    if (current_cell.type === WET) {
                        equipped = 'gear';
                    } else {
                        equipped = 'torch';
                    }
                }

                console.log(`\tSwitching from ${previously_equipped} to ${equipped}`);
            }

            time_moving += best_movement.value;

            previous_cell_x = x;
            previous_cell_y = y;

            x = best_movement.coords[0];
            y = best_movement.coords[1];

            console.log('================');
        }

        return time_moving;
    }
}

module.exports = Cave;
