const fs = require('fs');
const SEARCH_FOR = 580741;

class Recipes {
    constructor(SEARCH_FOR, initial_recipes = [3, 7]) {
        this.search_for = String(SEARCH_FOR);
        this.substr_length = -1 * (this.search_for.length * 2 + 1);

        this.recipes = initial_recipes.slice(0);
        this.recipes_str = this.recipes.join('');

        this.elf1 = 0;
        this.elf2 = 1;

        this.dumped_amount = 0;
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

        let elf1_new_index = (this.elf1 + elf1_value + 1) % (this.recipes.length + this.dumped_amount);
        let elf2_new_index = (this.elf2 + elf2_value + 1) % (this.recipes.length + this.dumped_amount);

        this.elf1 = elf1_new_index;
        this.elf2 = elf2_new_index;

        if (this.recipes.length > 20000010) {
            // console.log('Dumping '+ (this.recipes.length - 11) + ' recipes to free up memory...\n');
            // fs.writeFileSync(this.search_for + '-' + (this.dumped_amount + this.recipes.length - 11) + '.txt', this.recipes.join(''));
            
            this.dumped_amount += this.recipes.length - 11;
            // Last 11
            let last_eleven = [];
            for (let i = 0; i < 11; i++) {
                last_eleven.unshift(this.recipes[this.recipes.length - 1 - i]);
            }

            this.recipes = last_eleven.slice(0);
        }
    }

    getLengthWhenSearchForIsFirstFound() {
        let broke_out = false;
        while (this.recipes_str.indexOf(this.search_for) < 0) {
            this.createNewRecipes();

            if ((this.recipes.length + this.dumped_amount) % 4463 === 0) {
                process.stdout.write((this.recipes.length + this.dumped_amount)  + '\r')
            }

            if ((this.recipes.length + this.dumped_amount) > 50000000) {
                console.log('Breaking out of loop for ' + this.search_for);
                broke_out = true;
                break;
            }
        }

        // console.log(String(this.recipes.length).split('').map(n => ' ').join('') + ' \n')

        // Trim our recipes array to make sure the last items are our search_for string exactly
        if (broke_out) {
            return 'null';
        }
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

        return this.recipes.length + this.dumped_amount - this.search_for.length;
    }


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

let results = {};

for (i = 0; i < 1000; i++) {
    let search_for = String(getRandomInt(0, 100000)).padStart(5, '0');
    if (results[search_for]) {
        continue;
    }
    let recipes = new Recipes(search_for);
    let length = recipes.getLengthWhenSearchForIsFirstFound();

    results[search_for] = length;
    console.log(String(i).padStart(5, ' ') + ' - ' + search_for + ' : ' + length + '\r');
}

console.log('                                                           \n Done, writing file...');

fs.writeFileSync(getRandomInt(0, 999999999) + 'all_finds.json', JSON.stringify(results, null, '\t'));