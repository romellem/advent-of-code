import { input } from './input.js';
import { Bits } from './bits.js';
import { BitOutputStream } from '@thi.ng/bitstream';

const HEX_TO_DEC = '0123456789ABCDEF'
	.split('')
	.reduce((obj, char) => ((obj[char] = parseInt(char, 16)), obj), {});

function parseHexAs4Bits(input_str) {
	const out = new BitOutputStream(Math.ceil(input_str.length / 2));
	for (let char of input_str) {
		out.write(HEX_TO_DEC[char], 4);
	}

	return out;
}

console.log([...parseHexAs4Bits('60552F1006').reader()].join(''));

// let thing = new Bits('D2FE28');
// console.log(thing.packets);
