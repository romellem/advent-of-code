class Disks {
    constructor(disks) {
        this.disks = JSON.parse(JSON.stringify(disks));
    }

    getFirstTimeWhenCapsuleWouldFallThrough() {
        let time = 0;
        do {
            time++;
        } while (!this.testTimeAgainstDisks(time));

        return time;
    }

    testTimeAgainstDisks(time) {
        for (let i = 0; i < this.disks.length; i++) {
            let { positions, initialPosition } = this.disks[i];
            if ((time + (i + 1) + initialPosition) % positions > 0) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Disks;
