const STORE_KEY = "amor_detalles_cart_v1";

const PRODUCTS = {
  PR1: { id: "PR1", name: "Perfumes", price: 79.9, image: "img/PR1.jpeg", type: "product" },
  PR2: { id: "PR2", name: "Productos de limpieza", price: 24.9, image: "img/PR2.webp", type: "product" },
  PR3: { id: "PR3", name: "Dulces", price: 18.5, image: "img/PR3.jpeg", type: "product" },
  PR4: { id: "PR4", name: "Regalos decorados", price: 69.9, image: "img/PR4.jpeg", type: "product" },
  PR5: { id: "PR5", name: "Cuidado de la piel", price: 54.9, image: "img/PR5.jpeg", type: "product" },
  PR6: { id: "PR6", name: "Caja sorpresa", price: 119.9, image: "img/PR6.jpg", type: "product" },
  PR7: { id: "PR7", name: "Productos faciales", price: 42.9, image: "img/PR7.jpeg", type: "product" },
  PR8: { id: "PR8", name: "Rosas", price: 39.9, image: "img/PR8.jpeg", type: "product" },
  PR9: { id: "PR9", name: "Similares", price: 29.9, image: "img/PR9.jpeg", type: "product" }
};

const SERVICES = {
  cenas: { id: "SERV-CENAS", name: "Cena romántica", price: 180, image: "img/cenaSV.jpeg", type: "service" },
  flores: { id: "SERV-FLORES", name: "Arreglos florales", price: 120, image: "img/confidencial.jpg", type: "service" },
  momentos: { id: "SERV-MOMENTOS", name: "Momentos inolvidables", price: 160, image: "img/pareja.jpg", type: "service" }
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORE_KEY, JSON.stringify(cart));
  updateCartIndicators();
}

function money(value) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);
}

function updateCartIndicators() {
  const cart = getCart();
  const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.total || item.price * item.quantity), 0);

  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = totalQty;
  });

  document.querySelectorAll(".cart-total-mini").forEach((el) => {
    el.textContent = totalAmount > 0 ? money(totalAmount) : money(0);
  });
}

function addProduct(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId && item.type === "product");

  if (existing) {
    existing.quantity += 1;
    existing.total = existing.quantity * existing.price;
  } else {
    cart.push({ ...product, quantity: 1, total: product.price });
  }

  saveCart(cart);
  showToast(`${product.name} se añadió al carrito.`);
}

function getServiceExtraDetails(serviceKey, formData) {
  if (serviceKey === "cenas") {
    return {
      tipoCena: formData.get("dinnerType") || "romántica",
      transporte: formData.get("transport") || "No",
      localPreferido: formData.get("venue") || "No especificado"
    };
  }

  if (serviceKey === "flores") {
    return {
      florPrincipal: formData.get("flowerType") || "rosas",
      incluirPlantas: formData.get("plants") || "No",
      areaArreglo: formData.get("areaType") || "No especificada",
      medidasArea: formData.get("areaSize") || "No especificadas"
    };
  }

  if (serviceKey === "momentos") {
    return {
      tipoExperiencia: formData.get("momentType") || "sorpresa",
      limusina: formData.get("limousine") || "No",
      detalleAdicional: formData.get("momentNote") || "Sin detalle adicional"
    };
  }

  return {};
}

function formatServiceDetails(details) {
  if (!details) return "";
  const rows = [];
  Object.entries(details).forEach(([key, value]) => {
    if (!value) return;
    rows.push(`<span>${String(value)}</span>`);
  });
  return rows.join("");
}

function addServiceReservation(data) {
  const service = SERVICES[data.serviceKey];
  if (!service) return;

  const persons = Number(data.persons) || 1;
  const total = service.price * persons;
  const reserve = total * 0.5;
  const id = `${service.id}-${Date.now()}`;

  const cart = getCart();
  cart.push({
    id,
    type: "service",
    name: `${service.name} (${persons} persona${persons > 1 ? "s" : ""})`,
    baseName: service.name,
    price: total,
    quantity: 1,
    total,
    reserve,
    image: service.image,
    details: {
      persons,
      startDate: data.startDate,
      endDate: data.endDate,
      fullName: data.fullName,
      dni: data.dni,
      district: data.district,
      email: data.email,
      phone: data.phone,
      ...data.extraDetails
    }
  });

  saveCart(cart);
  showToast(`Reserva de ${service.name} agregada al carrito.`);
}

function showToast(message) {
  const box = document.querySelector("#ui-toast");
  if (!box) return;
  box.textContent = message;
  box.classList.add("show");
  setTimeout(() => box.classList.remove("show"), 2400);
}

function bindProductButtons() {
  document.querySelectorAll("[data-add-product]").forEach((btn) => {
    btn.addEventListener("click", () => addProduct(btn.dataset.addProduct));
  });
}

function bindServiceButtons() {
  const select = document.querySelector("#serviceType");
  document.querySelectorAll("[data-service-select]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (select) {
        select.value = btn.dataset.serviceSelect;
        select.dispatchEvent(new Event("change"));
      }
      document.querySelector("#service-booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function toggleServiceOptionGroups(selected) {
  document.querySelectorAll(".service-options-grid").forEach((group) => {
    group.classList.add("is-hidden");
  });

  const active = document.querySelector(`#options-${selected}`);
  if (active) active.classList.remove("is-hidden");
}

function bindServiceForm() {
  const form = document.querySelector("#service-booking-form");
  if (!form) return;

  const select = form.querySelector("#serviceType");
  const persons = form.querySelector("#servicePersons");
  const totalField = form.querySelector("#serviceTotal");
  const reserveField = form.querySelector("#serviceReserve");

  function recalc() {
    const service = SERVICES[select.value];
    const qty = Math.max(1, Number(persons.value) || 1);
    const total = service ? service.price * qty : 0;
    const reserve = total * 0.5;
    if (totalField) totalField.textContent = money(total);
    if (reserveField) reserveField.textContent = money(reserve);
    toggleServiceOptionGroups(select.value);
  }

  select?.addEventListener("change", recalc);
  persons?.addEventListener("input", recalc);
  recalc();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    addServiceReservation({
      serviceKey: formData.get("serviceType"),
      persons: formData.get("servicePersons"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      fullName: formData.get("fullName"),
      dni: formData.get("dni"),
      district: formData.get("district"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      extraDetails: getServiceExtraDetails(formData.get("serviceType"), formData)
    });
    form.reset();
    recalc();
  });
}

function renderCartPage() {
  const container = document.querySelector("#cart-items");
  if (!container) return;

  const cart = getCart();
  const empty = document.querySelector("#cart-empty");
  const summary = document.querySelector("#cart-summary");

  if (cart.length === 0) {
    if (empty) empty.hidden = false;
    if (summary) summary.hidden = true;
    container.innerHTML = "";
    updateCartIndicators();
    return;
  }

  if (empty) empty.hidden = true;
  if (summary) summary.hidden = false;

  container.innerHTML = cart.map((item) => `
    <article class="cart-item-card">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.type === "service" ? "Servicio reservado" : "Producto"}</p>
        ${item.type === "service" ? `<div class="service-detail-lines">${formatServiceDetails(item.details)}</div>` : ""}
        ${item.reserve ? `<p class="reserve-note">Reserva del 50%: ${money(item.reserve)}</p>` : ""}
      </div>
      <div class="cart-item-controls">
        ${item.type === "product" ? `
          <div class="qty-box">
            <button type="button" data-cart-dec="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-inc="${item.id}">+</button>
          </div>
        ` : `<span class="service-chip">1 reserva</span>`}
        <strong>${money(item.total || item.price)}</strong>
        <button type="button" class="remove-btn" data-cart-remove="${item.id}">Quitar</button>
      </div>
    </article>
  `).join("");

  bindCartControls();
  renderCartSummary();
}

function bindCartControls() {
  document.querySelectorAll("[data-cart-inc]").forEach((btn) => {
    btn.addEventListener("click", () => updateCartProduct(btn.dataset.cartInc, 1));
  });
  document.querySelectorAll("[data-cart-dec]").forEach((btn) => {
    btn.addEventListener("click", () => updateCartProduct(btn.dataset.cartDec, -1));
  });
  document.querySelectorAll("[data-cart-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeCartItem(btn.dataset.cartRemove));
  });
}

function updateCartProduct(id, delta) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (!item || item.type !== "product") return;

  item.quantity = Math.max(1, item.quantity + delta);
  item.total = item.quantity * item.price;
  saveCart(cart);
  renderCartPage();
}

function removeCartItem(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  renderCartPage();
}

function renderCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((acc, item) => acc + (item.total || 0), 0);
  const reserveTotal = cart.filter((item) => item.type === "service").reduce((acc, item) => acc + (item.reserve || 0), 0);
  const finalEl = document.querySelector("#cart-subtotal");
  const reserveEl = document.querySelector("#cart-reserve");
  const totalEl = document.querySelector("#cart-total");
  if (finalEl) finalEl.textContent = money(subtotal);
  if (reserveEl) reserveEl.textContent = money(reserveTotal);
  if (totalEl) totalEl.textContent = money(subtotal);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartIndicators();
  bindProductButtons();
  bindServiceButtons();
  bindServiceForm();
  renderCartPage();
});
