const { input } = require('./input.js');
const { Grid, Ground } = require('./ground.js');
const fs = require('fs');

const grid = new Grid(input);
const ground = new Ground({ grid });

fs.writeFileSync('grid.txt', ground.toString());
ground.toImage().then((image_buffer) => {
	fs.writeFileSync('grid.png', image_buffer);
});
