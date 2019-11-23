const assert = require('assert');
const { input, sampleInputs } = require('./input');
const BotComparisons = require('./bot-comparisons');

let bot_comparison = new BotComparisons(input);
bot_comparison.whichBotCompared61And17();
