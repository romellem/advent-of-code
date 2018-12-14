const SEARCH_FOR = 580741;

class Recipes {
    constructor(SEARCH_FOR, initial_recipes = [3, 7]) {
        this.search_for = String(SEARCH_FOR);

        this.recipes = initial_recipes.slice(0);
        this.recipes_str = this.recipes.join('');

        this.elf1 = 0;
        this.elf2 = 1;
    }

    createNewRecipes() {
        let elf1_value = this.recipes[this.elf1];
        let elf2_value = this.recipes[this.elf2];

        let new_recipes = elf1_value + elf2_value;
        this.recipes_str += new_recipes;
        if (new_recipes < 10) {
            this.recipes.push(new_recipes);
        } else {
            new_recipes = String(new_recipes)
                .split('')
                .map(n => +n);
            new_recipes.forEach(r => {
                this.recipes.push(r);
            });
        }

        let elf1_new_index = (this.elf1 + elf1_value + 1) % this.recipes.length;
        let elf2_new_index = (this.elf2 + elf2_value + 1) % this.recipes.length;

        this.elf1 = elf1_new_index;
        this.elf2 = elf2_new_index;
    }

    getLengthWhenSearchForIsFirstFound() {
        while (this.recipes_str.indexOf(this.search_for) < 0) {
            this.createNewRecipes();
            // console.log(this.recipes_str)
        }

        return this.recipes.length - this.search_for.length;
    }
}

let recipes = new Recipes(SEARCH_FOR);
// let recipes = new Recipes(92510); // 18
// let recipes = new Recipes(59414); // 2018

let length = recipes.getLengthWhenSearchForIsFirstFound();



console.log(length);
