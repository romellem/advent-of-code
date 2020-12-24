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
		let a = line.split('se').join(',se,');
		a = a.split('sw').join(',sw,');
		a = a.split('nw').join(',nw,');
		a = a.split('ne').join(',ne,');

		let paths = a.split(',').filter((v) => v);

		paths = paths
			.map((p) => {
				if (!dirs[p]) {
					// Has to be `ee`+ or `ww`+
					return p.split('');
				} else {
					return p;
				}
			})
			.flat();

		return paths;
	});

module.exports = {
	input,
};
