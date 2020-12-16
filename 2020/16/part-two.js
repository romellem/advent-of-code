const { rules, your_ticket, nearby_tickets } = require('./input');
const { getInvalidValueFromTicket } = require('./ticket');

const valid_tickets = nearby_tickets.filter(
	(ticket) => getInvalidValueFromTicket(rules, ticket) === undefined
);
