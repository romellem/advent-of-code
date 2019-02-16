class Disk {
    constructor({ value, size }) {
        this.value = String(value);
        this.size = size;

        this.grow();
    }

    grow() {
        while(this.value.length < this.size) {
            let b = this.value;
            let b_array = b.split('');
            b_array.reverse();
            let new_b = b_array.map(v => v === '1' ? '0' : '1').join('')
            this.value = this.value + '0' + new_b;
        }

        this.value = this.value.substr(0, this.size);
        return this.value;
    }

    checksum() {
        let checksum = this.value;
        while (checksum.length % 2 === 0) {
            let new_val = '';
            for (let i = 0; i < checksum.length - 1; i += 2) {
                let a = checksum[i];
                let b = checksum[i + 1];
    
                if (a === b) {
                    new_val += '1';
                } else {
                    new_val += '0';
                }
            }

            checksum = new_val;
        }
        
        return checksum;
    }
}

module.exports = Disk;
