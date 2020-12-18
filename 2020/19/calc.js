const OPERATORS = {
	'+': (a, b) => {
		return a + b;
	},
	'*': (a, b) => {
		return a * b;
	},
};

function calculate(input) {
	input = input.trim();
	if (!input) {
		return;
	}

	input = input.split('(').join('( ');
	input = input.split(')').join(' )');

	let tokens = input.split(' ').map((v) => (/\d+/.test(v) ? parseInt(v, 10) : v));

	while (tokens.includes(')')) {
		let close_paren = tokens.indexOf(')');
		let open_paren = indexOfFrom('(', tokens, close_paren);
		let slice = tokens.slice(open_paren + 1, close_paren);
		let total = reduce(slice);
		tokens.splice(open_paren, slice.length + 2, total);
	}

	let total = reduce(tokens);
	return total;
}

function calculate2(input) {
	input = input.trim();
	if (!input) {
		return;
	}

	input = input.split('(').join('( ');
	input = input.split(')').join(' )');

	let tokens = input.split(' ').map((v) => (/\d+/.test(v) ? parseInt(v, 10) : v));

	while (tokens.includes(')')) {
		let close_paren = tokens.indexOf(')');
		let open_paren = indexOfFrom('(', tokens, close_paren);
		let slice = tokens.slice(open_paren + 1, close_paren);
		const orig_length = slice.length;

		while (slice.includes('+')) {
			let plus = slice.indexOf('+');
			let sum = slice[plus - 1] + slice[plus + 1];
			slice.splice(plus - 1, 3, sum);
		}

		let total = reduce(slice);
		tokens.splice(open_paren, orig_length + 2, total);
	}

	while (tokens.includes('+')) {
		let plus = tokens.indexOf('+');
		let sum = tokens[plus - 1] + tokens[plus + 1];
		tokens.splice(plus - 1, 3, sum);
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
	calculate2,
};
