import { input } from './input.js';

import { parseHexAs4Bits, parseOutPackets } from './bits.js';

const data = parseHexAs4Bits(input);
const packets = parseOutPackets(data.reader());

console.log(packets[0].value);
