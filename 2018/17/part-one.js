const { input } = require('./input.js');
const { Grid, Ground } = require('./ground.js');

const grid = new Grid(input);
const ground = new Ground({ grid });
ground.fill();