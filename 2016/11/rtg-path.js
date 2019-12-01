const { MICROCHIP, GENERATOR } = require('./input');


// 0-indexed
const MAX_FLOOR = 3;

class ArrangementNode {
	constructor(elevator, floors) {
		this.elevator = elevator;
		this.floors = floors;

		// [node, distance]
		this.connections = new Map();
	}

	getValidNodesFromHere() {
		const [chips, gens] = this.floors[this.elevator];
		let valid_nodes = [];
		// Up
		if (this.elevator < MAX_FLOOR) {
			let up = this.elevator + 1;
			const [chips_up, gens_up] = this.floors[up];

			// Chip + Gen
			if (chips > 0 && gens > 0) {
				let new_floors = this.cloneFloors();
				new_floors[up][0] += 1;
				new_floors[up][1] += 1;
				new_floors[this.elevator][0] -= 1;
				new_floors[this.elevator][1] -= 1;

				valid_nodes.push(new ArrangementNode(up, new_floors));
			}

			// Chips
			if (chips > 0) {
				const new_gens_up = gens_up;
				const new_gens_current = gens;
				const new_chips_up = chips_up + 1;
				const new_chips_current = chips - 1;
				if (gens_up === 0 || (gens_up > 0 && chips_up + 1 < gens_up)) {
					let new_floors = this.cloneFloors();
					new_floors[up][0] += 1;
					new_floors[this.elevator][0] -= 1;

					valid_nodes.push(new ArrangementNode(up, new_floors));
				}

				// 2 chips
				if (gens_up === 0 || (gens_up > 0 && chips_up + 2 < gens_up)) {
					let new_floors = this.cloneFloors();
					new_floors[up][0] += 2;
					new_floors[this.elevator][0] -= 2;

					valid_nodes.push(new ArrangementNode(up, new_floors));
				}
			}

			// Gens
	
			
		}
	}

	addConnection(node, distance = 1) {
		if (!this.connections.has(node)) {
			this.connections.set(node, distance);
		}
	}

	cloneFloors() {
		const floors = [];
		for (let floor of this.floors) {
			floors.push(floor.slice(0));
		}

		return floors;
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
			floors
		};
	}

	_floorsToString() {
		let floors_str = '';
		for (let [chips, gens] of this.floors) {
			floors_str += chips + ',' + gens;
		}

		return floors_str;
	}

	toString() {
		return `${this.elevator};${this._floorsToString()}`;
	}

	calculateEndingFloorStateString() {
		let chips_gens_total = this.floors.reduce((sum, floor) => [sum[0] + floor[0], sum[1] + floor[1]], [0, 0]);
		let floors_str = '';
		for (let i = 0; i < this.floors.length - 1; i++) {
			floors_str += '0,0';
		}

		floors_str += chips_gens_total[0] + ',' + chips_gens_total[1];
		return floors_str;
	}


}

class ArrangementGraph {
	constructor(initial_state, floors = 4) {
		this.root_node = new ArrangementNode(initial_state);
		this.arrangements = {
			[this.root_node.toString()]: this.root_node
		};

		// Calculate ending state and store key for later
		this.ending_state_key = (floors - 1) + ';' + this.root_node.calculateEndingFloorStateString();
	}
}

class RTGPath {
	constructor(floors) {
		this.floors = floors;
		this.elevator = 1;
		this.graph = new Graph();
		this.graph.addNode()
	}

	floorsToStateString() {
		let state_str = this.elevator + ',';
		for (let floor of this.floors) {
			let chips_sum = 0;
			let generators_sum = 0;
			for (let [element, type] of floor) {
				if (type === MICROCHIP) {
					chips_sum++;
				} else {
					generators_sum++;
				}
			}

			// Chips, Generators
			state_str += `${chips_sum},${generators_sum}`;
		}

		return state_str;
	}
}