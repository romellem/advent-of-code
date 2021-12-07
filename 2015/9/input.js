const path = require("path");
const fs = require("fs");

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.toString()
	.trim()
	.split("\n")
	.map((line) => {
		// @example Tristram to Norrath = 111
		let [, from, to, distance] = /^(\w+) to (\w+) = (\d+)$/.exec(line);
		distance = parseInt(distance, 10);
		return {
			from,
			to,
			distance,
		};
	});

const unique_cities_set = new Set();
const distances = {};
for (let { from, to, distance } of input) {
	unique_cities_set.add(from).add(to);

	// Each distance works from either direction
	distances[`${from}${to}`] = distance;
	distances[`${to}${from}`] = distance;
}

const unique_cities = [...unique_cities_set];

module.exports = {
	input,
	unique_cities,
	distances,
};
