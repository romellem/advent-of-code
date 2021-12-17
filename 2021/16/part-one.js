import { input, sampleInputPartOne } from './input.js';
// const input = '8A004A801A8002F478';
import { BitInputStream, BitOutputStream } from '@thi.ng/bitstream';

const LITERAL = 4;

let q = 0;

const HEX_TO_DEC = '0123456789ABCDEF'
	.split('')
	.reduce((obj, char) => ((obj[char] = parseInt(char, 16)), obj), {});

// for (let [char, value] of Object.entries(HEX_TO_DEC)) {
// 	console.log(char, value.toString(2).padStart(4, '0'));
// }

function parseHexAs4Bits(input_str) {
	// Sizing the buffer is an optimizaiton, BitOutputStream will resize if it needs to
	const out = new BitOutputStream(Math.ceil(input_str.length / 2));
	for (let char of input_str) {
		out.write(HEX_TO_DEC[char], 4);
	}

	return out;
}

function parseOutPackets(stream, packets = [], condition = null, depth = 0) {
	if (!condition) {
		condition = () => stream.position + 6 < stream.length;
	}

	while (condition()) {
		try {
			/**
			 * The first three bits encode the packet version,
			 * and the next three bits encode the packet type ID.
			 */
			const version = stream.read(3);
			const type = stream.read(3);

			if (type === LITERAL) {
				const value_stream = new BitOutputStream();
				let should_continue;
				do {
					should_continue = stream.readBit();
					value_stream.write(stream.read(4), 4);
				} while (should_continue);

				const value_bits = [...value_stream.reader()].join('');
				const value = parseInt(value_bits, 2);

				// // Flush any padded zeros
				// if (stream.position % 4) {
				// 	const bits_left = 4 - (stream.position % 4);
				// 	if (stream.position + bits_left < stream.length) {
				// 		stream.read(bits_left);
				// 	}
				// }

				packets.push(new Literal(version, type, value));
			} else {
				/**
				 * Operator packet
				 *
				 * An operator packet can use one of two modes indicated by
				 * the bit immediately after the packet header; this is called the _length type ID_.
				 * - If the length type ID is 0, then the next 15 bits are a
				 *   number that represents the total length in bits of the sub-packets
				 *   contained by this packet.
				 * - If the length type ID is 1, then the next 11 bits are a
				 *   number that represents the number of sub-packets immediately
				 *   contained by this packet.
				 */
				const length_type = stream.readBit();
				const read_bits = length_type === 0;

				const length_value = read_bits ? stream.read(15) : stream.read(11);

				const end_position = stream.position + length_value;

				let packet = new Operator(version, type);
				packets.push(packet);

				const newCondition = read_bits
					? () => stream.position < end_position
					: () => packet.length < length_value;

				parseOutPackets(stream, packet.subpackets, newCondition, depth + 1);
			}
		} catch (e) {
			console.warn(++q, 'Error');
			return packets;
		}
	}

	return packets;
}

function* packetsIter(packets) {
	for (let packet of packets) {
		yield* packet;
	}
}

class Packet {
	constructor(version, type) {
		this.version = version;
		this.type = type;
	}
}

class Literal extends Packet {
	constructor(version, type, value) {
		super(version, type);
		this.value = value;
	}

	*[Symbol.iterator]() {
		yield this.version;
	}
}

class Operator extends Packet {
	constructor(version, type) {
		super(version, type);
		this.subpackets = [];
		this.subpackets.parent = this;
	}

	get length() {
		return this.subpackets.length;
	}

	*[Symbol.iterator]() {
		yield this.version;
		for (let subpacket of this.subpackets) {
			yield* subpacket;
		}
	}
}

// const [input_str, expected_sum] = [...sampleInputPartOne][1];

// const data = parseHexAs4Bits(input_str);
// console.log([...data.reader()].join(''));

// let top_packets = [];
// let data_stream = data.reader();
// const packets = parseOutPackets(data_stream, top_packets);

// console.log([...packetsIter(top_packets)].reduce((a, b) => a + b, 0));
// console.log('Expected:', expected_sum, '\n\n');

// for (let [input_str, expected_sum] of sampleInputPartOne) {
const input_str = input;
const data = parseHexAs4Bits(input_str);

let top_packets = [];
let data_stream = data.reader();
const packets = parseOutPackets(data_stream, top_packets);

console.log([...packetsIter(top_packets)].reduce((a, b) => a + b, 0));
// console.log('Expected:', expected_sum, '\n\n');
// }
