const fs = require('fs');
const path = require('path');
const Track = require('./track');

let input_file = process.argv[2] || './input.txt';
let raw_input = fs.readFileSync(path.resolve(__dirname, input_file), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let track = new Track(input);

let ticks = 0;
while (true) {
    // `track.tick()` will `process.exit()` when it finds a collision... sorry.
    track.tick();
    ticks++;
}

