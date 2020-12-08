class Luggage {
	constructor(raw_rules) {
		this.bags_lookup = this.parseToBagsLookup(raw_rules);
		this.rules = this.parseToRulesLookup(raw_rules);
	}

	parseToBagsLookup(raw_rules) {
		let bags_lookup = {};
		for (let rule of raw_rules) {
			let [parent, children] = rule.split(' bags contain ');
			if (!bags_lookup[parent]) {
				bags_lookup[parent] = new Bag({ name: parent });
			}
			if (children.includes('no other')) {
				continue;
			}
			children = children.split(', ');
			for (let child of children) {
				let [, count, name] = /(\d+) (\w+ \w+) bag/.exec(child);
				count = parseInt(count, 10);
				let bag = bags_lookup[name];
				if (!bag) {
					bag = new Bag({ name });
					bags_lookup[name] = bag;
				}
				bag.addParent(bags_lookup[parent]);
			}
		}

		return bags_lookup;
	}

	parseToRulesLookup(raw_rules) {
		let bags_lookup = {};
		for (let rule of raw_rules) {
			let [parent, children] = rule.split(' bags contain ');
			if (!bags_lookup[parent]) {
				bags_lookup[parent] = [];
			}
			if (children.includes('no other')) {
				continue;
			}
			children = children.split(', ');
			for (let child of children) {
				let [, count, name] = /(\d+) (\w+ \w+) bag/.exec(child);
				count = parseInt(count, 10);
				bags_lookup[parent].push(new Bag({ name, count }));
			}
		}

		return bags_lookup;
	}

	countChildrenInside(bag_name) {
		if (!this.rules[bag_name]) {
			throw new Error(`Invalid bag name: "${bag_name}"`);
		}

		let rules = this.rules[bag_name];

		// Early escape, technically isn't necessary but provides base-case clarity on the recursion
		if (!rules.length) {
			return 0;
		}

		let children_count = 0;
		for (let bag of rules) {
			let { name, count } = bag;
			// Add the one bag we are looking at now
			children_count += count;

			// Plus its children (will be 0 if the child contains no bags itself)
			children_count += count * this.countChildrenInside(name);
		}

		return children_count;
	}
}

class Bag {
	constructor({ name, count }) {
		this.name = name;
		this.count = count;
		this.parent_bags = [];
	}

	addParent(parent_bag) {
		this.parent_bags.push(parent_bag);
	}

	countUniqueParents() {
		let lookup = this._getUniqueAncestorsLookup({});
		return Object.keys(lookup).length;
	}

	_getUniqueAncestorsLookup(lookup) {
		for (let parent of this.parent_bags) {
			lookup[parent.name] = parent;
			if (parent.parent_bags.length) {
				parent._getUniqueAncestorsLookup(lookup);
			}
		}

		return lookup;
	}
}

module.exports = {
	Luggage,
	Bag,
};
