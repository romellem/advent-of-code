const path = require('path');
const fs = require('fs');

const [time_str, distance_str] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

const time = time_str
	.slice('Time: '.length)
	.trim()
	.split(/\s+/)
	.map((v) => parseInt(v, 10));

const distance = distance_str
	.slice('Distance: '.length)
	.trim()
	.split(/\s+/)
	.map((v) => parseInt(v, 10));

// Zip up time and distance
/** @type Array<[number, number]> */
const input = time.map((t, i) => [t, distance[i]]);

module.exports = {
	input,
};
