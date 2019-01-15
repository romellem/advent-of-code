const { uniq } = require('lodash');
const { input, sampleInput, sampleInput2 } = require('./input');

// Coment from my previous commit where I looked up a working solution,
// and use their logic to figure out the best way to calculate the answer.
//
// Short version: I need to go in reverse! Rather than start at 'e' and branch
// out to all the other versions, I start at my final version, and keep shrinking
// it until to I get to 'e'.
/*
    After ~700,000,000 iterations, I still haven't found a solution
    
    So, I googled it, and the answer actually totally makes sense. Rather
    than trying to _grow_ our molecule from the `e` starting point, instead
    start at the finished molecule and work backwards until to arrive at
    `e`!
    
    I found a program that did this, and from what I can, they start with
    their molecule, then go through and do a single replacement with all
    possible transforms (going backwards, that is). For instance, if a
    normal growth is `B => TiRnFAr`, then find all instances of 'TiRnFAr'
    and replace them with a B. Do this for every possible transformation
    where there is a match.
    
    There is a good chance the list will contain doubles around iteration 1
    or 2 (think about it, Say I have `A => Ca` and `B => Ca` and starting
    from `CaCaQ`, I run `A => Ca` to get `ACaQ` then on the second iteration
    I run `B => Ca` to get `ABQ`, that is the same if I flipped those steps
    [first getting `CaBQ` next `ABQ`]), so we'll want to `uniq` that list.
    Additionally, the list we'll generate will be pretty huge, but some will
    have been reduced quick than others. So, sort our list by size, and take
    the smallest, say 1,000 molecules. That number I'm pretty sure is just a
    guess, but we want it large enough that we don't accidentally throw away
    the real solution. However, it probably doesn't matter, because again,
    there are a lot of ways to grow the molecule (it seems) so in our case,
    we're maximizing for the quickest reduction. No harm in doing that,
    really.
    
    So, that's it. You keep looping through all possible transformations,
    uniq-ing that list, then taking the shortest 1000 and doing it again.
    Eventually, we'll go from a single step over to 'e' and be done.
*/

let data = input;
// let data = sampleInput;
// let data = sampleInput2;
let { rules, reverseRules, initialState } = data;
let reverseRulesArray = Object.entries(reverseRules);

const sortByLength = (a, b) => {
    if (a.length < b.length) return -1;
    else if (a.length > b.length) return 1;
    else return 0;
};

const moleculesCanBeTransformedBackToE = list => {
    for (let i = 0; i < list.length; i++) {
        let mol = list[i];
        if (rules['e'].includes(mol)) {
            return mol;
        }
    }

    return false;
};

let current_molecules = [initialState.join('')];

let step = 0;
while (moleculesCanBeTransformedBackToE(current_molecules) === false) {
    step++;
    process.stdout.write(
        'Running' +
            Array((step % 5) + 1)
                .fill('.')
                .join('') +
            '     \r'
    );
    let new_molecules = [];
    for (let i = 0; i < current_molecules.length; i++) {
        let current_molecule = current_molecules[i];
        // Loop through our reverse rules and see if we can de-vole
        reverseRulesArray.forEach(([start, end]) => {
            if (current_molecule.includes(start)) {
                let replaced_molecule = current_molecule.replace(start, end);
                new_molecules.push(replaced_molecule);
            }
        });
    }

    let unique_molecules = uniq(new_molecules);
    unique_molecules.sort(sortByLength);

    // Take the 1,000 shortest molecules
    current_molecules = unique_molecules.slice(0, 1000);
}

// We aren't at 'e' just yet, we have one more step to go.
// So increment our `step` by one!
step++;

console.log('\n============');
console.log(step);
