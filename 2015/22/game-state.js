class GameState {
    constructor({
        round,
        turn,
        playerHp,
        playerArmor,
        playerMana,
        bossHp,
        bossDamage,
        shield,
        poison,
        recharge,
        spellCast,
    } = {}) {
        this.round = round;
        this.turn = turn;
        this.playerHp = playerHp;
        this.playerArmor = playerArmor;
        this.playerMana = playerMana;
        this.bossHp = bossHp;
        this.bossDamage = bossDamage;
        this.shield = shield;
        this.poison = poison;
        this.recharge = recharge;
        this.spellCast = spellCast;
    }

    toString() {
        let {
            round,
            turn,
            playerHp,
            playerArmor,
            playerMana,
            bossHp,
            bossDamage,
            shield,
            poison,
            recharge,
            spellCast,
        } = this;
        return JSON.stringify({
            round,
            turn,
            playerHp,
            playerArmor,
            playerMana,
            bossHp,
            bossDamage,
            shield,
            poison,
            recharge,
            spellCast,
        });
    }

    getPossibleNextTurns() {
        if (turn === 'boss') {
            return
        }
    }
}

module.exports = GameState;
