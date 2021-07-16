const { Computer } = require('./intcode-computer-optimized');

class Network {
	constructor(program, nics_count = 50) {
		this.original_program = [...program];
		this.packet_queue = Array(nics_count).fill([]);

		this.nics = Array(nics_count)
			.fill()
			.map((_, i) => {
				return new Computer({
					memory: program,
					inputs: [i],
					address: i,
					defaultInput: (computer) => {
						if (this.packet_queue[computer.address].length === 0) {
							return -1;
						} else {
							// Take first packet
							let packet = this.packet_queue[computer.address][0];
							if (packet.length === 2) {
								// First shift `x` value and keep partial packet in queue
								let x = packet.shift();
								return x;
							} else {
								// Then take the `y` value and remove the packet from the queue
								let [y] = this.packet_queue[computer.address].shift();
								return y;
							}
						}
					},
					pause_on: {
						[Computer.OUT]: true,
						[Computer.INP]: true,
					},
				});
			});
	}

	run(break_on_address = 255) {
		while (true) {
			for (let nic of this.nics) {
				let outputs = nic.run();
				if (outputs.length === 3) {
					let address = outputs.shift();
					let x = outputs.shift();
					let y = outputs.shift();

					if (address === break_on_address) {
						return { x, y };
					}
					this.packet_queue[address].push([x, y]);
				}
			}
		}

	}
}

module.exports = {
	Network,
};
