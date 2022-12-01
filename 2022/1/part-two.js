const { input } = require('./input');

const sumsSorted = input
	.map((elf) => {
		return elf
			.split('\n')
			.map((item) => parseInt(item, 10))
			.reduce((sum, v) => sum + v, 0);
	})
	.sort((a, z) => z - a);

console.log(sumsSorted.slice(0, 3).reduce((sum, v) => sum + v, 0));
