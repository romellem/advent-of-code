class Cave {
    constructor(depth, target_coords) {

        // let grid_size = Math.max.apply(null, target_coords);
        // grid_size = grid_size * grid_size;
        let grid_size = target_coords[0] + target_coords[1] + 2;

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
}

module.exports = Cave;
