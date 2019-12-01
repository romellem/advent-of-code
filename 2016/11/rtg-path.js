const { strictEqual } = require('assert');

// 0-indexed
const MAX_FLOOR = 3;

class ArrangementNode {
	constructor(elevator, floors) {
		this.elevator = elevator;
		this.floors = this.cloneFloors(floors);
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
			if (chips === 1) {
				let new_floors = this.cloneFloors();
				new_floors[up][0] += 1;
				new_floors[this.elevator][0] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			} else if (chips > 1) {
				// 2 chips
				let new_floors = this.cloneFloors();
				new_floors[up][0] += 2;
				new_floors[this.elevator][0] -= 2;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}

			// 1 gen
			if (gens === 1) {
				let new_floors = this.cloneFloors();
				new_floors[up][1] += 1;
				new_floors[this.elevator][1] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			} else if (gens > 1) {
				// 2 gens
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
			if (chips === 1) {
				let new_floors = this.cloneFloors();
				new_floors[down][0] += 1;
				new_floors[this.elevator][0] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			} else if (chips > 1) {
				// 2 chips
				let new_floors = this.cloneFloors();
				new_floors[down][0] += 2;
				new_floors[this.elevator][0] -= 2;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			}

			// 1 gen
			if (gens === 1) {
				let new_floors = this.cloneFloors();
				new_floors[down][1] += 1;
				new_floors[this.elevator][1] -= 1;

				if (ArrangementNode.validateFloors(new_floors)) {
					valid_nodes.push(new ArrangementNode(down, new_floors));
				}
			} else if (gens > 1) {
				// 2 gens
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
