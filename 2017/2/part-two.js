const input = require('./input');

const checksum = input
    .map(row => {
        for (let i = 0; i < row.length - 1; i++) {
            let a = row[i];
            for (let j = i + 1; j < row.length; j++) {
                let b = row[j];
                let max = Math.max(a, b);
                let min = Math.min(a, b);

                if (max % min === 0) {
                    // Found the pair that even divdes each other!
                    return max / min;
                }
            }
        }

        // If we are here, something wrong happened. Throw an error
        console.error(row);
        throw 'Error, could not find two number in row above then evenly divide each other';
    })
    .reduce((a, b) => a + b, 0);

console.log(checksum);
