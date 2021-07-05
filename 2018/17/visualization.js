const { input, trimInputGrid, gridToString } = require('./input.js');
const Jimp = require('jimp');
const fs = require('fs');

const grid = trimInputGrid(input);

const BLACK = Jimp.cssColorToHex('#000000');

const newImage = (width, height, initial_color = '#FFFFFF') => {
	return new Promise((resolve, reject) => {
		new Jimp(width, height, initial_color, (err, image) => {
			if (err) {
				reject(err);
			} else {
				resolve(image);
			}
		});
	});
};

(async () => {
	const image = await newImage(grid[0].length, grid.length, '#FFFFFF');
	for (let y = 0; y < grid.length; y++) {
		let row = grid[y];
		for (let x = 0; x < row.length; x++) {
			let cell = row[x];
			if (cell) {
				image.setPixelColor(BLACK, x, y);
			}
		}
	}

	await image.writeAsync('grid.png');

	const grid_str = gridToString(input);
	fs.writeFileSync('grid.txt', grid_str);
})();
