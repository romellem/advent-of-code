const MIN_LENGTH = 580741;

class Recipes {
    constructor(min_length, recipes_after = 10, initial_recipes = [3, 7]) {
        this.min_length = min_length;
        this.recipes_after = recipes_after;

        this.recipes = initial_recipes.slice(0);

        this.elf1 = 0;
        this.elf2 = 1;
    }

    createNewRecipes() {
        let elf1_value = this.recipes[this.elf1];
        let elf2_value = this.recipes[this.elf2];

        let new_recipes = elf1_value + elf2_value;
        if (new_recipes < 10) {
            this.recipes.push(new_recipes);
        } else {
            new_recipes = String(new_recipes)
                .split('')
                .map(n => +n);
            new_recipes.forEach(r => this.recipes.push(r));
        }

        let elf1_new_index = (this.elf1 + elf1_value + 1) % this.recipes.length;
        let elf2_new_index = (this.elf2 + elf2_value + 1) % this.recipes.length;

        this.elf1 = elf1_new_index;
        this.elf2 = elf2_new_index;
    }

    getNextTenAfterPosition() {
        while (this.recipes.length < this.min_length + this.recipes_after) {
            this.createNewRecipes();
            // console.log(this.recipes.join(''))
        }

        let next_ten = [];
        for (let i = this.min_length; i < (this.min_length) + 10; i++) {
            let v = this.recipes[i];
            next_ten.push(v);
        }

        return next_ten;
    }
}

let recipes = new Recipes(MIN_LENGTH);

let ten = recipes.getNextTenAfterPosition();



console.log(ten);
console.log(ten.join(''));
