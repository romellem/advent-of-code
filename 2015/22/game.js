// Keep it flat to help with spread operators
const initial_state = {
    round: 0, // Only used internally in case we run into a duplicate state later (don't know if that's possible...)
    turn: 'player', // player, boss
    status: 'playing', // playing, won, lost

    playerHp: 50,
    playerMana: 500,
    playerArmor: 0,

    // From puzzle input
    bossHp: 51,
    bossDamage: 9,

    shield: 0,
    poison: 0,
    recharge: 0,
};

// const initial_state = {
//     round: 0,
//     turn: 'player', // player, boss
//     status: 'playing', // playing, won, lost

//     playerHp: 10,
//     playerMana: 250,
//     playerArmor: 0,

//     // From puzzle input
//     bossHp: 14,
//     bossDamage: 8,

//     shield: 0,
//     poison: 0,
//     recharge: 0,
// };

function Game(state, spell) {
    this.state = Object.assign({}, state);
    this.spell = spell;
}
Game.prototype.toString = function() {
    return JSON.stringify(this.state);
};

const SPELLS = {
    MISSLE: { mana: 53, damage: 4, heal: 0 },
    DRAIN: { mana: 73, damage: 2, heal: 2 },
    SHIELD: { mana: 113 },
    POISON: { mana: 173 },
    RECHARGE: { mana: 229 },
};
const jsnx = require('jsnetworkx');

const reduce = (state, action) => {
    switch (action.type) {
        case 'NEXT_TURN':
            return {
                ...state,
                round: state.round + 1,
                turn: state.turn === 'player' ? 'boss' : 'player',
            };
        case 'CHECK_STATUS':
            let boss_dead = state.bossHp <= 0;
            let player_dead = state.playerHp <= 0;

            // 53 is lowest cost spell (for missle)
            let player_out_of_mana = state.playerMana < 53;

            let status = 'playing';
            if (boss_dead) status = 'win';
            else if (player_dead || (player_out_of_mana && state.turn === 'player'))
                status = 'lose';

            return {
                ...state,
                status,
            };

        case 'CAST_SPELL':
            let spell_to_cast = action.payload;
            let spell = SPELLS[spell_to_cast];
            if (spell_to_cast === 'MISSLE' || spell_to_cast === 'DRAIN') {
                return {
                    ...state,
                    playerMana: state.playerMana - spell.mana,
                    playerHp: state.playerHp + spell.heal,
                    bossHp: state.bossHp - spell.damage,
                };
            } else {
                // Cast an effect
                if (spell_to_cast === 'SHIELD') {
                    return {
                        ...state,
                        playerMana: state.playerMana - spell.mana,
                        shield: 6,
                        playerArmor: state.playerArmor + 7,
                    };
                } else if (spell_to_cast === 'POISON') {
                    return {
                        ...state,
                        playerMana: state.playerMana - spell.mana,
                        poison: 6,
                    };
                } else {
                    // RECHARGE
                    return {
                        ...state,
                        playerMana: state.playerMana - spell.mana,
                        recharge: 5,
                    };
                }
            }

        case 'BOSS_DAMAGE':
            var damage = state.bossDamage - state.playerArmor;
            if (damage < 1) damage = 1;
            return {
                ...state,
                playerHp: state.playerHp - damage,
            };

        case 'ADVANCE_EFFECT_TIMERS':
            return {
                ...state,
                shield: state.shield > 0 ? state.shield - 1 : 0,
                poison: state.poison > 0 ? state.poison - 1 : 0,
                recharge: state.recharge > 0 ? state.recharge - 1 : 0,
            };

        case 'APPLY_EFFECTS':
            var damage = state.poison > 0 ? 3 : 0;
            let armored = state.shield > 0;
            let recharged = state.recharge > 0;

            return {
                ...state,
                bossHp: state.bossHp - damage,
                playerArmor: armored ? state.playerArmor : 0,
                playerMana: recharged ? state.playerMana + 101 : state.playerMana,
            };

        default:
            return state;
    }
};

const preTick = state => {
    state = reduce(state, { type: 'ADVANCE_EFFECT_TIMERS' });
    state = reduce(state, { type: 'APPLY_EFFECTS' });
    state = reduce(state, { type: 'CHECK_STATUS' });

    return state;
};
const postTick = state => {
    state = reduce(state, { type: 'NEXT_TURN' });
    state = reduce(state, { type: 'CHECK_STATUS' });

    return state;
};

class GameGraph {
    constructor() {
        this.graph = new jsnx.DiGraph();
        this.baseNode = new Game(initial_state);
        this.graph.addNode(this.baseNode);

        this.win_nodes = [];
        // this.loss_nodes = [];
    }

    buildTree(base = this.baseNode) {
        let { state } = base;

        if (state.status !== 'playing') {
            // Game over! This `base` node is an "end" state

            if (state.status === 'win') {
                let end_node = new Game(state);
                this.graph.addEdge(base, end_node, { gameOver: true });
                this.win_nodes.push(end_node);
            } else {
                // this.loss_nodes.push(end_node);
            }

            return;
        }

        // Advance effect timers, apply effects, and check status of game
        state = preTick(state);

        if (state.status === 'playing') {
            // If we are playing, return new edges
            if (state.turn === 'player') {
                let next_turn, local_state;

                // Missle
                if (state.playerMana >= SPELLS.MISSLE.mana) {
                    // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana}) - MISSLE`);
                    local_state = new Game(
                        reduce(state, { type: 'CAST_SPELL', payload: 'MISSLE' }),
                        'MISSLE'
                    );
                    this.graph.addEdge(base, local_state, { weight: SPELLS.MISSLE.mana });
                    next_turn = new Game(postTick(local_state.state));
                    this.graph.addEdge(local_state, next_turn);
                    this.buildTree(next_turn);
                }

                // Drain
                if (state.playerMana >= SPELLS.DRAIN.mana) {
                    // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana})- DRAIN`);
                    local_state = new Game(
                        reduce(state, { type: 'CAST_SPELL', payload: 'DRAIN' }),
                        'DRAIN'
                    );
                    this.graph.addEdge(base, local_state, { weight: SPELLS.DRAIN.mana });
                    next_turn = new Game(postTick(local_state.state));
                    this.graph.addEdge(local_state, next_turn);
                    this.buildTree(next_turn);
                }

                // Poison
                if (!state.poison && state.playerMana >= SPELLS.POISON.mana) {
                    // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana})- POISON`);
                    local_state = new Game(
                        reduce(state, { type: 'CAST_SPELL', payload: 'POISON' }),
                        'POISON'
                    );
                    this.graph.addEdge(base, local_state, { weight: SPELLS.POISON.mana });
                    next_turn = new Game(postTick(local_state.state));
                    this.graph.addEdge(local_state, next_turn);
                    this.buildTree(next_turn);
                }

                // Shield
                if (!state.shield && state.playerMana >= SPELLS.SHIELD.mana) {
                    // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana})- SHIELD`);
                    local_state = new Game(
                        reduce(state, { type: 'CAST_SPELL', payload: 'SHIELD' }),
                        'SHIELD'
                    );
                    this.graph.addEdge(base, local_state, { weight: SPELLS.SHIELD.mana });
                    next_turn = new Game(postTick(local_state.state));
                    this.graph.addEdge(local_state, next_turn);
                    this.buildTree(next_turn);
                }

                // Recharge
                if (!state.recharge && state.playerMana >= SPELLS.RECHARGE.mana) {
                    // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana}) - RECHARGE`);
                    local_state = new Game(
                        reduce(state, { type: 'CAST_SPELL', payload: 'RECHARGE' }),
                        'RECHARGE'
                    );
                    this.graph.addEdge(base, local_state, { weight: SPELLS.RECHARGE.mana });
                    next_turn = new Game(postTick(local_state.state));
                    this.graph.addEdge(local_state, next_turn);
                    this.buildTree(next_turn);
                }
            } else {
                // Boss
                let next_turn, local_state;

                // Boss's only action
                // console.log(`${state.round}\tBoss (HP: ${state.bossHp}) - DAMAGE`);
                local_state = new Game(reduce(state, { type: 'BOSS_DAMAGE' }));
                this.graph.addEdge(base, local_state);
                next_turn = new Game(postTick(local_state.state));
                this.graph.addEdge(local_state, next_turn);
                this.buildTree(next_turn);
            }
        } else {
            // Game over! This `base` node is an "end" state

            // console.log(`${state.round}\tGAME OVER - ${state.status.toUpperCase()}`);
            // console.log(`==================\n`);

            if (state.status === 'win') {
                let end_node = new Game(state);
                this.graph.addEdge(base, end_node, { gameOver: true });
                this.win_nodes.push(end_node);
            } else {
                // this.loss_nodes.push(end_node);
            }
        }
    }

    getWinningPaths() {
        let paths_and_weights = this.win_nodes.map(target => {
            return {
                path: jsnx
                    .dijkstraPath(this.graph, { source: this.baseNode, target })
                    .map(({ state, spell }) => {
                        let { round, turn, playerHp, bossHp } = state;
                        return `${round}\t${turn.toUpperCase()[0]} - P:${playerHp} B:${bossHp}${
                            spell ? ' - ' + spell : ''
                        }`;
                    }),
                weight: jsnx.dijkstraPathLength(this.graph, { source: this.baseNode, target }),
            };
        });

        return paths_and_weights;
    }
}

module.exports = GameGraph;
