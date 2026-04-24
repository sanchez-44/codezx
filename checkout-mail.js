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
    ? (servicePaymentMode === "100" ? serviceSubtotal : serviceReserve)
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
