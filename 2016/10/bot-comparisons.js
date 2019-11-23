const { union } = require('lodash');
const { INIT, GIVE } = require('./input');
const sortByValue = arr => {
	return arr.sort((a, b) => a - b);
};

class BotComparisons {
	constructor(instructions_orig) {
		this.instructions = JSON.parse(JSON.stringify(instructions_orig));

		this.bots = {};
		this.botsCompared = {};
		this.outputs = {};

		// Stupid way of figuring out part one
		this.compared61 = {};
		this.compared17 = {};
		this.comparedBoth61And17 = {};

		this.parseInstructions();
	}

	parseInstructions(instructions_all = this.instructions) {
		// Create all bots and outputs, with bots INITialized with their chips
		let instructions = [];
		instructions_all.forEach(instruction => {
			if (instruction.action === INIT) {
				const { bot } = instruction.goesTo;
				const { value } = instruction;
				if (!this.bots[bot]) {
					this.bots[bot] = [];
				}

				this.botsCompared[bot] = [];

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

						this.botsCompared[instruction[key].bot] = [];
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
		while (instructions.length) {
			const new_instructions = [];
			for (let instruction of instructions) {
				const { from, lowTo, highTo } = instruction;
				if (this.bots[from.bot].length < 2) {
					new_instructions.push(instruction);
					continue;
				}

				const bots_low = this.bots[from.bot].shift();
				const bots_high = this.bots[from.bot].pop();

				if (bots_low == null || bots_high == null) {
					throw new Error(from.bot + ' compared ' + bots_low + ' and ' + bots_high);cc
				}

				this.botsCompared[from.bot].push(bots_low + ',' + bots_high);

				// This is too complicated / clever
				let collection_key = lowTo.bot == null ? 'outputs' : 'bots';
				const lowTo_key = collection_key === 'outputs' ? 'output' : 'bot';
				this[collection_key][lowTo[lowTo_key]].push(bots_low);
				sortByValue(this[collection_key][lowTo[lowTo_key]]);

				collection_key = highTo.bot == null ? 'outputs' : 'bots';
				const highTo_key = collection_key === 'outputs' ? 'output' : 'bot';
				this[collection_key][highTo[highTo_key]].push(bots_high);
				sortByValue(this[collection_key][highTo[highTo_key]]);
			}

			instructions = new_instructions;
		}
	}

	whichBotCompared61And17() {
		for (let [bot, compared_arr] of Object.entries(this.botsCompared)) {
			if (compared_arr.includes('17,61')) {
				console.log(+bot);
			}
		}
	}

	productOfOutputs(outputs = [0, 1, 2]) {
		return outputs.map(c => this.outputs[c][0]).reduce((a, b) => a * b, 1);
	}
}

module.exports = BotComparisons;
