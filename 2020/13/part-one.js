const { input } = require('./input');
const { findEarliestBus } = require('./bus');

const { earliest_departure, bus_ids } = input;

const { bus, departure_time } = findEarliestBus(earliest_departure, bus_ids);
console.log({ bus, departure_time });
console.log(bus * (departure_time - earliest_departure));
