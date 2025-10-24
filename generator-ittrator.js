// Advanced Regular Expressions examples

// 1. Email validation (simple, practical)
const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i;
console.log(emailRe.test('user@example.com')); // true
console.log(emailRe.test('bad@.com')); // false

// 2. Named capture groups (ES2018+)
const dateRe = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = '2025-10-24'.match(dateRe);
console.log(m.groups); // { year: '2025', month: '10', day: '24' }

// 3. Replace with callback — format phone numbers
const raw = 'Call: 1234567890 or 0987654321';
const phoneRe = /(\d{3})(\d{3})(\d{4})/g;
const formatted = raw.replace(phoneRe, (match, p1, p2, p3) => `(${p1}) ${p2}-${p3}`);
console.log(formatted);

// 4. Lookahead / Lookbehind
const lookRe = /(?<=\$)\d+(\.\d{2})?(?=\s|$)/; // price after $ with optional cents
console.log('$123.45 is price'.match(lookRe)); // ['123.45']

// 5. Unicode / emoji matching (use u flag)
const emojiRe = /\p{Emoji}/u;
console.log(emojiRe.test('Hello 🚀')); // true

// 6. Global + sticky flags: find tokens with positions
const tokenRe = /\w+/gy; // 'g' for all, 'y' sticky to current index
const text = 'one two  three';
let result;
while ((result = tokenRe.exec(text)) !== null) {
    console.log(`Token "${result[0]}" at ${result.index}`);
}

// 7. Split by multiple delimiters but keep some tokens
const csv = 'one, two;three|four';
const parts = csv.split(/[,;|]\s*/);
console.log(parts);

// 8. Validate URL (basic)
const urlRe = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
console.log(urlRe.test('https://example.com/page?x=1'));

// 9. Remove duplicate whitespace and trim
const messy = '  Hello   world \n this   is   spaced  ';
const clean = messy.replace(/\s+/g, ' ').trim();
console.log(clean);

// 10. Escaping user input for dynamic regex
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const userInput = 'site.com?query=1';
const safeRe = new RegExp(escapeRegex(userInput), 'i');
console.log(safeRe.test('Visit site.com?query=1 for info'));