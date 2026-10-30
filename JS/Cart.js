// ---------- Global Shopping Cart Manager ----------
class GNCartSystem {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('gn_cart_items')) || [];
        this.initUI();
    }

    save() {
        localStorage.setItem('gn_cart_items', JSON.stringify(this.items));
        this.updateBadge();
        this.renderDrawer();
    }

    format(amount) {
        return 'R' + parseFloat(amount).toFixed(0);
    }

    add(product) {
        const existing = this.items.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                img: product.img,
                qty: 1
            });
        }
        this.save();
        this.showToast(`Added ${product.name} to cart!`);
        this.openDrawer();
    }

    remove(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
    }

    updateQty(id, qty) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.qty = parseInt(qty);
            if (item.qty <= 0) {
                this.remove(id);
            } else {
                this.save();
            }
        }
    }

    total() {
        return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    }

    count() {
        return this.items.reduce((sum, i) => sum + i.qty, 0);
    }

    showToast(message) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'cart-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    initUI() {
        if (!document.getElementById('cart-drawer')) {
            const drawerHTML = `
                <dialog id="cart-drawer" class="cart-drawer" aria-label="Shopping Cart">
                    <div class="cart-header">
                        <h2>Your Cart</h2>
                        <button type="button" id="close-cart" aria-label="Close cart">&times;</button>
                    </div>
                    <div class="cart-body">
                        <div id="cart-items-container"></div>
                    </div>
                    <div class="cart-footer">
                        <div class="cart-total-row">
                            <span>Total:</span>
                            <strong id="cart-total-amount">R0</strong>
                        </div>
                        <button type="button" id="checkout-btn" class="btn-checkout">Proceed to Inquiry / Checkout</button>
                    </div>
                </dialog>
            `;
            document.body.insertAdjacentHTML('beforeend', drawerHTML);
        }

        // Attach close handlers
        const drawer = document.getElementById('cart-drawer');
        document.getElementById('close-cart').addEventListener('click', () => drawer.close());
        drawer.addEventListener('click', e => {
            if (e.target === drawer) drawer.close();
        });

        // Checkout routing to inquiry page with order params
        document.getElementById('checkout-btn').addEventListener('click', () => {
            if (this.items.length === 0) return;
            drawer.close();
            window.location.href = './inquiry.html?order=1';
        });

        this.updateBadge();
        this.renderDrawer();
    }

    openDrawer() {
        const drawer = document.getElementById('cart-drawer');
        if (drawer && !drawer.open) drawer.showModal();
    }

    updateBadge() {
        document.querySelectorAll('.cart-badge').forEach(badge => {
            const count = this.count();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
            badge.classList.add('bump');
            setTimeout(() => badge.classList.remove('bump'), 350);
        });
    }

    renderDrawer() {
        const container = document.getElementById('cart-items-container');
        const totalAmount = document.getElementById('cart-total-amount');
        if (!container || !totalAmount) return;

        totalAmount.textContent = this.format(this.total());

        if (this.items.length === 0) {
            container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">${this.format(item.price)}</span>
                    <div class="cart-item-qty">
                        <button type="button" class="qty-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.qty}</span>
                        <button type="button" class="qty-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
            </div>
        `).join('');

        // Item action listeners
        container.querySelectorAll('.qty-btn.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = this.items.find(i => i.id === btn.dataset.id);
                if (item) this.updateQty(item.id, item.qty - 1);
            });
        });
        container.querySelectorAll('.qty-btn.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = this.items.find(i => i.id === btn.dataset.id);
                if (item) this.updateQty(item.id, item.qty + 1);
            });
        });
        container.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => this.remove(btn.dataset.id));
        });
    }
}

// Initialize global cart instance
window.GNCart = new GNCartSystem();

document.addEventListener('DOMContentLoaded', () => {
    // Bind cart open buttons across any header
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', () => window.GNCart.openDrawer());
    });

    // Hook "Add To Cart" buttons on products page
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            if (!card) return;
            const product = {
                id: card.dataset.id,
                name: card.querySelector('.product-title').textContent,
                price: card.dataset.price,
                img: card.querySelector('.product-img').src
            };
            window.GNCart.add(product);
            btn.classList.add('added');
            setTimeout(() => btn.classList.remove('added'), 600);
        });
    });
});
