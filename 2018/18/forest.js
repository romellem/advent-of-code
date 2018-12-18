const OPEN_GROUND = '.';
const TREES = '|';
const LUMBERYARD = '#';

class Forest {
    constructor(raw_forest) {
        this.grid = raw_forest.split('\n').map(line => line.split(''));

        this.time = 0;
    }

    getAdjacent(x, y) {
        let adjacents = [];

        if (this.grid[y - 1]) {
            if (this.grid[y - 1][x]) adjacents.push(this.grid[y - 1][x]);
            if (this.grid[y - 1][x + 1]) adjacents.push(this.grid[y - 1][x + 1]);
            if (this.grid[y - 1][x - 1]) adjacents.push(this.grid[y - 1][x - 1]);
        }

        if (this.grid[y + 1]) {
            if (this.grid[y + 1][x]) adjacents.push(this.grid[y + 1][x]);
            if (this.grid[y + 1][x + 1]) adjacents.push(this.grid[y + 1][x + 1]);
            if (this.grid[y + 1][x - 1]) adjacents.push(this.grid[y + 1][x - 1]);
        }

        if (this.grid[y]) {
            if (this.grid[y][x + 1]) adjacents.push(this.grid[y][x + 1]);
            if (this.grid[y][x - 1]) adjacents.push(this.grid[y][x - 1]);
        }

        return adjacents;
    }

    tick() {
        let new_grid = JSON.parse(JSON.stringify(this.grid));

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                let cell = this.grid[y][x];
                let adjacents = this.getAdjacent(x, y);

                if (cell === OPEN_GROUND) {
                    // An open acre will become filled with trees if
                    // three or more adjacent acres contained trees. Otherwise, nothing happens.
                    if (adjacents.filter(c => c === TREES).length >= 3) {
                        new_grid[y][x] = TREES;
                    }
                } else if (cell === TREES) {
                    // An acre filled with trees will become a lumberyard if
                    // three or more adjacent acres were lumberyards. Otherwise, nothing happens.
                    if (adjacents.filter(c => c === LUMBERYARD).length >= 3) {
                        new_grid[y][x] = LUMBERYARD;
                    }
                } else {
                    // An acre containing a lumberyard will remain a lumberyard if it was adjacent
                    // to at least one other lumberyard and at least one acre containing trees.
                    // Otherwise, it becomes open.
                    if (!(adjacents.includes(LUMBERYARD) && adjacents.includes(TREES))) {
                        new_grid[y][x] = OPEN_GROUND;
                    }
                }
            }
        }

        this.time++;
        this.grid = new_grid;
    }

    getTotalResources() {
        let num_trees = 0;
        let num_lumberyards = 0;

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                let cell = this.grid[y][x];

                if (cell === TREES) {
                    num_trees++;
                } else if (cell === LUMBERYARD) {
                    num_lumberyards++;
                }
            }
        }

        return num_trees * num_lumberyards;
    }
}

module.exports = Forest;
