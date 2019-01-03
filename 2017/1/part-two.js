const input = require('./input');
// const input = '1212'.split(''); // 6
// const input = '1221'.split(''); // 0
// const input = '123425'.split(''); // 4
// const input = '123123'.split(''); // 12
// const input = '12131415'.split(''); // 4

let filtered_list = input.filter((v, i) => {
    let index = (i + input.length / 2) % input.length;
    let right = input[index];

    return v === right;
});

var sum = filtered_list.map(n => +n).reduce((a, b) => a + b, 0);
console.log(sum);
