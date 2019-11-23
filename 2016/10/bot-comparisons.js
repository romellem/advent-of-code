const { union } = require('lodash');
const { INIT, GIVE } = require('./input');
const sortByValue = arr => {
	return arr.sort((a, b) => a - b);
};

class BotComparisons {
	constructor(instructions_orig) {
		this.instructions = JSON.parse(JSON.stringify(instructions_orig));

		this.bots = {};
		this.outputs = {};

		// Stupid way of figuring out part one
		this.compared61 = {};
		this.compared17 = {};

		this.parseInstructions();
	}

	parseInstructions(instructions_all = this.instructions) {
		// Create all bots and outputs, with bots INITialized with their chips
		const instructions = [];
		instructions_all.forEach(instruction => {
			if (instruction.action === INIT) {
				const { bot } = instruction.goesTo;
				const { value } = instruction;
				if (!this.bots[bot]) {
					this.bots[bot] = [];
				}

				this.bots[bot].push(value);
			} else {
				// Save GIVE actions to loop through later
				instructions.push(instruction);
				/*
					action: GIVE,
					from: { bot: 1 },
					lowTo: { output: 1 },
					highTo: { bot: 0 },
				*/

				for (const key of ['from', 'lowTo', 'highTo']) {
					if (instruction[key].bot != null) {
						if (!this.bots[instruction[key].bot]) {
							this.bots[instruction[key].bot] = [];
						}
					}

					if (instruction[key].output != null) {
						if (!this.outputs[instruction[key].output]) {
							this.outputs[instruction[key].output] = [];
						}
					}
				}
			}
		});

		// Sorts bot's initial chips
		Object.values(this.bots).forEach(chips => sortByValue(chips));

		// Follow instructions
		instructions.forEach(instruction => {
			const { from, lowTo, highTo } = instruction;
			const bots_low = this.bots[from.bot].shift();
			const bots_high= this.bots[from.bot].pop();

			if (bots_low === 61 || bots_high === 61) {
				this.compared61[from.bot] = true;
			}

			if (bots_low === 17 || bots_high === 17) {
				this.compared17[from.bot] = true;
			}

			// This is too complicated / clever
			let collection_key = lowTo.bot == null ? 'outputs' : 'bots';
			const lowTo_key = collection_key === 'outputs' ? 'output' : 'bot';
			this[collection_key][lowTo[lowTo_key]].push(bots_low);
			sortByValue(this[collection_key][lowTo[lowTo_key]]);

			collection_key = highTo.bot == null ? 'outputs' : 'bots';
			const highTo_key = collection_key === 'outputs' ? 'output' : 'bot';
			this[collection_key][highTo[highTo_key]].push(bots_high);
			sortByValue(this[collection_key][highTo[highTo_key]]);
		});
	}

	whichBotCompared61And17() {
		const bots_who_compared_both = union(Object.keys(this.compared61), Object.keys(this.compared17));
		if (bots_who_compared_both.length === 1) {
			return bots_who_compared_both[0];
		} else {
			throw new Error(`More than one bot compared 61 and 17 chips: [${bots_who_compared_both.join(', ')}]`);
		}
	}
}

module.exports = BotComparisons;
