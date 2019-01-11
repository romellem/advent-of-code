const input = require('./input');

const isValidTriangle = tri => {
    let triangle = tri.slice(0);
    triangle.sort((a, b) => a - b);

    let [a, b, c] = triangle;
    return a + b > c;
};

let possible_trianlges = input.map(t => (isValidTriangle(t) ? 1 : 0)).reduce((a, b) => a + b, 0);
console.log(possible_trianlges);
