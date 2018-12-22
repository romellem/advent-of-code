const ROCKY = 0;
const WET = 1;
const NARROW = 2;

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
        let grid_size = depth;

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


    walkToTarget() {
        let x = 0, y = 0;
        let equipped = 'torch';
        let current_cell;

        const target_coords = [this.target_x, this.target_y]

        while (x !== this.target_x && y !== this.target_y) {
            current_cell = this.grid[y][x];

            let left =  x > 0 ? [x - 1, y] : null,
                right = x < this.grid.length - 1 ? [x + 1, y] : null,
                up = y > 0 ? [x, y - 1] : null,
                down = y < this.grid.length - 1 ? [x, y + 1] : null;
            
            
            let movements = [left, right, up, down].filter(coords => {
                if (!coords) {
                    return false;
                }

                // Otherwise, see if we can move to the cell given our current equipment
                // e.g., For example, if you are in a rocky region, you can switch from
                //       the torch to the climbing gear, but you cannot switch to neither.

                let [to_x, to_y] = coords;
                let move_to_cell = this.grid[to_y][to_x];
                if (current_cell.type === ROCKY) {
                    if ()
                }
            })
            // .map(coords => {
            //     return {
            //         coords,
            //         distance: distance(coords, target_coords)
            //     }
            // })
            .map(coords => {
                let [to_x, to_y] = coords;
                let value;
                if (equipped === 'torch') {
                    // move between rocky (0) and narrow (2) regions
                    let move_to_cell = this.grid[to_y][to_x];

                    if (move_to_cell.type === WET) {

                    }
                } else if (equipped === 'gear') {
                    // move between rocky (0) and wet (1)
                } else { // Neither equipped,
                    // move between wet (1) and narrow (2)
                }

                return {
                    coords: info.coords,
                    distance: info.distance,
                    value: 0,
                }
            })


            
        }
    }
}

module.exports = Cave;
