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
	if (x === input) {
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
