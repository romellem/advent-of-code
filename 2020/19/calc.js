/*
# Take string input coming from a calculator and output the right value
# Start with just + or -

# Input  -> '5 + 6 - 3 + 10'
# Output -> 18

# More Inputs

# Input -> '5+6  -3 +10'
# Output -> 18
*/

const OPERATORS = {
	'+': (a, b) => {
		return a + b;
	},
	'*': (a, b) => {
		return a * b;
	},
};

/**
 * Limitations:
 * - No decimal number support
 * - No separators (e.g. commas) in numbers
 * - No negative numbres (e.g. `5 + -1`)
 * - Operator precedence wouldn't work
 * @param {String} input
 * @returns {Number}
 */
function calculate(input) {
	input = input.trim();
	if (!input) {
		return;
	}

	input = input.split('(').join('( ');
	input = input.split(')').join(' )');

	let tokens = input.split(' ').map(v => /\d+/.test(v) ? parseInt(v, 10) : v);

	while (tokens.includes(')')) {
		let close_paren = tokens.indexOf(')');
		let open_paren = indexOfFrom('(', tokens, close_paren);
		let slice = tokens.slice(open_paren + 1, close_paren);
		let total = reduce(slice);
		tokens.splice(open_paren, slice.length + 2, total)
	}

	let total = reduce(tokens);
	return total;


}

function indexOfFrom(char, arr, from) {
	for (let i = from; i >= 0; i--) {
		if (arr[i] === char) return i;
	}
}

function reduce(tokens) {
	let acc = tokens[0];
	for (let i = 1; i < tokens.length; i += 2) {
		let operator = tokens[i];
		let digit = tokens[i + 1];
		if (!OPERATORS[operator]) {
			throw new Error(`Unknown operator: ${operator}`);
		}
		acc = OPERATORS[operator](acc, digit);
	}

	return acc;
}

module.exports = {
	calculate,
}