const input = require('./input');

let input_areas = input.map(box => {
    let [s1, s2, s3] = box.split('x').map(n => +n);

    let p1 = s1 + s2 + s1 + s2;
    let p2 = s1 + s3 + s1 + s3;
    let p3 = s2 + s3 + s2 + s3;

    let min_perimeter = Math.min.apply(null, [p1, p2, p3]);

    let volume = s1 * s2 * s3;

    return min_perimeter + volume;
});

let total_feet = input_areas.reduce((a, b) => a + b, 0);

console.log(`Elves will need to order ${total_feet} feet of ribbon`);
