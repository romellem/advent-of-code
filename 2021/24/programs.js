// 0: z = (i0 + 5) // 6 - 14
// 1: z = (i0 + 5) * 26 + (i1 + 9)
// 2: z = [(i0 + 5) * 26 + (i1 + 9)] * 26 + (i2 + 4)
// 3: x = i2 == 9 && i3 == 1 ? 0 : 1, z = z, otherwise z = z * 26 + (i3 + 4)
// 4: z = [[(i0 + 5) * 26 + (i1 + 9)] * 26 + (i2 + 4)] * 26 + (i4 + 10)
// 5: z = [[(i0 + 5) * 26 + (i1 + 9)] * 26 + (i2 + 4)] * 26 + (i5 + 14)
// 6: z = [[(i0 + 5) * 26 + (i1 + 9)] * 26 + (i2 + 4)] + (i6 + 14) // i6 == 9, (i2 + 27)
// 7: x = (i2 + i6 + 6), z = [[(i0 + 5) * 26 + (i1 + 9)] + (0 or 1),

// 9:14
function part0(input) {
	x = 1;
	y = input + 5; // 9 = 6 - 14
	z = y; // z = 6-14
}

// 9:382
function part1(input) {
	x = 1;
	y = input + 9; // Y = 10 - 18
	z = z * 26 + y; // 166 - 382
}

// 9:9945
function part2(input) {
	x = 1;
	y = input + 4; // 5 - 13
	z = z * 26 + y; // 4321 - 9945
}

// 1
function part3(input) {
	x = z % 26; // 5 - 13 (since z is a `multiple of 26 plus y`) (theoretically 0-25)
	x = x - 12; // -7 - 1 (technically -12 - 13)
	x = x === input ? 0 : 1; // Only true if input is `1`

	z = z * (25 * x + 1); //
	y = (input + 4) * x;
	z = z + y;
}

// 9:14
function part4(input) {
	x = 1;
	y = input + 10; // Y = 11 - 19
	z = z * 26 + y; // 167 - 357
}

// 4
function part5(input) {
	z = Math.trunc(z / 26);
	x = (z % 26) - 13; // (6 - 13) - 13 = -7 - 0
	x = x === input ? 0 : 1; // Can never be true, x = 1

	z = z * (25 * x + 1); //
	y = (input + 14) * x; // 15-23

	z = z + y; // [n * 26] + (15-23)
}

// 9 (whatever values is here, minus 1 above (currently 4, so 8 here would be 3 above))
function part6(input) {
	x = (z % 26) - 9; // (i5 + 5)

	z = Math.trunc(z / 26); // [(i0 + 5) * 26 + (i1 + 9)] * 26 + (i2 + 4)

	x = x === input ? 0 : 1; // Could be true if input is 6-9

	y = 25 * x + 1; // 1 or 26
	z = z * y; // (6-13) * (1 or 26)

	y = (input + 14) * x; // (15-19) or 0
	z = z + y; // [(6-13) * (1 or 26)] + (15-19) or 0
}

function part7(input) {
	x = (z % 26) - 12;

	z = Math.trunc(z / 26);

	x = x === input ? 0 : 1; // Only true if 8 or 9
	z = z * (25 * x + 1);
	y = (input + 12) * x;

	z = z + y;
}

function part8(input) {
	x = (z % 26) + 14;

	x = x === input ? 0 : 1; // Never be true, x = 1

	z = z * (25 * x + 1); // z * 26

	y = (input + 14) * x; // (input + 14)

	z = z + y;
}

function part9(input) {
	// inp w
	w = input;

	// mul x 0
	x *= 0;

	// add x z
	x += z;

	// mod x 26
	x %= 26;

	// div z 26
	z = Math.trunc(z / 26);

	// add x -9
	x += -9;

	// eql x w
	x = x === w ? 1 : 0;

	// eql x 0
	x = x === 0 ? 1 : 0;

	// mul y 0
	y *= 0;

	// add y 25
	y += 25;

	// mul y x
	y *= x;

	// add y 1
	y += 1;

	// mul z y
	z *= y;

	// mul y 0
	y *= 0;

	// add y w
	y += w;

	// add y 14
	y += 14;

	// mul y x
	y *= x;

	// add z y
	z += y;
}

function part10(input) {
	// inp w
	w = input;

	// mul x 0
	x *= 0;

	// add x z
	x += z;

	// mod x 26
	x %= 26;

	// div z 1
	z = Math.trunc(z / 1);

	// add x 15
	x += 15;

	// eql x w
	x = x === w ? 1 : 0;

	// eql x 0
	x = x === 0 ? 1 : 0;

	// mul y 0
	y *= 0;

	// add y 25
	y += 25;

	// mul y x
	y *= x;

	// add y 1
	y += 1;

	// mul z y
	z *= y;

	// mul y 0
	y *= 0;

	// add y w
	y += w;

	// add y 5
	y += 5;

	// mul y x
	y *= x;

	// add z y
	z += y;
}

function part11(input) {
	// inp w
	w = input;

	// mul x 0
	x *= 0;

	// add x z
	x += z;

	// mod x 26
	x %= 26;

	// div z 1
	z = Math.trunc(z / 1);

	// add x 11
	x += 11;

	// eql x w
	x = x === w ? 1 : 0;

	// eql x 0
	x = x === 0 ? 1 : 0;

	// mul y 0
	y *= 0;

	// add y 25
	y += 25;

	// mul y x
	y *= x;

	// add y 1
	y += 1;

	// mul z y
	z *= y;

	// mul y 0
	y *= 0;

	// add y w
	y += w;

	// add y 10
	y += 10;

	// mul y x
	y *= x;

	// add z y
	z += y;
}

function part12(input) {
	w = input;

	x = (z % 26) - 16; // -16 - 9

	z = Math.trunc(z / 26);

	x = x === w ? 0 : 1;

	y = 25 * x + 1;

	// mul z y
	z *= y;

	// mul y 0
	y *= 0;

	// add y w
	y += w;

	// add y 8
	y += 8;

	// mul y x
	y *= x;

	// add z y
	z += y;
}

function part13(input) {
	// inp w
	w = input;

	x = (z % 26) - 2; // -2 - 24
	z = Math.trunc(z / 26);

	x = x === w ? 0 : 1;

	z = z * (25 * x + 1); // z * (26 or 0)

	y = (w + 15) * x; // 0 or 15-24

	z = z + y;
}
