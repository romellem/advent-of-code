function play(p1, p2) {
	while (p1.length && p2.length) {
		let p1_top = p1.shift();
		let p2_top = p2.shift();

		if (p1_top > p2_top) {
			p1.push(p1_top, p2_top);
		} else {
			p2.push(p2_top, p1_top);
		}
	}

	let winner = p1.length ? p1.reverse() : p2.reverse();
	let score = winner.map((v, i) => v * (i + 1)).reduce((a, b) => a + b, 0);

	return score;
}

function recursivePlay(p1, p2, depth = 0) {
    // process.stdout.write(depth + '\r')
	let played = {};
	while (p1.length && p2.length) {
		let check = p1.join('') + '+' + p2.join('');
		if (played[check]) {
			return 'p1';
		}
		played[check] = true;

		let p1_top = p1.shift();
		let p2_top = p2.shift();

		if (p1_top <= p1.length && p2_top <= p2.length) {
			let winner = recursivePlay(p1.slice(0), p2.slice(0), depth + 1);
			if (winner === 'p1') {
				p1.push(p1_top, p2_top);
			} else if (winner === 'p2') {
				p2.push(p2_top, p1_top);
			} else {
				throw winner;
			}
		} else if (p1_top > p2_top) {
			p1.push(p1_top, p2_top);
		} else if (p1_top < p2_top) {
			p2.push(p2_top, p1_top);
		} else {
            throw [p1, p2]
        }
	}

	if (depth === 0) {
		let winner = p1.length ? p1.reverse() : p2.reverse();
		let score = winner.map((v, i) => v * (i + 1)).reduce((a, b) => a + b, 0);

        console.log('=========\n=======')
		return score;
	} else {
		return p1.length ? 'p1' : 'p2';
	}
}

module.exports = { play, recursivePlay };
