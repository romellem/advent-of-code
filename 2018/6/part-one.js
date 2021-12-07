const fs = require('fs');
const path = require('path');
const distance = require('manhattan');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let coordinates = input.map(p => p.split(',').map(n => +n));

let flattened = coordinates.flat();
let largest = Math.max(...flattened);

let grid = Array(largest + 2)
    .fill()
    .map(n => {
        return Array(largest + 2).fill(-1);
    });

// Loop through grid and mark spots that are coordinates
coordinates.forEach((coord, index) => {
    let [i, j] = coord;
    grid[i][j] = 'C' + index;
});

// Iterate each coord in grid, and measure its distance from each point in our list.
// Keep track of the smallest one. If tie, mark as null
for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < grid.length; j++) {
        let cell = row[j];
        if (typeof cell !== 'string') {
            // Not a coord, measure it
            let lengths = coordinates.map((coord, index) => {
                let d = distance(coord, [i, j]);
                return {
                    index: index,
                    dist: d,
                };
            });

            lengths.sort((a, b) => {
                if (a.dist < b.dist) return -1;
                else if (a.dist > b.dist) return 1;
                else return 0;
            });

            let first = lengths[0];
            let second = lengths[1];

            if (first.dist === second.dist) {
                // tied distance, mark as null
                grid[i][j] = null;
            } else {
                grid[i][j] = first.index;
            }
        }
    }
}

// Now, get all edges
let edges = [];
for (let i = 0; i < grid.length; i++) {
    for (let dir = 0; dir < 4; dir++) {
        if (dir === 0) {
            // top row
            edges.push(grid[0][i]);
        } else if (dir === 1) {
            // right col
            edges.push(grid[i][grid.length - 1]);
        } else if (dir === 2) {
            // bottom row col
            edges.push(grid[grid.length - 1][i]);
        } else {
            // left col
            edges.push(grid[i][0]);
        }
    }
}

let unique_edges_list = [...new Set(edges)];
unique_edges_list = unique_edges_list.filter(n => typeof n === 'number');
let unique_edges = {};
unique_edges_list.forEach(e => (unique_edges[e] = true));

let total_area = {};

// Loop through grid and remove all edge nodes (they are infinite area)
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
        let cell = grid[i][j];
        if (typeof cell === 'number') {
            if (unique_edges[cell]) {
                // Remove any index with infinite area
                grid[i][j] = null;
            } else {
                if (!total_area[cell]) {
                    total_area[cell] = 0;
                }

                total_area[cell] += 1;
            }
        }
    }
}

let areas = Object.entries(total_area);
areas.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    else if (a[1] > b[1]) return 1;
    else return 0;
});

let max = areas.pop();

// Plus 1 because we need to count the original coordinate!!
console.log(max[1] + 1);
