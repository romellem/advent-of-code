const OPEN_GROUND = '.';
const TREES = '|';
const LUMBERYARD = '#';

class Forest {
    constructor(raw_forest) {
        this.grid = raw_forest.split('\n').map(line => line.split(''));
        this.resources = this.calculateTotalResources();

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

        // Keep running tally of new counts
        let new_grid_resources = {
            [TREES]: 0,
            [LUMBERYARD]: 0,
            [OPEN_GROUND]: 0,
        };

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                let cell = this.grid[y][x];
                let adjacents = this.getAdjacent(x, y);

                if (cell === OPEN_GROUND) {
                    // An open acre will become filled with trees if
                    // three or more adjacent acres contained trees. Otherwise, nothing happens.
                    if (adjacents.filter(c => c === TREES).length >= 3) {
                        new_grid[y][x] = TREES;
                        new_grid_resources[TREES]++;
                    } else {
                        new_grid_resources[OPEN_GROUND]++;
                    }
                } else if (cell === TREES) {
                    // An acre filled with trees will become a lumberyard if
                    // three or more adjacent acres were lumberyards. Otherwise, nothing happens.
                    if (adjacents.filter(c => c === LUMBERYARD).length >= 3) {
                        new_grid[y][x] = LUMBERYARD;
                        new_grid_resources[LUMBERYARD]++;
                    } else {
                        new_grid_resources[TREES]++;
                    }
                } else {
                    // An acre containing a lumberyard will remain a lumberyard if it was adjacent
                    // to at least one other lumberyard and at least one acre containing trees.
                    // Otherwise, it becomes open.
                    if (!(adjacents.includes(LUMBERYARD) && adjacents.includes(TREES))) {
                        new_grid[y][x] = OPEN_GROUND;
                        new_grid_resources[OPEN_GROUND]++;
                    } else {
                        new_grid_resources[LUMBERYARD]++;
                    }
                }
            }
        }

        this.time++;
        this.grid = new_grid;
        this.resources = new_grid_resources;
    }

    calculateTotalResources() {
        let num_trees = 0;
        let num_lumberyards = 0;
        let num_open = 0;

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                let cell = this.grid[y][x];

                switch (cell) {
                    case TREES:
                        num_trees++;
                        break;
                    case LUMBERYARD:
                        num_lumberyards++;
                        break;
                    case OPEN_GROUND:
                        num_open++;
                        break;
                }
            }
        }

        return {
            [TREES]: num_trees,
            [LUMBERYARD]: num_lumberyards,
            [OPEN_GROUND]: num_open,
        };
    }

    getTotalResources() {
        return this.resources[TREES] * this.resources[LUMBERYARD];
    }
}

module.exports = Forest;
