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

function calculate(input, operator_precedence = { [ADD]: 1, [MULTIPLY]: 1 }) {
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
		let open_paren = tokens.lastIndexOf(OPEN_PAREN, close_paren);

		// Slices `['(', 4, '+', 5, ')']` to `[4, '+', 5]`
		let slice = tokens.slice(open_paren + 1, close_paren);
		const slice_length = slice.length;

		let total = reduce(slice, operator_precedence);

		// The `+ 2` is for the parens we removed in the slice
		tokens.splice(open_paren, slice_length + 2, total);
	}

	let total = reduce(tokens, operator_precedence);
	return total;
}

/**
 * A helper function to make entering an operator precedence easier from a
 * user perspective. Of course, with this puzzle, I could have forgone this
 * completely, but found is easy enough to code through. Memoized as well
 * to reduce computation time.
 *
 * @type {Function}
 * @example createIterablePrecedence({ '+': 1, '*': 1}) // returns [['+', '*']]
 * @example createIterablePrecedence({ '+': 1, '*': 2}) // returns [['+'], ['*']]
 * @example createIterablePrecedence({ '+': 1, '-': 1, '*': 2}) // returns [['+', '-'], ['*']]
 * @param {Object} map
 * @returns {Array<Array>}
 */
const createIterablePrecedence = (() => {
	let cache = {};
	return (map) => {
		let map_str = JSON.stringify(map);
		if (cache[map_str]) return cache[map_str];
		let reverse_lookup = {};

		let entries = Object.entries(map);
		for (let [operator, precedence] of entries) {
			if (!reverse_lookup[precedence]) {
				reverse_lookup[precedence] = [];
			}

			reverse_lookup[precedence].push(operator);
		}

		let reverse_lookup_values = [];
		for (let [index_raw, operators] of Object.entries(reverse_lookup)) {
			let index = parseInt(index_raw, 10) - 1;
			reverse_lookup_values[index] = operators;
		}

		cache[map_str] = reverse_lookup_values;

		return reverse_lookup_values;
	};
})();

/**
 * @example getMinIndexOf([1, '+', 2, '*' , 3], ...['+', '*']) // returns 1
 * @example getMinIndexOf([1, '*', 2, '+' , 3], ...['+', '*']) // returns 1
 * @param {Array} arr 
 * @param  {...Any} chars - Searches the Array for the smallest index of one of the chars passed
 * @returns {Number} - Returns the index of the first char found, or -1 if none of the chars are present in the array.
 */
function getMinIndexOf(arr, ...chars) {
	let min_index;
	for (let char of chars) {
		let index = arr.indexOf(char);
		if (index !== -1 && (min_index === undefined || index < min_index)) {
			min_index = index;
		}
	}

	return min_index === undefined ? -1 : min_index;
}

/**
 * @example arrayIncludesOneOf([1, 2, 3], 2, 3) // returns true
 * @example arrayIncludesOneOf([1, 2, 3], 3, 5) // returns true
 * @example arrayIncludesOneOf([1, 2, 3], 4, 5) // returns false
 * @param {Array} arr 
 * @param  {...any} items
 * @returns {Boolean}
 */
function arrayIncludesOneOf(arr, ...items) {
	for (let item of items) {
		if (arr.includes(item)) return true;
	}
	return false;
}

/**
 * @returns {Number}
 */
function reduce(_tokens, operator_precedence) {
	let iterable_precedence = createIterablePrecedence(operator_precedence);

	let tokens = _tokens.slice(0);

	for (let operators of iterable_precedence) {
		while (arrayIncludesOneOf(tokens, ...operators)) {
			let operator_index = getMinIndexOf(tokens, ...operators);
			let current_operator = tokens[operator_index];
			let result = OPERATORS[current_operator](
				tokens[operator_index - 1],
				tokens[operator_index + 1]
			);
			tokens.splice(operator_index - 1, 3, result);
		}
	}

	if (tokens.length > 1) {
		throw new Error(`Tokens were not correctly reduced: ${tokens}`);
	}

	return tokens[0];
}

module.exports = {
	calculate,
	ADD,
	MULTIPLY,
};
