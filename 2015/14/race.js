class Reindeer {
    constructor(name, stats) {
        this.name = name;

        this.speed = stats.speed;
        this.duration = stats.duration;
        this.restTime = stats.restTime;

        this.distance = 0;

        this.timeLeftSprinting = this.duration;

        this.resting = false;
        this.timeLeftResting = 0;
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
    }

    run() {
        while (this.time < this.race_time) {
            this.tick();
        }
    }

    getPositions() {
        let sorted_racers = [];
        this.racers.forEach(r => sorted_racers.push(r));

        sorted_racers.sort((a, b) => {
            if (a.distance < b.distance) return -1;
            else if (a.distance > b.distance) return 1;
            else return 0;
        });

        return sorted_racers;
    }

    get winner() {
        let sorted_racers = this.getPositions();
        return sorted_racers.pop();
    }
}

module.exports = Race;
