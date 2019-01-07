let { input, sampleInput } = require('./input');
const G = require('generatorics');

/**
 * OK, so the code below is vaslty simplified from what we originally had,
 * and now it actually runs in a reasonable amount of time!
 * 
 * So here is the thinking: originally, I was going through and splitting
 * up the presents is every possible combintation of three groups, seeing if
 * their weights matched, and adding it as a possible solution if they did.
 * 
 * The problem was, I was doing a _ton_ of extra work here, for one because
 * my loops would say G1 = A, G2 = B, G3 = C, would be different than
 * G1 = B, G2 = A, G3 = C. I don't need to do the calculation a 2nd time, if I found
 * a grouping that balanced, I just need to place the smallest one in G1.
 * 
 * OK, so if I can't actually brute force this, what is a faster way?
 * Well, if we are going to get three balanced groups, then each group's
 * weight **has** to be the total weight divided by three. So, what we can do is
 * start with a group size of 1, and work our way up and see if there is a way
 * to arrange a group of that size into the total weight divided by 3.
 * 
 * Once we find that group, we can stop searching since G1 need to be the _fewest_
 * number of presents.
 * 
 * One thing that I'm not 100% sure on, but I supposed is correct, is that
 * if I find a group that is equal to one third of the total weight, then
 * that is indeed a valid solution meaning I would be guaranteed to find
 * two more groupings that would make up groups 2 and 3 that would also
 * total one third of the total weight.
 * 
 * So, if G is the weight of each group, and T is the total weight of the presents,
 * then `3 * G = T`. Namely, `3 divides T`. We can also see that after we allocated
 * one-third to our first group, we are guaranteed that `2 divides remaining weight`
 * because `3G - G = 2G = (T - G) => (T - G) / 2 = G`. But, then does that mean
 * that we _have_ to be able to split the remaining presents into two equal groups?
 * 
 * Thinking about this differently, let `P = {P1,... Pn}` be the set of all presents, where
 * `|P| >= 3`. Let `W(P) = P1 + P2 + ... Pn` be the total weight. (Also, it should be said that
 * no present `Px` satifies `Px > W(P) / 3`. If some present weighed more than a third of
 * the total weight, than some group would have to weigh more than a third (because that
 * present would have to go somewhere), so we wouldn't be able to split the presents into three even
 * groups `e.g., P = {10, 20, 30, 40, 200}. T = 300, Pmax = 200, so some W(Gn) >= 200`.
 * Anyways, let `G1 ⊂ P, where W(G1) = W(P) / 3`. Then all presents not in G1, `G1'`
 * is `G1' = 2 * W(G1)`. Since no present `Px > W(P) / 3`, then no present
 * `Py, such that Py ∈ G1'` satifies `Py > W(G1') / 2`. Therefore, `|G1'| >= 2`.
 * I _think_ then that `G1'` _has_ to be able to split into two groups, `G2 and G3`
 * such that `W(G2) = W(G3) = W(G1)`. That last step is where is get a little hazy,
 * ahhhh this is getting too long. Anyways, I got the problem correct, so it appears
 * that if I found my G1, I have a guarantee that G2 and G3 exist. I think the
 * key facts are that
 * 
 * - G1 exists
 * - Px <= W(P) / 3
 * - W(P) % 3 = 0
 * 
 * The `Px <= W(P) / 3` is the key part, I think. Anways, the below wiki page seems
 * related, so I'll link to it. 
 * 
 * @see https://en.wikipedia.org/wiki/Partition_problem
 */

const sum = (a, b) => a + b;

let presents = input;
let presents_weight = presents.reduce(sum);
let presents_weight_third = presents_weight / 3;

const solutions = [];

let g1, size_of_g1 = -1;
const upper_bound = (presents.length - 2) / 3;
for (let g1_num = 1; g1_num <= upper_bound; g1_num++) {
    for (g1 of G.combination(presents, g1_num)) {
        let g1_weight = g1.reduce(sum);

        if (g1_weight === presents_weight_third) {
            size_of_g1 = g1.length;
            let g1_copy = g1.join(',');

            let sol = {
                g1: g1_copy,
                qe: g1.reduce((a, b) => a * b, 1),
                g1_size: g1.length,
            };

            solutions.push(sol);
        }
    }

    if (size_of_g1 > 0) {
        // Any new solutions won't work because by definition
        // they'll be larger than the current group 1 size we have.
        // SO jsut break out of our loop and sort everything.

        break;
    }
}

// Technically we can jsut sort by QE, since all solutions should have the same size.
solutions.sort((a, b) => {
    if (a.g1_size < b.g1_size) return -1;
    else if (a.g1_size > b.g1_size) return 1;
    else {
        if (a.qe < b.qe) return -1;
        else if (a.qe > b.qe) return 1;
        else return 0;
    }
});

console.log(solutions[0]);
console.log('Quantum Entanglement of least amount of Group 1 packages is:\n' + solutions[0].qe);
