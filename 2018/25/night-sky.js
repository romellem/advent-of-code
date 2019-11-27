const vonNeumann = require('von-neumann');
const G = require('generatorics');

// @see https://en.wikipedia.org/wiki/Delannoy_number
const D34 = vonNeumann(3, 4);

class FixedPoint {
	constructor([a, b, c, d]) {
		this.coords = [a, b, c, d];

		// 128 possibilities, don't need to check itself
		this.cloud = this.generateCloud();
	}

	generateCloud(coords = this.coords) {
		const [a1, b1, c1, d1] = coords;
		return D34.map(([a2, b2, c2, d2]) => [a1 + a2, b1 + b2, c1 + c2, d1 + d2]);
	}

	canBeConnectedTo(fixed_point) {
		for (let cloud_point of this.cloud) {
			if (FixedPoint.pointsAreEqual(cloud_point, fixed_point.coords)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * @param {Array} point_a Flat 4D array
	 * @param {Array} point_b flat 4D array
	 * @returns {Boolean}
	 */
	static pointsAreEqual(point_a, point_b) {
		const [a1, b1, c1, d1] = point_a;
		const [a2, b2, c2, d2] = point_b;

		return a1 === a2 && b1 === b2 && c1 === c2 && d1 === d2;
	}

	toString() {
		return this.coords.toString();
	}
}

class Constellation {
	constructor(...points) {
		this.points = points;
	}

	canConnect(new_point) {
		for (let point of this.points) {
			if (point.canBeConnectedTo(new_point)) {
				return true;
			}
		}

		return false;
	}

	addPoint(point) {
		if (!this.contains(point)) {
			this.points.push(point);
		}
	}

	contains(point) {
		return this.points.some(p => FixedPoint.pointsAreEqual(p.coords, point.coords));
	}
}

class NightSky {
	constructor(fixed_points_orig) {
		this.fixed_points = fixed_points_orig.map(p => new FixedPoint(p));
		this.constellations = this.buildInitialConstellations();
		console.log('hi');
	}

	/**
	 * Loop through combinations for
	 */
	buildInitialConstellations(fixed_points = this.fixed_points) {
		let constellations = [];
		for (let [point_a, point_b] of G.combination(fixed_points, 2)) {
			if (point_a.canBeConnectedTo(point_b)) {
				if (constellations.length === 0) {
					constellations.push(new Constellation(point_a, point_b));
				} else {
					// Loop through constellations, make sure we haven't added one of these before
					for (let constellation of constellations) {
						const contains_a = constellation.contains(point_a);
						const contains_b = constellation.contains(point_b);

						if (!contains_a && !contains_b) {
							constellations.push(new Constellation(point_a, point_b));
							break;
						} else if (!contains_a && contains_b) {
							constellation.addPoint(point_a);
							break;
						} else if (contains_a && !contains_b) {
							constellation.addPoint(point_b);
							break;
						}
					}
				}
			}
		}

		// TEST, assert so far we have unique points in all constellations
		const point_lookup = {};
		for (let constellation of constellations) {
			for (let point of constellation.points) {
				const point_str = point.toString();
				if (point_lookup[point_str]) {
					throw new Error(`Found a point already added! ${point.toString()}`);
				}

				point_lookup[point_str] = true;
			}
		}

		return constellations;
	}

	buildConstellations(constellations = this.constellations) {
		// do {
		// 	for (let [point_a, point_b] of G.combination(this.fixed_points))
		// } while (made_new_connection);
		// for (let i = 0; i < constellations.length; i++) {
		// 	let constellation_a = constellations
		// 	for (let j = i; j < constellations.length; j++) {
		// 		if (i === j) continue;
		// 		let constellation_b = constellations[j];
		// 		if (constellation_a.canBeConnectedTo(constellation_b)) {
		// 			constellation_a.
		// 		}
		// 	}
		// }
	}
}

module.exports = NightSky;
