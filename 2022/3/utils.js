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

const chunk = (arr, num) => {
	const chunks = [];
	const end = Math.ceil(arr.length / num);

	for (let i = 0; i < end; i++) {
		const from = i * num;
		const to = (i + 1) * num;
		chunks.push(arr.slice(from, to));
	}

	return chunks;
};

module.exports = {
	intersection,
	chunk,
};
