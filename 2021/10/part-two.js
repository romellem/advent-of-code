const { input } = require('./input');
const { getLineStatus, chars, INCOMPLETE_SCORE } = require('./syntax');

const incomplete_scores = input
	.reduce((scores, line) => {
		const status = getLineStatus(line);
		if (status.incomplete) {
			const completion_string = status.stack.map((c) => chars[c]);
			// console.log(completion_string.join(''));
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

// 942679657 is too low
const middle_score = incomplete_scores[Math.floor(incomplete_scores.length / 2)];

// console.log(middle_score);

function scoreIncomplete(remaining) {
	let a = remaining.split('').reduce((sum, char) => {
		sum *= 5;
		sum += INCOMPLETE_SCORE[char];
		return sum;
	}, 0);

	console.log(a);
	return a;
}

let sss = [
	scoreIncomplete('}}]])})]'), // 288957 total points.
	scoreIncomplete(')}>]})'), // 5566 total points.
	scoreIncomplete('}}>}>))))'), // 1480781 total points.
	scoreIncomplete(']]}}]}]}>'), // 995444 total points.
	scoreIncomplete('])}>'),
].sort((a, b) => a - b); // 294 total points.

const mm = sss[Math.floor(sss.length / 2)];

console.log(mm);
