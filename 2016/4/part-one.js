const input = require('./input');
const isRoomValid = require('./is-room-valid');

let id_sum = 0;
input.forEach(r => {
    if (isRoomValid(r)) {
        id_sum += r.id;
    }
});

console.log(id_sum);
