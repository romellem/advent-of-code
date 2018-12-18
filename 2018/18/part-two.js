const input = require('./input');
const Forest = require('./forest');

let forest = new Forest(input);

for (let i = 0; i < 1000000000; i++) {
    if (i % 7549 === 0) {
        process.stdout.write(i + '\r');
    }
    forest.tick();
}

console.log('                                \n');
console.log(forest.partOne());
