const intersection = (...arrs) => {
	const counts = {};
	for (let arr of arrs) {
		const unique = [...new Set(arr)];

		for (let val of unique) {
			if (!counts[val]) {
				counts[val] = 0;
			}
			counts[val]++;
		}
	}

	const intersected = Object.entries(counts)
		.filter(([char, count]) => count === arrs.length)
		.map(([char]) => char);

	return intersected;
};

module.exports = {
	intersection,
};
