// Advanced String Manipulation Examples

const str = "  JavaScript is powerful!  ";

// 1. Trim whitespace
const trimmed = str.trim();
console.log("Trimmed:", trimmed);

// 2. Change case
console.log("Uppercase:", trimmed.toUpperCase());
console.log("Lowercase:", trimmed.toLowerCase());

// 3. Replace text (with regex)
const replaced = trimmed.replace(/powerful/i, "awesome");
console.log("Replaced:", replaced);

// 4. Split into array
const words = trimmed.split(" ");
console.log("Words Array:", words);

// 5. Join array into string
const joined = words.join("-");
console.log("Joined:", joined);

// 6. Check substring existence
console.log("Includes 'JavaScript':", trimmed.includes("JavaScript"));

// 7. Extract substring
console.log("Substring (0,10):", trimmed.substring(0, 10));

// 8. Template literals
const name = "Arsalan";
const greeting = `Hello, ${name}! Welcome to ${trimmed}.`;
console.log("Greeting:", greeting);

// 9. Repeat string
console.log("Repeat:", "JS ".repeat(3));

// 10. Pad string
console.log("Pad Start:", name.padStart(10, "*"));
console.log("Pad End:", name.padEnd(10, "*"));

// 11. Advanced: Reverse a string
const reversed = trimmed.split("").reverse().join("");
console.log("Reversed:", reversed);

// 12. Unicode and emoji handling
const emojiStr = "👍🏽 JavaScript 🚀";
console.log("Length:", emojiStr.length);
console.log("Code points:", Array.from(emojiStr));

// 13. Tagged template function
function emphasize(strings, ...values) {
    return strings.reduce((result, str, i) => 
        result + str + (values[i] ? values[i].toUpperCase() : ""), "");
}
const lang = "javascript";
console.log(emphasize`I love ${lang} so much!`);