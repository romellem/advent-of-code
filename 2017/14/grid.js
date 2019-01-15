const { flatten } = require('lodash');
const { getKnotHashOfString } = require('./knot');

const HEX_TO_BIN_LOOKUP = {};
'0123456789abcdef'.split('').forEach(char => {
    HEX_TO_BIN_LOOKUP[char] = parseInt(char, 16)
        .toString(2)
        .padStart(4, '0');
});

const getBitGridOfKeyString = (str, size = 128) => {
    let grid = Array(size).fill();

    for (let r = 0; r < size; r++) {
        let dense_hash = getKnotHashOfString(`${str}-${r}`);
        let bits = dense_hash
            .split('')
            .map(c => HEX_TO_BIN_LOOKUP[c])
            .join('')
            .split('')
            .map(n => +n);
        grid[r] = bits;
    }

    return grid;
};

const countUsedBits = grid => {
    return flatten(grid).reduce((a, b) => a + b, 0);
};

// @link https://leetcode.com/problems/number-of-islands/discuss/207059/Simple-Javascript-BFS-solution
const countRegions = _grid => {
    let grid = JSON.parse(JSON.stringify(_grid));
    let n = grid.length,
        m = grid[0].length;

    // Clever way to get Up, Down, Left, and Right neighbors from a given point
    let dx = [0, 0, -1, 1],
        dy = [-1, 1, 0, 0];

    let region_count = 0;

    // Loop through our grid
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // If we are at a 1, we have a region! Spread out from here and zero out neighboring 1s
            if (grid[i][j] === 1) {
                // Start searching from our current point
                let queue = [{ x: i, y: j }];

                // Reset the curent point to 0 so we don't count it again
                grid[i][j] = 0;
                while (queue.length > 0) {
                    const { x, y } = queue.shift();
                    for (let k = 0; k < 4; k++) {
                        let adjX = x + dx[k],
                            adjY = y + dy[k];
                        if (
                            0 <= adjX &&
                            adjX < n &&
                            0 <= adjY &&
                            adjY < m &&
                            grid[adjX][adjY] == 1
                        ) {
                            // Reset this neighboring point to 0 also
                            grid[adjX][adjY] = 0;

                            // Add this point to our queue, so we spread out from that point as well
                            queue.push({ x: adjX, y: adjY });
                        }
                    }
                }

                // We finished spreading out, so count it as one "region"
                region_count++;
            }
        }
    }

    return region_count;
};
module.exports = {
    getBitGridOfKeyString,
    countUsedBits,
    countRegions
};
