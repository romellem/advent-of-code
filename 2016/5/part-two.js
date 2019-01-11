const input = require('./input');
const md5 = require('./md5');

let code = Array(8).fill('');
let finds = 0;
let iter = 0;
while (finds < 8) {
    let hash = md5(`${input}${iter++}`);
    if (hash.indexOf('00000') === 0 && /[0-7]/.test(hash[5])) {
        let index = parseInt(hash[5]);

        if (!code[index]) {
            // Add the 7th character to our code in the 6th position
            code[index] = hash[6];

            finds = code.filter(v => v).length;

            process.stdout.write(code.length.toString() + '... ');
        }
    }
}

console.log('DONE\n');
console.log(code.join(''));
