const input = require('./input');
const Forest = require('./forest');

let forest = new Forest(input);

/**
 * This won't finish for a LONG time. However, like the problem before,
 * the trick is to check for a pattern in the numbers that come out.
 * So, run this with `node 2018/18/part-two.js | tee part-two.log.txt`
 * then look at the numbers that came out to try and find a pattern.
 * 
 * @update
 * So after looking at the log file this spit out, a pattern emerges
 * pretty quickly. A random number that I noticed was cyclic was `178097`
 * after minute 564 (I say "random" because its possible the pattern
 * starts a bit earlier, but it doesn't really matter. You'll see why in
 * a sec.). The next time when `178097` is visible is at minute `592`,
 * meaning we have a cycle of `592 - 564 = **28**` minutes.
 * 
 * Therefore to find the 1,000,000,000th value, just calculate
 * `(1,000,000,000 - 564) % 28`. That answer to that is _16_, so
 * we look at the _17th_ item in our list (because we start counting
 * at 0 because of the modulus), to give an answer of:
 * 
 * **212176**
 */
for (let i = 0; i < 1000000000; i++) {
    forest.tick();
    console.log(forest.getTotalResources());
}

