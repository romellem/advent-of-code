const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.map((tile) => {
		let lines = tile.split('\n');
		let id_raw = lines.shift();

		// Tile 3457:
		let [, id] = /Tile (\d+):/.exec(id_raw);
		id = parseInt(id, 10);
		let piece = lines.join('\n');
		return { id, piece };
	});

module.exports = {
	input,
};
