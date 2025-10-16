// JavaScript Data Types Demo

// 1. Primitive Data Types
const numberExample = {
    integer: 42,
    float: 3.14,
    negative: -17,
    infinity: Infinity,
    notANumber: NaN
};

const stringExample = {
    single: 'Hello',
    double: "World",
    template: `Template literal`,
    multiline: `
        This is a
        multiline string
    `
};

const booleanExample = {
    true: true,
    false: false,
    comparison: 5 > 3
};

// Special primitive types
const nullValue = null;
let undefinedValue;
const symbolValue = Symbol('unique');
const bigIntValue = 9007199254740991n;

// 2. Reference Types (Objects)
const arrayExample = [1, 'two', true, { key: 'value' }];

const objectExample = {
    name: 'John',
    age: 30,
    isStudent: false,
    hobbies: ['reading', 'coding'],
    address: {
        street: '123 Main St',
        city: 'Boston'
    }
};

// 3. Type Checking
function checkType(value) {
    console.log(`Value: ${value}`);
    console.log(`Type: ${typeof value}`);
    console.log(`Is Array: ${Array.isArray(value)}`);
    console.log('-----------------');
}

// 4. Type Conversion
function demonstrateTypeConversion() {
    // String to Number
    console.log(Number('42'));           // 42
    console.log(parseInt('42.5'));       // 42
    console.log(parseFloat('42.5'));     // 42.5

    // Number to String
    console.log(String(42));             // "42"
    console.log((123).toString());       // "123"

    // Boolean conversion
    console.log(Boolean(1));             // true
    console.log(Boolean(''));            // false
    console.log(Boolean([]));            // true
}

// Testing the types
function runTests() {
    console.log('=== Type Examples ===');
    checkType(numberExample.integer);
    checkType(stringExample.single);
    checkType(booleanExample.true);
    checkType(nullValue);
    checkType(undefinedValue);
    checkType(symbolValue);
    checkType(bigIntValue);
    checkType(arrayExample);
    checkType(objectExample);

    console.log('=== Type Conversion Examples ===');
    demonstrateTypeConversion();
}

// Run the tests
runTests();