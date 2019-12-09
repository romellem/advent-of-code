const G = require('generatorics');
const { input } = require('./input');
const { Computer } = require('./circuit');

let c= new Computer(input, [1])


console.log(
	c.run()
);
