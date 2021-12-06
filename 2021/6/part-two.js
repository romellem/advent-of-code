const { input } = require("./input");

/**
 * Fish can only have an age of 0 - 8, so create an array of 9 items
 * and store the _count_ of all fish in that age.
 */
const days = Array(9).fill(0);
for (let day of input) {
	days[day]++;
}

for (let i = 0; i < 256; i++) {
	let six_fish = 0;
	let eight_fish = 0;
	for (let day = 0; day < days.length; day++) {
		let count = days[day];
		if (day === 0) {
			// Double the fish that are at age zero

			// The same fish loop back around to age 6
			six_fish = count;

			// The "spawned" fish get an age of 8
			eight_fish = count;
		} else {
			// Otherwise, "shift" each group of fish to the left (e.g. get 1 day younger)
			days[day - 1] = count;
		}
	}

	// After a complete day, add the "looped back" fish at age 6 to our array
	days[6] += six_fish;

	// Set the fish at age 8 to the number of fish that were spawned (don't add, because we don't "shift" in a 0 for day 8's slot)
	days[8] = eight_fish;
}

const all_fish = days.reduce((a, b) => a + b);
console.log(all_fish);
