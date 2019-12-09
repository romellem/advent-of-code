const G = require('generatorics');
const { input } = require('./input');
const { Computer } = require('./circuit');

let c= new Computer(input, [2])


console.log(
	c.run()
);
