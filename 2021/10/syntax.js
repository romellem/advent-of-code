const open_chars = new Set(['(', '[', '{', '<']);
const closed_chars = new Set([')', ']', '}', '>']);

const CORRUPTED_SCORE = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
};

const INCOMPLETE_SCORE = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
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
	CORRUPTED_SCORE,
	INCOMPLETE_SCORE,
	open_chars,
	closed_chars,
	chars,
};
