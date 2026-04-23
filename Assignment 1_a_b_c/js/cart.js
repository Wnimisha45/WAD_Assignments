(function() {
  const KEY = 'luxe_cart_state';
  const SHIPPING = 12;
  const TAX_RATE = 0.08;

  const defaultItem = {
    name: 'Structured Tote',
    price: 249,
    img: 'images/structured_tote_bag.jpeg',
    desc: 'Handbags · Vegan leather · Gold hardware'
  };

  const fmt = (n) => `₹${n.toFixed(0)}`;

  const normalizeItem = (item) => {
    const safePrice = Number.isFinite(parseFloat(item.price)) ? parseFloat(item.price) : defaultItem.price;
    const safeQty = Number.isFinite(parseInt(item.qty, 10)) ? parseInt(item.qty, 10) : 0;
    return {
      name: item.name || defaultItem.name,
      price: safePrice,
      img: item.img || defaultItem.img,
      desc: item.desc || defaultItem.desc,
      qty: Math.max(0, safeQty)
    };
  };

  const loadState = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { items: [] };
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        const items = parsed.items.map(normalizeItem).filter((item) => item.qty > 0);
        return { items };
      }
      if (parsed && typeof parsed.count === 'number' && parsed.item) {
        const item = normalizeItem({ ...parsed.item, qty: parsed.count });
        return item.qty > 0 ? { items: [item] } : { items: [] };
      }
      return { items: [] };
    } catch (e) {
      return { items: [] };
    }
  };

  const saveState = (state) => {
    localStorage.setItem(KEY, JSON.stringify(state));
  };

  const getTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
    return { subtotal, totalQty };
  };

  const renderItem = (item) => {
    const lineTotal = fmt(item.price * item.qty);
    return `
      <div class="card shadow-sm border-0">
        <div class="card-body">
          <div class="row g-3 align-items-center">
            <div class="col-md-3">
              <img class="img-fluid rounded-3" src="${item.img}" alt="${item.name}">
            </div>
            <div class="col-md-6">
              <h5 class="fw-bold">${item.name}</h5>
              <p class="text-muted mb-1"><small>${item.desc || ''}</small></p>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-secondary btn-sm" data-action="minus" data-name="${item.name}" aria-label="Decrease quantity">−</button>
                <strong class="line-qty">${item.qty}</strong>
                <button class="btn btn-dark btn-sm" data-action="plus" data-name="${item.name}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div class="col-md-3 text-end">
              <div class="text-warning fw-bold fs-5">${lineTotal}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const updateDom = (state) => {
    const { items } = state;
    const { subtotal, totalQty } = getTotals(items);

    document.querySelectorAll('.cart-count').forEach((el) => {
      el.textContent = totalQty;
    });

    const itemsEl = document.getElementById('cart-items-count');
    if (itemsEl) itemsEl.textContent = totalQty;

    const listEl = document.getElementById('cart-items');
    if (listEl) {
      if (items.length === 0) {
        listEl.innerHTML = '<div class="text-muted">Your cart is empty.</div>';
      } else {
        listEl.innerHTML = items.map(renderItem).join('');
      }
    }

    const shipping = totalQty > 0 ? SHIPPING : 0;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('summary-subtotal');
    if (subtotalEl) subtotalEl.textContent = fmt(subtotal);

    const shippingEl = document.getElementById('summary-shipping');
    if (shippingEl) shippingEl.textContent = fmt(shipping);

    const taxEl = document.getElementById('summary-tax');
    if (taxEl) taxEl.textContent = fmt(tax);

    const totalEl = document.getElementById('summary-total');
    if (totalEl) totalEl.textContent = fmt(total);
  };

  const setState = (state) => {
    saveState(state);
    updateDom(state);
  };

  const ensureToastContainer = () => {
    let container = document.getElementById('cart-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cart-toast-container';
      container.style.position = 'fixed';
      container.style.top = '16px';
      container.style.right = '16px';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }
    return container;
  };

  const showToast = (message) => {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.style.background = '#111';
    toast.style.color = '#fff';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-6px)';
    toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-6px)';
      setTimeout(() => toast.remove(), 200);
    }, 1600);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const product = btn.dataset.product || defaultItem.name;
    const price = Number.isFinite(parseFloat(btn.dataset.price)) ? parseFloat(btn.dataset.price) : defaultItem.price;
    const img = btn.dataset.img || defaultItem.img;
    const desc = btn.dataset.desc || defaultItem.desc;

    const current = loadState();
    const existing = current.items.find((item) => item.name === product);
    if (existing) {
      existing.qty += 1;
      existing.price = price;
      existing.img = img;
      existing.desc = desc;
    } else {
      current.items.push({ name: product, price, img, desc, qty: 1 });
    }
    setState(current);
    showToast(`${product} added to cart`);
  };

  const handleQuantityChange = (name, delta) => {
    const current = loadState();
    const item = current.items.find((entry) => entry.name === name);
    if (!item) return;
    item.qty += delta;
    current.items = current.items.filter((entry) => entry.qty > 0);
    setState(current);
  };

  const handleCartButtons = (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const name = btn.dataset.name;
    const action = btn.dataset.action;
    if (action === 'plus') {
      handleQuantityChange(name, 1);
    } else if (action === 'minus') {
      handleQuantityChange(name, -1);
    }
  };

  const init = () => {
    updateDom(loadState());
    document.querySelectorAll('.btn-add').forEach((btn) => {
      btn.addEventListener('click', handleAdd);
    });
    const listEl = document.getElementById('cart-items');
    if (listEl) {
      listEl.addEventListener('click', handleCartButtons);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
