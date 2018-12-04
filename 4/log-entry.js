const log_regex = /^\[(\d{4}-\d\d-\d\d \d\d:\d\d)\] (.+)$/;
const guard_regex = /Guard #(\d+) begins shift/;

const FALLS_ASLEEP = 'falls_asleep';
const WAKES_UP = 'wakes_up';
const BEGINS_SHIFT = 'begins_shift';

class LogEntry {
    constructor(raw_line) {
        let [, date_string, action] = log_regex.exec(raw_line);

        this.date = new Date(date_string);
        this.raw_date = date_string;
        this.id = undefined;
        if (action.includes('falls asleep')) {
            this.action = FALLS_ASLEEP;
        } else if (action.includes('wakes up')) {
            this.action = WAKES_UP;
        } else {
            // Parse out the guard ID
            let [, guard_id] = guard_regex.exec(action);
            this.action = BEGINS_SHIFT;
            this.id = parseInt(guard_id);
        }
    }

    setGuardId(id) {
        this.id = id;
    }
}

module.exports = {
    LogEntry,
    FALLS_ASLEEP,
    WAKES_UP,
    BEGINS_SHIFT,
};
