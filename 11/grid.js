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

    getMostPowerfulSquare(size = 3) {
        let square_at_coords_power = {};
        for (let y = 0; y < this.grid.length - size + 1; y++) {
            for (let x = 0; x < this.grid.length - size + 1; x++) {
                let square_sum = this.getSquareSum(x, y, size);
                square_at_coords_power[x + 1 + ',' + (y + 1)] = square_sum;
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

    getMostPowerfulSquareOfAnySize(range_min = 1, range_max = this.grid.length) {
        let coords = '';
        let power = -Infinity;
        let size = 0;

        for (let i = range_min; i <= range_max; i++) {
            process.stdout.write(i + ' ');
            let max_square = this.getMostPowerfulSquare(i);
            if (max_square.power > power) {
                coords = max_square.coords;
                power = max_square.power;
                size = i;
                console.log('New Largest!');
                console.log({
                    coords,
                    size,
                    power,
                });
                console.log('');
            }
        }
        console.log('\n==== DONE ====\n');

        return {
            coords,
            size,
            power,
        };
    }

    getFlatSquare(x_coord, y_coord, size = 3) {
        let flat_square = [];
        for (let y = y_coord; y < y_coord + size; y++) {
            for (let x = x_coord; x < x_coord + size; x++) {
                let cell = this.grid[y][x];
                flat_square.push(cell);
            }
        }

        return flat_square;
    }

    getSquareSum(x_coord, y_coord, size = 3) {
        let accumulator = 0;
        for (let y = y_coord; y < y_coord + size; y++) {
            for (let x = x_coord; x < x_coord + size; x++) {
                let cell = this.grid[y][x];
                accumulator += cell.power_level;
            }
        }

        return accumulator;
    }

    getFuelCellAt(x, y) {
        return this.grid[y - 1][x - 1];
    }
}

module.exports = Grid;
