const CHECKOUT_STORE_KEY = "amor_detalles_cart_v1";

function checkoutMoney(value) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(value) || 0);
}

function checkoutGetCart() {
  try {
    return JSON.parse(localStorage.getItem(CHECKOUT_STORE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function checkoutUpdateCartCounter() {
  const cart = checkoutGetCart();
  const totalItems = cart.reduce((total, item) => total + Number(item.quantity || 1), 0);

  document.querySelectorAll(".cart-count").forEach((counter) => {
    counter.textContent = totalItems;
  });

  try {
    window.dispatchEvent(new Event("storage"));
  } catch (error) {}
}

function checkoutSaveCart(cart) {
  localStorage.setItem(CHECKOUT_STORE_KEY, JSON.stringify(cart));
  checkoutUpdateCartCounter();
}

function checkoutClearCart() {
  localStorage.removeItem(CHECKOUT_STORE_KEY);
  checkoutUpdateCartCounter();
  checkoutRenderOrder();
}

function checkoutBuildTotals(cart) {
  const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value || "olva";
  const servicePaymentMode = document.querySelector('input[name="servicePaymentMode"]:checked')?.value || "50";

  const productSubtotal = cart
    .filter((item) => item.type === "product")
    .reduce((total, item) => total + Number(item.total || item.price || 0), 0);

  const serviceSubtotal = cart
    .filter((item) => item.type === "service")
    .reduce((total, item) => total + Number(item.total || item.price || 0), 0);

  const serviceReserve = cart
    .filter((item) => item.type === "service")
    .reduce((total, item) => total + Number(item.reserve || 0), 0);

  const delivery = productSubtotal > 0 ? (deliveryMethod === "rappi" ? 15 : 10) : 0;
  const servicePayment = serviceSubtotal > 0
    ? (servicePaymentMode === "100" ? serviceSubtotal : (serviceReserve || serviceSubtotal * 0.5))
    : 0;

  return {
    deliveryMethod,
    servicePaymentMode,
    productSubtotal,
    serviceSubtotal,
    serviceReserve,
    delivery,
    servicePayment,
    totalToPay: productSubtotal + delivery + servicePayment
  };
}

function checkoutItemDetails(item) {
  if (!item.details) return "";
  return Object.values(item.details).filter(Boolean).join(" · ");
}

function checkoutResetTotals() {
  const targets = {
    "#checkout-products-subtotal": 0,
    "#checkout-services-subtotal": 0,
    "#checkout-delivery": 0,
    "#checkout-service-payment": 0,
    "#checkout-total": 0
  };

  Object.entries(targets).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = checkoutMoney(value);
  });
}

function checkoutRenderOrder() {
  const cart = checkoutGetCart();
  const empty = document.querySelector("#cart-empty");
  const section = document.querySelector("#checkout-section");
  const list = document.querySelector("#checkout-order-items");
  const reserveBlock = document.querySelector("#reserve-mode-block");

  checkoutUpdateCartCounter();

  if (!list) return;

  if (!cart.length) {
    if (empty) empty.hidden = false;
    if (section) section.hidden = true;
    list.innerHTML = "";
    checkoutResetTotals();
    return;
  }

  if (empty) empty.hidden = true;
  if (section) section.hidden = false;
  if (reserveBlock) reserveBlock.hidden = !cart.some((item) => item.type === "service");

  list.innerHTML = `
    <div class="checkout-clear-row">
      <button type="button" class="checkout-clear-btn" id="checkout-clear-cart">Vaciar carrito</button>
    </div>
    ${cart.map((item, index) => `
      <div class="order-mini-item">
        <div>
          <strong>${item.name}</strong>
          ${checkoutItemDetails(item) ? `<small>${checkoutItemDetails(item)}</small>` : ""}
          <small>${item.type === "service" ? "Servicio" : `Cantidad x ${item.quantity || 1}`}</small>
          <button type="button" class="checkout-remove-btn" data-remove-index="${index}">Quitar</button>
        </div>
        <strong>${checkoutMoney(item.total || item.price)}</strong>
      </div>
    `).join("")}
  `;

  const clearButton = list.querySelector("#checkout-clear-cart");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (confirm("¿Seguro que deseas vaciar todo el carrito?")) {
        checkoutClearCart();
      }
    });
  }

  list.querySelectorAll("[data-remove-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = checkoutGetCart();
      current.splice(Number(button.dataset.removeIndex), 1);
      checkoutSaveCart(current);
      checkoutRenderOrder();
    });
  });

  const totals = checkoutBuildTotals(cart);
  document.querySelector("#checkout-products-subtotal").textContent = checkoutMoney(totals.productSubtotal);
  document.querySelector("#checkout-services-subtotal").textContent = checkoutMoney(totals.serviceSubtotal);
  document.querySelector("#checkout-delivery").textContent = checkoutMoney(totals.delivery);
  document.querySelector("#checkout-service-payment").textContent = checkoutMoney(totals.servicePayment);
  document.querySelector("#checkout-total").textContent = checkoutMoney(totals.totalToPay);
}

function checkoutBuildOrderText(cart, totals) {
  const items = cart.map((item, index) => {
    const details = item.details
      ? Object.values(item.details).filter(Boolean).map((line) => `   - ${line}`).join("\n")
      : "";

    return `${index + 1}. ${item.name}\nTipo: ${item.type === "service" ? "Servicio" : "Producto"}\nCantidad: ${item.quantity || 1}\nPrecio unitario: ${checkoutMoney(item.price)}\nSubtotal: ${checkoutMoney(item.total || item.price)}${details ? `\nDetalles:\n${details}` : ""}`;
  }).join("\n\n");

  return `${items}\n\nRESUMEN\nSubtotal productos: ${checkoutMoney(totals.productSubtotal)}\nSubtotal servicios: ${checkoutMoney(totals.serviceSubtotal)}\nEnvío: ${checkoutMoney(totals.delivery)}\nPago actual de servicios: ${checkoutMoney(totals.servicePayment)}\nTotal a pagar: ${checkoutMoney(totals.totalToPay)}`;
}

function checkoutShowStatus(type, title, text) {
  const modal = document.querySelector("#status-modal");
  const card = document.querySelector("#status-card");
  const icon = document.querySelector("#status-icon");
  const titleBox = document.querySelector("#status-title");
  const textBox = document.querySelector("#status-text");

  if (!modal || !card || !icon || !titleBox || !textBox) {
    alert(`${title}\n${text}`);
    return;
  }

  card.className = `status-card status-${type}`;
  icon.textContent = type === "success" ? "✓" : type === "warning" ? "!" : "×";
  titleBox.textContent = title;
  textBox.textContent = text;
  modal.classList.add("show");
}

function checkoutPrepareHiddenFields(form, cart, totals) {
  const fields = {
    pedido_resumen: checkoutBuildOrderText(cart, totals),
    pedido_json: JSON.stringify(cart),
    subtotal_productos: totals.productSubtotal.toFixed(2),
    subtotal_servicios: totals.serviceSubtotal.toFixed(2),
    envio: totals.delivery.toFixed(2),
    pago_servicios: totals.servicePayment.toFixed(2),
    total_pagar: totals.totalToPay.toFixed(2),
    metodo_envio: totals.deliveryMethod,
    modo_pago_servicio: totals.servicePaymentMode
  };

  Object.entries(fields).forEach(([name, value]) => {
    let input = form.querySelector(`[name="${name}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#checkout-form");
  checkoutRenderOrder();
  document.querySelectorAll('input[name="deliveryMethod"], input[name="servicePaymentMode"]').forEach((input) => {
    input.addEventListener("change", checkoutRenderOrder);
  });

  if (!form) return;

  form.setAttribute("method", "POST");
  form.setAttribute("action", "php/enviar_pedido.php");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const cart = checkoutGetCart();
    if (!cart.length) {
      checkoutShowStatus("warning", "Carrito vacío", "Agrega productos o servicios antes de realizar el pedido.");
      return;
    }

    const totals = checkoutBuildTotals(cart);
    checkoutPrepareHiddenFields(form, cart, totals);

    const submitButton = form.querySelector("button[type='submit']");
    const originalText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando pedido...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form)
      });

      const resultText = await response.text();

      if (!response.ok) {
        throw new Error(resultText || "No se pudo enviar el pedido.");
      }

      localStorage.removeItem(CHECKOUT_STORE_KEY);
      checkoutUpdateCartCounter();
      checkoutShowStatus("success", "Pedido enviado", "Tu pedido fue enviado correctamente. Te contactaremos pronto para coordinar el pago y la entrega.");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2200);
    } catch (error) {
      checkoutShowStatus("error", "No se pudo enviar", "Verifica que estés ejecutando el proyecto desde XAMPP y que el archivo php/enviar_pedido.php exista.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  }, true);
});
