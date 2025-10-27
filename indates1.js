// Advanced date utilities (works in Node/browser)

// Normalize input to Date (throws on invalid)
function toDate(input) {
    if (input instanceof Date) return new Date(input.getTime());
    if (typeof input === 'number') return new Date(input);
    if (typeof input === 'string') {
        const d = new Date(input);
        if (!isNaN(d)) return d;
    }
    throw new TypeError('Invalid date input: ' + input);
}

// Check if a date is inside a range
function isDateInRange(date, start, end, { inclusive = true } = {}) {
    const d = toDate(date).getTime();
    const s = toDate(start).getTime();
    const e = toDate(end).getTime();
    if (inclusive) return d >= Math.min(s, e) && d <= Math.max(s, e);
    return d > Math.min(s, e) && d < Math.max(s, e);
}

// Generate array of dates between start and end (inclusive)
function datesInRange(start, end, { step = 1 } = {}) {
    const s = toDate(start);
    const e = toDate(end);
    const increment = Math.max(1, Math.floor(step));
    const dates = [];
    const dir = s <= e ? 1 : -1;
    let cur = new Date(s);
    while (dir === 1 ? cur <= e : cur >= e) {
        dates.push(new Date(cur));
        cur.setDate(cur.getDate() + dir * increment);
    }
    return dates;
}

// Get number of business days between two dates (inclusive/exclusive)
function businessDaysBetween(start, end, { inclusive = true } = {}) {
    const s = toDate(start);
    const e = toDate(end);
    const dir = s <= e ? 1 : -1;
    let cur = new Date(s);
    let count = 0;
    while (dir === 1 ? cur <= e : cur >= e) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) count++;
        cur.setDate(cur.getDate() + dir);
    }
    return inclusive ? count : Math.max(0, count - 1 * dir);
}

// Next business day (forward by n business days)
function nextBusinessDay(date, n = 1) {
    if (!Number.isInteger(n)) throw new TypeError('n must be integer');
    let cur = toDate(date);
    const step = n >= 0 ? 1 : -1;
    let remaining = Math.abs(n);
    while (remaining > 0) {
        cur.setDate(cur.getDate() + step);
        const day = cur.getDay();
        if (day !== 0 && day !== 6) remaining--;
    }
    return cur;
}

// Check if two ranges overlap
function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    const aS = toDate(aStart).getTime();
    const aE = toDate(aEnd).getTime();
    const bS = toDate(bStart).getTime();
    const bE = toDate(bEnd).getTime();
    return Math.max(aS, bS) <= Math.min(aE, bE);
}

// Merge multiple date ranges (each range = [startDate, endDate])
function mergeRanges(ranges) {
    if (!Array.isArray(ranges)) throw new TypeError('ranges must be array');
    const normalized = ranges.map(([s, e]) => {
        const a = toDate(s).getTime();
        const b = toDate(e).getTime();
        return a <= b ? [a, b] : [b, a];
    }).sort((x, y) => x[0] - y[0]);

    const merged = [];
    for (const [s, e] of normalized) {
        if (!merged.length || s > merged[merged.length - 1][1] + 1) {
            merged.push([s, e]);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], e);
        }
    }
    return merged.map(([s, e]) => [new Date(s), new Date(e)]);
}

// Format date with Intl
function formatDate(date, locale = 'en-US', options = {}) {
    return new Intl.DateTimeFormat(locale, options).format(toDate(date));
}

// Examples / Usage:
const a = '2025-10-01';
const b = '2025-10-10';
console.log('is in range:', isDateInRange('2025-10-05', a, b)); // true
console.log('dates in range:', datesInRange(a, b).map(d => d.toISOString().slice(0,10)));
console.log('business days:', businessDaysBetween(a, b));
console.log('next business day from Fri 2025-10-03:', nextBusinessDay('2025-10-03').toISOString().slice(0,10));
console.log('ranges overlap:', rangesOverlap('2025-10-01', '2025-10-05', '2025-10-04', '2025-10-06'));

const merged = mergeRanges([
    ['2025-10-01','2025-10-05'],
    ['2025-10-04','2025-10-10'],
    ['2025-09-20','2025-09-25']
]);
console.log('merged ranges:', merged.map(([s,e]) => [s.toISOString().slice(0,10), e.toISOString().slice(0,10)]));

console.log('formatted:', formatDate(new Date(), 'en-GB', { dateStyle: 'full' }));