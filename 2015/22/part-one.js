var state = {
    boss: 51,
    d: 9,
    hp: 50,
    m: 500,
    a: 0,
    shield: 0,
    poison: 0,
    recharge: 0,
    manaspent: 0,
    move: 'player',
};

const MISSILE = 'missile';
const DRAIN = 'drain';
const SHIELD = 'shield';
const POISON = 'poison';
const RECHARGE = 'recharge';
var spells = {
    [MISSILE]: [53, 4, 0],
    [DRAIN]: [73, 2, 2],
    [SHIELD]: [113, 6],
    [POISON]: [173, 6],
    [RECHARGE]: [229, 5],
};

var min = Number.MAX_SAFE_INTEGER;
var moves = [state];
var state;

while ((state = moves.shift())) {
    // if (state['move'] === 'player') state['hp']--;

    state['a'] = state['shield']-- > 0 ? 7 : 0;
    if (state['poison']-- > 0) state['boss'] -= 3;
    if (state['recharge']-- > 0) state['m'] += 101;

    if (state['hp'] <= 0 || state['manaspent'] >= min) continue;
    if (state['boss'] <= 0) {
        min = Math.min(min, state['manaspent']);
        continue;
    }

    if (state['move'] === 'boss') {
        state['move'] = 'player';
        state['hp'] -= Math.max(1, state['d'] - state['a']);
        moves.unshift(state);
        // console.log('  Boss { ' + Object.keys(state).map(k => `${k === 'move' ? k + ': "' + state[k] + '"' : k + ': ' + state[k]}`).join(', ') + ' }');
    } else {
        state['move'] = 'boss';
        for (let spell in spells) {
            let info = spells[spell];
            if (info[0] >= state['m']) continue;
            let n = JSON.parse(JSON.stringify(state));
            n['m'] -= info[0];
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

            moves.unshift(n);
            // console.log('Player { ' + Object.keys(state).map(k => `${k === 'move' ? k + ': "' + n[k] + '"' : k + ': ' + n[k]}`).join(', ') + ' }');
        }
    }
}

console.log(min);
