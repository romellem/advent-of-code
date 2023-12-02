const { input } = require('./input');

function parse(input) {
	// Game 70: 1 red, 19 green; 4 blue, 6 green; 12 green, 2 red
	return input.map((line) => {
		let [, id, rest] = /Game (\d+): (.+)$/.exec(line);
		let rounds = rest.split('; ');
		let cubesInEachRound = rounds.map((round) =>
			round.split(', ').map((pick) => {
				return pick
					.trim()
					.split(' ')
					.map((v, i) => (i === 0 ? +v : v));
			})
		);

		/*
			"cubesInEachRound": [
				[
					[8, "red"],
					[4, "blue"],
					[4, "green"]
				],
		*/
		return {
			id: +id,
			cubesInEachRound,
			maxCubes: cubesInEachRound.reduce(
				(acc, round) => {
					return round.reduce((acc2, [num, color]) => {
						acc2[color] = Math.max(acc2[color], num);
						return acc2;
					}, acc);
				},
				{ blue: 0, red: 0, green: 0 }
			),
		};
	});
}

// parse(input)

console.log(JSON.stringify(parse(input)));
