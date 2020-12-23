const { input } = require('./input');
const newinput = input.concat(Array(1000000 - 9).fill().map((v, i) => i + 10));
console.log(newinput.slice(0,20))