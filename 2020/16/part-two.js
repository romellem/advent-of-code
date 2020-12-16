const { rules, your_ticket, nearby_tickets } = require('./input');
const { getInvalidValueFromTicket, determineOrderingOfTicketFields } = require('./ticket');

const valid_tickets = nearby_tickets.filter(
	(ticket) => getInvalidValueFromTicket(rules, ticket) === undefined
);

let ordering = determineOrderingOfTicketFields(rules, valid_tickets);

let your_ticket_departure_fields = your_ticket.filter((value, field_index) => {
	let { name: field_name } = ordering[field_index];
	return field_name.startsWith('departure');
});

let your_ticket_departure_fields_product = your_ticket_departure_fields.reduce((a, b) => a * b, 1);
console.log(your_ticket_departure_fields_product);
