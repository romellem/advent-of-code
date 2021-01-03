const { lcm } = require('./math-util');

function findEarliestBus(earliest_departure, bus_schedule) {
	let buses_in_service = bus_schedule.filter((bus) => bus !== 'x');
	let departure_time = earliest_departure;
	while (true) {
		for (let bus_in_service of buses_in_service) {
			const bus_has_arrived = departure_time % bus_in_service === 0;
			if (bus_has_arrived) {
				return {
					bus: bus_in_service,
					departure_time,
				};
			}
		}

		departure_time++;
	}
}

function findWhenBusesAlign(bus_schedule) {
	// Remove `x` buses from input but keep the index stored with the buses with set IDs.
	let filtered_bus_schedule = bus_schedule
		.map((id, i) => ({ id, i }))
		.filter((obj) => obj.id !== 'x');

	// Set the first valid timestamp as one period after time zero.
	let first_bus = filtered_bus_schedule.shift();
	let timestamp = first_bus.id;

	// Also initialize the first period to this same ID value, that is, the first bus's period.
	let period = first_bus.id;

	// Loop through the remaining buses
	for (let { id, i } of filtered_bus_schedule) {
		/**
		 * While the current timestamp plus its offset does not evenly divide the current ID,
		 * increment the timestamp by our period, because we _have_ to keep the alignment
		 * of whatever we have locked in so far.
		 */
		while ((timestamp + i) % id !== 0) {
			timestamp += period;
		}

		/**
		 * As soon as we have an timestamp where things are aligned, set the period
		 * equal to the least common multiple between the current period
		 * and the current ID so that our previous work stays aligned with each iteration.
		 *
		 * @note Looking at our input, all the numbers are prime, so the LCM will
		 *       always be `period * id`, but this makes it a bit more general.
		 */
		period = lcm(period, id);
	}

	return timestamp;
}

module.exports = {
	findEarliestBus,
	findWhenBusesAlign,
};
