const { A, B, partOneInterations } = require('./input');
const Generator = require('./generator');

let generator_a = new Generator(A);
let generator_b = new Generator(B);

// Test cases

// let generator_a = new Generator({
//     startsWith: 65,
//     factor: 16807,
//     divideBy: 2147483647,
// });
// let generator_b = new Generator({
//     startsWith: 8921,
//     factor: 48271,
//     divideBy: 2147483647,
// });

let pairs = 0;
const partOneInterations_locale = partOneInterations.toLocaleString();

for (let i = 0; i < partOneInterations; i++) {
    if (i % 20357 === 0) process.stdout.write(i.toLocaleString() + ' / ' + partOneInterations_locale + '\r');
    // Get values as binary
    let a = generator_a.value.toString(2).padStart(32, '0');
    let b = generator_b.value.toString(2).padStart(32, '0');

    // Get last 16 chars
    let a_16 = a.substr(-16);
    let b_16 = b.substr(-16);

    if (a_16 === b_16) {
        pairs++;
    }

    // Tick to next value
    generator_a.setNextValue();
    generator_b.setNextValue();
}

console.log('                                                ');
console.log(pairs);
