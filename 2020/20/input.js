const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.map((tile) => {
		let lines = tile.split('\n');
		let id_raw = tile.shift();

		// Tile 3457:
		let [, id] = /Tile (\d+):/.exec(id_raw);
		let square = lines.map((row) => row.split(''));
		return { id, square };
	});

module.exports = {
	input,
};
