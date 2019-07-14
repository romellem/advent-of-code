let initial_state = {
    boss: 51,
    damage: 9,

    hp: 50,
    mana: 500,
    armor: 0,
    manaspent: 0,

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
    [MISSILE]: [53, 4, 0],
    [DRAIN]: [73, 2, 2],
    [SHIELD]: [113, 6],
    [POISON]: [173, 6],
    [RECHARGE]: [229, 5],
};

let min = Number.MAX_SAFE_INTEGER;
let moves = [initial_state];
let state;

while ((state = moves.pop())) {
    // if (state['move'] === 'player') state['hp']--;

    state['armor'] = state['shield']-- > 0 ? 7 : 0;
    if (state['poison']-- > 0) state['boss'] -= 3;
    if (state['recharge']-- > 0) state['mana'] += 101;

    if (state['hp'] <= 0 || state['manaspent'] >= min) continue;
    if (state['boss'] <= 0) {
        min = Math.min(min, state['manaspent']);
        continue;
    }

    if (state['move'] === 'boss') {
        state['move'] = 'player';
        state['hp'] -= Math.max(1, state['damage'] - state['armor']);
        moves.push(state);
        // console.log('  Boss { ' + Object.keys(state).map(k => `${k === 'move' ? k + ': "' + state[k] + '"' : k + ': ' + state[k]}`).join(', ') + ' }');
    } else {
        state['move'] = 'boss';
        for (let spell in spells) {
            let info = spells[spell];
            if (info[0] >= state['mana']) continue;
            let n = JSON.parse(JSON.stringify(state));
            n['mana'] -= info[0];
            n['manaspent'] += info[0];

            if (spell === MISSILE || spell === DRAIN) {
                n['boss'] -= info[1];
                n['hp'] += info[2];
            } else {
                if (n[spell] > 0) {
                    continue;
                }
                n[spell] = info[1];
            }

            moves.push(n);
            // console.log('Player { ' + Object.keys(state).map(k => `${k === 'move' ? k + ': "' + n[k] + '"' : k + ': ' + n[k]}`).join(', ') + ' }');
        }
    }
}

console.log(min);
