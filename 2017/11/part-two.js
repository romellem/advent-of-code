const { input } = require('./input');
const { Hex } = require('./hex-grid-red-blob');

let route = new Hex(0, 0, 0);
let max_distance_away = 0;
input.forEach(step => {
    route = route.add(Hex.direction(step));

    let distance = route.len();
    if (distance > max_distance_away) {
        max_distance_away = distance;
    }
});

console.log(max_distance_away);
