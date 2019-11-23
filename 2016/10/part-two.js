const assert = require('assert');
const { input, sampleInputs } = require('./input');
const BotComparisons = require('./bot-comparisons');

let bot_comparison = new BotComparisons(input);
console.log(bot_comparison.productOfOutputs());
