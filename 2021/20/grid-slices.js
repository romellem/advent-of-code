// Negative `y` is "up"
const slices = {
	// ###
	// #.#
	// ###
	center: [
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[0, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
	],

	// ###
	// ###
	// ##.
	bottomRight: [
		[-2, -2],
		[-1, -2],
		[0, -2],
		[-2, -1],
		[-1, -1],
		[0, -1],
		[-2, 0],
		[-1, 0],
		[0, 0],
	],

	// ###
	// ###
	// .##
	bottomLeft: [
		[0, -2],
		[1, -2],
		[2, -2],
		[0, -1],
		[1, -1],
		[2, -1],
		[0, 0],
		[1, 0],
		[2, 0],
	],

	// .##
	// ###
	// ###
	topLeft: [
		[0, 0],
		[1, 0],
		[2, 0],
		[0, 1],
		[1, 1],
		[2, 1],
		[0, 2],
		[1, 2],
		[2, 2],
	],

	// ##.
	// ###
	// ###
	topRight: [
		[-2, 0],
		[-1, 0],
		[0, 0],
		[-2, 1],
		[-1, 1],
		[0, 1],
		[-2, 2],
		[-1, 2],
		[0, 2],
	],

	// ###
	// .##
	// ###
	left: [
		[0, -1],
		[1, -1],
		[2, -1],
		[0, 0],
		[1, 0],
		[2, 0],
		[0, 1],
		[1, 1],
		[2, 1],
	],

	// ###
	// ##.
	// ###
	right: [
		[-2, -1],
		[-1, -1],
		[0, -1],
		[-2, 0],
		[-1, 0],
		[0, 0],
		[-2, 1],
		[-1, 1],
		[0, 1],
	],

	// #.#
	// ###
	// ###
	top: [
		[-1, 0],
		[0, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
		[-1, 2],
		[0, 2],
		[1, 2],
	],

	// ###
	// ###
	// #.#
	bottom: [
		[-1, -2],
		[0, -2],
		[1, -2],
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[0, 0],
		[1, 0],
	],
};

module.exports = {
	slices,
};