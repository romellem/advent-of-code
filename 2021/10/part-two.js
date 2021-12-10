const { input } = require('./input');
const { score, getLineStatus, chars, INCOMPLETE_SCORE } = require('./syntax');

const incomplete_scores = input
	.reduce((scores, line) => {
		const status = getLineStatus(line);
		if (status.incomplete) {
			const completion_string = status.stack.map((c) => chars[c]);
			const completion_score = completion_string.reduce((sum, char) => {
				sum *= 5;
				sum += INCOMPLETE_SCORE[char];
				return sum;
			}, 0);
			scores.push(completion_score);
		}

		return scores;
	}, [])
	.sort((a, b) => a - b);

const middle_score = incomplete_scores[Math.floor(incomplete_scores.length / 2)];

console.log(middle_score);
