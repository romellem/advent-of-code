function tick(input, x_inc, truncate_z, y_inc) {
	// inp w
	w = input;

	// mul x 0
	// add x z
	// mod x 26
	// ... // ** add x 10 **
	x = (z % 26) + x_inc;

	if (truncate_z) {
		// div z 26
		z = Math.trunc(z / 26);
	} else {
		// div z 1
	}

	// eql x w
	// eql x 0
	if ((z % 26) + x_inc === input) {
		x = 0;
	} else {
		x = 1;
	}

	// add y 25
	// mul y x
	// add y 1
	y = 25 * x + 1;

	// add y 25
	// mul y x
	// add y 1
	// mul z y
	z = z * (25 * x + 1);

	// mul y 0
	// add y w
	// ** add y 5  **
	y = (input + y_inc) * x;
	z = z + y;
}

function tick2(input, x_inc, truncate_z, y_inc) {
	if (truncate_z) {
		z = Math.trunc(z / 26);
	}

	if (((prev_input + prev_y_inc) % 26) + x_inc === input) {
		x = 0;
		y = 0;
	} else {
		z = 26 * z + input + y_inc;
		y = input + y_inc;
	}
}

function tick3(input, x_inc, y_inc) {
	// inp w
	w = input;

	// mul x 0
	// add x z
	// mod x 26
	x = (z % 26) + x_inc;

	// div z 26
	z = Math.trunc(z / 26);

	// eql x w
	// eql x 0
	x = x === input ? 0 : 1;

	// mul y 0
	// add y 25
	// mul y x
	// add y 1
	// mul z y
	z = z * (25 * x + 1);

	// mul y 0
	// add y w
	// add y 4
	// mul y x
	y = (input + y_inc) * x;

	// add z y
	z = z + y;
}

let w = (x = y = z = 0);

// prettier-ignore
for (let args of [
	/*  1 */ { truncate_z: false, x_inc:  10, y_inc:  5, input: 9 }, // (prev_input + prev_y_inc) + x_inc = someValidInput?
	/*  2 */ { truncate_z: false, x_inc:  13, y_inc:  9, input: 9 },
	/*  3 */ { truncate_z: false, x_inc:  12, y_inc:  4, input: 9 },
	/*  4 */ { truncate_z: true,  x_inc: -12, y_inc:  4, input: 1 }, // (9 + 4) - 12 = 1
	/*  5 */ { truncate_z: false, x_inc:  11, y_inc: 10, input: 5 }, // 5
	/*  6 */ { truncate_z: true,  x_inc: -13, y_inc: 14, input: 2 }, // (5 + 10) - 13 = 2
	/*  7 */ { truncate_z: true,  x_inc:  -9, y_inc: 14, input: 7 }, // (2 + 14) - 9 = 7
	/*  8 */ { truncate_z: true,  x_inc: -12, y_inc: 12, input: 9 }, // (7 + 14) - 12 = 9
	/*  9 */ { truncate_z: false, x_inc:  14, y_inc: 14, input: 4 }, // 4
	/* 10 */ { truncate_z: true,  x_inc:  -9, y_inc: 14, input: 9 }, // (4 + 14) - 9 = 9
	/* 11 */ { truncate_z: false, x_inc:  15, y_inc:  5, input: 9 },
	/* 12 */ { truncate_z: false, x_inc:  11, y_inc: 10, input: 9 },
	/* 13 */ { truncate_z: true,  x_inc: -16, y_inc:  8, input: 3 }, // (9 + 10) - 16 = 3
	/* 14 */ { truncate_z: true,  x_inc:  -2, y_inc: 15, input: 9 }, // (3 + 8) - 2 = 9
]) {
	tick2(args);
}
