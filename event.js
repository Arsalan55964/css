// Advanced Events examples (browser)
// HTML needed for demos:
// <div id="app">
//   <ul id="list"><li class="item">Item 1</li></ul>
//   <input id="search" placeholder="type..." />
//   <div id="scrollable" style="height:200px; overflow:auto">...</div>
//   <button id="onceBtn">Once</button>
// </div>

/* -------------------------
   1) Event Delegation
   ------------------------- */
document.getElementById('list')?.addEventListener('click', (e) => {
    // only handle clicks on .item
    const item = e.target.closest('.item');
    if (!item) return;
    console.log('Delegated click on', item.textContent);
});

// Add dynamic item to show delegation works for future elements
function addItem(text) {
    const li = document.createElement('li');
    li.className = 'item';
    li.textContent = text;
    document.getElementById('list')?.appendChild(li);
}
addItem('Item 2 (dynamic)');

/* -------------------------
   2) Debounce input handler
   ------------------------- */
function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

const searchEl = document.getElementById('search');
searchEl?.addEventListener('input', debounce((e) => {
    console.log('Debounced search:', e.target.value);
}, 400));

/* -------------------------
   3) Throttle scroll handler
   ------------------------- */
function throttle(fn, limit = 200) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= limit) {
            last = now;
            fn.apply(this, args);
        }
    };
}

const scrollable = document.getElementById('scrollable');
scrollable?.addEventListener('scroll', throttle((e) => {
    console.log('Throttled scroll top:', e.target.scrollTop);
}, 150));

/* -------------------------
   4) Passive listeners (improves touch/scroll performance)
   ------------------------- */
window.addEventListener('touchmove', (e) => {
    // don't call preventDefault() here (passive true)
}, { passive: true });

/* -------------------------
   5) once option & capture vs bubble
   ------------------------- */
const onceBtn = document.getElementById('onceBtn');
onceBtn?.addEventListener('click', () => {
    console.log('Clicked once handler');
}, { once: true }); // auto-removed after first call

// Capturing example
document.getElementById('app')?.addEventListener('click', () => {
    console.log('App capture listener (capturing phase)');
}, { capture: true });

/* -------------------------
   6) preventDefault / stopPropagation
   ------------------------- */
document.addEventListener('click', (e) => {
    if (e.target.matches('a.prevent')) {
        e.preventDefault(); // stop navigation
        console.warn('Navigation prevented');
    }
    if (e.target.matches('.stop')) {
        e.stopPropagation(); // stop further bubbling
        console.warn('Propagation stopped on .stop element');
    }
});

/* -------------------------
   7) CustomEvents & detail payload
   ------------------------- */
const customEl = document.createElement('div');
customEl.id = 'custom';
document.body.appendChild(customEl);

customEl.addEventListener('user:login', (e) => {
    console.log('Custom event user:login', e.detail); // { user }
});

function emitLogin(user) {
    const ev = new CustomEvent('user:login', { detail: { user }, bubbles: true, composed: true });
    customEl.dispatchEvent(ev);
}
emitLogin({ id: 1, name: 'Alice' });

/* -------------------------
   8) EventTarget-based emitter (reusable)
   ------------------------- */
class Emitter extends EventTarget {
    on(type, listener, options) { this.addEventListener(type, listener, options); }
    off(type, listener, options) { this.removeEventListener(type, listener, options); }
    emit(type, detail = {}) { this.dispatchEvent(new CustomEvent(type, { detail })); }
}

const bus = new Emitter();
bus.on('data', (e) => console.log('Bus data:', e.detail));
bus.emit('data', { payload: [1,2,3] });

/* -------------------------
   9) One-time async handler (await event once)
   ------------------------- */
function onceEvent(target, type, { timeout = 5000 } = {}) {
    return new Promise((resolve, reject) => {
        const onEvent = (e) => {
            cleanup();
            resolve(e);
        };
        const onTimeout = () => {
            cleanup();
            reject(new Error('Event timeout'));
        };
        const cleanup = () => {
            target.removeEventListener(type, onEvent);
            if (timer) clearTimeout(timer);
        };
        target.addEventListener(type, onEvent, { once: true });
        const timer = timeout ? setTimeout(onTimeout, timeout) : null;
    });
}

// usage: await onceEvent(document, 'click');
