const G = require('generatorics');
const HeroSet = require('./hero-set');

/**
 * Weapons:    Cost  Damage  Armor
 * Dagger        8     4       0
 * Shortsword   10     5       0
 * Warhammer    25     6       0
 * Longsword    40     7       0
 * Greataxe     74     8       0
 *
 * Armor:      Cost  Damage  Armor
 * Leather      13     0       1
 * Chainmail    31     0       2
 * Splintmail   53     0       3
 * Bandedmail   75     0       4
 * Platemail   102     0       5
 *
 * Rings:      Cost  Damage  Armor
 * Damage +1    25     1       0
 * Damage +2    50     2       0
 * Damage +3   100     3       0
 * Defense +1   20     0       1
 * Defense +2   40     0       2
 * Defense +3   80     0       3
 */

const WEAPONS = [
    {
        name: 'Dagger',
        cost: 8,
        damage: 4,
        armor: 0,
    },
    {
        name: 'Shortsword',
        cost: 10,
        damage: 5,
        armor: 0,
    },
    {
        name: 'Warhammer',
        cost: 25,
        damage: 6,
        armor: 0,
    },
    {
        name: 'Longsword',
        cost: 40,
        damage: 7,
        armor: 0,
    },
    {
        name: 'Greataxe',
        cost: 74,
        damage: 8,
        armor: 0,
    },
];
const ARMOR = [
    {
        // Easier to just loop through the full list, and fake having
        // "no" armor by creating a dummy armor set
        name: 'none',
        cost: 0,
        damage: 0,
        armor: 0,
    },
    {
        name: 'Leather',
        cost: 13,
        damage: 0,
        armor: 1,
    },
    {
        name: 'Chainmail',
        cost: 31,
        damage: 0,
        armor: 2,
    },
    {
        name: 'Splintmail',
        cost: 53,
        damage: 0,
        armor: 3,
    },
    {
        name: 'Bandedmail',
        cost: 75,
        damage: 0,
        armor: 4,
    },
    {
        name: 'Platemail',
        cost: 102,
        damage: 0,
        armor: 5,
    },
];
const RINGS = [
    {
        // Similar to armor, create two empty rings so we can do a simply (n choose 2)
        // selection. Only thing is, we'll need to prune the list slightly since we'll
        // have two copies of just one ring (one with 'none1' plus all other rings, and
        // one with 'none2' plus all other rings)
        name: 'none1',
        cost: 0,
        damage: 0,
        armor: 0,
    },
    {
        name: 'none2',
        cost: 0,
        damage: 0,
        armor: 0,
    },
    {
        name: 'Damage+1',
        cost: 25,
        damage: 1,
        armor: 0,
    },
    {
        name: 'Damage+2',
        cost: 50,
        damage: 2,
        armor: 0,
    },
    {
        name: 'Damage+3',
        cost: 100,
        damage: 3,
        armor: 0,
    },
    {
        name: 'Defense+1',
        cost: 20,
        damage: 0,
        armor: 1,
    },
    {
        name: 'Defense+2',
        cost: 40,
        damage: 0,
        armor: 2,
    },
    {
        name: 'Defense+3',
        cost: 80,
        damage: 0,
        armor: 3,
    },
];

/**
 * - You must buy exactly one weapon; no dual-wielding.
 * - Armor is optional, but you can't use more than one.
 * - You can buy 0-2 rings (at most one for each hand).
 * - You must use any items you buy.
 * - The shop only has one of each item, so you can't buy,
 *   for example, two rings of Damage +3.
 */
let HERO_SETS = [];

for (let weapon of WEAPONS) {
    for (let armor of ARMOR) {
        for (let ring of G.clone.combination(RINGS, 2)) {
            let ring_names = ring.map(r => r.name);
            if (ring_names.includes('none2') && !ring_names.includes('none1')) {
                // Then skip this set of rings so we don't duplicate the 1-ring instance
            } else {
                HERO_SETS.push(
                    new HeroSet({
                        weapon,
                        armor,
                        ringLeft: ring[0],
                        ringRight: ring[1],
                    })
                );
            }
        }
    }
}

const BOSS_STATS = {
    hp: 103,
    damage: 9,
    armor: 2,
};

module.exports = {
    WEAPONS,
    ARMOR,
    RINGS,
    HERO_SETS,
    BOSS_STATS,
};
