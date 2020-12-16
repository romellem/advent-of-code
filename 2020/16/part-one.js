const { rules, your_ticket, nearby_tickets } = require('./input');

function getInvalidValueFromTicket(rules, ticket) {
	let invalid = [];
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
			invalid.push(field);
		}
	}

	if (!invalid.length) {
		return;
	} else if (invalid.length === 1) {
		return invalid[0];
	} else {
		return invalid;
	}
}
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

let invalid_values_sum = getInvalidValues(rules, nearby_tickets).reduce((a, b) => a + b, 0);
console.log(invalid_values_sum);
