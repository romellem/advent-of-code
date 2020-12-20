const { input } = require('./input');

function say(nth) {
	/**
	 * The number said will never be larger than the turn we are on.
	 * So, initialize an array of that size. This is faster than
	 * pushing new items onto an array, which constantly has to be
	 * resized.
	 *
	 * This one optimization makes the execution time for part two
	 * go from 3 minutes to 1.2 seconds.
	 */
	const said = Array(nth);

	// Initialize the input, *except* for the last num
	for (let i = 0; i < input.length - 1; i++) {
		let num = input[i];
		said[num] = i + 1;
	}

	// Set the next number said to the last number in our input
	let current_spoken = input[input.length - 1];

	for (let turn = input.length; turn < nth; turn++) {
		// If that was the first time the number has been spoken
		if (!said[current_spoken]) {
			// Record the turn that we spoke the number
			said[current_spoken] = turn;

			// And the current player says 0.
			current_spoken = 0;
		} else {
			/**
			 * Otherwise, the number had been spoken before;
			 * the current player announces how many turns apart the number is
			 * from when it was previously spoken.
			 */

			// Get the last time it was spoken
			let last_turn_was_spoken = said[current_spoken];

			// Update the last time it is spoken (aka, now)
			said[current_spoken] = turn;

			// Calculate the next number based on the difference between these two
			current_spoken = turn - last_turn_was_spoken;
		}
	}

	return current_spoken;
}

module.exports = { say };
