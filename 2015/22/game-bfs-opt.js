// Keep it flat to help with spread operators
const real_state = {
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

const test_state = {
    round: 0,
    turn: 'player', // player, boss
    status: 'playing', // playing, won, lost

    playerHp: 10,
    playerMana: 250,
    playerArmor: 0,

    // From puzzle input
    bossHp: 14,
    bossDamage: 8,

    shield: 0,
    poison: 0,
    recharge: 0,
};

const ADVANCE_EFFECT_TIMERS = { type: 'ADVANCE_EFFECT_TIMERS' };
const APPLY_EFFECTS = { type: 'APPLY_EFFECTS' };
const CHECK_STATUS = { type: 'CHECK_STATUS' };
const NEXT_TURN = { type: 'NEXT_TURN' };

const MISSLE_SPELL = { type: 'CAST_SPELL', payload: 'MISSLE' };
const DRAIN_SPELL = { type: 'CAST_SPELL', payload: 'DRAIN' };
const SHIELD_SPELL = { type: 'CAST_SPELL', payload: 'SHIELD' };
const POISON_SPELL = { type: 'CAST_SPELL', payload: 'POISON' };
const RECHARGE_SPELL = { type: 'CAST_SPELL', payload: 'RECHARGE' };

const BOSS_DAMAGE = { type: 'BOSS_DAMAGE' };



// Toggle between real and test if you want
const initial_state = real_state;
// const initial_state = test_state;

function Game(state, spell) {
    this.state = Object.assign({}, state);
    this.spell = spell;
}
Game.prototype.toString = function() {
    // For how many nodes I have in my graph, this ends up being too slow.
    // Faster (and more memory efficient) to hard code a unique key for this obj
    // return JSON.stringify(this.state);

    let {
        round,
        turn,
        status,
        playerHp,
        playerMana,
        playerArmor,
        bossHp,
        bossDamage,
        shield,
        poison,
        recharge,
    } = this.state;
    return `${round},${turn},${status},${playerHp},${playerMana},${playerArmor},${bossHp},${bossDamage},${shield},${poison},${recharge}`;
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
    state = reduce(state, ADVANCE_EFFECT_TIMERS);
    state = reduce(state, APPLY_EFFECTS);
    state = reduce(state, CHECK_STATUS);

    return state;
};
const postTick = state => {
    state = reduce(state, NEXT_TURN);
    state = reduce(state, CHECK_STATUS);

    return state;
};

class GameGraph {
    constructor() {
        this.graph = new jsnx.DiGraph();
        this.baseNode = new Game(initial_state);
        this.graph.addNode(this.baseNode);

        this.win_nodes = [];
        this.pruneLeaves = this.pruneLeaves.bind(this);
        // this.loss_nodes = [];
    }

    buildTree(orig_base = this.baseNode) {
        let depth = 0;
        let bases = [orig_base];
        do {
            let next_base = [];
            console.log(`${depth++} - ${bases.length} nodes`);
            for (let base of bases) {
                let { state } = base;

                if (state.status !== 'playing') {
                    // Game over! This `base` node is an "end" state

                    if (state.status === 'win') {
                        let end_node = new Game(state);
                        this.graph.addEdge(base, end_node, { gameOver: true });
                        this.win_nodes.push(end_node);
                    } else {
                        this.pruneLeaves(base);
                        // try { this.graph.removeNode(base) } catch (e) {}
                        // this.loss_nodes.push(end_node);
                    }
                } else {
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
                                    reduce(state, MISSLE_SPELL),
                                    'MISSLE'
                                );
                                this.graph.addEdge(base, local_state, {
                                    weight: SPELLS.MISSLE.mana,
                                });
                                next_turn = new Game(postTick(local_state.state));
                                this.graph.addEdge(local_state, next_turn);
                                // this.buildTree(next_turn);
                                next_base.push(next_turn);
                            }

                            // Drain
                            if (state.playerMana >= SPELLS.DRAIN.mana) {
                                // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana})- DRAIN`);
                                local_state = new Game(
                                    reduce(state, DRAIN_SPELL),
                                    'DRAIN'
                                );
                                this.graph.addEdge(base, local_state, {
                                    weight: SPELLS.DRAIN.mana,
                                });
                                next_turn = new Game(postTick(local_state.state));
                                this.graph.addEdge(local_state, next_turn);
                                // this.buildTree(next_turn);
                                next_base.push(next_turn);
                            }

                            // Poison
                            if (!state.poison && state.playerMana >= SPELLS.POISON.mana) {
                                // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana})- POISON`);
                                local_state = new Game(
                                    reduce(state, POISON_SPELL),
                                    'POISON'
                                );
                                this.graph.addEdge(base, local_state, {
                                    weight: SPELLS.POISON.mana,
                                });
                                next_turn = new Game(postTick(local_state.state));
                                this.graph.addEdge(local_state, next_turn);
                                next_base.push(next_turn);
                            }

                            // Shield
                            if (!state.shield && state.playerMana >= SPELLS.SHIELD.mana) {
                                // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana})- SHIELD`);
                                local_state = new Game(
                                    reduce(state, SHIELD_SPELL),
                                    'SHIELD'
                                );
                                this.graph.addEdge(base, local_state, {
                                    weight: SPELLS.SHIELD.mana,
                                });
                                next_turn = new Game(postTick(local_state.state));
                                this.graph.addEdge(local_state, next_turn);
                                next_base.push(next_turn);
                            }

                            // Recharge
                            if (!state.recharge && state.playerMana >= SPELLS.RECHARGE.mana) {
                                // console.log(`${state.round}\tPlayer (HP: ${state.playerHp}, MANA: ${state.playerMana}) - RECHARGE`);
                                local_state = new Game(
                                    reduce(state, RECHARGE_SPELL),
                                    'RECHARGE'
                                );
                                this.graph.addEdge(base, local_state, {
                                    weight: SPELLS.RECHARGE.mana,
                                });
                                next_turn = new Game(postTick(local_state.state));
                                this.graph.addEdge(local_state, next_turn);
                                next_base.push(next_turn);
                            }
                        } else {
                            // Boss
                            let next_turn, local_state;

                            // Boss's only action
                            // console.log(`${state.round}\tBoss (HP: ${state.bossHp}) - DAMAGE`);
                            local_state = new Game(reduce(state, BOSS_DAMAGE));
                            this.graph.addEdge(base, local_state);
                            next_turn = new Game(postTick(local_state.state));
                            this.graph.addEdge(local_state, next_turn);
                            next_base.push(next_turn);
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
                            this.pruneLeaves(base);
                            // try { this.graph.removeNode(base) } catch (e) {}
                            // this.loss_nodes.push(end_node);
                        }
                    }
                }
            }

            bases = next_base;
        } while (bases.length > 0);
    }

    pruneLeaves(node) {
        let siblings;
        try { siblings = this.graph.neighbors(node) } catch (e) {}
        if (siblings && siblings.length === 0) {
            let parents = [];
            try { parents = this.graph.predecessors(node) } catch (e) {}
            try {
                this.graph.removeNode(node);
                for (let parent of parents) {
                    this.pruneLeaves(parent);
                }
            } catch (e) {}
            
        }
    }

    getWinningPaths() {
        console.log(this.win_nodes.length + ' total winning paths');
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
