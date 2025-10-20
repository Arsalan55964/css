// Advanced console utilities & examples

// 1. Styled logs and format specifiers
console.log('%c Styled %s log: %o', 'color: white; background:#007acc; padding:2px 6px; border-radius:3px;', 'INFO', { user: 'arsalan', id: 1 });

// 2. Table for array/object data
const users = [
    { id: 1, name: 'A', role: 'admin' },
    { id: 2, name: 'B', role: 'editor' },
    { id: 3, name: 'C', role: 'viewer' }
];
console.table(users);

// 3. Grouping related logs
console.group('Initialization');
console.log('Loading modules...');
console.info('Config loaded');
console.warn('Deprecated API in use');
console.groupEnd();

// Collapsed group
console.groupCollapsed('Debug details');
console.trace('Stack trace for debug group');
console.groupEnd();

// 4. Timings for performance measurement
console.time('fetch-sim');
setTimeout(() => {
    console.timeEnd('fetch-sim'); // prints elapsed time
}, 500);

// 5. Counting occurrences
console.count('button-click');
console.count('button-click');
console.countReset('button-click');
console.count('button-click');

// 6. Assertions (only visible when assertion fails)
console.assert(1 === 2, 'Assertion failed: 1 !== 2');

// 7. Inspect objects (dir vs log)
console.log('as object:', users[0]);
console.dir(users[0], { depth: null, colors: true });

// 8. Stack trace
function a() { b(); }
function b() { c(); }
function c() { console.trace('trace from c'); }
a();

// 9. Grouped timing for multiple operations
console.group('Batch ops');
console.time('op1');
for (let i=0;i<1e5;i++); // heavy op
console.timeEnd('op1');
console.time('op2');
for (let i=0;i<1e5;i++); // another heavy op
console.timeEnd('op2');
console.groupEnd();

// 10. Re-usable Logger utility (levels, enable/disable)
class Logger {
    constructor(enabled = true) { this.enabled = enabled; }
    _format(level, ...args) {
        const style = level === 'error' ? 'color:#fff;background:#d9534f;padding:2px 6px;border-radius:3px' :
                      level === 'warn' ? 'color:#000;background:#f0ad4e;padding:2px 6px;border-radius:3px' :
                      'color:#fff;background:#5cb85c;padding:2px 6px;border-radius:3px';
        return [`%c[${level.toUpperCase()}]`, style, ...args];
    }
    log(...args) { if (this.enabled) console.log(...this._format('log', ...args)); }
    info(...args) { if (this.enabled) console.info(...this._format('info', ...args)); }
    warn(...args) { if (this.enabled) console.warn(...this._format('warn', ...args)); }
    error(...args) { if (this.enabled) console.error(...this._format('error', ...args)); }
    table(data) { if (this.enabled) console.table(data); }
}
const logger = new Logger(true);
logger.info('App started', { env: 'dev' });
logger.warn('Low disk space');
logger.error('Unhandled exception', new Error('Oops'));

// 11. Environment toggle (example: enable only if localStorage.debug === '1')
if (typeof localStorage !== 'undefined') {
    const debugEnabled = localStorage.getItem('debug') === '1';
    const dbg = new Logger(debugEnabled);
    dbg.log('Debug logger active:', debugEnabled);
}

// 12. Clear console (useful in repeated runs)
console.clear && console.clear();