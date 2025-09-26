    // ===== LOOPS in JavaScript =====

// 1. For Loop
console.log("---- For Loop ----");
for (let i = 1; i <= 5; i++) {
  console.log("For Loop - Number: " + i);
}

// 2. While Loop
console.log("---- While Loop ----");
let j = 1;
while (j <= 5) {
  console.log("While Loop - Number: " + j);
  j++;
}

// 3. Do...While Loop
console.log("---- Do While Loop ----");
let k = 1;
do {
  console.log("Do While Loop - Number: " + k);
  k++;
} while (k <= 5);

// 4. For...of Loop (arrays)
console.log("---- For...of Loop (Array) ----");
const fruits = ["Apple", "Banana", "Mango"];
for (let fruit of fruits) {
  console.log("Fruit: " + fruit);
}

// 5. For...in Loop (objects)
console.log("---- For...in Loop (Object) ----");
const person = { name: "Ali", age: 22, city: "Lahore" };
for (let key in person) {
  console.log(key + " : " + person[key]);
}
