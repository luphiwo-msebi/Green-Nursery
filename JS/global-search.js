document.addEventListener('DOMContentLoaded', () => {
    // Inject global search trigger into headers if not present
    const headerNav = document.querySelector('.site-header nav');
    if (!headerNav || document.getElementById('global-search-btn')) return;

    const searchBtnHTML = `
        <button type="button" id="global-search-btn" class="global-search-btn" aria-label="Open product search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        </button>
    `;
    headerNav.insertAdjacentHTML('beforebegin', searchBtnHTML);

    const searchModalHTML = `
        <dialog id="global-search-dialog" class="global-search-dialog" aria-label="Search products">
            <div class="search-modal-header">
                <input type="search" id="global-search-input" placeholder="Search plants, tools, spray, grow beds..." autocomplete="off">
                <button type="button" id="close-search-modal" aria-label="Close search">&times;</button>
            </div>
            <div id="global-search-results" class="search-modal-results">
                <p class="search-prompt">Type anything to instantly search our product catalog...</p>
            </div>
        </dialog>
    `;
    document.body.insertAdjacentHTML('beforeend', searchModalHTML);

    const dialog = document.getElementById('global-search-dialog');
    const input = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('global-search-results');

    document.getElementById('global-search-btn').addEventListener('click', () => {
        dialog.showModal();
        input.focus();
    });

    document.getElementById('close-search-modal').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

    // Catalog database for quick search across all pages
    const catalog = [
        { id: 'plant-boost-spray', name: 'Plant Boost Spray', price: 'R50', img: '../assets/Plant%20Booster%20Spray.webp', keywords: 'spray fertilizer feed plant food booster' },
        { id: 'fresh-bouquet', name: 'Fresh Bouquet of Flowers', price: 'R90', img: '../assets/Flower%20pot.webp', keywords: 'flowers pot bloom bouquet gift' },
        { id: 'tramontina-tools', name: 'Tramontina Garden Tool Set (3-Piece)', price: 'R150', img: '../assets/51-R8OUkoTL._AC_SX425_.jpg', keywords: 'tools trowel spade fork gardening hand' },
        { id: 'raised-grow-bed', name: 'Fabric Raised Garden Grow Bed (55 Gallon)', price: 'R300', img: '../assets/81NelNrkBQL._AC_SX425_.jpg', keywords: 'raised bed planter bag vegetable grow container' },
        { id: 'makhro-plant-care', name: 'Makhro Plant Care', price: 'R200', img: '../assets/plant_care_makhro_home_and_garden_5000x.webp', keywords: 'care kit soil home garden' }
    ];

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        if (!query) {
            resultsContainer.innerHTML = '<p class="search-prompt">Type anything to instantly search our product catalog...</p>';
            return;
        }

        const words = query.split(/\s+/).filter(Boolean);
        const matches = catalog.filter(item => words.every(w => (item.name + ' ' + item.keywords).toLowerCase().includes(w)));

        if (matches.length === 0) {
            resultsContainer.innerHTML = `<p class="no-results">No products found matching &ldquo;<b>${query}</b>&rdquo;</p>`;
            return;
        }

        resultsContainer.innerHTML = matches.map(item => `
            <div class="search-result-card" data-id="${item.id}">
                <img src="${item.img}" alt="" class="search-result-thumb">
                <div class="search-result-info">
                    <h4>${item.name}</h4>
                    <span class="price">${item.price}</span>
                </div>
                <button type="button" class="btn-quick-add" data-id="${item.id}">Add to Cart</button>
            </div>
        `).join('');

        resultsContainer.querySelectorAll('.btn-quick-add').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const prod = catalog.find(p => p.id === btn.dataset.id);
                if (prod && window.GNCart) {
                    window.GNCart.add(prod);
                    btn.textContent = 'Added ✓';
                    setTimeout(() => btn.textContent = 'Add to Cart', 1200);
                }
            });
        });

        resultsContainer.querySelectorAll('.search-result-card').forEach(card => {
            card.addEventListener('click', () => {
                dialog.close();
                window.location.href = `./products.html`;
            });
        });
    });
});