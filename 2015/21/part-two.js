const { HERO_SETS, BOSS_STATS } = require('./input');
const Game = require('./rpg');

const PLAYER_HP = 100;

let max_amount_spent_for_loss = -1;
HERO_SETS.forEach(set => {
    let game = new Game(
        {
            hp: PLAYER_HP,
            hero_set: set,
        },
        BOSS_STATS
    );

    if (!game.run() && set.cost > max_amount_spent_for_loss) {
        max_amount_spent_for_loss = set.cost;
    }
});

console.log(max_amount_spent_for_loss);
