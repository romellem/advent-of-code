const { input } = require('./input');
const { Arcade } = require('./intcode-computer');

(async () => {
	input[0] = 2;
	let arcade = new Arcade(input, { print_game: true, pause_on_output: true, replenish_input: 0 });
	await arcade.freePlay();
})();
