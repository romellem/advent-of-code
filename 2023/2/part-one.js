const { input } = require('./input');

function parse(input) {
	// @example
	// Game 70: 1 red, 19 green; 4 blue, 6 green; 12 green, 2 red
	return input.map((line) => {
		const [, id, rest] = /Game (\d+): (.+)$/.exec(line);

		// Rounds don't matter, take a list of all groups of cubes picked
		const picks = rest.split(/[;,] /);
		/** @type {Array<[number, string]>} */
		const cubesPicked = picks.map((pick) => {
			let num, color;
			try {
				[, num, color] = /(\d+) (\w+)/.exec(pick);
			} catch (e) {
				console.log(e);
				console.log({ pick, rest });
				console.log({ num, color });
				process.exit(1);
			}

			return [parseInt(num, 10), color];
		});

		return {
			id: parseInt(id, 10),
			maxCubes: cubesPicked.reduce(
				(acc, [num, color]) => {
					acc[color] = Math.max(acc[color], num);
					return acc;
				},
				{ blue: 0, red: 0, green: 0 }
			),
		};
	});
}

const games = parse(input);

let sum = 0;
for (let { id, maxCubes } of games) {
	if (maxCubes.red <= 12 && maxCubes.green <= 13 && maxCubes.blue <= 14) {
		sum += id;
	}
}

console.log(sum);
