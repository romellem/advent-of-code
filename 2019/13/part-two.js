const { input } = require('./input');
const { Arcade } = require('./intcode-computer');

(async () => {
    input[0] = 2;
    let arcade = new Arcade(input, { pause_on_output: true, replenish_input: -1 });
    await arcade.freePlay();

    // Memory address 0 represents the number of quarters that have been inserted;
    // set it to 2 to play for free.
    // input[0] = 2;
    // let arcade = new Arcade(input);
    // let output = arcade.run();

    // console.log(output);
})();
