const path = require('path');
const fs = require('fs');

const dirs = {
	nw: 1,
	ne: 1,
	sw: 1,
	se: 1,
	e: 1,
	w: 1,
};

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// This is an easy way to parse out the "ne" and "se" from the "e", and similar for "w"
		let route_str = line
			.replace(/se/g, ',se,')
			.replace(/sw/g, ',sw,')
			.replace(/nw/g, ',nw,')
			.replace(/ne/g, ',ne,');

		let route = route_str
			.split(',')
			.filter((v) => v)
			.map((p) => {
				if (!dirs[p]) {
					// Has to be `/ee+/` or `/ww+/`
					return p.split('');
				} else {
					return p;
				}
			})
			.flat();

		return route;
	});

module.exports = {
	input,
};
