const { input } = require('./input');

// To find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.
const fuel = input.map(mass => Math.floor(mass / 3) - 2);
const total_fuel = fuel.reduce((a, b) => a + b, 0);
console.log(total_fuel);
