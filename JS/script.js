(() => {
    'use strict';
 
    // ---------- Cart data (saved in the browser, shared by every page) ----------
    const SCRIPT_SRC = document.currentScript ? document.currentScript.src : '';
    const ROOT = SCRIPT_SRC ? SCRIPT_SRC.replace(/js\/main\.js.*$/, '') : '';
    const KEY = 'gn_cart_v1';
    const MAX_QTY = 20;
    let items = load();
 
    function load() {
        try {
            const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
            return Array.isArray(arr)
                ? arr.filter(i => i && i.id && Number.isFinite(i.price) && i.qty > 0)
                : [];
        } catch (e) { return []; }
    }
    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage blocked: cart stays in memory */ }
    }
    const count = () => items.reduce((n, i) => n + i.qty, 0);
    const total = () => items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const format = n => 'R' + (Number.isInteger(n) ? n.toLocaleString('en-ZA') : n.toFixed(2));
    const plural = n => n + ' item' + (n === 1 ? '' : 's');
 
    // Lets other scripts (like the inquiry form) read the cart
    window.GNCart = { get items() { return items; }, count, total, format };
 
    const ICON = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="19.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="19.5" r="1.5" fill="currentColor"/></svg>';
 
    document.addEventListener('DOMContentLoaded', () => {
        setupMenu();
        setupBackToTop();
        setupCart();
    });
 
    // ---------- Mobile menu ----------
    function setupMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => { if (menuToggle) menuToggle.checked = false; });
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menuToggle) menuToggle.checked = false;
        });
    }
 
    // ---------- Back to top ----------
    function setupBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 300);
        }, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }
 
    // ---------- Shopping cart ----------
    function setupCart() {
        const logo = document.querySelector('.site-header .site-logo');
        if (!logo) return;
 
        // Cart button in the header
        const cartBtn = document.createElement('button');
        cartBtn.type = 'button';
        cartBtn.className = 'cart-btn';
        cartBtn.innerHTML = ICON + '<span class="cart-badge" hidden>0</span>';
        logo.insertAdjacentElement('afterend', cartBtn);
        const badge = cartBtn.querySelector('.cart-badge');
 
        // Cart panel (slides in from the right)
        const drawer = document.createElement('dialog');
        drawer.className = 'cart-drawer';
        drawer.setAttribute('aria-labelledby', 'cart-title');
        drawer.innerHTML =
            '<div class="cart-head"><h2 id="cart-title">Your cart <span class="cart-count"></span></h2>' +
            '<button type="button" class="cart-close" aria-label="Close cart">&#10005;</button></div>' +
            '<div class="cart-body">' +
            '<ul class="cart-list"></ul>' +
            '<div class="cart-empty"><p>Your cart is empty.</p><button type="button" class="btn cart-continue">Continue shopping</button></div>' +
            '</div>' +
            '<div class="cart-foot">' +
            '<div class="cart-total-row"><span>Total</span><strong class="cart-total">R0</strong></div>' +
            '<p class="cart-note">Online payment is not set up yet. Checkout sends your order to our team as an inquiry.</p>' +
            '<button type="button" class="btn-submit cart-checkout">Checkout</button>' +
            '<button type="button" class="cart-clear">Clear cart</button>' +
            '</div>' +
            '<p class="visually-hidden" role="status" aria-live="polite" id="cart-live"></p>';
        document.body.appendChild(drawer);
 
        const list = drawer.querySelector('.cart-list');
        const totalEl = drawer.querySelector('.cart-total');
        const countEl = drawer.querySelector('.cart-count');
        const live = drawer.querySelector('#cart-live');
 
        // "Added to cart" message
        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = '<span class="toast-text"></span><button type="button" class="toast-view">View cart</button>';
        document.body.appendChild(toast);
        let toastTimer;
 
        function showToast(text) {
            toast.querySelector('.toast-text').textContent = text;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
        }
 
        function render() {
            const n = count();
            badge.textContent = n > 99 ? '99+' : String(n);
            badge.hidden = n === 0;
            cartBtn.setAttribute('aria-label', n ? 'Open cart, ' + plural(n) : 'Open cart, empty');
            drawer.classList.toggle('has-items', items.length > 0);
            totalEl.textContent = format(total());
            countEl.textContent = n ? '(' + plural(n) + ')' : '';
            list.textContent = '';
            items.forEach(item => list.appendChild(buildItem(item)));
        }
 
        function buildItem(item) {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.dataset.id = item.id;
            li.innerHTML =
                '<img class="cart-thumb" alt="" width="72" height="72">' +
                '<div class="cart-info"><p class="cart-name"></p><p class="cart-unit"></p>' +
                '<div class="qty"><button type="button" data-act="dec">&minus;</button>' +
                '<span class="qty-num"></span><button type="button" data-act="inc">+</button></div></div>' +
                '<div class="cart-line"><strong class="line-total"></strong>' +
                '<button type="button" class="cart-remove" data-act="remove">Remove</button></div>';
            const img = li.querySelector('img');
            if (item.img) img.src = item.img; else img.hidden = true;
            li.querySelector('.cart-name').textContent = item.name;
            li.querySelector('.cart-unit').textContent = format(item.price) + ' each';
            li.querySelector('.qty-num').textContent = item.qty;
            li.querySelector('.line-total').textContent = format(item.price * item.qty);
            const dec = li.querySelector('[data-act="dec"]');
            const inc = li.querySelector('[data-act="inc"]');
            dec.disabled = item.qty <= 1;
            inc.disabled = item.qty >= MAX_QTY;
            dec.setAttribute('aria-label', 'Decrease quantity of ' + item.name);
            inc.setAttribute('aria-label', 'Increase quantity of ' + item.name);
            li.querySelector('.cart-remove').setAttribute('aria-label', 'Remove ' + item.name + ' from cart');
            return li;
        }
 
        function bump() {
            badge.classList.remove('bump');
            void badge.offsetWidth;
            badge.classList.add('bump');
        }
 
        function addItem(p) {
            const existing = items.find(i => i.id === p.id);
            if (existing) {
                if (existing.qty >= MAX_QTY) return false;
                existing.qty += 1;
            } else {
                items.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
            }
            save(); render(); bump();
            return true;
        }
 
        function openCart() {
            toast.classList.remove('show');
            if (!drawer.open) drawer.showModal();
        }
 
        // Header button, toast button
        cartBtn.addEventListener('click', openCart);
        toast.querySelector('.toast-view').addEventListener('click', openCart);
 
        // Add To Cart buttons on the products page
        document.addEventListener('click', e => {
            const btn = e.target.closest('.btn-cart');
            if (!btn) return;
            const card = btn.closest('.product-card');
            if (!card) return;
            const name = card.querySelector('.product-title').textContent.trim();
            const priceText = card.dataset.price || (card.querySelector('.price-badge') || {}).textContent || '';
            const price = parseFloat(String(priceText).replace(/[^0-9.]/g, ''));
            if (!Number.isFinite(price)) return;
            const imgEl = card.querySelector('.product-img');
            const ok = addItem({
                id: card.dataset.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                name: name,
                price: price,
                img: imgEl ? (imgEl.currentSrc || imgEl.src) : ''
            });
            showToast(ok ? name + ' added to cart' : 'Maximum of ' + MAX_QTY + ' per item reached');
 
            if (!btn._label) btn._label = btn.innerHTML;
            btn.classList.add('added');
            btn.innerHTML = '<span aria-hidden="true">✓</span> Added';
            clearTimeout(btn._timer);
            btn._timer = setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = btn._label;
            }, 1500);
        });
 
        // Clicks inside the cart panel
        drawer.addEventListener('click', e => {
            if (e.target === drawer || e.target.closest('.cart-close')) { drawer.close(); return; }
 
            if (e.target.closest('.cart-continue')) {
                drawer.close();
                if (!document.querySelector('.products-grid')) location.href = ROOT + 'pages/products.html';
                return;
            }
            if (e.target.closest('.cart-clear')) {
                items = []; save(); render();
                live.textContent = 'Cart cleared';
                drawer.querySelector('.cart-continue').focus();
                return;
            }
            if (e.target.closest('.cart-checkout')) {
                if (items.length) location.href = ROOT + 'pages/inquiry.html?order=1';
                return;
            }
 
            const actBtn = e.target.closest('[data-act]');
            if (!actBtn) return;
            const li = actBtn.closest('.cart-item');
            const item = items.find(i => i.id === li.dataset.id);
            if (!item) return;
            const act = actBtn.dataset.act;
 
            if (act === 'inc' && item.qty < MAX_QTY) item.qty += 1;
            else if (act === 'dec' && item.qty > 1) item.qty -= 1;
            else if (act === 'remove') {
                items = items.filter(i => i !== item);
                save(); render();
                live.textContent = item.name + ' removed from cart';
                const next = list.querySelector('button:not([disabled])') || drawer.querySelector('.cart-continue');
                next.focus();
                return;
            }
            save(); render();
            live.textContent = item.name + ', quantity ' + item.qty;
            const again = list.querySelector('[data-id="' + CSS.escape(item.id) + '"] [data-act="' + act + '"]');
            if (again && !again.disabled) again.focus();
        });
 
        // Keep the cart in sync if it changes in another tab
        window.addEventListener('storage', e => {
            if (e.key === KEY) { items = load(); render(); }
        });
 
        render();
    }
})();
 

