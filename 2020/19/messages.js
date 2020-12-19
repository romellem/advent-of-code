function getRegexForId(id, rules) {
	let base_rules = Object.values(rules).filter(({ parts }) => typeof parts === 'string');
	let computed_rules = {};
	for (let { id, parts } of base_rules) {
		computed_rules[id] = parts;
	}

	let computed_rules_for_id = buildUpIdFromRules(id, rules, computed_rules);
	let regex_str = computed_rules_for_id.flat(Infinity).join('');

	return new RegExp(`^${regex_str}$`);
}

/*
	0: 4 1 5
	1: 2 3 | 3 2
	2: 4 4 | 5 5
	3: 4 5 | 5 4
	4: "a"
	5: "b"

	->

	0: ['(', 4, 1, 5, ')']
	1: ['(', 2, 3, '|', 3, 2, ')']
	2: ['(', 4, 4, '|', 5, 5, ')']
	3: ['(', 4, 5, '|', 5, 4, ')']
	4: "a"
	5: "b"

	0: ['(', 4, 1, 5, ')']
	0: ['(', "a", 1, 5, ')']
	0: ['(', "a", ['(', 2, 3, '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', 4, 4, '|', 5, 5, ')'], 3, '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", 4, '|', 5, 5, ')'], 3, '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', 5, 5, ')'], 3, '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", 5, ')'], 3, '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], 3, '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', 4, 5, '|', 5, 4, ')'], '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", 5, '|', 5, 4, ')'], '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', 5, 4, ')'], '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", 4, ')'], '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', 3, 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', 4, 5, '|', 5, 4, ')'], 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", 5, '|', 5, 4, ')'], 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', 5, 4, ')'], 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", 4, ')'], 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], 2, ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], ['(', 4, 4, '|', 5, 5, ')'], ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], ['(', "a", 4, '|', 5, 5, ')'], ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], ['(', "a", "a", '|', 5, 5, ')'], ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], ['(', "a", "a", '|', "b", 5, ')'], ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], ['(', "a", "a", '|', "b", "b", ')'], ')'], 5, ')']
	0: ['(', "a", ['(', ['(', "a", "a", '|', "b", "b", ')'], ['(', "a", "b", '|', "a", "b", ')'], '|', ['(', "a", "b", '|', "b", "a", ')'], ['(', "a", "a", '|', "b", "b", ')'], ')'], "b", ')']
*/
function buildUpIdFromRules(id, rules, computed_rules, depth = 0) {
	if (computed_rules[id]) {
		return computed_rules[id];
	}

	let { parts } = rules[id];
	let expanded_parts = parts
		.map((v) => {
			if (depth > 50) {
				// Bail on an arbitrarily large depth
				// This can probably be computed by the longest input code, but trial and error works well enough to determine the answer
				return undefined;
			} else if (typeof v === 'string') {
				return v;
			} else {
				return buildUpIdFromRules(v, rules, computed_rules, depth + 1);
			}
		})
		.filter((v) => v);
	computed_rules[id] = expanded_parts;

	return expanded_parts;
}

module.exports = {
	getRegexForId,
};
