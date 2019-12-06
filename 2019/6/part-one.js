const { input } = require('./input');
const OrbitMap = require('./orbit-map');

let orbit_map = new OrbitMap(input);
console.log(orbit_map.getTotalOrbits());
