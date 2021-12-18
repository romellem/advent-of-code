function add(...pairs) {
	let new_pair_tokens = ['['];

	for (let i = 0; i < pairs.length; i++) {
		if (i !== 0) {
			// Join pairs on commas
			new_pair_tokens.push(',');
		}

		// Push pairs to keep from reparsing out digits
		new_pair_tokens.push(...pair);
	}
	new_pair_tokens.push(']');

	return new_pair_tokens;
}

module.exports = {
	add,
};
