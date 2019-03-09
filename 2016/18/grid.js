class Grid {
    constructor(first_row) {
        this.grid = [first_row.slice(0)];
    }

    /**
     * @param {int} n - Number of rows to add onto grid
     */
    addRows(n) {
        for (let i = 0; i < n; i++) {
            let row = [];
            let row_above = this.grid[this.grid.length - 1];
            row_above.forEach((tile, t) => {
                let left = row_above[t - 1];
                let center = tile;
                let right = row_above[t + 1];

                // `1` is a safe tile
                if (left === undefined) left = 1;
                if (right === undefined) right = 1;

                /**
                 * A new tile is a _trap_ only in one of the following situations:
                 *
                 * - Its _left_ and _center_ tiles are traps, but its _right_ tile is not.
                 * - Its _center_ and _right_ tiles are traps, but its _left_ tile is not.
                 * - Only its _left_ tile is a trap.
                 * - Only its _right_ tile is a trap.
                 */
                if (
                    (left === 0 && center === 0 && right === 1) ||
                    (left === 1 && center === 0 && right === 0) ||
                    (left === 0 && center === 1 && right === 1) ||
                    (left === 1 && center === 1 && right === 0)
                ) {
                    // Trap tile
                    row.push(0);
                } else {
                    // Safe tile
                    row.push(1);
                }
            });

            this.grid.push(row);
        }
    }

    // Assumes safe tiles are stored as a `1`
    countSafeTiles() {
        return this.grid.map(row => row.reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
    }
}

module.exports = Grid;
