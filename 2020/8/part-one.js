const { input } = require('./input');
const { Computer } = require('./computer');


let c = new Computer(input)
console.log( c.runUntil2nd());
