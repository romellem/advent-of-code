const fs = require('fs');
const SEARCH_FOR = 580741;

class Recipes {
    constructor(SEARCH_FOR, initial_recipes = [3, 7]) {
        this.search_for = String(SEARCH_FOR);
        this.substr_length = -1 * (this.search_for.length * 3);

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

        this.recipes_str = this.recipes_str.substr(this.substr_length);

        let elf1_new_index = (this.elf1 + elf1_value + 1) % this.recipes.length;
        let elf2_new_index = (this.elf2 + elf2_value + 1) % this.recipes.length;

        this.elf1 = elf1_new_index;
        this.elf2 = elf2_new_index;
    }

    getLengthWhenSearchForIsFirstFound() {
        while (this.recipes_str.indexOf(this.search_for) < 0) {
            this.createNewRecipes();
            if (this.recipes.length % 4463 === 0) {
                process.stdout.write(this.recipes.length + '\r')
            }
        }

        console.log(String(this.recipes.length).split('').map(n => ' ').join('') + ' \n')

        // Trim our recipes array to make sure the last items are our search_for string exactly
        let last_confirmed = false;
        do {
            let last_nums = [];
            for (let i = 0; i < this.search_for.length; i++) {
                last_nums.unshift(this.recipes[this.recipes.length - 1 - i]);
            }

            last_confirmed = last_nums.join('') === this.search_for;
            if (!last_confirmed) {
                this.recipes.pop();
            }
        } while (!last_confirmed);

        return this.recipes.length - this.search_for.length;
    }

    generate(n = 10) {
        while (this.recipes.length < n) {
            this.createNewRecipes();
            if (this.recipes.length % 4463 === 0) {
                process.stdout.write((this.recipes.length / n) + '\r');
            }
        }
        fs.writeFileSync(n + '.txt', this.recipes.join(''));
        console.log('\n\nWrote ' + n + '.txt')
    }
}

let recipes = new Recipes(SEARCH_FOR);
// let recipes = new Recipes(92510); // 18
// let recipes = new Recipes(59414); // 2018

let length = recipes.getLengthWhenSearchForIsFirstFound();
// recipes.generate(40330674);

console.log(length);

