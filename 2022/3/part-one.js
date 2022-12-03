const { input } = require('./input');
const _ = require('lodash');

let data = input.map(([l, r]) => {
	let [same] = _.intersection(l.split(''), r.split(''));
	if (same.toLowerCase() === same) {
		return same.charCodeAt(0) - 97 + 1;
	} else {
		return same.charCodeAt(0) - 65 + 27;
	}
});
console.log(data.reduce((a, b) => a + b));
