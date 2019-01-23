const input = require('./input');
const Grid = require('./grid');
const assert = require('assert');

let test_grid = new Grid();
assert.strictEqual(test_grid.getValueAt({ row: 4, column: 6 }), 31527494);

let grid = new Grid();
console.log(grid.getValueAt(input));
