class Reindeer {
    constructor(name, stats = {}) {
        this.name = name;

        this.speed = stats.speed;
        this.duration = stats.duration;
        this.restTime = stats.restTime;

        this.distance = 0;

        this.timeLeftSprinting = this.duration;

        this.resting = false;
        this.timeLeftResting = 0;

        // Part two is based on score
        this.score = 0;
    }

    rest() {
        this.timeLeftResting--;

        if (this.timeLeftResting === 0) {
            this.resting = false;
            this.timeLeftSprinting = this.duration;
        }
    }

    move() {
        this.distance += this.speed;
        this.timeLeftSprinting--;

        if (this.timeLeftSprinting === 0) {
            this.resting = true;
            this.timeLeftResting = this.restTime;
        }
    }

    tick() {
        if (this.resting) {
            this.rest();
        } else {
            this.move();
        }
    }

    increaseScore() {
        this.score++;
    }
}
class Race {
    constructor(reindeer_original, race_time) {
        let reindeer = JSON.parse(JSON.stringify(reindeer_original));

        this.racers = Object.keys(reindeer).map(r => new Reindeer(r, reindeer[r]));
        this.time = 0;
        this.race_time = race_time;
    }

    tick() {
        this.racers.forEach(r => r.tick());
        this.time++;

        this.sortRunners();
        let best_distance = this.racers[this.racers.length - 1].distance;

        // This loop could be improved, starting at the back and breaking once
        // we are in 2nd place. Oh well, the whole program runs pretty quickly
        // without this optimization anyways.
        this.racers.forEach(r => {
            if (r.distance === best_distance) {
                r.increaseScore();
            }
        });
    }

    run() {
        while (this.time < this.race_time) {
            this.tick();
        }
    }

    sortRunners(by_score = false) {
        let key = by_score ? 'score' : 'distance';

        this.racers.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            else if (a[key] > b[key]) return 1;
            else return 0;
        });

        return this.racers;
    }

    get winner() {
        this.sortRunners();
        return this.racers[this.racers.length - 1];
    }

    get winnerByScore() {
        this.sortRunners(true);

        return this.racers[this.racers.length - 1];
    }
}

module.exports = Race;
