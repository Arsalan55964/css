    const user = {
    username: "arsalan" ,
    price: "999",


    welcomeMessage: function() {
        console.log(`${this.username} , welcome to website`);
        console.log(this);
        
        
    }
}

// user.welcomeMessage()
// user.username = "sam"
// user.welcomeMessage()


//console.log(this);

// function chai() {
//     let username = "arsalan"
//     console.log(this.username) ;
    
// }
// chai()


const chai = () => {
    let username = "arsalan"
    console.log(this);
    
}


//chai()


// basic arrow function

//  const addTwo = (num1, num2) => {
//     return num1 + num2
//  }       






// this emplicite return arrow function is ky ander return ki word use nhi hota




//  const addTwo = (num1, num2) =>  num1 + num2


//  const addTwo = (num1, num2) => (num1 + num2)
 
const addTwo = (num1, num2) => ( {uername:"arsalan"})

console.log(addTwo(3,4));  
                       
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
