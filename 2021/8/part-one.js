const { input } = require('./input');

let count = 0;
for (let { outputs } of input) {
	for (let signal of outputs) {
		const number_of_segments = signal.length;
		if (number_of_segments === 2) {
			// |
			// '
			count++;
		} else if (number_of_segments === 4) {
			// '_|
			//   '
			count++;
		} else if (number_of_segments === 3) {
			// _
			//  |
			//  '
			count++;
		} else if (number_of_segments === 7) {
			//  _
			// '_'
			// '_'
			count++;
		}
	}
}

console.log(count);
