const open_chars = new Set(['(', '[', '{', '<']);
const closed_chars = new Set([')', ']', '}', '>']);

const score = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
};

const chars = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
};

const getLineStatus = (_line) => {
	const line = [..._line];
	const stack = [line.shift()];

	while (line.length > 0) {
		const next_char = line.shift();
		const head = stack[stack.length - 1];

		// `if (chars['{'] === '}')`
		if (chars[head] === next_char) {
			stack.pop();
		} else if (open_chars.has(next_char)) {
			stack.push(next_char);
		} else {
			// A closing char that doesn't match
			return {
				error: true,
				code: `Expected ${chars[head]}, but found ${next_char} instead.`,
				char: next_char,
			};
		}
	}

	if (stack.length > 0) {
		return {
			incomplete: true,
			stack,
		};
	}

	return {
		complete: true,
	};
};

module.exports = {
	getLineStatus,
	score,
};
