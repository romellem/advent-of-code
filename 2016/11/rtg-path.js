const GENERATOR = 'G';
const MICROCHIP = 'C';
const { strictEqual } = require('assert');
const G = require('generatorics');

// 0-indexed
const MAX_FLOOR = 3;

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
	constructor(elevator, floors) {
		this.elevator = elevator;
		this.floors = this.cloneFloors(floors);

		this.str = `${this.elevator};${this._floorsToString()}`;
	}

	cloneFloors(floors_orig = this.floors) {
		const floors = [];
		for (let floor of floors_orig) {
			floors.push(floor.slice(0));
		}

		return floors;
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
		const [chips, gens] = this.floors[this.elevator];
		const valid_nodes = [];

		// Up
		if (this.elevator < MAX_FLOOR) {
			const up = this.elevator + 1;

			// Chip + Gen
			if (chips > 0 && gens > 0) {
				let new_floors = this.cloneFloors();
				new_floors[up][0] += 1;
				new_floors[up][1] += 1;
				new_floors[this.elevator][0] -= 1;
				new_floors[this.elevator][1] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}

			// 1 Chip
			if (chips > 0) {
				let new_floors = this.cloneFloors();
				new_floors[up][0] += 1;
				new_floors[this.elevator][0] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}

			// 2 chips
			if (chips > 1) {
				let new_floors = this.cloneFloors();
				new_floors[up][0] += 2;
				new_floors[this.elevator][0] -= 2;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}

			// 1 gen
			if (gens > 0) {
				let new_floors = this.cloneFloors();
				new_floors[up][1] += 1;
				new_floors[this.elevator][1] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}

			// 2 gens
			if (gens > 1) {
				let new_floors = this.cloneFloors();
				new_floors[up][1] += 2;
				new_floors[this.elevator][1] -= 2;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}
		}

		// Down
		if (this.elevator > 0 && this.hasItemsBeneathCurrentPosition()) {
			const down = this.elevator - 1;

			// Chip + Gen
			if (chips > 0 && gens > 0) {
				let new_floors = this.cloneFloors();
				new_floors[down][0] += 1;
				new_floors[down][1] += 1;
				new_floors[this.elevator][0] -= 1;
				new_floors[this.elevator][1] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			}

			// 1 Chip
			if (chips > 0) {
				let new_floors = this.cloneFloors();
				new_floors[down][0] += 1;
				new_floors[this.elevator][0] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			}

			// 2 chips
			if (chips > 1) {
				let new_floors = this.cloneFloors();
				new_floors[down][0] += 2;
				new_floors[this.elevator][0] -= 2;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			}

			// 1 gen
			if (gens > 0) {
				let new_floors = this.cloneFloors();
				new_floors[down][1] += 1;
				new_floors[this.elevator][1] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			}

			// 2 gens
			if (gens > 1) {
				let new_floors = this.cloneFloors();
				new_floors[down][1] += 2;
				new_floors[this.elevator][1] -= 2;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			}
		}

		return valid_nodes;
	}

	hasItemsBeneathCurrentPosition(current_position = this.elevator) {
		let total_items_beneath_current_position = 0;
		for (let i = 0; i < current_position; i++) {
			total_items_beneath_current_position += this.floors[i][0] + this.floors[i][1];
		}

		return total_items_beneath_current_position > 0;
	}

	static validateFloors(floors) {
		for (let floor of floors) {
			const [chips, gens] = floor;

			// When generators is greater than zero, we can't have more chips than gens
			if (gens > 0 && chips > gens) {
				return false;
			}
		}

		return true;
	}

	static parseStrToNode(str) {
		let [elevator, floors_str] = str.split(';');
		elevator = +elevator;
		let floors_arr = floors_str.split(',');
		let floors = [];
		for (let i = 0; i < floors_arr.length; i += 2) {
			let chips = +floors_arr[i];
			let gens = +floors_arr[i + 1];
			floors.push([chips, gens]);
		}

		return {
			elevator,
			floors,
		};
	}

	_floorsToString() {
		let floors_str = '';
		for (let [chips, gens] of this.floors) {
			floors_str += chips + ',' + gens + ',';
		}

		return floors_str.substring(0, floors_str.length - 1);
	}

	toString() {
		return this.str;
	}

	toLongString() {
		let floors_str = '';
		for (let [chips, gens] of this.floors) {
			floors_str += '|' + chips + ',' + gens + '| ';
		}

		let floors = floors_str.substring(0, floors_str.length - 1);
		return this.elevator + '; ' + floors;
	}

	calculateEndingFloorStateString() {
		let chips_gens_total = this.floors.reduce(
			(sum, floor) => [sum[0] + floor[0], sum[1] + floor[1]],
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

// prettier-ignore
{
	// validateFoors tests
	strictEqual(ArrangementNode.validateFloors([[0, 0], [2, 1], [0, 1]]), false);
	strictEqual(ArrangementNode.validateFloors([[0, 5], [1, 1], [6, 1]]), false);
	strictEqual(ArrangementNode.validateFloors([[0, 0], [2, 0], [0, 2]]), true);
	strictEqual(ArrangementNode.validateFloors([[0, 2], [2, 0], [0, 0]]), true);
	strictEqual(ArrangementNode.validateFloors([[0, 2], [0, 0], [1, 0], [1, 0]]), true);
	strictEqual(ArrangementNode.validateFloors([[1, 2], [2, 0], [0, 1]]), true);
	strictEqual(ArrangementNode.validateFloors([[1, 1], [1, 1]]), true);
	strictEqual(ArrangementNode.validateFloors([[1, 2], [3, 3], [1, 0]]), true);
}

class RTGPath {
	constructor(starting_arrangement) {
		this.frontier = [];
		const { elevator, floors } = starting_arrangement;
		const start = new ArrangementNode(elevator, floors);
		this.frontier.push(start);

		// Calculate this so we know when we are at the end
		this.endingStateString = MAX_FLOOR + ';' + start.calculateEndingFloorStateString();

		// Keys are `ArrangementNode.toString()`, and value is `{ from, length }`, where
		// `from` is the ArrangementNode we came from, and `length` is what step we are at
		this.visted = {};
		this.visted[start.str] = { node: start, from: null, length: 0 };

		this.goal = this.searchToEnd();
	}

	searchToEnd() {
		while (this.frontier.length > 0) {
			const current_node = this.frontier.shift();
			const current_node_str = current_node.str;
			const current_node_length = this.visted[current_node_str].length;

			if (current_node_str === this.endingStateString) {
				// Not sure if I should immediately exit, or trim down to nodes that are still on the frontier...
				// Going to try and return immediately, see what happens
				return this.visted[current_node_str];
			} else {
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

	get f() {
		return this.frontier.map(n => this.visted[n.str] && this.visted[n.str].length).join(',');
	}
}

module.exports = RTGPath;
