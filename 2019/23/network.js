const { Computer } = require('./intcode-computer-optimized');

class Network {
	constructor(program, nics_count = 50) {
		this.original_program = [...program];
		this.packet_queue = Array(nics_count)
			.fill()
			.map((_) => []);

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

	partOne(break_on_address = 255) {
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

	partTwo(nat_address = 255) {
		let nat_packet;
		let last_nat_sent = [];

		const IDLE_REST = 200;

		// Some arbitrary number of loops to test if "idle"
		let idle = IDLE_REST;
		while (true) {
			idle--;
			for (let nic of this.nics) {
				let outputs = nic.run();
				if (outputs.length === 3) {
					idle = IDLE_REST;
					let address = outputs.shift();
					let x = outputs.shift();
					let y = outputs.shift();

					if (address === nat_address) {
						nat_packet = [x, y];
					} else {
						this.packet_queue[address].push([x, y]);
					}
				}
			}

			if (idle < 0 && this.packetQueueSize() === 0) {
				// Once the network is idle, the NAT sends only the last packet
				// it received to address 0.
				this.packet_queue[0].push(nat_packet);

				// What is the first Y value delivered by the NAT to the computer at address 0 twice in a row?
				if (last_nat_sent[1] === nat_packet[1]) {
					return { x: nat_packet[0], y: nat_packet[1] };
				}

				// @todo Reset NAT packet here?, e.g. `nat_packet = undefined`?
				last_nat_sent = nat_packet;
				idle = IDLE_REST;
			}
		}
	}

	packetQueueSize() {
		return this.packet_queue.reduce((sum, queue) => sum + queue.length, 0);
	}
}

module.exports = {
	Network,
};
