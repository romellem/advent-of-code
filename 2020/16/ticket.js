/**
 * @param {Array<Object>} rules
 * @param {Array<Number>} ticket
 * @returns {Number|undefined} - Returns the invalid field or `undefined` if the ticket is valid
 */
function getInvalidValueFromTicket(rules, ticket) {
	for (let field of ticket) {
		let field_is_valid = false;
		for (let { ranges } of rules) {
			const field_is_validated_from_rule = ranges.some(
				([low, high]) => field >= low && field <= high
			);
			if (field_is_validated_from_rule) {
				field_is_valid = true;
				break;
			}
		}

		if (!field_is_valid) {
			// Assumes each ticket only contains at most 1 invalid fields (it does)
			return field;
		}
	}

	// If we are here, the ticket is valid
	return undefined;
}

/**
 * @param {Array<Object>} rules
 * @param {Array<Array<Number>>} tickets
 * @returns {Array<Number>} - Returns an array of the invalid fields from the tickets
 */
function getInvalidValues(rules, tickets) {
	let invalid_values = [];
	for (let ticket of tickets) {
		let invalid_value = getInvalidValueFromTicket(rules, ticket);
		if (invalid_value !== undefined) {
			invalid_values.push(invalid_value);
		}
	}

	return invalid_values;
}

module.exports = {
	getInvalidValueFromTicket,
	getInvalidValues,
};
