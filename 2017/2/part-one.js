const input = require('./input');

const checksum = input
    .map(row => {
        let max = Math.max(...row);
        let min = Math.min(...row);

        return max - min;
    })
    .reduce((a, b) => a + b, 0);

console.log(checksum);
