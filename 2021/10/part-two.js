const { input } = require('./input');
const { getLineStatus, chars, INCOMPLETE_SCORE } = require('./syntax');

const incomplete_scores = input
	.reduce((scores, line) => {
		const status = getLineStatus(line);
		if (status.incomplete) {
			// I need to reverse the stack first to get the correct "completion" order
			const completion_string = status.stack.reverse().map((c) => chars[c]);
			console.log(completion_string.join(''));
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
