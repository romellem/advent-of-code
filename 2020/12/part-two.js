const { input, sampleInput } = require('./input');
const { Map } = require('./map');

let map = new Map({ directions: input, useWaypoint: true });
map.run();
let distance = map.getDistanceFromCurrentLocationTo(0, 0);
console.log(distance);
