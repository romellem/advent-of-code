const { input } = require("./input");

let fishes = [...input];

for (let i = 0; i < 80; i++) {
	let new_fishes = [];
	for (let f = 0; f < fishes.length; f++) {
		fishes[f]--;
		if (fishes[f] < 0) {
			new_fishes.push(8);
			fishes[f] = 6;
		}
	}

	fishes.push(...new_fishes);
}

console.log(fishes.length);
