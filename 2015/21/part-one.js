const { HERO_SETS, BOSS_STATS } = require('./input');
const Game = require('./rpg');

const PLAYER_HP = 100;

let least_amount_spent_for_win = Number.MAX_SAFE_INTEGER;
HERO_SETS.forEach(set => {
    let game = new Game(
        {
            hp: PLAYER_HP,
            hero_set: set,
        },
        BOSS_STATS
    );

    if (game.run() && set.cost < least_amount_spent_for_win) {
        least_amount_spent_for_win = set.cost;
    }
});

console.log(least_amount_spent_for_win);
