const input = require('./input');
const Forest = require('./forest');

let forest = new Forest(input);

for (let i = 0; i < 10; i++) {
    forest.tick();
}

console.log(forest.partOne());
