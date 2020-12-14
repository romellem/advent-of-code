const { input, sampleInput } = require('./input');
const { Map } = require('./map');

let map = new Map({ directions: input, debug: false, useWaypoint: true });
map.run();
console.log(map.getDistanceFromCurrentLocationTo(0, 0));
