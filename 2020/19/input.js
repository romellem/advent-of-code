const path = require('path');
const fs = require('fs');

function tokenizeRule(rule) {
	// @example '53: 86 6 | 52 134' -> parts: ['(', 86, 6, '|', 52, 134, ')']
	// @example '0: 8 11' -> parts: ['(', 8, 11, ')']
	// @example '86: "a"' parts: 'a'
	let [id, parts] = rule.split(': ');
	id = parseInt(id, 10);

	if (parts.includes('"')) {
		// parts === '"b"'
		parts = parts[1];
	} else {
		parts = ['(?:', ...parts.split(' ').map((v) => (/\d+/.test(v) ? parseInt(v, 10) : v)), ')'];
	}

	return {
		id,
		parts,
	};
}

function splitUpChunks(str) {
	return str
		.toString()
		.trim()
		.split('\n\n')
		.map((chunk) => chunk.split('\n'));
}

const [rules_raw, codes_raw] = splitUpChunks(
	fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
);

/**
 * @example rules = { 0: { id, parts }, 1: ... }
 */
const rules = rules_raw
	.map((r) => tokenizeRule(r))
	.reduce((obj, rule) => ((obj[rule.id] = rule), obj), {});
const codes = codes_raw;

const [sample_rules_raw, sample_codes_raw] = splitUpChunks(`0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"`);

module.exports = {
	input: { rules, codes },
	sampleInput: {
		rules: sample_rules_raw
			.map((r) => tokenizeRule(r))
			.reduce((obj, rule) => ((obj[rule.id] = rule), obj), {}),
		codes: sample_codes_raw,
	},
};
