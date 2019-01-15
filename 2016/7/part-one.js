const assert = require('assert');
const { input } = require('./input');
const { supportTLS } = require('./supports-protocols');

assert.strictEqual(supportTLS('abba[mnop]qrst'), true);
assert.strictEqual(supportTLS('abcd[bddb]xyyx'), false);
assert.strictEqual(supportTLS('aaaa[qwer]tyui'), false);
assert.strictEqual(supportTLS('ioxxoj[asdfgh]zxcvbn'), true);

let num_valid_ips = input.map(ip => (supportTLS(ip) ? 1 : 0)).reduce((a, b) => a + b);
console.log(num_valid_ips);
