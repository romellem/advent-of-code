const input = require('./input');

const checksum = input
    .map(row => {
        let max = Math.max.apply(null, row);
        let min = Math.min.apply(null, row);

        return max - min;
    })
    .reduce((a, b) => a + b, 0);

console.log(checksum);
