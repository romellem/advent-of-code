const { input } = require('./input');
const Moons = require('./moons');

let system = new Moons(input);

// Won't work due to event loop being blocked
// process.on('SIGINT', function() {
//     console.log('Ran for', system.time, 'ticks before exit');
//     console.log(system._.join('\n'));
//     process.exit();
// });

console.log(system.orbitUntilRepeat());
