const SERIAL = require('./input');

class FuelCell {
    constructor([x, y], serial = SERIAL) {
        this.x = x;
        this.y = y;
        this.serial = serial;

        this.computePowerLevel();
    }

    computePowerLevel() {
        let rack_id = this.x + 10;
        let power_level = rack_id * this.y;
        power_level += this.serial;
        power_level *= rack_id;
        power_level = +String(power_level).substr(-3, 1);
        power_level -= 5;

        return (this.power_level = power_level);
    }

    get coord() {
        return `${this.x},${this.y}`;
    }
}

class Grid {
    constructor([size_x, size_y], serial = SERIAL) {
        this.grid = Array(size_y)
            .fill()
            .map((r, y) =>
                Array(size_x)
                    .fill()
                    .map((c, x) => new FuelCell([x + 1, y + 1], serial))
            );
    }

    getMostPowerfulSquare(square_x = 3, square_y = 3) {
        let square_at_coords_power = {};
        for (let y = 0; y < this.grid.length - square_y; y++) {
            for (let x = 0; x < this.grid.length - square_x; x++) {
                let square = this.getFlatSquare(x, y).map(s => s.power_level);
                square_at_coords_power[(x + 1) + ',' + (y + 1)] = square.reduce((a, b) => a + b, 0);
            }
        }

        let squares_sorted = Object.entries(square_at_coords_power);
        squares_sorted.sort((a, b) => {
            if (a[1] < b[1]) return -1;
            else if (a[1] > b[1]) return 1;
            else return 0;
        });

        return {
            coords: squares_sorted[squares_sorted.length - 1][0],
            power: squares_sorted[squares_sorted.length - 1][1],
        };
    }

    getFlatSquare(x_coord, y_coord, size_x = 3, size_y = 3) {
        let flat_square = [];
        for (let y = y_coord; y < y_coord + size_y; y++) {
            for (let x = x_coord; x < x_coord + size_x; x++) {
                let cell = this.grid[y][x];
                flat_square.push(cell);
            }
        }

        return flat_square;
    }

    getFuelCellAt(x, y) {
        return this.grid[y - 1][x - 1];
    }
}

module.exports = Grid;
