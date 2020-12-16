const { intersectionBy } = require('lodash');

/**
 * @typedef {Number} Field
 */

/**
 * @typedef {Array<Field>} Ticket
 */

/**
 * @typedef {Array<Number>} Range
 */

/**
 * @typedef {Object} Rule
 * @property {String} name
 * @property {Array<Range>} ranges
 */

/**
 * @param {Array<Rule>} rules
 * @param {Array<Ticket>} valid_tickets
 * @returns {Array<Rule>} Returns an ordered array of rules, where the rule position matches up to the field within a given ticket.
 */
function determineOrderingOfTicketFields(rules, valid_tickets) {
	// At first, say that each field could match any of the rules
	let field_possibilities = valid_tickets[0].map((_) => rules);
	let known_rules = {};

	while (field_possibilities.some((possibility) => possibility.length > 1)) {
		field_possibilities = field_possibilities.map((possible_rules, field_index) => {
			if (possible_rules.length === 1) {
				// Don't bother filtering if we've already determined what this field is
				return possible_rules;
			}

			/** @type {Array<Array<Rule>>} */
			let rules_that_may_apply_to_field = valid_tickets.map((ticket) => {
				let field = ticket[field_index];
				let narrowed_down_rules_for_field = possible_rules.filter(
					(rule) => !known_rules[rule.name] && fieldFallsWithinRanges(field, rule.ranges)
				);

				return narrowed_down_rules_for_field;
			});

			/**
			 * Take all the rules that may apply to a specific field
			 * across our tickets, and see where they intersect. This gives
			 * us a final count of what rules may apply to this field.
			 *
			 * For example, if I have
			 *
			 *     [
			 *       [{ name: 'a'}, { name: 'b'}, { name: 'c'}],
			 *       [{ name: 'a'}, { name: 'c'}],
			 *       [{ name: 'a'}, { name: 'b'}],
			 *     ]
			 *
			 * Then the common rule that applies across all these tickets
			 * is rule 'a', so that is the rule for this field.
			 *
			 * @see https://lodash.com/docs/4.17.15#intersectionBy
			 * @type {Array<Array<Rule>>}
			 */
			let itersected_rules = intersectionBy(...rules_that_may_apply_to_field, 'name');
			if (itersected_rules.length === 1) {
				// Once we have a known field, record it so we know to filter it out later
				known_rules[itersected_rules[0].name] = { field_index };
			}
			return itersected_rules;
		});
	}

	/** @type {Array<Rule>} */
	return field_possibilities.flat();
}

/**
 * @param {Field} field
 * @param {Array<Range>} ranges
 * @returns {Boolean}
 */
function fieldFallsWithinRanges(field, ranges) {
	return ranges.some(([low, high]) => field >= low && field <= high);
}

/**
 * @param {Array<Rule>} rules
 * @param {Ticket} ticket
 * @returns {Number|undefined} - Returns the invalid field or `undefined` if the ticket is valid
 */
function getInvalidValueFromTicket(rules, ticket) {
	for (let field of ticket) {
		let field_is_valid = false;
		for (let { ranges } of rules) {
			if (fieldFallsWithinRanges(field, ranges)) {
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
 * @param {Array<Rule>} rules
 * @param {Array<Ticket>} tickets
 * @returns {Array<Field>} - Returns an array of the invalid fields from the tickets
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
	determineOrderingOfTicketFields,
};
