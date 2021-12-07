const path = require("path");
const fs = require("fs");

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.toString()
	.trim()
	.split("\n")
	.map((line) => {
		// e.g. 'George would lose 52 happiness units by sitting next to Carol.'
		let [, person, gainOrLose, happinessChange, sittingNextTo] =
			/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/.exec(line);
		happinessChange = parseInt(happinessChange, 10);
		happinessChange = gainOrLose === "gain" ? +happinessChange : -happinessChange;

		return {
			person,
			happinessChange,
			sittingNextTo,
		};
	});

module.exports = input;
