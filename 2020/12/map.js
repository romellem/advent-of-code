const manhattan = require('manhattan');

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';
const ROTATE_LEFT = 'L';
const ROTATE_RIGHT = 'R';
const FORWARD = 'F';

const MOVEMENT_VECTORS = {
	// [dx, dy]
	// aka, { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] }
	[NORTH]: [0, -1],
	[EAST]: [1, 0],
	[SOUTH]: [0, 1],
	[WEST]: [-1, 0],
};

/**
 * "Rotates" an array 90º clockwise (right) or counter-clockwise (left).
 *
 * Image the following graph:
 *
 *             -y
 *              ^
 *     (-2, -1) | a (1, -2)
 *         d    |
 *     -x <-----+-----> +x
 *              |    b
 *            c |  (2, 1)
 *      (-1, 2) v
 *             +y
 *
 * Where a, b, c, and d are the following points
 * (Note that -y is up, and +y is down):
 *
 * - a: (1, -2)
 * - b: (2, 1)
 * - c: (-1, 2)
 * - d: (-2, -1)
 *
 * You can see that to rotate clockwise, you can reflect
 * a point over the line of `y = x`, which means you
 * swap the x and y coords and negate both terms) and
 * then reflect that new point over the x-axis, meaning you
 * negate the y term.
 *
 * Written out, you get
 *
 * 0. (x, y)        // Initial point
 * 1. (-y, -x)      // Reflect over `y = x` line
 * 2. (-y, -1 * -x) // Reflect over x-axis
 * 2. (-y, x)       // Cancel the double negative
 *
 * In the example above, rotating `a` clockwise to `b`:
 *
 * 0. (1, -2)
 * 1. (2, -1)
 * 2. (2, 1)
 *
 * In code, if you wanted to go from step 0 to step 2, you can
 * swap the terms, and negate the _new_ `x` term.
 *
 * For rotating left, you do something similar, instead
 * you reflect over the y-axis for the 2nd step.
 *
 * Again, in code, you swap the terms, and negate the _new_
 * `x` term.
 *
 * @param {Array} arr - An array of 2 values
 * @param {Enum} direction - Either `ROTATE_LEFT` or `ROTATE_RIGHT`
 */
const rotateInPlace = (arr, direction) => {
	const sign = direction === ROTATE_LEFT ? 1 : -1;
	let t = arr[1];
	arr[1] = -1 * sign * arr[0];
	arr[0] = sign * t;

	return arr;
};

class Map {
	constructor({
		directions,
		initialRotation = MOVEMENT_VECTORS[EAST],

		// coords = [x, y]
		coords = [0, 0],
		useWaypoint = false,

		// waypoint = [x, y]
		waypoint = [10, -1],
	}) {
		this.original_directions_str = JSON.stringify(directions);
		this.directions = JSON.parse(this.original_directions_str);
		this.rotation = [...initialRotation];
		this.useWaypoint = useWaypoint;
		this.waypoint = waypoint;
		this.coords = coords;
	}

	run() {
		const movement_coords = this.useWaypoint ? this.waypoint : this.coords;
		const rotation_vector = this.useWaypoint ? this.waypoint : this.rotation;
		const forward_vector = this.useWaypoint ? this.waypoint : this.rotation;

		for (let direction of this.directions) {
			let { action, value } = direction;

			switch (action) {
				case NORTH:
				case EAST:
				case SOUTH:
				case WEST:
					this.move(value, MOVEMENT_VECTORS[action], movement_coords);
					break;
				case ROTATE_LEFT:
				case ROTATE_RIGHT:
					this.rotate(value, action, rotation_vector);
					break;
				case FORWARD:
					this.forward(value, forward_vector);
					break;
				default:
					throw new Error(`Unknown action: "${action}"`);
			}
		}
	}

	rotate(degrees, direction, vector) {
		let count = degrees / 90;
		for (let i = 0; i < count; i++) {
			rotateInPlace(vector, direction);
		}
	}

	move(value, [dx, dy], coords) {
		coords[0] += value * dx;
		coords[1] += value * dy;
	}

	forward(value, vector) {
		return this.move(value, vector, this.coords);
	}

	getDistanceFromCurrentLocationTo(x = 0, y = 0) {
		return manhattan(this.coords, [x, y]);
	}
}

module.exports = {
	Map,
};
