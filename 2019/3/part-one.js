const { input } = require('./input');
const manhattan = require('manhattan');

const parse = wire => {
	let lets = wire.split('');
	let dir = lets.shift();
	return { dir, distance: parseInt(lets.join('')) };
};

let [wire_a, wire_b] = input;

// Highest y and x for each wire
let max_x = 0;
let max_y = 0;

let min_x = 0;
let min_y = 0;

let x = 0,
	y = 0;
wire_a.forEach(move_str => {
	let { dir, distance } = parse(move_str);
	if (dir === 'R') {
		x += distance;
		max_x = Math.max(x, max_x);
	} else if (dir === 'L') {
		x -= distance;
		min_x = Math.min(x, min_x);
	} else if (dir === 'U') {
		y += distance;
		max_y = Math.max(y, max_y);
	} else if (dir === 'D') {
		x -= distance;
		min_y = Math.min(y, min_y);
	} else {
		throw move_str;
	}
});

// console.log(max_x,
//     max_y,
//     min_x,
//     min_y);

(x = 0), (y = 0);
wire_b.forEach(move_str => {
	let { dir, distance } = parse(move_str);
	if (dir === 'R') {
		x += distance;
		max_x = Math.max(x, max_x);
	} else if (dir === 'L') {
		x -= distance;
		min_x = Math.min(x, min_x);
	} else if (dir === 'U') {
		y += distance;
		max_y = Math.max(y, max_y);
	} else if (dir === 'D') {
		x -= distance;
		min_y = Math.min(y, min_y);
	} else {
		throw move_str;
	}
});

let x_size = Math.abs(max_x - min_x);
let y_size = Math.abs(max_y - min_y);

let grid = Array(y_size)
	.fill()
	.map(row => Array(x_size).fill(0));

[wire_a, wire_b].forEach(wire => {
	let wire_a_x = 0;
	let wire_a_y = 0;
	wire.forEach(move_str => {
		let { dir, distance } = parse(move_str);
		if (dir === 'R') {
			for (let i = 1; i <= distance; i++) {
				grid[wire_a_y][wire_a_x + i]++;
			}
			wire_a_x += distance;
		} else if (dir === 'L') {
			for (let i = distance; i >= 1; i--) {
				grid[wire_a_y][wire_a_x + i]++;
			}
			wire_a_x -= distance;
		} else if (dir === 'U') {
			for (let i = 1; i <= distance; i++) {
				grid[wire_a_y + i][wire_a_x]++;
			}
			wire_a_y += distance;
		} else if (dir === 'D') {
			for (let i = distance; i >= 1; i--) {
				grid[wire_a_y + i][wire_a_x]++;
			}
			wire_a_y -= distance;
		} else {
			throw move_str;
		}
	});
});

let closest_distance = Number.MAX_SAFE_INTEGER;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        let cell = grid[y][x];
        if (cell > 1) {
            let d = manhattan([x, y], [0, 0]);
            if (d < closest_distance) {
                d = closest_distance;
            }
        }
    }
}

console.log(d)
