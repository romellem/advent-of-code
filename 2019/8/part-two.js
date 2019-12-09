const { input } = require('./input');

const width = 25;
const height = 6;

let layers = [];
const size = width * height;
for (let i = 0; i < input.length / size; i++) {
	layers.push(input.slice(i * size, (i + 1) * size));
}

let image = layers[0];
for (let i = 1; i < layers.length; i++) {
	let layer = layers[i];
	for (let p = 0; p < layer.length; p++) {
		let top_p = image[p];
		let current_p = layer[p];

		// "0 is black, 1 is white, and 2 is transparent.""
		if (top_p === 2) {
			image[p] = current_p;
		}
	}
}

for (let y = 0; y < height; y++) {
	let line = '';
	for (let x = 0; x < width; x++) {
		let pixel = image[x + y * width];
		line += pixel === 0 ? ' ' : '#';
	}
	console.log(line);
}
