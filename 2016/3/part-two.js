const input = require('./input');

// Data is in a column, so loop through and create a new list
let column_input = [];
for (let i = 0; i < input.length / 3; i++) {
    let index = i * 3;
    column_input.push([input[index][0], input[index + 1][0], input[index + 2][0]]);
    column_input.push([input[index][1], input[index + 1][1], input[index + 2][1]]);
    column_input.push([input[index][2], input[index + 1][2], input[index + 2][2]]);
}

const isValidTriangle = tri => {
    let triangle = tri.slice(0);
    triangle.sort((a, b) => a - b);

    let [a, b, c] = triangle;
    return a + b > c;
};

let possible_trianlges = column_input
    .map(t => (isValidTriangle(t) ? 1 : 0))
    .reduce((a, b) => a + b, 0);
console.log(possible_trianlges);
