// Advanced string/Unicode/regex/locale examples

// 1) Tagged template — sanitize / highlight
function highlight(strings, ...values) {
    return strings.reduce((acc, s, i) => acc + s + (values[i] ? `<<${String(values[i])}>>` : ''), '');
}
const user = '<b>Ali</b>';
console.log(highlight`Hello ${user}, welcome!`);

// 2) String.raw — show raw backslashes
const raw = String.raw`C:\Users\node\test`;
console.log(raw);

// 3) Unicode code points vs .length / iteration
const s = 'A\u{1F680}B'; // A + 🚀 + B
console.log('length:', s.length);          // 4 (surrogate pairs)
console.log('codePointAt(1):', s.codePointAt(1).toString(16));
for (const ch of s) console.log('char:', ch);

// 4) fromCodePoint -> build emoji string
console.log(String.fromCodePoint(0x1F44B, 0x1F30D));

// 5) Normalization: composed vs decomposed
const comp = 'é';                // U+00E9
const decomp = 'e\u0301';        // 'e' + combining acute
console.log('equal raw?', comp === decomp);
console.log('equal NFC?', comp.normalize('NFC') === decomp.normalize('NFC'));

// 6) Grapheme clusters (user-visible characters) via Intl.Segmenter
if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
    const clusters = [...seg.segment('Z͑🇵🇸é')].map(s => s.segment);
    console.log('graphemes:', clusters);
}

// 7) Regex advanced: lookahead, lookbehind, named groups, replace function
const txt = 'john.doe@example.com and jane.smith@work.org';
const emailRegex = /(?<user>[a-zA-Z0-9._%+-]+)@(?<domain>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
for (const m of txt.matchAll(emailRegex)) {
    console.log('named groups:', m.groups);
}
// mask username using replace with function
const masked = txt.replace(emailRegex, (full, p1, p2, offset, str, groups) => {
    const u = groups.user;
    return u[0] + '*'.repeat(Math.max(0, u.length - 2)) + u.slice(-1) + '@' + groups.domain;
});
console.log('masked emails:', masked);

// 8) Lookahead / Lookbehind examples
const look = 'foo1bar foo2bar foo10bar';
console.log('numbers only (lookbehind):', look.match(/(?<=foo)\d+(?=bar)/g));

// 9) Replace examples: swap first/last name using named groups
const nameSwap = 'Doe, John';
console.log(nameSwap.replace(/(?<last>\w+),\s*(?<first>\w+)/, '$<first> $<last>'));

// 10) matchAll and capture groups usage
const csv = 'id:1|id:2|id:300';
const ids = [...csv.matchAll(/id:(\d+)/g)].map(m => +m[1]);
console.log('ids:', ids);

// 11) Locale-aware compare & sort
const names = ['Åke','Zoë','Ana','Åsa','Albert'];
names.sort((a,b) => a.localeCompare(b, 'sv', { sensitivity: 'base' }));
console.log('sv sort:', names);

// 12) Intl.Collator for repeated sorting
const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
const files = ['file2', 'file10', 'file1'];
files.sort(collator.compare);
console.log('natural sort:', files);

// 13) Useful utilities: HTML escape
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
console.log(escapeHTML('<div class="x">Tom & Jerry</div>'));

// 14) Base64 encode/decode (Node)
if (typeof Buffer !== 'undefined') {
    const rawStr = 'hello ✓';
    const b = Buffer.from(rawStr, 'utf8').toString('base64');
    console.log('base64:', b);
    console.log('decoded:', Buffer.from(b, 'base64').toString('utf8'));
}

// 15) Pad / repeat / trim advanced
console.log('padStart:', '42'.padStart(5, '0'));
console.log('repeat:', 'ha'.repeat(3));
console.log('trim methods:', '  x  '.trimStart(), '||', '  x  '.trimEnd());

// 16) Replace with map: mask credit card keeping last 4
function maskCard(cc) {
    return cc.replace(/\d(?=\d{4})/g, '*');
}
console.log(maskCard('4111 1111 1111 1234'));

// 17) Split with limit and using regex capture to keep separators
console.log('split limit:', 'a,b,c,d'.split(',', 2));
console.log('split keep sep:', 'a1b2c'.split(/(\d)/));

// 18) Template escaping helper
function safe(template, ...values) {
    const esc = v => typeof v === 'string' ? escapeHTML(v) : v;
    return String.raw({ raw: template }, ...values.map(esc));
}
console.log(safe`<p>${'<script>alert(1)</script>'}</p>`);

// 19) Performance tip: build long string with array join
const parts = [];
for (let i=0;i<1000;i++) parts.push('x');
console.log('built length:', parts.join('').length);