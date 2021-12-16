import { BitInputStream, BitOutputStream } from '@thi.ng/bitstream';

const LITERAL = 4;

const HEX_TO_DEC = '0123456789ABCDEF'
	.split('')
	.reduce((obj, char) => ((obj[char] = parseInt(char, 16)), obj), {});

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
			}

			const view = new DataView(value_stream.bytes());
			const value = view.getUint32(0, true);

			// Flush any padded zeros
			stream.read(stream.position % 8);

			packets.push(new Packet(version, type, value));
		}

		return packets;
	}
}

export class Packet {
	constructor(version, type, value) {
		this.version = version;
		this.type = type;
		this.value = value;
	}
}
