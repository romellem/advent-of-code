const path = require('path');
const fs = require('fs');

const [rules_raw, your_ticket_raw, nearby_tickets_raw] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const rules = rules_raw
	.trim()
	.split('\n')
	.map((rule) => {
		// @example 'arrival track: 44-358 or 371-974'
		let [, rule_name, range_a, range_b] = /^(.+): ([\d\-]+) or ([\d\-]+)/.exec(rule);
		let ranges = [
			range_a.split('-').map((v) => parseInt(v, 10)),
			range_b.split('-').map((v) => parseInt(v, 10)),
		];
		return {
			name: rule_name,
			ranges,
		};
	});

// @example `your ticket:
// 73,101,67,97,149,53,89,113,79,131,71,127,137,61,139,103,83,107,109,59`
const your_ticket = your_ticket_raw
	.trim()
	.split('\n')[1]
	.split(',')
	.map((v) => parseInt(v, 10));

// @example `nearby tickets:
// 279,705,188,357,892,488,741,247,572,176,760,306,410,861,507,906,179,501,808,245
// 51,436,407,893,228,722,213,239,813,460,415,571,95,98,116,138,811,552,164,813`...
const nearby_tickets = nearby_tickets_raw
	.trim()
	.slice(nearby_tickets_raw.trim().indexOf('\n') + 1)
	.split('\n')
	.map((ticket) => ticket.split(',').map((v) => parseInt(v, 10)));

module.exports = {
	rules,
	your_ticket,
	nearby_tickets,
};
