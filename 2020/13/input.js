const path = require('path');
const fs = require('fs');

const [earliest_departure_str, bus_ids_str] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

const earliest_departure = parseInt(earliest_departure_str, 10);
const bus_ids = bus_ids_str.split(',').map((v) => (/\d+/.test(v) ? parseInt(v) : v));

module.exports = {
	input: { earliest_departure, bus_ids },
};
