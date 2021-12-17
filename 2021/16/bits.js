import { BitInputStream, BitOutputStream } from '@thi.ng/bitstream';

const LITERAL = 4;

const HEX_TO_DEC = '0123456789ABCDEF'
	.split('')
	.reduce((obj, char) => ((obj[char] = parseInt(char, 16)), obj), {});

function parseHexAs4Bits(input_str) {
	// Sizing the buffer is an optimizaiton, BitOutputStream will resize if it needs to
	const out = new BitOutputStream(Math.ceil(input_str.length / 2));
	for (let char of input_str) {
		out.write(HEX_TO_DEC[char], 4);
	}

	return out;
}

function parseOutPackets(stream, packets = [], operator_length = { type, value }) {
	while (stream.position < stream.length) {
		/**
		 * The first three bits encode the packet version,
		 * and the next three bits encode the packet type ID.
		 */
		const version = stream.read(3);
		const type = stream.read(3);
		let value_stream;
		if (type === LITERAL) {
			value_stream = new BitOutputStream();
			let should_continue;
			do {
				should_continue = stream.readBit();
				value_stream.write(stream.read(4), 4);
			} while (should_continue);

			const value_bits = [...value_stream.reader()].join('');
			const value = parseInt(value_bits, 2);

			// Flush any padded zeros
			if (stream.position % 4) {
				const bits_left = 4 - (stream.position % 4);
				stream.read(bits_left);
			}

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
			operator_length.type = stream.readBit();
			operator_length.value = length_type === 0 ? stream.read(15) : stream.read(11);
		}
	}

	return packets;
}

export class Bits {
	constructor(input) {
		/** @type {BitOutputStream} */
		this.data = Bits.parseHexAs4Bits(input);

		this.packets = this.parsePacketHierarchy();
	}

	/**
	 * @param {String} input_str
	 * @returns {BitOutputStream}
	 */
	static parseHexAs4Bits(input_str) {
		const out = new BitOutputStream(Math.ceil(input_str.length / 2));
		for (let char of input_str) {
			out.write(HEX_TO_DEC[char], 4);
		}

		return out;
	}

	parsePacketHierarchy(data = this.data) {
		const stream = data.reader();

		const packets = [];
		try {
			while (stream.position < stream.length) {
				/**
				 * The first three bits encode the packet version,
				 * and the next three bits encode the packet type ID.
				 */
				const version = stream.read(3);
				const type = stream.read(3);
				let value_stream;
				if (type === LITERAL) {
					value_stream = new BitOutputStream();
					let should_continue;
					do {
						should_continue = stream.readBit();
						value_stream.write(stream.read(4), 4);
					} while (should_continue);

					const value_bits = [...value_stream.reader()].join('');
					const value = parseInt(value_bits, 2);

					// Flush any padded zeros
					if (stream.position % 4) {
						const bits_left = 4 - (stream.position % 4);
						stream.read(bits_left);
					}

					packets.push(new Packet(version, type, value));
				} else {
					/**
					 * Operator packet
					 *
					 * An operator packet can use one of two modes indicated by
					 * the bit immediately after the packet header; this is called the _length type ID_.
					 * - If the length type ID is 0, then the next 15 bits are a
					 *    number that represents the total length in bits of the sub-packets
					 *    contained by this packet.
					 * - If the length type ID is 1, then the next 11 bits are a
					 *   number that represents the number of sub-packets immediately
					 *   contained by this packet.
					 */
					const length_type = stream.readBit();
					if (length_type === 0) {
						const sub_packet_bit_length = stream.read(15);
					} else {
						const sub_packet_count = stream.read(11);
					}
				}
			}
		} catch (e) {
			console.error('ERROR READING STREAM', e);
		}

		return packets;
	}
}

class Packet {
	constructor(version, type, value) {
		this.version = version;
		this.type = type;
	}
}

class Literal extends Packet {
	constructor(version, type, value) {
		super(version, type);
		this.value = value;
	}
}

class Operator extends Packet {
	constructor(version, type) {
		super(version, type);
	}
}
