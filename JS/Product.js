// ---------- Product search ----------
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('product-search');
    if (!input) return;
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const countEl = document.getElementById('search-count');
    const noResults = document.getElementById('no-results');
    const termEl = noResults.querySelector('.term');
 
    const haystacks = cards.map(card =>
        (card.querySelector('.product-title').textContent + ' ' + (card.dataset.keywords || '')).toLowerCase()
    );
 
    function filter() {
        const query = input.value.trim().toLowerCase();
        const words = query.split(/\s+/).filter(Boolean);
        let shown = 0;
        cards.forEach((card, i) => {
            const match = words.every(w => haystacks[i].includes(w));
            card.hidden = !match;
            if (match) shown += 1;
        });
        countEl.textContent = words.length
            ? 'Showing ' + shown + ' of ' + cards.length + ' products'
            : '';
        noResults.hidden = shown !== 0;
        termEl.textContent = input.value.trim();
    }
 
    input.addEventListener('input', filter);
    document.getElementById('clear-search').addEventListener('click', () => {
        input.value = '';
        filter();
        input.focus();
    });
});
 
// ---------- Image zoom viewer ----------
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('zoom-dialog');
    if (!dialog) return;
    const stage = dialog.querySelector('.zoom-stage');
    const img = document.getElementById('zoom-img');
    const levelLabel = document.getElementById('zoom-level');
    const MIN = 1, MAX = 4, STEP = 0.5;
    let zoom = 1;
    let lastTrigger = null;
 
    function fitWidth() {
        const ratio = (img.naturalWidth || 1) / (img.naturalHeight || 1);
        return Math.min(stage.clientWidth, stage.clientHeight * ratio);
    }
 
    function setZoom(value) {
        const next = Math.min(MAX, Math.max(MIN, value));
        // keep the same centre point in view while zooming
        const cx = (stage.scrollLeft + stage.clientWidth / 2) / (stage.scrollWidth || 1);
        const cy = (stage.scrollTop + stage.clientHeight / 2) / (stage.scrollHeight || 1);
        zoom = next;
        img.style.width = (fitWidth() * zoom) + 'px';
        levelLabel.textContent = Math.round(zoom * 100) + '%';
        stage.classList.toggle('zoomed', zoom > 1);
        stage.scrollLeft = cx * stage.scrollWidth - stage.clientWidth / 2;
        stage.scrollTop = cy * stage.scrollHeight - stage.clientHeight / 2;
    }
 
    function open(trigger) {
        const thumb = trigger.querySelector('img');
        lastTrigger = trigger;
        img.alt = thumb.alt;
        img.src = thumb.currentSrc || thumb.src;
        dialog.showModal();
        const init = () => {
            zoom = 1;
            img.style.width = fitWidth() + 'px';
            levelLabel.textContent = '100%';
            stage.classList.remove('zoomed');
            stage.scrollTo(0, 0);
        };
        if (img.complete) init(); else img.onload = init;
    }
 
    document.querySelectorAll('.zoom-trigger').forEach(btn => btn.addEventListener('click', () => open(btn)));
 
    dialog.addEventListener('click', e => {
        const action = e.target.closest('[data-zoom]')?.dataset.zoom;
        if (action === 'in') setZoom(zoom + STEP);
        else if (action === 'out') setZoom(zoom - STEP);
        else if (action === 'reset') setZoom(1);
        else if (action === 'close' || e.target === dialog) dialog.close();
    });
 
    dialog.addEventListener('close', () => { if (lastTrigger) lastTrigger.focus(); });
 
    // Double-click / double-tap toggles between fit and 2.5x
    img.addEventListener('dblclick', () => setZoom(zoom > 1 ? 1 : 2.5));
 
    // Trackpad pinch (reported as ctrl + wheel)
    stage.addEventListener('wheel', e => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        setZoom(zoom + (e.deltaY < 0 ? STEP : -STEP) / 2);
    }, { passive: false });
 
    // Keyboard: + / - / 0
    dialog.addEventListener('keydown', e => {
        if (e.key === '+' || e.key === '=') setZoom(zoom + STEP);
        else if (e.key === '-' || e.key === '_') setZoom(zoom - STEP);
        else if (e.key === '0') setZoom(1);
    });
 
    // Drag to pan when zoomed in
    let drag = null;
    stage.addEventListener('pointerdown', e => {
        if (zoom <= 1 || e.pointerType === 'touch') return;
        drag = { x: e.clientX, y: e.clientY, l: stage.scrollLeft, t: stage.scrollTop };
        stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', e => {
        if (!drag) return;
        stage.scrollLeft = drag.l - (e.clientX - drag.x);
        stage.scrollTop = drag.t - (e.clientY - drag.y);
    });
    ['pointerup', 'pointercancel'].forEach(t => stage.addEventListener(t, () => { drag = null; }));
 
    window.addEventListener('resize', () => { if (dialog.open) setZoom(zoom); });
});
 
// ---------- Product search & live suggestions ----------
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('product-search');
    if (!input) return;
    
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const countEl = document.getElementById('search-count');
    const noResults = document.getElementById('no-results');
    const termEl = noResults.querySelector('.term');
    const wrapper = document.querySelector('.product-search-wrapper');

    // Create or locate the suggestion dropdown container
    let suggestionsBox = document.getElementById('search-suggestions');
    if (!suggestionsBox) {
        suggestionsBox = document.createElement('div');
        suggestionsBox.id = 'search-suggestions';
        suggestionsBox.className = 'search-suggestions';
        wrapper.appendChild(suggestionsBox);
    }

    // Extract product data from the DOM cards
    const products = cards.map(card => {
        const titleEl = card.querySelector('.product-title');
        const imgEl = card.querySelector('.product-img');
        const priceEl = card.querySelector('.price-badge');
        return {
            id: card.dataset.id,
            title: titleEl ? titleEl.textContent : '',
            price: priceEl ? priceEl.textContent : '',
            imgSrc: imgEl ? (imgEl.currentSrc || imgEl.src) : '',
            keywords: card.dataset.keywords || '',
            element: card
        };
    });

    const haystacks = products.map(p => (p.title + ' ' + p.keywords).toLowerCase());

    function filter(query = '') {
        const trimmedQuery = query.trim().toLowerCase();
        const words = trimmedQuery.split(/\s+/).filter(Boolean);
        let shown = 0;

        products.forEach((prod, i) => {
            // Allows partial text matching across words/keywords
            const match = words.every(w => haystacks[i].includes(w));
            prod.element.hidden = !match && words.length > 0;
            if (match || words.length === 0) {
                shown += 1;
            }
        });

        if (words.length > 0) {
            countEl.textContent = 'Showing ' + (products.filter(p => !p.element.hidden).length) + ' of ' + products.length + ' products';
            noResults.hidden = shown !== 0;
            termEl.textContent = query.trim();
        } else {
            countEl.textContent = '';
            noResults.hidden = true;
        }
    }

    // Render live dropdown suggestions popup
    function updateSuggestions(query) {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) {
            suggestionsBox.hidden = true;
            suggestionsBox.innerHTML = '';
            return;
        }

        const words = trimmed.split(/\s+/).filter(Boolean);
        const matches = products.filter((prod, i) => words.every(w => haystacks[i].includes(w)));

        if (matches.length === 0) {
            suggestionsBox.innerHTML = '<div class="suggestion-item no-match">No matching products found</div>';
            suggestionsBox.hidden = false;
            return;
        }

        suggestionsBox.innerHTML = matches.map(prod => `
            <div class="suggestion-item" data-id="${prod.id}">
                <img src="${prod.imgSrc}" alt="" class="suggestion-thumb">
                <div class="suggestion-info">
                    <span class="suggestion-title">${highlightMatch(prod.title, words)}</span>
                    <span class="suggestion-price">${prod.price}</span>
                </div>
            </div>
        `).join('');

        suggestionsBox.hidden = false;

        // Click handler for suggestion items
        suggestionsBox.querySelectorAll('.suggestion-item[data-id]').forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.dataset.id;
                const targetCard = products.find(p => p.id === targetId)?.element;
                if (targetCard) {
                    input.value = targetCard.querySelector('.product-title').textContent;
                    filter(input.value);
                    suggestionsBox.hidden = true;
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Animation highlight effect on target card
                    targetCard.classList.add('highlight-flash');
                    setTimeout(() => targetCard.classList.remove('highlight-flash'), 1200);
                }
            });
        });
    }

    function highlightMatch(text, words) {
        let highlighted = text;
        words.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });
        return highlighted;
    }

    input.addEventListener('input', e => {
        const val = e.target.value;
        filter(val);
        updateSuggestions(val);
    });

    // Hide suggestion dropdown when clicking outside
    document.addEventListener('click', e => {
        if (!wrapper.contains(e.target)) {
            suggestionsBox.hidden = true;
        }
    });

    input.addEventListener('focus', () => {
        if (input.value.trim()) {
            updateSuggestions(input.value);
        }
    });

    const clearBtn = document.getElementById('clear-search');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            filter('');
            suggestionsBox.hidden = true;
            input.focus();
        });
    }
});
