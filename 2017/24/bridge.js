class Component {
	constructor([port_a, port_b]) {
		this.a = port_a;
		this.b = port_b;

		this.from = null;
		this.to = null;
	}

	has(n) {
		return this.a === n || this.b === n;
	}

	connect(component) {
		component.to = this;
		this.from = component;
	}

	canConnect(component) {
		return (
			this.a === component.a ||
			this.a === component.b ||
			this.b === component.a ||
			this.b === component.a
		);
	}
}

class Bridges {
	constructor(components) {
		this.components = components.map(c => new Component(c));
		this.zeros = this.components.filter(c => c.has(0));
	}

	buildBridges(starting_points) {
		let others = this.components(c => !starting_points.includes(c));
		let possibilites = [];
		for (let i = 0; i < others.length; i++) {
			let component = this.components[i];
			if (starting_points.includes(component)) {
				continue;
			}

			// if (starting_points.component.)
		}

		return starting_points;
	}
}

module.exports = Bridge;
