class HeroSet {
    constructor({weapon, armor, ringLeft, ringRight} = {}) {
        this.weapon = weapon;
        this.armor = armor;
        this.ringLeft = ringLeft;
        this.ringRight = ringRight;

        this.cost = weapon.cost + armor.cost + ringLeft.cost + ringRight.cost;
        this.damage = weapon.damage + armor.damage + ringLeft.damage + ringRight.damage;
        this.defense = weapon.armor + armor.armor + ringLeft.armor + ringRight.armor;
    }
}

module.exports = HeroSet;
