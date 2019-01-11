const input = require('./input');
const decryptRooms = require('./decrypt-rooms');

let rooms = input.map(r => decryptRooms(r)).filter(r => r.decryptedName.includes('northpole'))
let room = rooms[0];

console.log(`Room with name ${room.decryptedName} has ID of:\n${room.id}`);

