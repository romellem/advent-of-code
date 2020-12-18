const ADD = '+';
const MULTIPLY = '*';
const OPEN_PAREN = '(';
const CLOSE_PAREN = ')';

const OPERATORS = {
	[ADD]: (a, b) => a + b,
	[MULTIPLY]: (a, b) => a * b,
};

// Poor man's "replaceAll"
const replaceAll = (str, searchFor, replaceWith) => str.split(searchFor).join(replaceWith);

function calculate(input, operator_precedence = []) {
	input = input.trim();

	/**
	 * Add spaces between every token so I can parse more easily.
	 * Takes advantage of the fact that digits and operators already
	 * have spaces between then, and parens _never_ have spaces in
	 * its original input.
	 */
	input = replaceAll(input, OPEN_PAREN, OPEN_PAREN + ' ');
	input = replaceAll(input, CLOSE_PAREN, ' ' + CLOSE_PAREN);

	// Parse numbers, leave all other tokens as strings
	let tokens = input.split(' ').map((v) => (/\d+/.test(v) ? parseInt(v, 10) : v));

	// Resolve all parens first
	while (tokens.includes(CLOSE_PAREN)) {
		let close_paren = tokens.indexOf(CLOSE_PAREN);
		let open_paren = indexOfFrom(OPEN_PAREN, tokens, close_paren);

		// Slices `['(', 4, '+', 5, ')']` to `[4, '+', 5]`
		let slice = tokens.slice(open_paren + 1, close_paren);
		const slice_length = slice.length;

		let total = reduce(slice, operator_precedence);

		// `+ 2` for the parens
		tokens.splice(open_paren, slice_length + 2, total);
	}

	let total = reduce(tokens, operator_precedence);
	return total;
}

function indexOfFrom(char, arr, from) {
	for (let i = from; i >= 0; i--) {
		if (arr[i] === char) return i;
	}

	return -1;
}

function reduce(_tokens, operator_precedence = []) {
	let tokens = _tokens.slice(0);

	// If the operators have a specific precedence
	if (operator_precedence.length) {
		for (let current_operator of operator_precedence) {
			while (tokens.includes(current_operator)) {
				let operator_index = tokens.indexOf(current_operator);
				let result = OPERATORS[current_operator](
					tokens[operator_index - 1],
					tokens[operator_index + 1]
				);
				tokens.splice(operator_index - 1, 3, result);
			}
		}

		return tokens[0];
	} else {
		// Just accumulate the totals across
		let acc = tokens[0];
		for (let i = 1; i < tokens.length; i += 2) {
			let operator = tokens[i];
			let digit = tokens[i + 1];

			acc = OPERATORS[operator](acc, digit);
		}

		return acc;
	}
}

module.exports = {
	calculate,
	ADD,
	MULTIPLY,
};
