const { LogEntry, FALLS_ASLEEP, WAKES_UP, BEGINS_SHIFT } = require('./log-entry');
const Guard = require('./guard');

class Company {
    constructor(unsorted_log) {
        this.log = this.sortLog(unsorted_log);
        this.guards = {};


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

    // parseLog() {
    //     this.log.forEach(line => {
    //         if (line.id && )
    //         if (line.action === FALLS_ASLEEP)
    //     })
    // }


}

module.exports = Company;
