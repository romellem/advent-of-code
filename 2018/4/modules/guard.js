class Guard {
    constructor(id) {
        this.id = id;

        this.sleeping = [];
    }

    addSleeping(falls_asleep, wakes_up) {
        this.sleeping.push([falls_asleep.getMinutes(), wakes_up.getMinutes()]);
    }

    getTotalTimeAsleep() {
        return this.sleeping.reduce((a, b) => {
            return b[1] - b[0] + a;
        }, 0);
    }

    /**
     * @returns {Array}
     */
    getMinuteMostLikelyToBeAsleepDuring(return_duple = false) {
        let times_asleep = {};
        for (let i = 0; i < 60; i++) {
            times_asleep[i] = 0;
        }

        this.sleeping.forEach(nap => {
            let [falls_asleep, wakes_up] = nap;
            for (let i = falls_asleep; i < wakes_up; i++) {
                times_asleep[i] += 1;
            }
        });

        let sleep_sorted = Object.entries(times_asleep);
        sleep_sorted.sort((a, b) => {
            if (a[1] < b[1]) {
                return -1;
            } else if (a[1] > b[1]) {
                return 1;
            } else {
                return 0;
            }
        });

        let duple = sleep_sorted.pop();
        let time_most_asleep = duple[0];

        return return_duple ? duple : time_most_asleep;
    }
}

module.exports = Guard;
