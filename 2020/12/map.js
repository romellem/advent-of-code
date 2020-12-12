const manhattan = require('manhattan');

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';
const ROTATE_LEFT = 'L';
const ROTATE_RIGHT = 'R';
const FORWARD = 'F';

const DIRECTION_DEGREES = {
	[NORTH]: 0,
	[EAST]: 90,
	[SOUTH]: 180,
	[WEST]: 270,
};
const FORWARD_VECTORS = {
	// [dx, dy]
	// aka, 0: [0, -1]; 90: [1, 0], etc.
	[DIRECTION_DEGREES[NORTH]]: [0, -1],
	[DIRECTION_DEGREES[EAST]]: [1, 0],
	[DIRECTION_DEGREES[SOUTH]]: [0, 1],
	[DIRECTION_DEGREES[WEST]]: [-1, 0],
};
const ROTATION_TO_DIRECTION = {
	0: NORTH,
	90: EAST,
	180: SOUTH,
	270: WEST,
};

class Map {
	constructor({
		directions,
		debug = false,
		initialRotation = DIRECTION_DEGREES[EAST],
		x = 0,
		y = 0,
		useWaypoint = false,
		waypoint = [10, -1],
	}) {
		this.original_directions_str = JSON.stringify(directions);
		this.directions = JSON.parse(this.original_directions_str);
		this.rotation = initialRotation;
		this.debug = debug;
		this.useWaypoint = useWaypoint;
		this.waypoint = waypoint;

		this.x = x;
		this.y = y;
	}

	log(...args) {
		this.debug && console.log(...args);
	}

	run() {
		for (let direction of this.directions) {
			let { action, value } = direction;
			let vector = DIRECTION_DEGREES[action];
			if (vector !== undefined) {
				vector = FORWARD_VECTORS[vector];
			}
			switch (action) {
				case NORTH:
					this.move(value, vector);
					break;
				case EAST:
					this.move(value, vector);
					break;
				case SOUTH:
					this.move(value, vector);
					break;
				case WEST:
					this.move(value, vector);
					break;
				case ROTATE_LEFT:
					this.rotate(-1 * value);
					break;
				case ROTATE_RIGHT:
					this.rotate(value);
					break;
				case FORWARD:
					this.forward(value);
					break;
				default:
					throw new Error(`Unknown action: "${action}"`);
			}
			this.log(
				`${action} ${value} : ${this.x}, ${this.y}, ${ROTATION_TO_DIRECTION[this.rotation]}`
			);
		}
	}

	rotate(degrees) {
		this.rotation += degrees;
		if (this.rotation < 0) this.rotation += 360 * Math.ceil(Math.abs(this.rotation / 360));
		this.rotation %= 360;
	}

	move(value, [dx, dy]) {
		this.x += value * dx;
		this.y += value * dy;
	}

	forward(value) {
		let vector = FORWARD_VECTORS[this.rotation];
		return this.move(value, vector);
	}

	getDistanceFromCurrentLocationTo(x = 0, y = 0) {
		return manhattan([this.x, this.y], [x, y]);
	}
}

module.exports = {
	Map,
};
