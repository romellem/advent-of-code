const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

// prettier-ignore
const sampleInputs = [
	{
		maze:
`#########
#b.A.@.a#
#########`,
		steps: 8,
		keys: ['a', 'b'],
	},
	{
		maze:
`########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`,
		steps: 86,
		keys: ['a', 'b', 'c', 'd', 'e', 'f'],
	},
	{
		maze:
`########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`,
		steps: 132,
		keys: ['b', 'a', 'c', 'd', 'f', 'e', 'g'],
	},
	{
		maze:
`#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`,
		steps: 136,
		keys: ['a', 'f', 'b', 'j', 'g', 'n', 'h', 'd', 'l', 'o', 'e', 'p', 'c', 'i', 'k', 'm'],
	},
	{
		maze:
`########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`,
		steps: 81,
		keys: ['a', 'c', 'f', 'i', 'd', 'g', 'b', 'e', 'h'],
	},
];

module.exports = {
	input,
	sampleInputs,
};
