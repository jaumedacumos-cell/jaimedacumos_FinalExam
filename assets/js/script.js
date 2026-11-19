/* Thread & Lane - shared script. Each page sets <body data-page="..."> */

// ---------- Helpers ----------
const CART_KEY = "tl_cart";
const WISH_KEY = "tl_wishlist";
const $ = (sel, root = document) => root.querySelector(sel);
const peso = (n) => "₱" + n.toLocaleString("en-PH");
const read = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
const write = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch { showToast("Browser storage is unavailable."); } };
const cart = () => read(CART_KEY);
const wish = () => read(WISH_KEY);
let rerender = () => {};                 // each page sets what to redraw

// ---------- Product art (inline SVG, so images never break) ----------
const SHAPES = {
  tee: "M30 15 L10 30 L20 42 L28 36 L28 88 L72 88 L72 36 L80 42 L90 30 L70 15 Q50 28 30 15Z",
  hoodie: "M32 14 L8 40 L8 78 L22 78 L24 44 L28 40 L28 88 L72 88 L72 40 L76 44 L78 78 L92 78 L92 40 L68 14 Q50 30 32 14Z",
  pants: "M30 10 L70 10 L76 90 L56 90 L50 40 L44 90 L24 90Z",
  dress: "M38 8 L62 8 L58 30 L78 90 L22 90 L42 30Z"
};
const art = (p) => `<svg class="art" viewBox="0 0 100 100" role="img" aria-label="${p.name}"><path d="${SHAPES[p.type]}" fill="${p.color}" stroke="#14202E" stroke-width="2" stroke-linejoin="round"/></svg>`;

// ---------- Product card ----------
function card(p, cols = "col-6 col-md-4 col-xl-3") {
  const liked = wish().includes(p.id);
  return `<div class="${cols}"><article class="card product h-100">
    <div class="art-tile">${art(p)}
      <button class="btn wish-btn" data-action="wish" data-id="${p.id}" aria-pressed="${liked}"
        aria-label="${liked ? "Remove from" : "Add to"} wishlist: ${p.name}">${liked ? "♥" : "♡"}</button></div>
    <div class="card-body d-flex flex-column">
      <span class="small text-secondary">${p.category}</span>
      <h3 class="h6">${p.name}</h3>
      <p class="price mb-3">${peso(p.price)}</p>
      <button class="btn btn-outline-dark mt-auto" data-action="view" data-id="${p.id}">View details</button>
    </div></article></div>`;
}

// ---------- Feature 1: Cart (localStorage) ----------
function addToCart(id, size, qty = 1) {
  const items = cart();
  const found = items.find((i) => i.id === id && i.size === size);
  found ? (found.qty += qty) : items.push({ id, size, qty });
  write(CART_KEY, items);
  updateBadge();
}
function changeQty(id, size, delta) {
  let items = cart();
  const item = items.find((i) => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) items = items.filter((i) => i !== item);
  write(CART_KEY, items);
  updateBadge();
}
function removeItem(id, size) {
  write(CART_KEY, cart().filter((i) => !(i.id === id && i.size === size)));
  updateBadge();
}
function updateBadge() {
  const total = cart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll("#cartCount").forEach((el) => (el.textContent = total));
}

// ---------- Feature 2: Wishlist (localStorage) ----------
function toggleWish(id) {
  let list = wish();
  list = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  write(WISH_KEY, list);
}

// ---------- Toast + product modal (Bootstrap components built by JS) ----------
function showToast(message) {
  let box = $("#toastBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "toastBox";
    box.className = "toast-container position-fixed bottom-0 end-0 p-3";
    document.body.appendChild(box);
  }
  const el = document.createElement("div");
  el.className = "toast text-bg-dark";
  el.setAttribute("role", "status");
  el.innerHTML = `<div class="toast-body">${message}</div>`;
  box.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 2500 });
  el.addEventListener("hidden.bs.toast", () => el.remove());
  t.show();
}
function ensureModal() {
  if ($("#productModal")) return;
  document.body.insertAdjacentHTML("beforeend", `
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content">
      <div class="modal-header"><h2 class="modal-title h5" id="modalTitle"></h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
      <div class="modal-body"><div class="row g-4">
        <div class="col-md-5"><div class="art-tile rounded" id="modalArt"></div></div>
        <div class="col-md-7"><p class="small text-secondary mb-1" id="modalCat"></p>
          <p class="price fs-4" id="modalPrice"></p><p id="modalDesc"></p>
          <label for="modalSize" class="form-label fw-semibold">Size</label>
          <select id="modalSize" class="form-select mb-3"></select>
          <button class="btn btn-thread btn-lg w-100" id="modalAdd">Add to cart</button></div>
      </div></div></div></div></div>`);
  $("#modalAdd").addEventListener("click", () => {
    const id = +$("#productModal").dataset.id;
    addToCart(id, $("#modalSize").value);
    bootstrap.Modal.getInstance($("#productModal")).hide();
    showToast("Added to cart.");
  });
}
function openModal(id) {
  ensureModal();
  const p = PRODUCTS.find((x) => x.id === id);
  $("#productModal").dataset.id = id;
  $("#modalTitle").textContent = p.name;
  $("#modalArt").innerHTML = art(p);
  $("#modalCat").textContent = p.category;
  $("#modalPrice").textContent = peso(p.price);
  $("#modalDesc").textContent = p.desc;
  $("#modalSize").innerHTML = p.sizes.map((s) => `<option>${s}</option>`).join("");
  bootstrap.Modal.getOrCreateInstance($("#productModal")).show();
}

// ---------- One click handler for every button with data-action ----------
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  const id = +b.dataset.id, size = b.dataset.size;
  switch (b.dataset.action) {
    case "view": openModal(id); break;
    case "wish": toggleWish(id); rerender(); break;
    case "inc": changeQty(id, size, 1); rerender(); break;
    case "dec": changeQty(id, size, -1); rerender(); break;
    case "remove": removeItem(id, size); rerender(); showToast("Item removed."); break;
  }
});

// ---------- Home page ----------
function initHome() {
  $("#heroArt").innerHTML = [1, 3, 5, 7].map((id) => `<div class="art-tile rounded">${art(PRODUCTS.find((p) => p.id === id))}</div>`).join("");
  $("#categories").innerHTML = CATEGORIES.map((c) => {
    const sample = PRODUCTS.find((p) => p.category === c);
    return `<div class="col-6 col-md-3"><a class="cat-tile" href="pages/catalog.html?cat=${c}">
      <div class="art-tile">${art(sample)}</div><strong>${c}</strong></a></div>`;
  }).join("");
  rerender = () => ($("#featured").innerHTML = PRODUCTS.filter((p) => p.featured).map((p) => card(p, "col-6 col-lg-3")).join(""));
  rerender();
}

// ---------- Feature 3: Catalog search + filter + sort ----------
function initCatalog() {
  const cat = new URLSearchParams(location.search).get("cat");
  if (CATEGORIES.includes(cat)) $("#category").value = cat;
  rerender = () => {
    const q = $("#search").value.trim().toLowerCase();
    const category = $("#category").value, size = $("#size").value;
    const max = +$("#maxPrice").value, sort = $("#sort").value, onlyWish = $("#wishOnly").checked;
    $("#priceLabel").textContent = peso(max);
    const list = PRODUCTS.filter((p) =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (category === "all" || p.category === category) &&
      (size === "all" || p.sizes.includes(size)) &&
      p.price <= max && (!onlyWish || wish().includes(p.id)));
    const sorters = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name) };
    if (sorters[sort]) list.sort(sorters[sort]);
    $("#count").textContent = `${list.length} item${list.length === 1 ? "" : "s"} found`;
    $("#grid").innerHTML = list.length ? list.map((p) => card(p)).join("")
      : `<div class="col-12"><div class="alert alert-info">No items match your filters. Try a different search or press "Reset filters".</div></div>`;
  };
  ["search", "category", "size", "maxPrice", "sort", "wishOnly"].forEach((id) => $("#" + id).addEventListener("input", rerender));
  $("#reset").addEventListener("click", () => {
    $("#filters").reset();
    rerender();
  });
  rerender();
}

// ---------- Cart page + checkout form ----------
function initCart() {
  rerender = () => {
    const rows = cart().map((i) => ({ ...i, p: PRODUCTS.find((x) => x.id === i.id) }));
    const subtotal = rows.reduce((s, r) => s + r.p.price * r.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 150;
    $("#cartItems").innerHTML = rows.length ? rows.map((r) => `
      <li class="list-group-item d-flex gap-3 align-items-center">
        <div class="thumb">${art(r.p)}</div>
        <div class="flex-grow-1"><strong>${r.p.name}</strong>
          <div class="small text-secondary">Size ${r.size}, ${peso(r.p.price)} each</div>
          <div class="btn-group btn-group-sm mt-2" role="group" aria-label="Quantity for ${r.p.name}">
            <button class="btn btn-outline-dark" data-action="dec" data-id="${r.id}" data-size="${r.size}" aria-label="Decrease quantity">−</button>
            <span class="btn disabled text-dark">${r.qty}</span>
            <button class="btn btn-outline-dark" data-action="inc" data-id="${r.id}" data-size="${r.size}" aria-label="Increase quantity">+</button>
          </div></div>
        <div class="text-end"><div class="fw-bold">${peso(r.p.price * r.qty)}</div>
          <button class="btn btn-sm btn-link text-danger" data-action="remove" data-id="${r.id}" data-size="${r.size}">Remove</button></div>
      </li>`).join("")
      : `<li class="list-group-item py-5 text-center">Your cart is empty. <a href="catalog.html">Browse the catalog</a>.</li>`;
    $("#subtotal").textContent = peso(subtotal);
    $("#shipping").textContent = shipping ? peso(shipping) : "Free";
    $("#total").textContent = peso(subtotal + shipping);
  };
  rerender();

  const form = $("#checkoutForm");
  const checkPhone = () => form.phone.setCustomValidity(/^09\d{9}$/.test(form.phone.value.trim()) ? "" : "invalid");
  form.phone.addEventListener("input", checkPhone);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cart().length) { showToast("Your cart is empty. Add an item first."); return; }
    checkPhone();
    form.classList.add("was-validated");
    if (!form.checkValidity()) { form.querySelector(":invalid").focus(); return; }
    const ref = "TL-" + Date.now().toString().slice(-6);
    $("#orderResult").innerHTML = `<div class="alert alert-success" role="alert"><strong>Order placed (demo).</strong> Reference ${ref}. No real payment was taken.</div>`;
    write(CART_KEY, []);
    updateBadge();
    form.reset();
    form.classList.remove("was-validated");
    rerender();
  });
}

// ---------- Start ----------
document.addEventListener("DOMContentLoaded", () => {
  updateBadge();
  ensureModal();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "catalog") initCatalog();
  if (page === "cart") initCart();
});
