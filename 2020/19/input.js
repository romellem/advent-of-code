const path = require('path');
const fs = require('fs');

function tokenizeRule(rule) {
	// @example '53: 86 6 | 52 134'
	// @example '0: 8 11'
	let [id, parts] = rule.split(': ');
	id = parseInt(id, 10);
	parts = parts
		.trim()
		.split(' ')
		.map((v) => (/\d+/.test(v) ? parseInt(v, 10) : v));

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

const rules = rules_raw.map((r) => tokenizeRule(r));
const codes = codes_raw;

module.exports = {
	rules,
	codes,
};
