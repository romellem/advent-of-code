const assert = require('assert');

const TURN_POINT = '+';
const SPACE = ' ';

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';

const VALID_TURNS = {
    [NORTH]: '|',
    [SOUTH]: '|',
    [EAST]: '-',
    [WEST]: '-',
};

class Track {
    constructor(track) {
        this.grid = JSON.parse(JSON.stringify(track));
        this.starting_point = this.findStartingPoint(this.grid);
    }

    findStartingPoint(track) {
        const y = 0;
        let first_row = track[y];

        for (let x = 0; x < first_row.length; x++) {
            if (first_row[x] === '|') {
                return [x, y];
            }
        }
    }

    walk(return_word = true) {
        let direction = SOUTH;
        let word = '';
        let steps = 0;

        let [x, y] = this.starting_point;
        while (true) {
            let coord = this.grid[y][x];
            if (coord === TURN_POINT) {
                let neighbors = this.getNeighbors(x, y);
                let new_directions = this.getPossibleTurnsFromCurrentDirection(direction);

                let valid_neighbor = neighbors.filter(cell => {
                    // If the turn is 90°, AND the symbol is valid or a letter, keep it
                    return (
                        new_directions.includes(cell.direction) &&
                        (VALID_TURNS[cell.direction] === cell.cell || /[a-zA-Z]/.test(cell.cell))
                    );
                });
                assert.strictEqual(valid_neighbor.length, 1);

                let new_direction = valid_neighbor[0];
                direction = new_direction.direction;

                // Move in the new direction
                let [x_step, y_step] = this.getCoordStepFromDirection(direction);
                x += x_step;
                y += y_step;
            } else {
                // If its a letter, add it to our word
                if (/[a-zA-Z]/.test(coord)) {
                    word += coord;
                }

                // Keep moving in the same direction
                let [x_step, y_step] = this.getCoordStepFromDirection(direction);
                x += x_step;
                y += y_step;
            }

            steps++;

            let next_coord = this.grid[y] && this.grid[y][x];
            if (next_coord === undefined || next_coord === SPACE) {
                // We ran past the end point, break out of the loop and return our word
                return return_word ? word : steps;
            }
        }
    }

    getNeighbors(x, y) {
        let neighbors = [];
        if (this.grid[y - 1] && this.grid[y - 1][x]) {
            neighbors.push({ direction: NORTH, cell: this.grid[y - 1][x], coord: [x, y - 1] });
        }
        if (this.grid[y] && this.grid[y][x + 1]) {
            neighbors.push({ direction: EAST, cell: this.grid[y][x + 1], coord: [x + 1, y] });
        }
        if (this.grid[y + 1] && this.grid[y + 1][x]) {
            neighbors.push({ direction: SOUTH, cell: this.grid[y + 1][x], coord: [x, y + 1] });
        }
        if (this.grid[y] && this.grid[y][x - 1]) {
            neighbors.push({ direction: WEST, cell: this.grid[y][x - 1], coord: [x - 1, y] });
        }

        return neighbors;
    }

    // @returns {Array} returns [x, y] step size
    getCoordStepFromDirection(direction) {
        switch (direction) {
            case NORTH:
                return [0, -1];
            case EAST:
                return [1, 0];
            case SOUTH:
                return [0, 1];
            case WEST:
                return [-1, 0];
            default:
                let error = `Direction in 'getCoordStepFromDirection' was invalid: "${direction}"`;
                throw error;
        }
    }

    getPossibleTurnsFromCurrentDirection(direction) {
        switch (direction) {
            case NORTH:
                return [WEST, EAST];
            case EAST:
                return [NORTH, SOUTH];
            case SOUTH:
                return [WEST, EAST];
            case WEST:
                return [NORTH, SOUTH];
        }
    }
}

module.exports = Track;
