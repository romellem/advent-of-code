class Plant {
    constructor(id, is_alive = false) {
        this.id = id;
        this.alive = is_alive;
    }
}

class Garden {
    constructor(initial_state, spread_rules) {
        this.garden = {};
        this.spread_rules = {};
        this.parseStateAndSetGarden(initial_state);
        this.parseSpreadRulesAndSet(spread_rules);
    }

    parseStateAndSetGarden(state, startingIndex = 0) {
        let state_array = state.split('');
        state_array.forEach((plant, i) => {
            let plant_id = i + startingIndex;
            let is_plant_alive = plant === '#';

            /**
             * Allow the plant to store a reference to the parent
             * garden so it can determine the state of its neighbors
             */
            this.garden[plant_id] = new Plant(plant_id, is_plant_alive);
        });
    }

    parseSpreadRulesAndSet(spread_rules) {
        const spread_rule_regex = /([\.#]{5}) => ([\.#])/;
        spread_rules.forEach(rule => {
            let [match, state, result] = spread_rule_regex.exec(rule);
            this.spread_rules[state] = result === '#';
        });
    }

    nextPlantFrom(id, n = 1) {
        return this.garden[id + n];
    }

    // @note This isn't DRY, but who cares?
    prevPlantFrom(id, n = 1) {
        return this.garden[id - n];
    }

    getPlantsNextState(plant_or_plant_id) {
        let plant = plant_or_plant_id;
        if (typeof plant_or_plant_id === 'number') {
            plant = this.garden[plant_or_plant_id];
        }
        let plant_state = this.buildStateStringFromPlant(plant);

        return this.spread_rules[plant_state];
    }

    getPlantsNeighbors(plant) {
        return [
            this.prevPlantFrom(plant.id, 2),
            this.prevPlantFrom(plant.id, 1),
            plant,
            this.nextPlantFrom(plant.id, 1),
            this.nextPlantFrom(plant.id, 2),
        ];
    }

    buildStateStringFromPlant(plant_or_plant_id) {
        let plant = plant_or_plant_id;
        if (typeof plant_or_plant_id === 'number') {
            plant = this.garden[plant_or_plant_id];
        }

        return this.getPlantsNeighbors(plant).map(p => (p ? (p.alive ? '#' : '.') : '.')).join('');
    }

    tick(days = 1) {
        for (let i = 0; i < days; i++) {
            let plants = Object.values(this.garden);
            plants.sort((a, b) => {
                if (a.id < b.id) return -1;
                else if (a.id > b.id) return 1;
                else return 0;
            });

            let smallest_plant_id = plants[0].id;
            let largest_plant_id = plants[plants.length - 1].id;
            if (plants[0].alive) {
                // If the first plant is alive, then we need three more "dead" plants at the beginning
                let first_plant = new Plant(smallest_plant_id - 3);
                let second_plant = new Plant(smallest_plant_id - 2);
                let third_plant = new Plant(smallest_plant_id - 1);
                plants.unshift(first_plant, second_plant, third_plant);
            } else if (plants[1].alive) {
                // If the first plant is dead but 2nd is alive, then we need two more "dead" plants
                let first_plant = new Plant(smallest_plant_id - 2);
                let second_plant = new Plant(smallest_plant_id - 1);
                plants.unshift(first_plant, second_plant);
            } else if (plants[2].alive) {
                // Finally, if first two plants are dead but the third is alive, add one plant
                let first_plant = new Plant(smallest_plant_id - 1);
                plants.unshift(first_plant);
            }

            // Similar logic for end of the plants
            if (plants[plants.length - 1].alive) {        
                let end_plant = new Plant(largest_plant_id + 3);
                let second_to_last_plant = new Plant(largest_plant_id + 2);
                let third_to_last_plant = new Plant(largest_plant_id + 1);
                plants.push(third_to_last_plant, second_to_last_plant, end_plant);
            } else if (plants[plants.length - 2].alive) {
                let end_plant = new Plant(largest_plant_id + 2);
                let second_to_last_plant = new Plant(largest_plant_id + 1);
                plants.push(second_to_last_plant, end_plant);
            } else if (plants[plants.length - 3].alive) {
                let end_plant = new Plant(largest_plant_id + 1);
                plants.push(end_plant);
            }

            // Don't update `this.garden` because that'll affect the state and how a plant grows
            let next_garden_state = {};

            // Now that any "padding" plants are in place, compute each one's next state (but don't update garden just yet!)
            plants.forEach(plant => {
                if (!this.garden[plant.id]) {
                    this.garden[plant.id] = plant;
                }

                let plant_state_string = this.buildStateStringFromPlant(plant);
                next_garden_state[plant.id] = this.spread_rules[plant_state_string];
            });

            // Now that we've computed each plants next state, actually update its internal state from our cached `next_garden_state`
            plants.forEach(plant => {
                plant.alive = next_garden_state[plant.id];
            });
        }
    }

    // Part One question (run after 20 ticks...)
    getSumOfAlivePlantsIds() {
        let plants = Object.values(this.garden);
        return plants.reduce((a, b) => {
            return a + (b.alive ? b.id : 0);
        }, 0);
    }

    getGardenAsString() {
        let plants = Object.values(this.garden);
        plants.sort((a, b) => {
            if (a.id < b.id) return -1;
            else if (a.id > b.id) return 1;
            else return 0;
        });

        // return plants.map(p => p.alive ? '#' : '.').join('');

        return {
            string: plants.map(p => p.id === 0 ? (p.alive ? '+' : '-') : (p.alive ? '#' : '.')).join(''),
            min: plants[0].id,
            max: plants[plants.length - 1].id,
        };
    }
}

module.exports = Garden;
