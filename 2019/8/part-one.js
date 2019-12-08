const { input } = require('./input');

const width = 25;
const height = 6;

const partOne = input_arr => {
	let layers = [];
	const size = width * height;
	for (let i = 0; i < input_arr.length / size; i++) {
		layers.push(input_arr.slice(i * size, (i + 1) * size));
	}

	let layers_count = [];
	for (let layer of layers) {
		let layer_count = layer.reduce((obj, num) => {
			if (!obj[num]) {
				obj[num] = 0;
			}

			obj[num]++;

			return obj;
		}, {});

		layers_count.push(layer_count);
	}

	let layer_zeros_sorted = layers_count.sort((a, b) => {
		if (a[0] < b[0]) return -1;
		else if (a[0] > b[0]) return 1;
		else return 0;
	});

	let least_zeroes = layer_zeros_sorted[0];
	let ones_times_twos = least_zeroes[1] * least_zeroes[2];

	return ones_times_twos;
};

console.log(partOne(input));
