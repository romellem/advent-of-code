const _ = require('lodash');
const { input } = require('./input');
input.sort((a, b) => a - b);
const adapters = [0, ...input, _.last(input) + 3];

let gaps = _.chain(adapters)
	.map((v, i) => (i === adapters.length - 1 ? 0 : adapters[i + 1] - v))
	.groupBy()
	.value();
const ones = gaps['1'].length;
const threes = gaps['3'].length;

console.log(ones * threes);
