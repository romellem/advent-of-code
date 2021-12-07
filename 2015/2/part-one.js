const input = require('./input');

let input_areas =  input.map(box => {
    let [s1, s2, s3] = box.split('x').map(n => +n);

    let a = s1 * s2;
    let b = s1 * s3;
    let c = s2 * s3;

    let min_side = Math.min(a, b, c);

    return (a * 2) + (b * 2) + (c * 2) + min_side;
});

let total_square_feet = input_areas.reduce((a, b) => a + b, 0);

console.log(`Elves will need to order ${total_square_feet} square feet of wrapping paper`);