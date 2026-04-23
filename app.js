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

const PRODUCT_DETAILS = {
  PR1: { description: "Fragancias elegantes para sorprender con un detalle sofisticado y memorable.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Perfumería"],["Presentación","50 ml / 100 ml"],["Aromas","Floral, dulce, amaderado"]], conditions:["Producto sujeto a stock.","No se aceptan cambios por uso del envase.","Las notas aromáticas pueden variar ligeramente por lote."], options:[{label:"Aroma", values:["Floral","Dulce","Amaderado"]},{label:"Presentación", values:["50 ml","100 ml","Edición especial"]}] },
  PR2: { description: "Opciones útiles para complementar detalles y canastas con una presentación funcional.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Limpieza"],["Formato","Spray / pack"],["Aromas","Neutro, cítrico, floral"]], conditions:["Mantener fuera del alcance de niños.","Evitar contacto con ojos.","Presentación sujeta a stock."], options:[{label:"Presentación", values:["Spray","Pack","Individual"]},{label:"Aroma", values:["Neutro","Cítrico","Floral"]}] },
  PR3: { description: "Chocolates y antojos ideales para acompañar sorpresas románticas.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Confitería"],["Sabores","Chocolate, fresa, surtido"],["Presentación","Bolsa / caja / pack"]], conditions:["Verificar ingredientes en caso de alergias.","Producto sujeto a disponibilidad.","No aplica devolución por consumo o manipulación."], options:[{label:"Sabor", values:["Chocolate","Fresa","Surtido"]},{label:"Presentación", values:["Bolsa","Caja","Pack regalo"]}] },
  PR4: { description: "Detalles personalizados listos para impresionar con temática y acabado especial.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Regalo decorado"],["Temática","Romántico, sorpresa, celebración"],["Colores","Rojo, rosado, dorado"]], conditions:["Los acabados pueden variar según materiales.","Pedidos personalizados requieren coordinación previa.","No hay devolución una vez iniciada la personalización."], options:[{label:"Tema", values:["Romántico","Cumpleaños","Sorpresa"]},{label:"Color", values:["Rojo","Rosado","Dorado"]}] },
  PR5: { description: "Artículos pensados para consentir y crear momentos de autocuidado.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Cuidado personal"],["Formato","Mascarilla, crema, kit"],["Tamaño","Pequeño, mediano, completo"]], conditions:["Uso externo únicamente.","Revisar sensibilidad de piel antes de usar.","Imagen referencial."], options:[{label:"Tipo", values:["Mascarilla","Crema","Kit"]},{label:"Tamaño", values:["Pequeño","Mediano","Completo"]}] },
  PR6: { description: "Caja armada con detalles especiales para una entrega inolvidable.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Caja sorpresa"],["Tamaño","Pequeña, mediana, premium"],["Tema","Romántico, amistoso, familiar"]], conditions:["El contenido varía según presupuesto.","La caja se arma bajo coordinación previa.","No aplica devolución por personalización."], options:[{label:"Tamaño", values:["Pequeña","Mediana","Premium"]},{label:"Tema", values:["Romántico","Amistoso","Familiar"]}] },
  PR7: { description: "Complementos de belleza delicados y modernos para regalar.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Facial"],["Formato","Mascarilla, serum, set"],["Tamaño","Único, mediano, kit"]], conditions:["Uso externo.","Conservar en lugar fresco.","La presentación puede variar por stock."], options:[{label:"Tipo", values:["Mascarilla","Serum","Set facial"]},{label:"Tamaño", values:["Único","Mediano","Kit"]}] },
  PR8: { description: "Rosas para decorar cenas y sorpresas de alto impacto.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Floristería"],["Tipo de flor","Rosas"],["Presentación","Unidad, ramo, caja floral"]], conditions:["Flores sujetas a temporada.","El tono puede variar ligeramente.","Entregas coordinadas según disponibilidad."], options:[{label:"Color", values:["Rojo","Rosado","Blanco"]},{label:"Presentación", values:["Unidad","Ramo","Caja floral"]}] },
  PR9: { description: "Productos relacionados para ampliar tus opciones y complementar la sorpresa perfecta.", specs: [["Marca","Amor & Detalles"],["Tipo de producto","Complementario"],["Categoría","Complemento, decoración, extra"],["Estilo","Clásico, moderno, especial"]], conditions:["El producto final depende de la categoría elegida.","Imagen referencial.","Coordinación posterior para detalles específicos."], options:[{label:"Categoría", values:["Complemento","Decoración","Detalle extra"]},{label:"Estilo", values:["Clásico","Moderno","Especial"]}] }
};

const SERVICES = {
  cenas: { id: "SERV-CENAS", name: "Cena romántica", price: 180, image: "img/cenaSV.jpeg", type: "service" },
  flores: { id: "SERV-FLORES", name: "Arreglos florales", price: 120, image: "img/confidencial.jpg", type: "service" },
  momentos: { id: "SERV-MOMENTOS", name: "Momentos inolvidables", price: 160, image: "img/pareja.jpg", type: "service" }
};

const SERVICE_DETAILS = {
  cenas: { description: "Creamos experiencias íntimas y personalizadas con ambientación especial, transporte opcional y selección del tipo de cena.", specs:[["Tipo de servicio","Cena romántica"],["Modalidades","Romántica, familiar, amistosa"],["Limusina","Opcional con costo por km"],["Locales","San Isidro, Miraflores, Surco, Surquillo, Lince y Chorrillos"]], conditions:["Reserva con 50% del monto.","La fecha y hora quedan sujetas a disponibilidad.","La confirmación final se coordina por WhatsApp o correo."] },
  flores: { description: "Diseñamos arreglos para mesas, cuartos, salas o eventos, con elección de flor, plantas y medidas del área.", specs:[["Tipo de servicio","Arreglo floral"],["Flores","Rosas, girasoles, tulipanes, orquídeas"],["Plantas","Opcional con costo adicional"],["Precio","Calculado según medidas del área"]], conditions:["Las flores dependen de stock y temporada.","Se recomienda indicar medidas exactas.","Reserva con 50% del monto."] },
  momentos: { description: "Preparamos experiencias memorables como sorpresa, día de campo, tour, crucero y opción de limusina.", specs:[["Tipo de servicio","Experiencia especial"],["Modalidades","Sorpresa, día de campo, tour, crucero"],["Limusina","Opcional"],["Asesor","Disponible para coordinar"]], conditions:["La logística se confirma según servicio elegido.","Reserva con 50% del monto.","La empresa coordina detalles finales antes de la fecha."] }
};

const MOMENT_AVAILABILITY = {
  sorpresa: "Disponibilidad sugerida: todos los días desde las 6:00 p. m. en Miraflores, Surco y San Isidro.",
  "día de campo": "Disponibilidad sugerida: sábados y domingos desde las 10:00 a. m. en Chorrillos, Lurín y Pachacámac.",
  tour: "Disponibilidad sugerida: viernes a domingo con salidas a las 3:00 p. m. y 7:00 p. m. por Miraflores, Barranco y Centro de Lima.",
  crucero: "Disponibilidad sugerida: viernes y sábados, embarque 7:30 p. m. en La Punta y ruta hacia la bahía del Callao con retorno 10:30 p. m."
};

function getCart() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; } }
function saveCart(cart) { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); updateCartIndicators(); }
function money(value) { return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value); }
function queryParam(name) { return new URLSearchParams(window.location.search).get(name); }
function resolveAsset(path) { return document.body.dataset.assetPrefix === "../" ? `../${path}` : path; }
function parseAreaSize(text) { const nums = String(text || "").match(/[\d.]+/g) || []; if (nums.length >= 2) return Number(nums[0]) * Number(nums[1]); if (nums.length === 1) return Number(nums[0]); return 0; }

function updateCartIndicators() {
  const cart = getCart();
  const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  document.querySelectorAll(".cart-count").forEach((el) => { el.textContent = totalQty; });
}

function addProduct(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId && item.type === "product" && !item.details);
  if (existing) { existing.quantity += 1; existing.total = existing.quantity * existing.price; } else { cart.push({ ...product, quantity: 1, total: product.price }); }
  saveCart(cart); showToast(`${product.name} se añadió al carrito.`);
}

function addConfiguredProduct(data) {
  const product = PRODUCTS[data.productId];
  if (!product) return;
  const quantity = Math.max(1, Number(data.quantity) || 1);
  const details = data.details || {};
  const detailText = Object.values(details).filter(Boolean).join(" · ");
  const itemName = detailText ? `${product.name} (${detailText})` : product.name;
  const cart = getCart();
  cart.push({ id: `${product.id}-${Date.now()}`, baseId: product.id, type: "product", name: itemName, price: product.price, quantity, total: product.price * quantity, image: product.image, details });
  saveCart(cart); showToast(`${product.name} configurado se añadió al carrito.`);
}

function getServiceExtraDetails(serviceKey, formData) {
  if (serviceKey === "cenas") {
    return {
      tipoCena: `Tipo de cena: ${formData.get("dinnerType") || "romántica"}`,
      limusina: `Limusina: ${formData.get("transport") || "No"}`,
      zona: `Zona elegida: ${formData.get("venue") || "No especificado"}`,
      espera: `Punto de espera: ${formData.get("pickupLocation") || "No especificado"}`,
      km: `Km estimados: ${formData.get("limoKm") || "0"}`,
      detalle: `Detalle de cena: ${formData.get("dinnerNote") || "Sin detalle adicional"}`
    };
  }
  if (serviceKey === "flores") {
    return {
      florPrincipal: `Flor principal: ${formData.get("flowerType") || "rosas"}`,
      incluirPlantas: `Incluir plantas: ${formData.get("plants") || "No"}`,
      areaArreglo: `Área: ${formData.get("areaType") || "No especificada"}`,
      medidasArea: `Medidas: ${formData.get("areaSize") || "No especificadas"}`
    };
  }
  if (serviceKey === "momentos") {
    return {
      tipoExperiencia: `Experiencia: ${formData.get("momentType") || "sorpresa"}`,
      limusina: `Limusina: ${formData.get("limousine") || "No"}`,
      asesor: `Contactar con asesor: ${formData.get("advisorContact") || "No"}`,
      disponibilidad: MOMENT_AVAILABILITY[formData.get("momentType")] || "Disponibilidad sujeta a confirmación.",
      detalleAdicional: `Detalle: ${formData.get("momentNote") || "Sin detalle adicional"}`
    };
  }
  return {};
}

function formatDetails(details) {
  if (!details) return "";
  return Object.values(details).filter(Boolean).map((value) => `<span>${String(value)}</span>`).join("");
}

function calculateServiceTotal(serviceKey, form) {
  const persons = Math.max(1, Number(form.querySelector("#servicePersons")?.value || 1));
  if (serviceKey === "cenas") {
    const base = SERVICES.cenas.price * persons;
    const wantsLimo = form.querySelector("#transportSelect")?.value === "Sí";
    const km = Math.max(0, Number(form.querySelector("#limoKm")?.value || 0));
    const limoCost = wantsLimo ? km * 6 : 0;
    return { total: base + limoCost, info: [`Cena base por ${persons} persona(s): ${money(base)}`, wantsLimo ? `Limusina: S/ 6.00 por km × ${km} km = ${money(limoCost)}` : `Sin limusina adicional`, `Zona disponible: ${form.querySelector("select[name='venue']")?.value || "No especificada"}`] };
  }
  if (serviceKey === "flores") {
    const flowerType = form.querySelector("#flowerType")?.value || "rosas";
    const includePlants = form.querySelector("#plantsSelect")?.value === "Sí";
    const area = parseAreaSize(form.querySelector("#areaSize")?.value);
    const rateMap = { rosas: 32, girasoles: 26, tulipanes: 30, orquídeas: 36, mixtas: 28 };
    const base = 70;
    const areaCost = area * (rateMap[flowerType] || 28);
    const plantCost = includePlants ? Math.max(35, area * 6) : 0;
    return { total: base + areaCost + plantCost, info: [`Base de montaje: ${money(base)}`, `Área estimada: ${area.toFixed(2)} m²`, `Decoración floral (${flowerType}): ${money(areaCost)}`, includePlants ? `Plantas adicionales: ${money(plantCost)}` : `Sin plantas adicionales`] };
  }
  const momentType = form.querySelector("#momentType")?.value || "sorpresa";
  const baseMap = { sorpresa: 160, "día de campo": 140, tour: 220, crucero: 320 };
  const wantsLimo = form.querySelector("#limousineSelect")?.value === "Sí";
  const base = (baseMap[momentType] || 160) * persons;
  const limoCost = wantsLimo ? 140 : 0;
  return { total: base + limoCost, info: [`Experiencia ${momentType}: ${money(base)}`, wantsLimo ? `Servicio de limusina: ${money(limoCost)}` : `Sin servicio de limusina`, MOMENT_AVAILABILITY[momentType] || "Disponibilidad sujeta a confirmación."] };
}

function addServiceReservation(data) {
  const service = SERVICES[data.serviceKey];
  if (!service) return;
  const reserve = data.total * 0.5;
  const cart = getCart();
  cart.push({ id: `${service.id}-${Date.now()}`, type: "service", name: `${service.name} (${data.persons} ${data.serviceKey === "flores" ? "ambiente(s)" : `persona${data.persons > 1 ? "s" : ""}`})`, price: data.total, quantity: 1, total: data.total, reserve, image: service.image, details: { fecha: `Fecha: ${data.serviceDate}`, hora: `Hora: ${data.serviceTime}`, titular: `Titular: ${data.fullName}`, dni: `DNI: ${data.dni}`, distrito: `Distrito: ${data.district}`, correo: `Correo: ${data.email}`, telefono: `Número: ${data.phone}`, ...data.extraDetails } });
  saveCart(cart); showToast(`Reserva de ${service.name} agregada al carrito.`);
}

function showToast(message) {
  const box = document.querySelector("#ui-toast");
  if (!box) return;
  box.textContent = message;
  box.classList.add("show");
  setTimeout(() => box.classList.remove("show"), 2400);
}

function bindProductButtons() { document.querySelectorAll("[data-add-product]").forEach((btn) => btn.addEventListener("click", () => addProduct(btn.dataset.addProduct))); }

function renderProductDetailPage() {
  if (!document.body.dataset.page || document.body.dataset.page !== "product-detail") return;
  const id = queryParam("id") || "PR1";
  const product = PRODUCTS[id];
  const extra = PRODUCT_DETAILS[id];
  if (!product || !extra) return;
  document.querySelector("#detail-title").textContent = product.name;
  document.querySelector("#detail-description").textContent = extra.description;
  document.querySelector("#detail-image").src = resolveAsset(product.image);
  document.querySelector("#detail-image").alt = product.name;
  document.querySelector("#detail-price").textContent = money(product.price);
  document.querySelector("#detail-specs").innerHTML = extra.specs.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join("");
  document.querySelector("#detail-conditions").innerHTML = extra.conditions.map((item) => `<p>${item}</p>`).join("");
  const options = extra.options.map((opt, index) => `<label><span>${opt.label}</span><select name="option${index + 1}" data-detail-label="${opt.label}">${opt.values.map((v) => `<option value="${v}">${v}</option>`).join("")}</select></label>`).join("");
  document.querySelector("#detail-form-wrap").innerHTML = `<form id="product-detail-form" data-product-id="${id}"><div class="form-grid">${options}<label><span>Cantidad</span><input id="detailQuantity" name="quantity" type="number" min="1" value="1" /></label></div><div class="reserve-summary"><div><span>Total</span><strong id="detailTotal">${money(product.price)}</strong></div></div><button type="submit">Añadir al carrito</button></form>`;
  bindDetailedProductPage();
}

function bindDetailedProductPage() {
  const form = document.querySelector("#product-detail-form");
  if (!form) return;
  const productId = form.dataset.productId;
  const qtyInput = form.querySelector("#detailQuantity");
  const totalBox = document.querySelector("#detailTotal");
  const product = PRODUCTS[productId];
  function recalcDetailTotal() { const quantity = Math.max(1, Number(qtyInput.value) || 1); totalBox.textContent = money(product.price * quantity); }
  qtyInput.addEventListener("input", recalcDetailTotal);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(form);
    const details = {};
    form.querySelectorAll("[data-detail-label]").forEach((field) => {
      const label = field.dataset.detailLabel;
      const value = fd.get(field.name);
      if (label && value) details[label] = `${label}: ${value}`;
    });
    addConfiguredProduct({ productId, quantity: fd.get("quantity"), details });
  });
}

function renderServiceDetailPage() {
  if (!document.body.dataset.page || document.body.dataset.page !== "service-detail") return;
  const id = queryParam("id") || "cenas";
  const service = SERVICES[id];
  const extra = SERVICE_DETAILS[id];
  if (!service || !extra) return;
  document.querySelector("#service-title").textContent = service.name;
  document.querySelector("#service-description").textContent = extra.description;
  document.querySelector("#service-image").src = resolveAsset(service.image);
  document.querySelector("#service-image").alt = service.name;
  document.querySelector("#service-price").textContent = `Desde ${money(service.price)} ${id === "flores" ? "base" : "por persona"}`;
  document.querySelector("#service-specs").innerHTML = extra.specs.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join("");
  document.querySelector("#service-conditions").innerHTML = extra.conditions.map((item) => `<p>${item}</p>`).join("");
  document.querySelector("#service-reserve-link").href = `../servicios.html#service-booking`;
}

function bindServiceButtons() {
  const select = document.querySelector("#serviceType");
  document.querySelectorAll("[data-service-select]").forEach((btn) => btn.addEventListener("click", () => { if (select) { select.value = btn.dataset.serviceSelect; select.dispatchEvent(new Event("change")); } document.querySelector("#service-booking")?.scrollIntoView({ behavior: "smooth", block: "start" }); }));
}

function toggleServiceOptionGroups(selected) {
  document.querySelectorAll(".service-options-grid").forEach((group) => group.classList.add("is-hidden"));
  const active = document.querySelector(`#options-${selected}`);
  if (active) active.classList.remove("is-hidden");
}

function updateServiceLabels(serviceKey, form) {
  const personsLabel = form.querySelector("#servicePersonsLabel");
  const dateLabel = form.querySelector("#serviceDateLabel");
  const timeLabel = form.querySelector("#serviceTimeLabel");
  if (serviceKey === "cenas") {
    personsLabel.textContent = "Para cuántas personas";
    dateLabel.textContent = "Fecha de reservación";
    timeLabel.textContent = "Hora de reservación";
  } else if (serviceKey === "flores") {
    personsLabel.textContent = "Cantidad de ambientes";
    dateLabel.textContent = "Día del servicio";
    timeLabel.textContent = "Hora del servicio";
  } else {
    personsLabel.textContent = "Para cuántas personas";
    dateLabel.textContent = "Fecha disponible";
    timeLabel.textContent = "Hora disponible";
  }
}

function bindServiceForm() {
  const form = document.querySelector("#service-booking-form");
  if (!form) return;
  const select = form.querySelector("#serviceType");
  const persons = form.querySelector("#servicePersons");
  const totalField = form.querySelector("#serviceTotal");
  const reserveField = form.querySelector("#serviceReserve");
  const infoBox = form.querySelector("#serviceDynamicInfo");

  function recalc() {
    const serviceKey = select.value;
    updateServiceLabels(serviceKey, form);
    toggleServiceOptionGroups(serviceKey);
    const calc = calculateServiceTotal(serviceKey, form);
    const reserve = calc.total * 0.5;
    totalField.textContent = money(calc.total);
    reserveField.textContent = money(reserve);
    infoBox.innerHTML = calc.info.map((line) => `<div><span>${line}</span></div>`).join("");
  }

  [select, persons, form.querySelector("#transportSelect"), form.querySelector("#limoKm"), form.querySelector("#flowerType"), form.querySelector("#plantsSelect"), form.querySelector("#areaSize"), form.querySelector("#momentType"), form.querySelector("#limousineSelect")].forEach((el) => {
    if (el) el.addEventListener(el.tagName === "INPUT" ? "input" : "change", recalc);
  });

  recalc();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const calc = calculateServiceTotal(formData.get("serviceType"), form);
    addServiceReservation({
      serviceKey: formData.get("serviceType"),
      persons: Math.max(1, Number(formData.get("servicePersons") || 1)),
      serviceDate: formData.get("serviceDate"),
      serviceTime: formData.get("serviceTime"),
      fullName: formData.get("fullName"),
      dni: formData.get("dni"),
      district: formData.get("district"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      total: calc.total,
      extraDetails: getServiceExtraDetails(formData.get("serviceType"), formData)
    });
    form.reset();
    form.querySelector("#servicePersons").value = 2;
    if (form.querySelector("#limoKm")) form.querySelector("#limoKm").value = 0;
    recalc();
  });
}

function renderCartPage() {
  const container = document.querySelector("#cart-items");
  if (!container) return;
  const cart = getCart();
  const empty = document.querySelector("#cart-empty");
  const summary = document.querySelector("#cart-summary");
  if (cart.length === 0) { if (empty) empty.hidden = false; if (summary) summary.hidden = true; container.innerHTML = ""; updateCartIndicators(); return; }
  if (empty) empty.hidden = true; if (summary) summary.hidden = false;
  container.innerHTML = cart.map((item) => `<article class="cart-item-card"><img src="${item.image}" alt="${item.name}"><div class="cart-item-info"><h3>${item.name}</h3><p>${item.type === "service" ? "Servicio reservado" : "Producto"}</p>${item.details ? `<div class="service-detail-lines">${formatDetails(item.details)}</div>` : ""}${item.reserve ? `<p class="reserve-note">Reserva del 50%: ${money(item.reserve)}</p>` : ""}</div><div class="cart-item-controls">${item.type === "product" ? `<div class="qty-box"><button type="button" data-cart-dec="${item.id}">-</button><span>${item.quantity}</span><button type="button" data-cart-inc="${item.id}">+</button></div>` : `<span class="service-chip">1 reserva</span>`}<strong>${money(item.total || item.price)}</strong><button type="button" class="remove-btn" data-cart-remove="${item.id}">Quitar</button></div></article>`).join("");
  bindCartControls(); renderCartSummary();
}

function bindCartControls() { document.querySelectorAll("[data-cart-inc]").forEach((btn) => btn.addEventListener("click", () => updateCartProduct(btn.dataset.cartInc, 1))); document.querySelectorAll("[data-cart-dec]").forEach((btn) => btn.addEventListener("click", () => updateCartProduct(btn.dataset.cartDec, -1))); document.querySelectorAll("[data-cart-remove]").forEach((btn) => btn.addEventListener("click", () => removeCartItem(btn.dataset.cartRemove))); }
function updateCartProduct(id, delta) { const cart = getCart(); const item = cart.find((entry) => entry.id === id); if (!item || item.type !== "product") return; item.quantity = Math.max(1, item.quantity + delta); item.total = item.quantity * item.price; saveCart(cart); renderCartPage(); renderCheckoutPage(); }
function removeCartItem(id) { const cart = getCart().filter((item) => item.id !== id); saveCart(cart); renderCartPage(); renderCheckoutPage(); }
function renderCartSummary() { const cart = getCart(); const subtotal = cart.reduce((acc, item) => acc + (item.total || 0), 0); const reserveTotal = cart.filter((item) => item.type === "service").reduce((acc, item) => acc + (item.reserve || 0), 0); const finalEl = document.querySelector("#cart-subtotal"); const reserveEl = document.querySelector("#cart-reserve"); const totalEl = document.querySelector("#cart-total"); if (finalEl) finalEl.textContent = money(subtotal); if (reserveEl) reserveEl.textContent = money(reserveTotal); if (totalEl) totalEl.textContent = money(subtotal); }

function computeCheckoutTotals(cart, deliveryMethod = "olva", servicePaymentMode = "50") {
  const productSubtotal = cart.filter(i => i.type === "product").reduce((a, i) => a + (i.total || 0), 0);
  const serviceSubtotal = cart.filter(i => i.type === "service").reduce((a, i) => a + (i.total || 0), 0);
  const serviceReserve = cart.filter(i => i.type === "service").reduce((a, i) => a + (i.reserve || 0), 0);
  const delivery = productSubtotal > 0 ? (deliveryMethod === "rappi" ? 15 : 10) : 0;
  const servicePayment = serviceSubtotal > 0 ? (servicePaymentMode === "100" ? serviceSubtotal : serviceReserve) : 0;
  const total = productSubtotal + delivery + servicePayment;
  return { productSubtotal, serviceSubtotal, serviceReserve, delivery, total };
}

function renderCheckoutPage() {
  if (document.body.dataset.page !== "checkout") return;
  const cart = getCart();
  const empty = document.querySelector("#cart-empty");
  const section = document.querySelector("#checkout-section");
  const list = document.querySelector("#checkout-order-items");
  if (!list || !section) return;
  if (!cart.length) {
    if (empty) empty.hidden = false;
    section.hidden = true;
    return;
  }
  if (empty) empty.hidden = true;
  section.hidden = false;
  list.innerHTML = cart.map(item => `<div class="order-mini-item"><div><strong>${item.name}</strong><small>${item.type === "service" ? "Servicio" : `Cantidad x ${item.quantity}`}</small></div><strong>${money(item.total || item.price)}</strong></div>`).join("");
  const hasServices = cart.some(item => item.type === "service");
  const reserveBlock = document.querySelector("#reserve-mode-block");
  if (reserveBlock) reserveBlock.hidden = !hasServices;
  updateCheckoutTotals();
}

function updateCheckoutTotals() {
  if (document.body.dataset.page !== "checkout") return;
  const cart = getCart();
  const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value || "olva";
  const servicePaymentMode = document.querySelector('input[name="servicePaymentMode"]:checked')?.value || "50";
  const totals = computeCheckoutTotals(cart, deliveryMethod, servicePaymentMode);
  const ids = {
    products: document.querySelector("#checkout-products-subtotal"),
    services: document.querySelector("#checkout-services-subtotal"),
    delivery: document.querySelector("#checkout-delivery"),
    servicePayment: document.querySelector("#checkout-service-payment"),
    total: document.querySelector("#checkout-total")
  };
  if (ids.products) ids.products.textContent = money(totals.productSubtotal);
  if (ids.services) ids.services.textContent = money(totals.serviceSubtotal);
  if (ids.delivery) ids.delivery.textContent = money(totals.delivery);
  if (ids.servicePayment) ids.servicePayment.textContent = money(totals.servicePayment);
  if (ids.total) ids.total.textContent = money(totals.total);
}

function showStatusModal(type, title, text) {
  const modal = document.querySelector("#status-modal");
  const card = document.querySelector("#status-card");
  const icon = document.querySelector("#status-icon");
  const titleEl = document.querySelector("#status-title");
  const textEl = document.querySelector("#status-text");
  if (!modal || !card || !icon || !titleEl || !textEl) return;
  card.className = `status-card status-${type}`;
  icon.textContent = type === "success" ? "✓" : type === "error" ? "✕" : "!";
  titleEl.textContent = title;
  textEl.textContent = text;
  modal.classList.add("show");
  setTimeout(() => modal.classList.remove("show"), 2600);
}

function bindCheckoutForm() {
  if (document.body.dataset.page !== "checkout") return;
  const form = document.querySelector("#checkout-form");
  if (!form) return;
  document.querySelectorAll('input[name="deliveryMethod"], input[name="servicePaymentMode"]').forEach(el => {
    el.addEventListener("change", updateCheckoutTotals);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = getCart();
    if (!cart.length) {
      showStatusModal("warning", "Carrito vacío", "Agrega productos o servicios antes de realizar el pedido.");
      return;
    }
    const fd = new FormData(form);
    const required = ["firstName","lastName","address","city","region","phone","email"];
    const invalid = required.some(name => !String(fd.get(name) || "").trim());
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const acceptTerms = document.querySelector("#acceptTerms")?.checked;
    if (invalid || !email.includes("@") || phone.trim().length < 7 || !acceptTerms) {
      showStatusModal("warning", "Datos erróneos", "Corrige la información del formulario y vuelve a intentarlo.");
      return;
    }
    const paymentMethod = fd.get("paymentMethod");
    if (!paymentMethod) {
      showStatusModal("error", "Pedido no realizado", "Selecciona un método de pago válido.");
      return;
    }
    const totals = computeCheckoutTotals(
      cart,
      document.querySelector('input[name="deliveryMethod"]:checked')?.value || "olva",
      document.querySelector('input[name="servicePaymentMode"]:checked')?.value || "50"
    );
    showStatusModal("success", "Pedido realizado", `Pago procesado correctamente por ${money(totals.total)}. Confirmación visual generada.`);
    localStorage.removeItem(STORE_KEY);
    updateCartIndicators();
    setTimeout(() => {
      renderCartPage();
      renderCheckoutPage();
      form.reset();
    }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartIndicators();
  renderProductDetailPage();
  renderServiceDetailPage();
  bindProductButtons();
  bindServiceButtons();
  bindServiceForm();
  renderCartPage();
  renderCheckoutPage();
  bindCheckoutForm();
});
