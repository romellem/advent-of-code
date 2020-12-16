const { rules, your_ticket, nearby_tickets } = require('./input');
const { getInvalidValues } = require('./ticket');

let invalid_values_sum = getInvalidValues(rules, nearby_tickets).reduce((a, b) => a + b, 0);
console.log(invalid_values_sum);
