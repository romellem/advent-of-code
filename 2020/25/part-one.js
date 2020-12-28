const { strictEqual } = require("assert");
const { input } = require("./input");
const [card_public_key, door_public_key] = input;

function determineLoopSize({
	public_key,
	value = 1,
	subject_number = 7,
	divisor = 20201227
} = {}) {
	let loop = 0;
	do {
		value *= subject_number;
		value %= divisor;
		++loop;
	} while (value !== public_key);

	return loop;
}

function runLoop({
	loops,
	value = 1,
	subject_number = 7,
	divisor = 20201227,
} = {}) {
	for (let i = 0; i < loops; i++) {
		value *= subject_number;
		value %= divisor;
	}

	return value;
}

let card_loop = determineLoopSize({ public_key: card_public_key });
let door_loop = determineLoopSize({ public_key: door_public_key });

const secret_key_from_door_public_key = runLoop({
	subject_number: door_public_key,
	loops: card_loop,
});
const secret_key_from_card_public_key = runLoop({
	subject_number: card_public_key,
	loops: door_loop,
});
strictEqual(secret_key_from_door_public_key, secret_key_from_card_public_key);

console.log(secret_key_from_card_public_key);
