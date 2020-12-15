const { input } = require('./input');
const { Grid } = require('./grid');

let layout = new Grid(input);
console.log(layout.run({ part: 2 }));
