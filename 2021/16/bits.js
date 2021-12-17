import { BitOutputStream } from '@thi.ng/bitstream';

export const OPS = {
	SUM: 0,
	PRODUCT: 1,
	MINIMUM: 2,
	MAXIMUM: 3,
	LITERAL: 4,
	GREATER_THAN: 5,
	LESS_THAN: 6,
	EQUAL_TO: 7,
};

export const HEX_TO_DEC = '0123456789ABCDEF'
	.split('')
	.reduce((obj, char) => ((obj[char] = parseInt(char, 16)), obj), {});

export function parseHexAs4Bits(input_str) {
	// Sizing the buffer is an optimizaiton, BitOutputStream will resize if it needs to
	const out = new BitOutputStream(Math.ceil(input_str.length / 2));
	for (let char of input_str) {
		out.write(HEX_TO_DEC[char], 4);
	}

	return out;
}

export function parseOutPackets(stream, packets = [], condition = null, depth = 0) {
	if (!condition) {
		// Minimum amount to read is a LITERAL value of 11 bits, so check against that.
		condition = () => stream.position + 3 + 3 + 5 < stream.length;
	}

	while (condition()) {
		try {
			/**
			 * The first three bits encode the packet version,
			 * and the next three bits encode the packet type ID.
			 */
			const version = stream.read(3);
			const type = stream.read(3);

			if (type === OPS.LITERAL) {
				const value_stream = new BitOutputStream();
				let should_continue;
				do {
					should_continue = stream.readBit();
					value_stream.write(stream.read(4), 4);
				} while (should_continue);

				const value_bits = [...value_stream.reader()].join('');
				const value = parseInt(value_bits, 2);

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
				const will_read_bits = length_type === 0;

				const length_value = will_read_bits ? stream.read(15) : stream.read(11);

				const end_position = stream.position + length_value;

				let packet = new Operator(version, type);
				packets.push(packet);

				// We have different conditions to continue reading subpackets depending on length type
				const newCondition = will_read_bits
					? () => stream.position < end_position
					: () => packet.length < length_value;

				// `depth` was just used for debugging, but it's not needed
				parseOutPackets(stream, packet.subpackets, newCondition, depth + 1);
			}
		} catch (e) {
			/**
			 * Reading beyond the length of the stream throws an error, typically
			 * due to `0` padding at the end of our binrary stream. When this happens,
			 * it can safely be ignored and our packets can be returned.
			 */
			console.warn('error');
			return packets;
		}
	}

	return packets;
}

export function* packetsIter(packets) {
	for (let packet of packets) {
		yield* packet;
	}
}

export class Packet {
	constructor(version, type) {
		this.version = version;
		this.type = type;
	}
}

export class Literal extends Packet {
	constructor(version, type, value) {
		super(version, type);
		this.value = value;
	}

	*[Symbol.iterator]() {
		yield this;
	}
}

export class Operator extends Packet {
	constructor(version, type) {
		super(version, type);
		this.subpackets = [];
	}

	get length() {
		return this.subpackets.length;
	}

	*[Symbol.iterator]() {
		yield this;
		for (let subpacket of this.subpackets) {
			yield* subpacket;
		}
	}

	// @todo cache these return values
	get value() {
		switch (this.type) {
			case OPS.SUM: {
				let sum = 0;

				for (let p of this.subpackets) {
					sum += p.value;
				}
				return sum;
			}
			case OPS.PRODUCT: {
				let prod = 1;

				for (let p of this.subpackets) {
					prod *= p.value;
				}
				return prod;
			}
			case OPS.MINIMUM: {
				let min = this.subpackets[0].value;

				for (let i = 1; i < this.subpackets.length; i++) {
					let p = this.subpackets[i];
					let v = p.value;
					if (v < min) {
						min = v;
					}
				}
				return min;
			}
			case OPS.MAXIMUM: {
				let max = this.subpackets[0].value;

				for (let i = 1; i < this.subpackets.length; i++) {
					let p = this.subpackets[i];
					let v = p.value;
					if (v > max) {
						max = v;
					}
				}
				return max;
			}
			case OPS.GREATER_THAN: {
				return this.subpackets[0].value > this.subpackets[1].value ? 1 : 0;
			}
			case OPS.LESS_THAN: {
				return this.subpackets[0].value < this.subpackets[1].value ? 1 : 0;
			}
			case OPS.EQUAL_TO: {
				return this.subpackets[0].value === this.subpackets[1].value ? 1 : 0;
			}
			default:
				throw 'Invalid Op';
		}
	}
}
