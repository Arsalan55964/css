// 1. Regular Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// 2. Function Expression
const sayGoodbye = function(name) {
    return `Goodbye, ${name}!`;
};

// 3. Arrow Function
const multiply = (a, b) => a * b;

// 4. Function with Default Parameters
function createUser(name = 'Anonymous', age = 0) {
    return {
        name,
        age
    };
}

// 5. Function with Rest Parameters
const sum = (...numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
};

// 6. Higher-Order Function
function executeOperation(operation, a, b) {
    return operation(a, b);
}

// 7. Immediately Invoked Function Expression (IIFE)
(function() {
    console.log('IIFE executed!');
})();

// Example Usage
function main() {
    // Regular function call
    console.log(greet('John'));

    // Function expression call
    console.log(sayGoodbye('Alice'));

    // Arrow function call
    console.log(`Multiplication result: ${multiply(5, 3)}`);

    // Default parameters
    console.log(createUser());
    console.log(createUser('Bob', 25));

    // Rest parameters
    console.log(`Sum: ${sum(1, 2, 3, 4, 5)}`);

    // Higher-order function
    const add = (x, y) => x + y;
    console.log(`Operation result: ${executeOperation(add, 10, 5)}`);
}

// Run all examples
main();