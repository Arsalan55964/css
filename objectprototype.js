// Example of prototype chain and inheritance in JavaScript

// Parent class
const Vehicle = {
    isRunning: false,
    start: function() {
        this.isRunning = true;
        console.log('Vehicle started');
    },
    stop: function() {
        this.isRunning = false;
        console.log('Vehicle stopped');
    }
}

// Child classes
const Car = {
    type: 'Car',
    wheels: 4,
    honk: function() {
        console.log('Beep! Beep!');
    }
}

const Motorcycle = {
    type: 'Motorcycle',
    wheels: 2,
    wheelie: function() {
        console.log('Doing a wheelie!');
    }
}

// Set up inheritance
Object.setPrototypeOf(Car, Vehicle);
Object.setPrototypeOf(Motorcycle, Vehicle);

// Add a method to all objects
Object.prototype.getInfo = function() {
    console.log(`This is a ${this.type}`);
}

// Usage examples
Car.start();
Car.honk();
Car.getInfo();

Motorcycle.start();
Motorcycle.wheelie();
Motorcycle.getInfo();

// Check inheritance
console.log(Car.isRunning);  // true
console.log(Motorcycle.isRunning);  // true