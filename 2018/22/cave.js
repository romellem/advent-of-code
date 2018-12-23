const colors = require('colors');
const distance = require('manhattan');
const jsnx = require('jsnetworkx');
const { intersection } = require('lodash');

const ROCKY = 0;
const WET = 1;
const NARROW = 2;

const NEITHER = 0;
const GEAR = 1;
const TORCH = 2;

let TYPES_LOOKUP = {
    [ROCKY]: '.',
    [WET]: '=',
    [NARROW]: '|',
};

class Cave {
    constructor(depth, target_coords) {
        /**
         * Originally has memory issues when creating a grid that was `depth by depth`
         * size, but was able to fix that with.
         *
         *     node --max_old_space_size=4096 ./part-one.js`
         *
         * However, I don't actually need the full grid, so
         * I'm creating a grid of largest by largest, with some buffer
         * around the edges (50 cells).
         *
         */
        // let grid_size = target_coords[0] + target_coords[1] + 2;
        // let grid_size = depth;
        let grid_size = Math.max.apply(null, target_coords) + 50;

        this.depth = depth;
        this.grid = Array(grid_size)
            .fill()
            .map(row => Array(grid_size).fill());
        this.target_x = target_coords[0];
        this.target_y = target_coords[1];

        this.fillGrid();

        this.directedGraph = this.createDirectedGraphFromGrid();
    }

    allowedTools(x, y) {
        let { type } = this.grid[y][x];
        if (type === ROCKY) return [GEAR, TORCH];
        if (type === WET) return [NEITHER, GEAR];
        if (type === NARROW) return [NEITHER, TORCH];
    }

    getValidNeighborCoords(x, y) {
        let left = x > 0 ? [x - 1, y] : null,
            right = x < this.grid.length - 1 ? [x + 1, y] : null,
            up = y > 0 ? [x, y - 1] : null,
            down = y < this.grid.length - 1 ? [x, y + 1] : null;

        return [left, right, up, down].filter(n => n);
    }

    fillGrid() {
        // Zig zag walk

        for (let y = 0; y < this.grid.length; y++) {
            // Our grid is a square, so we can use the height for this inner loop and it'll work out
            for (let x = 0; x < this.grid.length; x++) {
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
            }
        }
    }

    createDirectedGraphFromGrid() {
        const G = new jsnx.DiGraph();
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                // First, add "switching tools" edge
                let allowed_tools = this.allowedTools(x, y);
                let [tool_a, tool_b] = allowed_tools;

                // Switch tools (moving in third dimension) has a weight of 7
                G.addEdge(`${x},${y},${tool_a}`, `${x},${y},${tool_b}`, { weight: 7 });
                G.addEdge(`${x},${y},${tool_b}`, `${x},${y},${tool_a}`, { weight: 7 });

                // Next, add regular movement between neighbors where it is allowed

                let neighbors = this.getValidNeighborCoords(x, y);
                neighbors.forEach(neighbor => {
                    let [neighbor_x, neighbor_y] = neighbor;

                    //
                    let valid_tools_between_current_and_neighbor = intersection(
                        allowed_tools,
                        this.allowedTools(neighbor_x, neighbor_y)
                    );

                    valid_tools_between_current_and_neighbor.forEach(tool => {
                        G.addEdge(`${x},${y},${tool}`, `${neighbor_x},${neighbor_y},${tool}`, {
                            weight: 1,
                        });
                    });
                });
            }
        }

        return G;
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

    printGrid(size_x, size_y) {
        size_x = size_x === undefined ? this.depth - 1 : size_x;
        size_y = size_y === undefined ? this.depth - 1 : size_y;

        let grid_str = '';

        for (let y = 0; y < size_y; y++) {
            for (let x = 0; x < size_x; x++) {
                let cell = this.grid[y][x];
                if (x === 0 && y === 0) {
                    grid_str += 'M';
                } else if (x === this.target_x && y === this.target_y) {
                    grid_str += 'T';
                } else {
                    grid_str += TYPES_LOOKUP[cell.type];
                }
            }

            grid_str += '\n';
        }

        return grid_str;
    }

    getShortestPathToTarget() {
        return jsnx.dijkstraPathLength(this.directedGraph, {
            // From 0,0 with Torch equipped, to are target, also with the torch equipped
            source: `0,0,${TORCH}`,
            target: `${this.target_x},${this.target_y},${TORCH}`,
        });
    }
}

module.exports = Cave;
