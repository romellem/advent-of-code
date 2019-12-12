const input = [
	// [x,  y,   z ]
	[ -16, -1, -12 ],
	[   0, -4, -17 ],
	[ -11, 11,   0 ],
	[   2,  2,  -6 ],
];

module.exports = {
	sampleInput: {
		positions: [
			[-8, -10, 0],
			[5, 5, 10],
			[2, -7, 3],
			[9, -8, -3],
		],
		energy: 1940, // After 100 steps, (29 * 10) + (32 * 19) + (41 * 14) + (52 * 9)
	},
	input,
};
