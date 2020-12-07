const trimEnd = require('lodash/trimEnd');

class Luggage {
	constructor(raw_rules) {
		this.bags_lookup = this.parseToBagsLookup(raw_rules);
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
			children = trimEnd(children, '.').split(', ');
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
}

class Bag {
	constructor({ name }) {
		this.name = name;
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
