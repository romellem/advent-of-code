# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| ` ` | ` ` |

## --- Day 21: Allergen Assessment ---

You reach the train's last stop and the closest you can get to your vacation island without getting wet. There aren't even any boats here, but nothing can stop you now: you build a raft. You just need a few days' worth of food for your journey.

You don't speak the local language, so you can't read any ingredients lists. However, sometimes, allergens are listed in a language you _do_ understand. You should be able to use this information to determine which ingredient contains which allergen and work out which foods are safe to take with you on your trip.

You start by compiling a list of foods (your puzzle input), one food per line. Each line includes that food's _ingredients list_ followed by some or all of the allergens the food contains.

Each allergen is found in exactly one ingredient. Each ingredient contains zero or one allergen. _Allergens aren't always marked_; when they're listed (as in `(contains nuts, shellfish)` after an ingredients list), the ingredient that contains each listed allergen will be _somewhere in the corresponding ingredients list_. However, even if an allergen isn't listed, the ingredient that contains that allergen could still be present: maybe they forgot to label it, or maybe it was labeled in a language you don't know.

For example, consider the following list of foods:

    mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
    trh fvjkl sbzzf mxmxvkd (contains dairy)
    sqjhc fvjkl (contains soy)
    sqjhc mxmxvkd sbzzf (contains fish)
    

The first food in the list has four ingredients (written in a language you don't understand): `mxmxvkd`, `kfcds`, `sqjhc`, and `nhms`. While the food might contain other allergens, a few allergens the food definitely contains are listed afterward: `dairy` and `fish`.

The first step is to determine which ingredients _can't possibly_ contain any of the allergens in any food in your list. In the above example, none of the ingredients `kfcds`, `nhms`, `sbzzf`, or `trh` can contain an allergen. Counting the number of times any of these ingredients appear in any ingredients list produces _`5`_: they all appear once each except `sbzzf`, which appears twice.

Determine which ingredients cannot possibly contain any of the allergens in your list. _How many times do any of those ingredients appear?_
