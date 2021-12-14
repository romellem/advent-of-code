const path = require('path');
const fs = require('fs');

const [poly, raw_rules] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const rules = raw_rules.split('\n').map((rule) => {
	// FC -> F
	return ([from, to] = rule.split(' -> ').map((s) => s.trim()));
	return { from, to };
});

module.exports = {
	poly,
	rules,
};
