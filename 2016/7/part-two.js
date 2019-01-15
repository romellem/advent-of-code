const assert = require('assert');
const { input } = require('./input');
const { supportSSL } = require('./supports-protocols');

// assert.strictEqual(supportSSL('aba[bab]xyz'), true);
// assert.strictEqual(supportSSL('xyx[xyx]xyx'), false);
// assert.strictEqual(supportSSL('aaa[kek]eke'), true);
assert.strictEqual(supportSSL('zazbz[bzb]cdb'), true);

// let num_valid_ips = input.map(ip => (supportSSL(ip) ? 1 : 0)).reduce((a, b) => a + b);
// console.log(num_valid_ips);
