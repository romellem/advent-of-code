class Component {
	constructor([port_a, port_b]) {
		this.a = port_a;
		this.b = port_b;
	}

	otherPort(n) {
		if (this.a === n) {
			return this.b;
		} else if (this.b === n) {
			return this.a;
		} else {
			return null;
		}
	}

	has(n) {
		return this.a === n || this.b === n;
	}

	toString() {
		return `${this.a}/${this.b}`;
	}
}

class Bridges {
	constructor(components) {
		this.components = components.map(c => new Component(c));
		const zeros = this.components.filter(c => c.has(0));
		const pool = this.components.filter(c => !c.has(0));
		const bridges = zeros.map(c => [c]);

		this.solutions = bridges.slice(0);
		this.buildBridges(pool, bridges, 0);
	}

	buildBridges(pool, bridges, current_port) {
		for (let bridge of bridges) {
			let last_component = bridge[bridge.length - 1];
			let new_port = last_component.otherPort(current_port);

			let new_bridges = [];
			let new_pool = [];
			for (let i = 0; i < pool.length; i++) {
				let component = pool[i];
				if (component.has(new_port)) {
					let new_bridge = bridge.concat(component);
					new_bridges.push(new_bridge);

					// Save in overall array to view solutions later
					this.solutions.push(new_bridge);
				} else {
					new_pool.push(component);
				}
			}

			if (new_bridges.length) {
				this.buildBridges(new_pool, new_bridges, new_port);
			}
		}

		return this.solutions;
	}

	printSolutions() {
		for (let solution of this.solutions) {
			// Uses `toString` of Connection class
			let solution_str = solution.join('-');
			console.log(solution_str);
		}
	}
}

module.exports = Bridges;
