const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let a = line.split('se').join(',se,');
		a = line.split('sw').join(',sw,');
		a = line.split('nw').join(',nw,');
		a = line.split('ne').join(',ne,');
		// console.log(a);
		// process.exit()
		let paths = a.split(',').filter(v=>v);
		// console.log(paths);
		// process.exit()

		const dirs =  {
			'nw':1,
			'ne':1,
			'sw':1,
			'se':1,
			'e':1,
			'w':1,
		};
		paths = paths.map(p => {
			if (!dirs[p]) {
				return p.split('')
			} else {
				return p
			}
		}).flat();
		// console.log(paths);
		// process.exit()
		return paths
	});

module.exports = {
	input,
};
