// Advanced Array Utilities (modern JS)
// Examples: creation, transformation, grouping, chunking, sliding window, reservoir sampling, async map

// 1. Basic helpers
const range = (n, start = 0) => Array.from({ length: n }, (_, i) => i + start);
const identity = x => x;

// 2. Chunk an array into size-n parts
function chunk(array, size = 1) {
    if (size <= 0) throw new RangeError('size must be > 0');
    const out = [];
    for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
    return out;
}

// 3. Group by key function
function groupBy(array, keyFn) {
    return array.reduce((acc, item) => {
        const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
        (acc[key] ??= []).push(item);
        return acc;
    }, {});
}

// 4. Unique items (with optional key selector)
function unique(array, keyFn = identity) {
    const seen = new Set();
    return array.filter(item => {
        const k = keyFn(item);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
}

// 5. Sliding window (size k, optional step)
function slidingWindow(array, k, step = 1) {
    const out = [];
    if (k <= 0) return out;
    for (let i = 0; i <= array.length - k; i += step) out.push(array.slice(i, i + k));
    return out;
}

// 6. Reservoir sampling (sample m items uniformly from stream/array)
function reservoirSample(array, m) {
    const reservoir = [];
    for (let i = 0; i < array.length; i++) {
        if (i < m) reservoir.push(array[i]);
        else {
            const j = Math.floor(Math.random() * (i + 1));
            if (j < m) reservoir[j] = array[i];
        }
    }
    return reservoir;
}

// 7. Zip arrays (shortest length)
function zip(...arrays) {
    const minLen = Math.min(...arrays.map(a => a.length));
    return range(minLen).map(i => arrays.map(a => a[i]));
}