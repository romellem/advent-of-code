class Game {
    constructor(player, boss) {
        this.player_hero_set = player.hero_set;

        this.player = {
            hp: player.hp,
            damage: this.player_hero_set.damage,
            defense: this.player_hero_set.defense,
            cost: this.player_hero_set.cost,
        };

        this.boss = {
            hp: boss.hp,
            damage: boss.damage,
            defense: boss.armor,
        };
    }

    /**
     * @returns True if the player wins, false if the boss wins
     */
    run() {
        let turn = 0;
        while (true) {
            // Player goes first
            let player_damage = this.player.damage - this.boss.defense;
            player_damage = player_damage < 1 ? 1 : player_damage;

            this.boss.hp -= player_damage;

            if (this.boss.hp <= 0) {
                return true;
            }

            // Boss is still alive, boss's turn
            let boss_damage = this.boss.damage - this.player.defense;
            boss_damage = boss_damage < 1 ? 1 : boss_damage;

            this.player.hp -= boss_damage;

            if (this.player.hp <= 0) {
                return false;
            }

            turn++;
        }
    }
}

module.exports = Game;
