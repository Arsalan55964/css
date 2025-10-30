// Advanced Array Operations and Utilities

// 1. Custom Array Methods
Array.prototype.groupBy = function(keyFn) {
    return this.reduce((groups, item) => {
        const key = keyFn(item);
        (groups[key] = groups[key] || []).push(item);
        return groups;
    }, {});
};

// 2. Complex array transformations
class ArrayUtils {
    static chunk(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, 
            (_, i) => array.slice(i * size, i * size + size)
        );
    }

    static flatten(array, depth = Infinity) {
        return array.flat(depth);
    }

    static unique(array, by = item => item) {
        return [...new Map(array.map(item => [by(item), item])).values()];
    }

    static intersect(arr1, arr2) {
        const set = new Set(arr2);
        return arr1.filter(item => set.has(item));
    }
}

// 3. Advanced array operations
const data = [
    { id: 1, name: 'Alice', age: 25, tags: ['dev', 'js'] },
    { id: 2, name: 'Bob', age: 30, tags: ['dev', 'python'] },
    { id: 3, name: 'Charlie', age: 35, tags: ['design'] }
];

// Complex filtering
const filtered = data
    .filter(({ age, tags }) => age > 25 && tags.includes('dev'))
    .map(({ id, name }) => ({ id, name }));

// Nested transformations
const tagCounts = data
    .flatMap(item => item.tags)
    .reduce((acc, tag) => ({
        ...acc,
        [tag]: (acc[tag] || 0) + 1
    }), {});

// 4. Array performance optimizations
class PerformantArray {
    constructor(size = 1000) {
        this.array = new Array(size);
        this.length = 0;
    }

    push(item) {
        if (this.length === this.array.length) {
            const newArray = new Array(this.array.length * 2);
            for (let i = 0; i < this.array.length; i++) {
                newArray[i] = this.array[i];
            }
            this.array = newArray;
        }
        this.array[this.length++] = item;
    }

    get(index) {
        if (index >= this.length) throw new RangeError('Index out of bounds');
        return this.array[index];
    }
}

// 5. Array sorting with custom comparators
const complexSort = (arr) => {
    return [...arr].sort((a, b) => {
        if (a.priority !== b.priority) return b.priority - a.priority;
        if (a.name !== b.name) return a.name.localeCompare(b.name);
        return a.id - b.id;
    });
};

// Usage examples
function demonstrateArrayOps() {
    // Grouping
    const users = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' }
    ];
    console.log('Grouped by role:', users.groupBy(u => u.role));

    // Chunking
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    console.log('Chunked:', ArrayUtils.chunk(numbers, 3));

    // Unique with custom key
    const items = [
        { id: 1, name: 'A' },
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
    ];
    console.log('Unique by id:', ArrayUtils.unique(items, item => item.id));

    // Performance test
    const perf = new PerformantArray();
    console.time('push');
    for (let i = 0; i < 1000000; i++) {
        perf.push(i);
    }
    console.timeEnd('push');
}

// Run demonstrations
demonstrateArrayOps();