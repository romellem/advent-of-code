const path = require('path');
const fs = require('fs');

function tokenizeRule(rule) {
	// @example '53: 86 6 | 52 134' -> parts: [[86, 6], [52, 134]]
	// @example '0: 8 11' -> parts: [8, 1]
	// @example '86: "a"' parts: 'a'
	let [id, parts] = rule.split(': ');
	id = parseInt(id, 10);

	if (parts.includes('"')) {
		// parts === '"b"'
		parts = parts[1];
	} else {
		parts = parts.split(' | ').map((pieces) => pieces.split(' ').map((v) => parseInt(v, 10)));
	}

	return {
		id,
		parts,
	};
}

const [rules_raw, codes_raw] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.map((chunk) => chunk.split('\n'));

/**
 * @example rules = { 0: { id: 0, parts: [8, 11] }, 1: ... }
 */
const rules = rules_raw
	.map((r) => tokenizeRule(r))
	.reduce((obj, rule) => ((obj[rule.id] = rule), obj), {});
const codes = codes_raw;

module.exports = {
	rules,
	codes,
};
