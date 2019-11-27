const vonNeumann = require('von-neumann');
const G = require('generatorics');

// @see https://en.wikipedia.org/wiki/Delannoy_number
const D34 = vonNeumann(3, 4);

class FixedPoint {
	constructor([a, b, c, d]) {
		this.coords = [a, b, c, d];

		// 128 possibilities, don't need to check itself
		this.cloudMap = this.generateCloud();
	}

	generateCloud(coords = this.coords) {
		const [a1, b1, c1, d1] = coords;
		const cloud = D34.map(([a2, b2, c2, d2]) => [a1 + a2, b1 + b2, c1 + c2, d1 + d2]);
		return cloud.reduce((map, coord) => {
			map[coord.toString()] = true;
			return map;
		}, {});
	}

	canBeConnectedTo(fixed_point) {
		return Boolean(this.cloudMap[fixed_point.toString()]);
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

		this.cloudMap = {};
		this.reduceCloudMap(...this.points);
	}

	reduceCloudMap(...points) {
		for (let point of points) {
			Object.assign(this.cloudMap, point.cloudMap);
		}
	}

	canBeConnectedTo(point) {
		return Boolean(this.cloudMap[point.toString()]);
	}

	canBeReducedWith(new_constellation) {
		for (let new_point of new_constellation.points) {
			if (this.canBeConnectedTo(new_point)) {
				return true;
			}
		}

		return false;
	}

	reduceWith(new_constellation) {
		for (let point of new_constellation.points) {
			this.addPoint(point);
		}
	}

	addPoint(point) {
		// if (!this.contains(point)) {
		this.points.push(point);
		this.reduceCloudMap(point);
		// }
	}

	// contains(point) {
	// 	return this.points.some(p => FixedPoint.pointsAreEqual(p.coords, point.coords));
	// }
}

class NightSky {
	constructor(fixed_points_orig) {
		this.fixed_points = fixed_points_orig.map(p => new FixedPoint(p));
		this.constellations = this.fixed_points.map(p => new Constellation(p));
		this.constellations = this.reduceConstellations();
	}

	reduceConstellations(constellations = this.constellations) {
		let found_reduction;

		do {
			found_reduction = false;
			for (let a = 0; a < constellations.length - 1; a++) {
				let constellation_a = constellations[a];

				for (let b = a + 1; b < constellations.length; b++) {
					let constellation_b = constellations[b];

					if (constellation_a.canBeReducedWith(constellation_b)) {
						// Combine right constellation with left constellation
						constellation_a.reduceWith(constellation_b);

						// Remove the right-most constellation from our array (it was reduced)
						constellations.splice(b, 1);

						// Reduce iterator since array length changed
						b--;

						// Mark for looping through entire array again once we finish a pass
						found_reduction = true;
					}
				}
			}
		} while (found_reduction);

		return constellations;
	}
}

module.exports = NightSky;
