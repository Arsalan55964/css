// ===== CLASSES in JavaScript =====

// Class banayi
class Person {
  constructor(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
  }

  // Method
  greet() {
    console.log(`Hello, my name is ${this.name}, I am ${this.age} years old and I live in ${this.city}.`);
  }

  // Method to update city
  updateCity(newCity) {
    this.city = newCity;
    console.log(`${this.name} moved to ${this.city}.`);
  }
}

// Object banaya class se
const person1 = new Person("Ali", 22, "Lahore");
person1.greet(); // Method call

// Update city
person1.updateCity("Karachi");
person1.greet();

// Dusra object
const person2 = new Person("Ayesha", 20, "Islamabad");
person2.greet();
