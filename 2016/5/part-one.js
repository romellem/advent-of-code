const input = require('./input');
const md5 = require('./md5');

let code = '';
let iter = 0;
while (code.length < 8) {
    let hash = md5(`${input}${iter++}`);
    if (hash.indexOf('00000') === 0) {
        // Add the 6th character to our code
        code += hash[5];

        process.stdout.write(code.length.toString() + '... ');
    }
}

console.log('DONE\n');
console.log(code);
