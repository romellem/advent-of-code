import { strictEqual } from 'assert';
import { input, sampleInputPartOne } from './input.js';

import { parseHexAs4Bits, parseOutPackets, packetsIter } from './bits.js';

for (let [sample_input, sample_version_sum] of sampleInputPartOne) {
	const sample_data = parseHexAs4Bits(sample_input);

	const sample_packets = parseOutPackets(sample_data.reader());

	const version_sum = [...packetsIter(sample_packets)].reduce((a, b) => a + b, 0);

	strictEqual(version_sum, sample_version_sum);
}

const data = parseHexAs4Bits(input);
const packets = parseOutPackets(data.reader());
const version_sum = [...packetsIter(packets)].reduce((a, b) => a + b, 0);

console.log(version_sum);
