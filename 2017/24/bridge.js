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

	sum() {
		return this.a + this.b;
	}
}

class Bridges {
	constructor(components) {
		this.components = components.map(c => new Component(c));
		const zeros = this.components.filter(c => c.has(0));
		const bridges = zeros.map(c => [c]);

		this.solutions = bridges.slice(0);
		this.buildBridges(bridges, 0);
	}

	buildBridges(bridges, current_port) {
		for (let bridge of bridges) {
			// The value `1` in the WeakMap is arbitrary, I only want to use it for the `.has` method later
			let using = new WeakMap(bridge.map(c => [c, 1]));
			let last_component = bridge[bridge.length - 1];
			let new_port = last_component.otherPort(current_port);

			let new_bridges = [];
			for (let i = 0; i < this.components.length; i++) {
				let component = this.components[i];
				if (using.has(component)) {
					continue;
				}

				if (component.has(new_port)) {
					let new_bridge = bridge.concat(component);
					new_bridges.push(new_bridge);

					// Save in overall array to view solutions later
					this.solutions.push(new_bridge);
				}
			}

			if (new_bridges.length) {
				this.buildBridges(new_bridges, new_port);
			}
		}

		return this.solutions;
	}

	static getSolutionString(solution) {
		// Uses `toString` of Connection class
		return solution.join('-');
	}

	static getSolutionScore(solution) {
		return solution.map(c => c.sum()).reduce((a, b) => a + b, 0);
	}

	printSolutions() {
		for (let solution of this.solutions) {
			console.log(Bridges.getSolutionString(solution));
		}
	}

	getBestSolution(solutions = this.solutions) {
		let best_solution = -1;
		let best_solution_index = null;
		for (let i = 0; i < solutions.length; i++) {
			let solution = solutions[i];
			let solution_score = Bridges.getSolutionScore(solution);
			if (solution_score > best_solution) {
				best_solution = solution_score;
				best_solution_index = i;
			}
		}

		return solutions[best_solution_index];
	}

	getLongestAndHighestScoringBridge() {
		// The `Math.max` gives a 'call stack exceeded' error. ¯\_(ツ)_/¯
		// let max_length = Math.max(...this.solutions.map(b => b.length));
		let max_length = this.solutions
			.map(b => b.length)
			.sort((a, b) => a - b)
			.pop();
		let longest_bridges = this.solutions.filter(b => b.length === max_length);

		return this.getBestSolution(longest_bridges);
	}
}

module.exports = Bridges;
