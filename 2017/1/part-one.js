const input = require('./input');
// const input = '1111'.split('');
// const input = '1122'.split('');
// const input = '1234'.split('');
// const input = '91212129'.split('');

let filtered_list = input.filter((v, i) => {
    let right;

    if (i === input.length - 1) {
        right = input[0];
    } else {
        right = input[i + 1];
    }

    return v === right;
});

var sum = filtered_list.map(n => +n).reduce((a, b) => a + b, 0);
console.log(sum);
