const CUSTOMER_STORE_KEY = "amor_detalles_customers_v1";
const CUSTOMER_SESSION_KEY = "amor_detalles_customer_session_v1";

function getCustomers() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_STORE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCustomers(customers) {
  localStorage.setItem(CUSTOMER_STORE_KEY, JSON.stringify(customers));
}

function getCurrentCustomer() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_SESSION_KEY));
  } catch (error) {
    return null;
  }
}

function saveCurrentCustomer(customer) {
  localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(customer));
}

function removeCurrentCustomer() {
  localStorage.removeItem(CUSTOMER_SESSION_KEY);
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function showCustomerToast(message) {
  const toast = document.querySelector("#ui-toast");
  if (!toast) {
    alert(message);
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderCustomerPanel() {
  const panel = document.querySelector("#customer-panel");
  const buttonText = document.querySelector("#customer-button-text");
  const currentCustomer = getCurrentCustomer();

  if (!panel) return;

  if (currentCustomer) {
    if (buttonText) buttonText.textContent = currentCustomer.name.split(" ")[0];

    const whatsappNumber = normalizePhone(currentCustomer.phone);
    const offerMessage = encodeURIComponent(`Hola ${currentCustomer.name}, tienes una oferta exclusiva: 10% de descuento en cajas sorpresa y reservas románticas por tiempo limitado.`);
    const whatsappLink = whatsappNumber ? `https://wa.me/51${whatsappNumber}?text=${offerMessage}` : "#";
    const mailLink = `mailto:${currentCustomer.email}?subject=Oferta exclusiva Amor %26 Detalles&body=${offerMessage}`;

    panel.innerHTML = `
      <div class="customer-welcome">
        <span class="customer-badge">Cliente VIP</span>
        <h3>Hola, ${currentCustomer.name}</h3>
        <p>Tu cuenta está activa. Ahora puedes recibir beneficios, descuentos y ofertas especiales.</p>
      </div>

      <div class="benefits-list">
        <div><strong>10% OFF</strong><span>En cajas sorpresa seleccionadas.</span></div>
        <div><strong>Prioridad</strong><span>Atención preferencial en reservas.</span></div>
        <div><strong>Ofertas flash</strong><span>Avisos por correo y WhatsApp.</span></div>
      </div>

      <div class="customer-preferences">
        <p><strong>Preferencias activadas:</strong></p>
        <span>${currentCustomer.receiveEmail ? "Correo ✓" : "Correo —"}</span>
        <span>${currentCustomer.receiveWhatsapp ? "WhatsApp ✓" : "WhatsApp —"}</span>
      </div>

      <div class="customer-actions">
        <a class="customer-mini-btn" href="${mailLink}">Enviar oferta por correo</a>
        <a class="customer-mini-btn" href="${whatsappLink}" target="_blank" rel="noopener noreferrer">Enviar oferta por WhatsApp</a>
        <button type="button" id="customer-logout">Cerrar sesión</button>
      </div>
    `;

    document.querySelector("#customer-logout")?.addEventListener("click", () => {
      removeCurrentCustomer();
      renderCustomerPanel();
      showCustomerToast("Sesión cerrada correctamente.");
    });

    return;
  }

  if (buttonText) buttonText.textContent = "Área clientes";

  panel.innerHTML = `
    <div class="customer-tabs">
      <button type="button" class="customer-tab active" data-customer-tab="login">Iniciar sesión</button>
      <button type="button" class="customer-tab" data-customer-tab="register">Crear cuenta</button>
    </div>

    <form id="customer-login-form" class="customer-form">
      <label>Correo electrónico
        <input type="email" name="email" placeholder="cliente@gmail.com" required>
      </label>
      <label>Contraseña
        <input type="password" name="password" placeholder="Tu contraseña" required>
      </label>
      <button type="submit">Entrar</button>
      <p class="customer-note">Ingresa con una cuenta creada en esta web.</p>
    </form>

    <form id="customer-register-form" class="customer-form hidden-customer-form">
      <label>Nombre completo
        <input type="text" name="name" placeholder="Tu nombre" required>
      </label>
      <label>Correo electrónico
        <input type="email" name="email" placeholder="cliente@gmail.com" required>
      </label>
      <label>WhatsApp
        <input type="tel" name="phone" placeholder="987654321" required>
      </label>
      <label>Contraseña
        <input type="password" name="password" placeholder="Crea una contraseña" minlength="4" required>
      </label>
      <label class="customer-check"><input type="checkbox" name="receiveEmail" checked> Quiero recibir ofertas por correo</label>
      <label class="customer-check"><input type="checkbox" name="receiveWhatsapp" checked> Quiero recibir ofertas por WhatsApp</label>
      <button type="submit">Registrar cuenta</button>
      <p class="customer-note">Tus datos quedarán guardados en este navegador para activar beneficios y promociones.</p>
    </form>
  `;

  bindCustomerForms();
}

function bindCustomerForms() {
  const tabs = document.querySelectorAll("[data-customer-tab]");
  const loginForm = document.querySelector("#customer-login-form");
  const registerForm = document.querySelector("#customer-register-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.customerTab === "login") {
        loginForm?.classList.remove("hidden-customer-form");
        registerForm?.classList.add("hidden-customer-form");
      } else {
        registerForm?.classList.remove("hidden-customer-form");
        loginForm?.classList.add("hidden-customer-form");
      }
    });
  });

  registerForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(registerForm);
    const customers = getCustomers();
    const email = String(data.get("email") || "").trim().toLowerCase();

    if (customers.some((customer) => customer.email === email)) {
      showCustomerToast("Ese correo ya tiene una cuenta registrada.");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: String(data.get("name") || "").trim(),
      email,
      phone: normalizePhone(data.get("phone")),
      password: String(data.get("password") || ""),
      receiveEmail: data.get("receiveEmail") === "on",
      receiveWhatsapp: data.get("receiveWhatsapp") === "on",
      createdAt: new Date().toISOString()
    };

    customers.push(newCustomer);
    saveCustomers(customers);
    saveCurrentCustomer(newCustomer);
    renderCustomerPanel();
    showCustomerToast("Cuenta creada. Beneficios activados.");
  });

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const customer = getCustomers().find((item) => item.email === email && item.password === password);

    if (!customer) {
      showCustomerToast("Correo o contraseña incorrectos.");
      return;
    }

    saveCurrentCustomer(customer);
    renderCustomerPanel();
    showCustomerToast("Sesión iniciada correctamente.");
  });
}

function bindCustomerAccess() {
  const access = document.querySelector("#customer-access");
  const button = document.querySelector("#customer-button");

  if (!access || !button) return;

  button.addEventListener("click", () => {
    access.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!access.contains(event.target)) {
      access.classList.remove("open");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindCustomerAccess();
  renderCustomerPanel();
});
