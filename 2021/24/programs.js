// 9:14
function part1(input) {
	w = input;

	x = 1;
	y = w + 5; // 9 = 6 - 14
	z = y; // z = 6-14
}

// 9:382
function part2(input) {
	w = input;

	x = 1;
	y = w + 9; // Y = 10 - 18
	z = z * 26 + y; // 166 - 382
}

// 9:9945
function part3(input) {
	w = input;

	x = 1;
	y = w + 4; // 5 - 13
	z = z * 26 + y; // 4321 - 9945
}

// 2:6
function part4(input) {
	// inp w
	w = input;

	x = z % 26; // 5 - 13 (since z is a `multiple of 26 plus y`) (theoretically 0-25)
	x = x - 12; // -7 - 1 (-12 - 13)
	x = x === w ? 0 : 1; // Only true if input is `1`

	y = w + 4 + x; // 6 - 13
	z = y;
}

// 9:(6*26)+19=175
function part5(input) {
	w = input;

	x = 1;
	y = w + 10; // Y = 11 - 19
	z = z * 26 + y; // 167 - 357
}

function part6(input) {
	w = input;

	z = Math.trunc(z / 26); // 6 - 13 (since z was `(6-13)*26 + (11-19)`, it effectively rounds off the (11-19) addition)
	x = (z % 26) - 13; // (6 - 13) - 13 = -7 - 0
	x = x === w ? 0 : 1; // Can never be true, x = 1

	z = z * (25 * x + 1); // (6-13) * 26
	y = (w + 14) * x; // 15-23

	z = z + y; // [(6-13) * 26] + (15-23)
}

function part7(input) {
	// inp w
	w = input;

	x = (z % 26) - 9; // 6 - 14

	z = Math.trunc(z / 26); // 6 - 13

	x = x === w ? 0 : 1; // Could be true if input is 6-9

	y = 25 * x + 1; // 1 or 26

	z *= y; // (6-13) * (1 or 26)

	y = (w + 14) * x;

	z = z + y;
}

function part8(input) {
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

	// add x -12
	x += -12;

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

	// add y 12
	y += 12;

	// mul y x
	y *= x;

	// add z y
	z += y;
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

	// div z 1
	z = Math.trunc(z / 1);

	// add x 14
	x += 14;

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

function part12(input) {
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

function part13(input) {
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

function part14(input) {
	// inp w
	w = input;

	x = (z % 26) - 2; // -2 - 24
	z = Math.trunc(z / 26);

	x = x === w ? 0 : 1;

	z = z * (25 * x + 1); // z * (26 or 0)

	y = (w + 15) * x; // 0 or 15-24

	z = z + y;
}
