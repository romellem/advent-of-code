const { A, B, partTwoInterations } = require('./input');
const Generator = require('./generator');

let generator_a = new Generator(Object.assign({}, A, { multiple: 4 }));
let generator_b = new Generator(Object.assign({}, B, { multiple: 8 }));

// Test cases

// let generator_a = new Generator({
//     startsWith: 65,
//     factor: 16807,
//     divideBy: 2147483647,
//     multiple: 4,
// });
// let generator_b = new Generator({
//     startsWith: 8921,
//     factor: 48271,
//     divideBy: 2147483647,
//     multiple: 8,
// });

let pairs = 0;
const partTwoInterations_locale = partTwoInterations.toLocaleString();

for (let i = 0; i < partTwoInterations; i++) {
    if (i % 4937 === 0) process.stdout.write(i.toLocaleString() + ' / ' + partTwoInterations_locale + '\r');
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
