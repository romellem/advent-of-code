class GameState {
    constructor(player, boss, shield, poison, recharge) {
        this.player = Object.assign({}, player);
        this.boss = Object.assign({}, boss);

        this.poison = Object.assign({}, poison);
        this.shield = Object.assign({}, shield);
        this.recharge = Object.assign({}, recharge);
    }
}

/*
{
    isPlayersTurn: true, // when false, is the boss's turn
    player: {
        hp: 100,
        armor: 10,
        mana: 250,
    },
    boss: {
        hp: 100,
        damage: 10,
    },
    shield: 6, // Max value of 6; when down to 0, shield is not active (has "cooled down")
    poison: 6, // Max value of 6; when down to 0, poison is not active (has "cooled down")
    recharge: 5, // Max value of 5; when down to 0, recharge is not active (has "cooled down")
}
*/

const SPELLS = {
    missle: { cost: 53, damage: 4 },
    drain: { cost: 73, heal: 2, damage: 2 },
    shield: { cost: 113, armor: 7, timer: 6 },
    poison: { cost: 173, damage: 3, timer: 6 },
    recharge: { cost: 229, mana: 101, time: 5 },
};

class Game {
    constructor({ isPlayersTurn = true, player, boss, shield = 0, poison = 0, recharge = 0 } = {}) {
        this.isPlayersTurn = isPlayersTurn;

        this.player = Object.assign({}, player);
        this.boss = Object.assign({}, boss);

        this.poison = poison;
        this.shield = shield;
        this.recharge = recharge;
    }

    getNextMoves() {
        let { player, boss } = this;

        // Store armor in temp variable so when shield spell is at zero, we don't have to decrease our actual player armor
        let player_armor = player.armor;

        // Effects run each turn, player or boss
        if (this.recharge) {
            player.mana += SPELLS.recharge.mana;
            this.recharge--;
        }

        if (this.shield) {
            player_armor += SPELLS.shield.armor;
            this.shield--;
        }

        if (this.poison) {
            boss.hp -= SPELLS.poison.damage;
            this.poison--;
        }

        // Poison killed the boss before anyone got their turn
        if (this.boss.hp <= 0) {
            return true;
        }

        if (this.isPlayersTurn) {
            // See what spells we can cast
            let player_choices = [];
            if (player.mana >= SPELLS.missle.cost) {
                player_choices.push(SPELLS.missle);
            }

            if (player.mana >= SPELLS.drain.cost) {
                player_choices.push(SPELLS.drain);
            }

            // Can only activate effects if not already active

            if (!this.shield && player.mana >= SPELLS.shield.cost) {
                player_choices.push(SPELLS.shield);
            }

            if (!this.poison && player.mana >= SPELLS.poison.cost) {
                player_choices.push(SPELLS.poison);
            }

            if (!this.recharge && player.mana >= SPELLS.recharge.cost) {
                player_choices.push(SPELLS.recharge);
            }

            if (player_choices.length === 0) {
                // We don't have enough mana left, we lose
                return false;
            }

            // Otherwise, return our choices
            return player_choices;
        } else { // Boss's turn
            return this.boss.damage - player_armor > 0 ? this.boss.damage - player_armor : 1;
        }
    }

    getState() {
        return {
            turn: this.turn,
            player: Object.assign({}, this.player),
            boss: Object.assign({}, this.boss),
            poison: this.poison,
            shield: this.shield,
            recharge: this.recharge,
        };
    }
}

module.exports = Game;
