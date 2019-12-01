const { input } = require('./input');

// To find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.
// Continue recursively for the mass of the _fuel_ you just calculated. If the mass is zero or less, discard it
const calcFuelArray = (mass, arr = []) => {
	let fuel = Math.floor(mass / 3) - 2;
	if (fuel <= 0) {
		return arr;
	} else {
		arr.push(fuel);
		return calcFuelArray(fuel, arr);
	}
};

calcTotalFuel = mass => {
	return calcFuelArray(mass).reduce((a, b) => a + b, 0);
};

let fuel = input.map(mass => calcTotalFuel(mass));
const total_fuel = fuel.reduce((a, b) => a + b, 0);
console.log(total_fuel);
