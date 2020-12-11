const { input } = require('./input');
const { Grid } = require('./grid');

let c = new Grid(input);
console.log(c.tick() );
