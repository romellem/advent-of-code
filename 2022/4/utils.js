const intersection = (...arrs) => {
	const counts = new Map();
	for (let arr of arrs) {
		const unique = [...new Set(arr)];

		for (let val of unique) {
			if (!counts.has(val)) {
				counts.set(val, 0);
			}
			const current_count = counts.get(val);
			counts.set(val, current_count + 1);
		}
	}

	const intersected = [...counts.entries()]
		.filter(([key, count]) => count === arrs.length)
		.map(([key]) => key);

	return intersected;
};

const range = (from, to, inclusive = true) => {
	if (to < from) {
		// Swap values if `from` is not less than `to`
		[from, to] = [to, from];
	}

	const size = to - from + (inclusive ? 1 : 0);

	return Array(size)
		.fill()
		.map((_, i) => i + from);
};

module.exports = {
	intersection,
	range,
};
