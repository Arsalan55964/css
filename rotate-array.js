// 8. Rotate array by n (positive => right)
function rotate(array, n) {
    const len = array.length;
    if (len === 0) return [];
    const k = ((n % len) + len) % len;
    return array.slice(-k).concat(array.slice(0, -k));
}

// 9. Frequency map and top-K
function freqMap(array, keyFn = identity) {
    return array.reduce((m, item) => {
        const k = keyFn(item);
        m.set(k, (m.get(k) || 0) + 1);
        return m;
    }, new Map());
}
function topK(array, k, keyFn = identity) {
    const fm = freqMap(array, keyFn);
    return [...fm.entries()].sort((a, b) => b[1] - a[1]).slice(0, k);
}

// 10. Cartesian product of multiple arrays
function cartesian(...arrays) {
    return arrays.reduce((acc, arr) => acc.flatMap(a => arr.map(b => a.concat([b]))), [[]]);
}

// 11. Async map with concurrency limit
async function asyncMap(array, mapper, { concurrency = 5 } = {}) {
    const results = [];
    const executing = new Set();
    async function run(i) {
        const p = (async () => mapper(array[i], i, array))();
        results[i] = await p;
        executing.delete(p);
    }
    for (let i = 0; i < array.length; i++) {
        if (executing.size >= concurrency) await Promise.race(executing);
        const p = run(i);
        executing.add(p);
    }
    await Promise.all(executing);
    return results;
}

// 12. Stable sort using Schwartzian transform (decorate-sort-undecorate)
function stableSort(array, compare) {
    return array
        .map((v, i) => ({ v, i }))
        .sort((a, b) => {
            const r = compare ? compare(a.v, b.v) : String(a.v).localeCompare(String(b.v));
            return r !== 0 ? r : a.i - b.i;
        })
        .map(x => x.v);
}

// 13. Examples / usage
const data = [5, 3, 9, 3, 1, 5, 7];

console.log('chunk(2):', chunk(data, 2));
console.log('groupBy parity:', groupBy(data, x => (x % 2 === 0 ? 'even' : 'odd')));
console.log('unique:', unique(data));
console.log('slidingWindow k=3:', slidingWindow(data, 3));
console.log('reservoirSample(3):', reservoirSample(data, 3));
console.log('zip:', zip([1,2,3], ['a','b','c'], ['X','Y','Z']));
console.log('rotate right 2:', rotate([1,2,3,4,5], 2));
console.log('freqMap -> top2:', topK(data, 2));
console.log('cartesian product [[1,2],[\'a\',\'b\']]:', cartesian([1,2], ['a','b']));
console.log('stableSort asc:', stableSort(['b', 'a', 'c', 'a']));

// asyncMap example (simulated async)
(async () => {
    const nums = [1,2,3,4,5];
    const res = await asyncMap(nums, async n => {
        await new Promise(r => setTimeout(r, 100));
        return n * 2;
    }, { concurrency: 2 });
    console.log('asyncMap result:', res);
})();

// 14. Small utilities: mapToObject, difference, intersect, union
const mapToObject = (arr, keyFn = identity, valFn = identity) =>
    arr.reduce((o, v) => (o[keyFn(v)] = valFn(v), o), {});
const intersect = (a, b) => a.filter(x => b.includes(x));
const difference = (a, b) => a.filter(x => !b.includes(x));
const union = (a, b) => unique([...a, ...b]);

console.log('mapToObject:', mapToObject([{id:1, v:10}, {id:2, v:20}], x => x.id, x => x.v));
console.log('intersect [1,2,3] & [2,3,4]:', intersect([1,2,3],[2,3,4]));
console.log('difference [1,2,3] - [2]:', difference([1,2,3],[2]));
console.log('union [1,2] U [2,3]:', union([1,2],[2,3]));