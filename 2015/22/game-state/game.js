// Keep it flat to help with spread operators
const initial_state = {
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

const SPELLS = require('./spells');
const { createStore } = require('redux');

const rootReducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_TURN':
            return {
                ...state,
                turn: state.turn === 'player' ? 'boss' : 'player',
            };
        case 'CHECK_STATUS':
            let boss_dead = state.bossHp <= 0;
            let player_dead = state.playerHp <= 0;

            // 53 is lowest cost spell (for missle)
            let player_out_of_mana = state.playerMana < 53;

            let status = 'playing';
            if (boss_dead) status = 'win';
            if (player_dead || player_out_of_mana) status = 'lose';

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
                if (spell === 'SHIELD') {
                    return {
                        ...state,
                        playerMana: state.playerMana - spell.mana,
                        shield: 6,
                        playerArmor: state.playerArmor + 7,
                    };
                } else if (spell === 'POISON') {
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
            let damage = state.bossDamage - state.playerArmor;
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
            let damage = state.poison > 0 ? 3 : 0;
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

class Game {
    constructor() {
        this.store = createStore(rootReducer, initial_state);
    }

    get state() {
        return this.store.getState();
    }

    castSpell(spell) {
        this.store.dispatch({ type: 'CAST_SPELL', payload: spell });
        return this.state;
    }

    castMissle() {
        return this.castSpell('MISSLE');
    }

    castDrain() {
        return this.castSpell('DRAIN');
    }

    castShield() {
        return this.castSpell('SHIELD');
    }

    castPoison() {
        return this.castSpell('POISON');
    }

    castRecharge() {
        return this.castSpell('RECHARGE');
    }

    tick() {
        this.store.dispatch({ type: 'ADVANCE_EFFECT_TIMERS'});
        this.store.dispatch({ type: 'APPLY_EFFECTS'});
        let {status, turn} = this.store.dispatch({type: 'CHECK_STATUS'});

        if (status !== 'playing') return status;

        if (turn === 'player') {
            
        }

    }

    run() {

    }

    
}
