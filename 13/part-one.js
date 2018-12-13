const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Track = require('./track');

let input_file = process.argv[2] || './input.txt';
let raw_input = fs.readFileSync(path.resolve(__dirname, input_file), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let track = new Track(input);

rimraf.sync('tracklogs');
fs.mkdirSync('tracklogs');

let ticks = 0;
// let full_print = ticks + '\n' + raw_input;
fs.writeFile('tracklogs/' + ticks + '-track.txt', raw_input + '\n\n' + ticks, (err) => {})
let collision_coords;
while (!collision_coords) {
    track.tick();
    ticks++;
    // full_print += '\n\n' + ticks + '\n' + raw_input;
    fs.writeFile('tracklogs/' + ticks + '-track.txt', track.getStateString() + '\n\n' + ticks, (err) => {})

    // if ()
    collision_coords = track.getCollisionCoords();
}

console.log(collision_coords, 'after ' + ticks + ' ticks');
