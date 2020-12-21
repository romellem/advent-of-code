const { input } = require('./input');
const { AllFoods } = require('./allergen');

let all_foods = new AllFoods(input);
all_foods.assignKnownAllergens();
