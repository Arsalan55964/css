  // Advanced loop examples (various patterns) — copy/paste into a .js file and run

// 1) Basic do...while — runs at least once
let n = 0;
do {
    console.log('do..while iteration', n);
    n++;
} while (n < 3);

// 2) Input-validation style (simulated) using do...while
function askUntilValid(simulatedAnswers) {
    let idx = 0;
    let answer;
    do {
        answer = simulatedAnswers[idx++] ?? '';
        console.log('user answered:', answer);
        if (answer === 'quit') return null;
    } while (!/^[A-Za-z]{3,}$/.test(answer)); // require 3+ letters
    return answer;
}
console.log('validated:', askUntilValid(['1', 'ab', 'Alice']));

// 3) Paginated fetch simulation with do...while (async)
async function fetchPage(page) {
    // simulate pages 1..3
    await new Promise(r => setTimeout(r, 100));
    return { page, items: Array.from({ length: 2 }, (_, i) => `p${page}-i${i}`), next: page < 3 ? page + 1 : null };
}
async function fetchAllPages() {
    let page = 1;
    const all = [];
    do {
        // eslint-disable-next-line no-await-in-loop
        const res = await fetchPage(page);
        all.push(...res.items);
        page = res.next;
    } while (page != null);
    return all;
}
fetchAllPages().then(a => console.log('pages items:', a));

// 4) while loop with sentinel + performance tip (avoid heavy work in condition)
let i = 0;
while (i < 5) {
    console.log('while', i++);
}

// 5) for..of with destructuring and entries()
const arr = ['a', 'b', 'c'];
for (const [index, val] of arr.entries()) {
    console.log('for..of index', index, 'value', val);
}

// 6) for..in for object keys (use carefully — enumerates enumerable props)
const obj = { x: 1, y: 2 };
for (const key in obj) {
    if (!Object.hasOwn(obj, key)) continue; // guard for prototype props in older environments
    console.log('for..in', key, obj[key]);
}

// 7) Labeled loops — break out of nested loops
outer:
for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
        if (a === 1 && b === 1) {
            console.log('breaking out at', a, b);
            break outer;
        }
        console.log('pair', a, b);
    }
}

// 8) Iterators + manual next() consumption
function *countUp(to) {
    for (let k = 0; k <= to; k++) yield k;
}
const it = countUp(3);
let res = it.next();
while (!res.done) {
    console.log('iterator value', res.value);
    res = it.next();
}

// 9) for-await-of (consume async iterables) — Node v10+/browser modern
async function* asyncGen() {
    for (let t = 0; t < 3; t++) {
        await new Promise(r => setTimeout(r, 50));
        yield t;
    }
}
(async () => {
    for await (const v of asyncGen()) {
        console.log('for-await-of', v);
    }
})();

// 10) Replace loops with functional methods when appropriate (map/filter/reduce)
const numbers = [1,2,3,4,5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((s, x) => s + x, 0);
console.log({ doubled, evens, sum });

// 11) Reverse iterate efficiently
for (let idx = numbers.length - 1; idx >= 0; idx--) {
    console.log('reverse', numbers[idx]);
}