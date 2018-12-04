const { LogEntry, FALLS_ASLEEP, WAKES_UP, BEGINS_SHIFT } = require('./log-entry');
const Guard = require('./guard');

class Company {
    constructor(unsorted_log) {
        this.log = this.sortLog(unsorted_log);
        this.guards = {};

        this.parseLog();
        let guard_most_asleep = this.getGuardMostAsleep();
        let time_when_guard_is_asleep_most = guard_most_asleep.getMinuteMostLikelyToBeAsleepDuring();

        console.log(`Guard most asleep is ${guard_most_asleep.id}`);
        console.log(`Sleeps the most during minute ${time_when_guard_is_asleep_most}`);
        console.log(
            `ID * minutes = ${
                guard_most_asleep.id
            } * ${time_when_guard_is_asleep_most} = ${guard_most_asleep.id *
                time_when_guard_is_asleep_most}`
        );
    }

    /**
     * @param {Array} unsorted_log
     * @returns {Array} Returns a sorted log
     */
    sortLog(unsorted_log) {
        let temp_log = unsorted_log.map(line => new LogEntry(line));
        temp_log.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            } else {
                return 0;
            }
        });

        // Now, create a 2D log, so each "row" is one shift
        let log = [];
        let shift = [];
        for (let i = 0; i < temp_log.length; i++) {
            let line = temp_log[i];

            if (line.action === BEGINS_SHIFT && i !== 0) {
                log.push(shift);

                // Create a new shift
                shift = [];
            }

            // Always push the line onto the latest shift
            shift.push(line);
        }

        return log;
    }

    parseLog() {
        this.log.forEach(shift => {
            let { id } = shift[0];
            if (!this.guards[id]) {
                this.guards[id] = new Guard(id);
            }

            for (let i = 1; i < shift.length; i += 2) {
                let falls_asleep = shift[i].date;
                let wakes_up = shift[i + 1].date;

                this.guards[id].addSleeping(falls_asleep, wakes_up);
            }
        });
    }

    getGuardMostAsleep() {
        let guards = Object.values(this.guards);

        let guard_most_asleep = {
            id: undefined,
            time: -1,
        };
        guards.forEach(guard => {
            let total_asleep = guard.getTotalTimeAsleep();
            if (total_asleep > guard_most_asleep.time) {
                guard_most_asleep.time = total_asleep;
                guard_most_asleep.id = guard.id;
            }
        });

        console.log(guard_most_asleep);
        return this.guards[guard_most_asleep.id];
    }
}

module.exports = Company;
