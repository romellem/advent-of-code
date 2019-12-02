const GENERATOR = 'G';
const MICROCHIP = 'C';
const G = require('generatorics');

class Floor {
	constructor(elements = []) {
		this.generators = [];
		this.microchips = [];
		elements.forEach(({ type, element }) => {
			if (type === GENERATOR) {
				this.generators.push(element);
			} else {
				// Chip
				this.microchips.push(element);
			}
		});
	}

	isValid() {
		const is_empty = !this.generators.length && !this.microchips.length;
		const only_gens = this.generators.length && !this.microchips.length;
		const only_chips = !this.generators.length && this.microchips.length;
		if (is_empty || only_gens || only_chips) {
			return true;
		}

		// Otherwise, check that the mix of chips and gens cancel each other out
		if (this.microchips.length > this.generators.length) {
			// If we have more chips than gens, it has to be invalid
			return false;
		}

		// We have an equal amount of chips, or maybe less, loop through chips and see if we have a matching gen
		for (let element of this.microchips) {
			if (!this.generators.includes(element)) {
				return false;
			}
		}

		// We looped through all chips, if we are here, they had a matching generator, return true
		return true;
	}

	toString() {
		return this.microchips.length + ',' + this.generators.length;
	}

	clone() {
		let new_floor = new Floor();
		new_floor.microchips = this.microchips.slice(0);
		new_floor.generators = this.generators.slice(0);

		return new_floor;
	}

	canMove(chips = 0, generators = 0) {
		return this.microchips.length >= chips && this.generators.length >= generators;
	}

	cloneAndRemove(chips = [], generators = []) {
		let new_floor = this.clone();

		if (chips.length) {
			new_floor.microchips = new_floor.microchips.filter(c => !chips.includes(c));
		}

		if (generators.length) {
			new_floor.generators = new_floor.generators.filter(g => !generators.includes(g));
		}

		return new_floor;
	}

	cloneAndAdd(chips = [], generators = []) {
		let new_floor = this.clone();

		if (chips.length) {
			new_floor.microchips.push(...chips);
		}

		if (generators.length) {
			new_floor.generators.push(...generators);
		}

		return new_floor;
	}
}

class ArrangementNode {
	constructor(elevator, floors, clone = true) {
		this.elevator = elevator;
		this.floors;

		if (clone) {
			this.floors = floors.map(f => f.clone());
		} else {
			this.floors = floors;
		}

		// 0-indexed
		this.MAX_FLOOR = this.floors.length - 1;

		this.str = `${this.elevator};${this.floors.map(f => f.toString()).join(',')}`;
	}

	/**
	 * Returns _valid_ neighbors, along with some optimizations:
	 *
	 * - If we can't move up or down, takes that into consideration.
	 * - If a move results in an invalid state (more chips than generators, if gens is non-zero), does not return that move.
	 * - If our elevator is at floor 2, and floor 1 is empty, does not move down. Similarly if at 3 and floors 2 and 1 are empty.
	 *
	 * Does _not_ take into account previously visted states.
	 */
	getNeighbors() {
		const valid_nodes = [];
		const current_floor = this.floors[this.elevator];

		let directions = [
			{
				direction: this.elevator + 1,
				canMove: this.elevator < this.MAX_FLOOR,
			},
			{
				direction: this.elevator - 1,
				canMove: this.elevator > 0 && this.hasItemsBeneathCurrentPosition(),
			},
		];

		for (let { direction, canMove } of directions) {
			if (canMove) {
				// Chip + Gen
				// @todo rewrite to the `continue` paradigm like the other move types
				if (current_floor.canMove(1, 1)) {
					// If moving both, we _have_ to move same element of the chip and generator
					// So, just loop through chips, find a matching generator (if it exists), and move
					let new_floor;
					let current_floor_removal;
					for (let chip of G.combination(current_floor.microchips, 1)) {
						if (chip.every(c => current_floor.generators.includes(c))) {
							// We have a matching generator, we can move it!

							// Microoptimization, reuse `chip` in place of `generators` array since we are moving the same element
							new_floor = this.floors[direction].cloneAndAdd(chip, chip);
							current_floor_removal = current_floor.cloneAndRemove(chip, chip);
						} else {
							new_floor = undefined;
							current_floor_removal = undefined;
						}

						if (new_floor && current_floor_removal) {
							let new_floors = [];
							for (let i = 0; i < this.floors.length; i++) {
								if (i === this.elevator) {
									new_floors.push(current_floor_removal);
								} else if (i === direction) {
									new_floors.push(new_floor);
								} else {
									new_floors.push(this.floors[i].clone());
								}
							}

							if (this.validateFloors(new_floors)) {
								valid_nodes.push(new ArrangementNode(direction, new_floors, false));
								break;
							}
						}
					}
				}

				// 1 Chip
				if (current_floor.canMove(1)) {
					for (let chip of G.combination(current_floor.microchips, 1)) {
						let new_floor = this.floors[direction].cloneAndAdd(chip);
						if (!new_floor.isValid()) {
							continue;
						}

						let current_floor_removal = current_floor.cloneAndRemove(chip);
						if (!current_floor_removal.isValid()) {
							continue;
						}

						// We we are here, both floors are valid
						let new_floors = [];
						for (let i = 0; i < this.floors.length; i++) {
							if (i === this.elevator) {
								new_floors.push(current_floor_removal);
							} else if (i === direction) {
								new_floors.push(new_floor);
							} else {
								new_floors.push(this.floors[i].clone());
							}
						}

						valid_nodes.push(new ArrangementNode(direction, new_floors, false));
						break;
					}
				}

				// 2 Chips
				if (current_floor.canMove(2)) {
					for (let chips of G.combination(current_floor.microchips, 2)) {
						let new_floor = this.floors[direction].cloneAndAdd(chips);
						if (!new_floor.isValid()) {
							continue;
						}

						let current_floor_removal = current_floor.cloneAndRemove(chips);
						if (!current_floor_removal.isValid()) {
							continue;
						}

						// We we are here, both floors are valid
						let new_floors = [];
						for (let i = 0; i < this.floors.length; i++) {
							if (i === this.elevator) {
								new_floors.push(current_floor_removal);
							} else if (i === direction) {
								new_floors.push(new_floor);
							} else {
								new_floors.push(this.floors[i].clone());
							}
						}

						valid_nodes.push(new ArrangementNode(direction, new_floors, false));
						break;
					}
				}

				// 1 Generator
				if (current_floor.canMove(0, 1)) {
					for (let gen of G.combination(current_floor.generators, 1)) {
						let new_floor = this.floors[direction].cloneAndAdd(undefined, gen);
						if (!new_floor.isValid()) {
							continue;
						}

						let current_floor_removal = current_floor.cloneAndRemove(undefined, gen);
						if (!current_floor_removal.isValid()) {
							continue;
						}

						// We we are here, both floors are valid
						let new_floors = [];
						for (let i = 0; i < this.floors.length; i++) {
							if (i === this.elevator) {
								new_floors.push(current_floor_removal);
							} else if (i === direction) {
								new_floors.push(new_floor);
							} else {
								new_floors.push(this.floors[i].clone());
							}
						}

						valid_nodes.push(new ArrangementNode(direction, new_floors, false));
						break;
					}
				}

				// 2 Generators
				if (current_floor.canMove(0, 2)) {
					for (let gens of G.combination(current_floor.generators, 2)) {
						let new_floor = this.floors[direction].cloneAndAdd(undefined, gens);
						if (!new_floor.isValid()) {
							continue;
						}

						let current_floor_removal = current_floor.cloneAndRemove(undefined, gens);
						if (!current_floor_removal.isValid()) {
							continue;
						}

						// We we are here, both floors are valid
						let new_floors = [];
						for (let i = 0; i < this.floors.length; i++) {
							if (i === this.elevator) {
								new_floors.push(current_floor_removal);
							} else if (i === direction) {
								new_floors.push(new_floor);
							} else {
								new_floors.push(this.floors[i].clone());
							}
						}

						valid_nodes.push(new ArrangementNode(direction, new_floors, false));
						break;
					}
				}
			}
		}

		return valid_nodes;
	}

	hasItemsBeneathCurrentPosition(current_position = this.elevator) {
		let total_items_beneath_current_position = 0;
		for (let i = 0; i < current_position; i++) {
			total_items_beneath_current_position +=
				this.floors[i].microchips.length + this.floors[i].generators.length;
		}

		return total_items_beneath_current_position > 0;
	}

	validateFloors(floors = this.floors) {
		for (let floor of floors) {
			if (!floor.isValid()) {
				return false;
			}
		}

		return true;
	}

	// @example "2;0,0,1,1,1,2,2,1"
	toString() {
		return this.str;
	}

	/**
	 * For debugging purposes.
	 *
	 * @example "2; |0,0| |1,1| |1,2| |2,1|"
	 */
	toLongString() {
		let floors_str = '';
		for (let floor of this.floors) {
			floors_str += '|' + floor.toString() + '| ';
		}

		// Trim trailing space
		let floors = floors_str.substring(0, floors_str.length - 1);
		return this.elevator + '; ' + floors;
	}

	// @example "3;0,0,0,0,0,0,3,3"
	calculateEndingFloorStateString() {
		let chips_gens_total = this.floors.reduce(
			(sum, floor) => [sum[0] + floor.microchips.length, sum[1] + floor.generators.length],
			[0, 0]
		);
		let floors_str = '';
		for (let i = 0; i < this.floors.length - 1; i++) {
			floors_str += '0,0,';
		}

		floors_str += chips_gens_total[0] + ',' + chips_gens_total[1];
		return floors_str;
	}
}

class RTGPath {
	constructor(starting_arrangement) {
		this.frontier = [];
		const { elevator, floors } = starting_arrangement;
		const start = new ArrangementNode(elevator, floors);
		this.frontier.push(start);

		// Calculate this so we know when we are at the end
		this.endingStateString = start.MAX_FLOOR + ';' + start.calculateEndingFloorStateString();

		// Keys are `ArrangementNode.toString()`, and value is `{ node, from, length }`, where
		// `node` is a reference to the ArrangementNode as indicated by the key,
		// `from` is the ArrangementNode we came from,
		// `length` is what step we are at.
		this.visted = {};
		this.visted[start.str] = { node: start, from: null, length: 0 };

		this.goal = this.searchToEnd();
	}

	searchToEnd() {
		while (this.frontier.length > 0) {
			const current_node = this.frontier.shift();
			const current_node_str = current_node.str;
			const current_node_length = this.visted[current_node_str].length;

			const neighbors = current_node.getNeighbors();
			for (let next_node of neighbors) {
				const next_node_str = next_node.str;
				if (!this.visted[next_node_str]) {
					this.frontier.push(next_node);
					this.visted[next_node_str] = {
						node: next_node,
						from: current_node,
						length: current_node_length + 1,
					};

					// If we have reached the end, exit our loop immediately. BFS guarantees we won't find a shorter route.
					if (next_node_str === this.endingStateString) {
						return this.visted[next_node_str];
					}
				}
			}
		}
	}

	getShortestLengthToFourthFloor() {
		return this.goal && this.goal.length;
	}

	getPathFromVistedNode(node) {
		let path = [];
		while (node) {
			path.push(node.node.toLongString());
			node = this.visted[node.from && node.from.str];
		}

		path.reverse();
		path = path.map((c, i) => (i < 10 ? ' ' : '') + i + ' - ' + c);

		return path.join('\n');
	}

	static parseInputStringToStartingArrangementObject(str = '') {
		str = String(str).trim();
		const lines = str.split('\n');
		const floors = [];
		for (let line of lines) {
			let [, items] = line.split(' contains ');
			if (!items) {
				throw new Error(`Invalid line: ${line}`);
			}

			// @see https://github.com/tc39/proposal-string-matchall

			const gen_regex = / ([^\s]+) generator/g;
			const gens = [];
			const gen_last_indexes = {};
			let gen;
			gen_last_indexes[gen_regex.lastIndex] = true;
			while ((gen = gen_regex.exec(items))) {
				gen_last_indexes[gen_regex.lastIndex] = true;

				// Only capture group is the element type, so pop that off
				// @example `gen = [ "cobalt generator", "cobalt" ]`
				gens.push({ type: GENERATOR, element: gen.pop() });
			}

			const chip_regex = / ([^\s]+)-compatible microchip/g;
			const chips = [];
			const chip_last_indexes = {};
			let chip;
			chip_last_indexes[chip_regex.lastIndex] = true;
			while ((chip = chip_regex.exec(items))) {
				chip_last_indexes[chip_regex.lastIndex] = true;

				// Only capture group is the element type, so pop that off
				// @example `gen = [ "cobalt-compatible microchip", "cobalt" ]`
				chips.push({ type: MICROCHIP, element: chip.pop() });
			}

			if (chips.length || gens.length) {
				floors.push(new Floor(chips.concat(gens)));
			} else if (items === 'nothing relevant.') {
				floors.push(new Floor());
			} else {
				throw new Error(`Invalid line: ${line}`);
			}
		}

		return {
			elevator: 0,
			floors,
		};
	}
}

module.exports = {
	RTGPath,
	Floor,
	GENERATOR,
	MICROCHIP,
};
