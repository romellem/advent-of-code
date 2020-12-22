function play(p1, p2) {
	while (!p1.isEmpty() && !p2.isEmpty()) {
		let p1_top = p1.shift();
		let p2_top = p2.shift();

		if (p1_top > p2_top) {
			p1.push(p1_top, p2_top);
		} else {
			p2.push(p2_top, p1_top);
		}
	}

	let p1_a = p1.toArray().reverse();
	let p2_a = p2.toArray().reverse();
	console.log(p1_a);
	console.log(p2_a);

	let a = p1_a.map((v, i) => v * (i + 1)).reduce((a, b) => a + b, 0);
	let b = p2_a.map((v, i) => v * (i + 1)).reduce((a, b) => a + b, 0);

	return a + b;
}

module.exports = { play };
