const crypto = require('crypto');
const key = require('./input');

let hash;
let string_to_hash;

let i = -1;
do {
    i++;
    string_to_hash = `${key}${i}`;
    hash = crypto.createHash('md5').update(string_to_hash).digest('hex');
} while (hash.substr(0, 5) !== '00000');

console.log(`MD5 of "${string_to_hash}" is ${hash}`)
console.log(`Answer is \n${i}`);
