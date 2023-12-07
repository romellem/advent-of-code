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
	.split(' ')
	.filter(Boolean)
	.map((v) => +v);

const distance = distance_str
	.slice('Distance: '.length)
	.trim()
	.split(' ')
	.filter(Boolean)
	.map((v) => +v);
const input = time.map((t, i) => [t, distance[i]]);

module.exports = {
	input,
};
