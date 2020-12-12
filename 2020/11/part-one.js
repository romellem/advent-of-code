const { input } = require('./input');
const { Grid } = require('./grid');

let layout = new Grid(input);
console.log('Part one:', layout.run({ part: 1 }));
layout.reset();
console.log('Part two:', layout.run({ part: 2 }));
