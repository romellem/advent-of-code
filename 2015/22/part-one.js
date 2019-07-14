let initial_state = {
    boss: 51,
    damage: 9,

    hp: 50,
    mana: 500,
    armor: 0,
    manaSpent: 0,

    shield: 0,
    poison: 0,
    recharge: 0,

    move: 'player',
};

const MISSILE = 'missile';
const DRAIN = 'drain';
const SHIELD = 'shield';
const POISON = 'poison';
const RECHARGE = 'recharge';
const spells = {
    [MISSILE]: { cost: 53, damage: 4, heal: 0},
    [DRAIN]: { cost: 73, damage: 2, heal: 2},
    [SHIELD]: { cost: 113, duration: 6},
    [POISON]: { cost: 173, duration: 6},
    [RECHARGE]: { cost: 229, duration: 5},
};

let min = Number.MAX_SAFE_INTEGER;
let moves = [initial_state];
let state;

while ((state = moves.pop())) {
    // if (state['move'] === 'player') state['hp']--;

    // Check effects
    state['armor'] = state['shield']-- > 0 ? 7 : 0;

    if (state['poison']-- > 0) {
        state['boss'] -= 3;
    }

    if (state['recharge']-- > 0) {
        state['mana'] += 101;
    }

    // If we've lost all our HP, or we've spent more mana than our current minimum we've found, exit this path
    if (state['hp'] <= 0 || state['manaSpent'] >= min) {
        continue;
    }

    // If our boss is dead, see if our mana spent is less than our current minimum
    if (state['boss'] <= 0) {
        min = Math.min(min, state['manaSpent']);
        continue;
    }

    if (state['move'] === 'boss') {
        // Switch to player for next move
        state['move'] = 'player';

        // Boss always does at least 1 damage
        state['hp'] -= Math.max(1, state['damage'] - state['armor']);

        moves.push(state);

        // console.log('  Boss { ' + Object.keys(state).map(k => `${k === 'move' ? k + ': "' + state[k] + '"' : k + ': ' + state[k]}`).join(', ') + ' }');
    } else {
        // Switch to boss for next move
        state['move'] = 'boss';

        // We are on the player, loop through all the spells and push them to our possible moves
        for (let spell in spells) {
            let { cost, damage, heal, duration } = spells[spell];

            // If this costs more than the mana we have, skip it
            if (cost >= state['mana']) {
                continue;
            }

            // Clone our current state
            let new_state = Object.assign({}, state);
    
            new_state['mana'] -= cost;
            new_state['manaSpent'] += cost;

            if (spell === MISSILE || spell === DRAIN) {
                // Missle and Drain have no effect, they are instant spells
                new_state['boss'] -= damage;
                new_state['hp'] += heal;
            } else {
                // If we've already activated this effect, skip it
                if (new_state[spell] > 0) {
                    continue;
                }

                new_state[spell] = duration;
            }

            moves.push(new_state);

            // console.log('Player { ' + Object.keys(state).map(k => `${k === 'move' ? k + ': "' + n[k] + '"' : k + ': ' + n[k]}`).join(', ') + ' }');
        }
    }
}

console.log(min);
