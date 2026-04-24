function getAssetPrefix() {
  return document.body?.dataset?.assetPrefix || "";
}

function ensureCustomerAccessExists() {
  let access = document.querySelector("#customer-access");
  if (access) return access;

  const navbar = document.querySelector(".navbar");
  if (!navbar) return null;

  access = document.createElement("div");
  access.id = "customer-access";
  access.className = "customer-access";
  access.innerHTML = `
    <button id="customer-button" class="customer-button" type="button">
      <span>👤</span>
      <strong id="customer-button-text">Área clientes</strong>
    </button>
    <div id="customer-panel" class="customer-panel"></div>
  `;

  navbar.appendChild(access);
  return access;
}

async function getCustomerSession() {
  try {
    const prefix = getAssetPrefix();
    const response = await fetch(`${prefix}cliente/session_status.php`, { cache: "no-store" });
    if (!response.ok) return { logged: false };
    return await response.json();
  } catch (error) {
    return { logged: false };
  }
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

function renderGuestPanel(panel) {
  const prefix = getAssetPrefix();
  panel.innerHTML = `
    <div class="customer-tabs">
      <button type="button" class="customer-tab active">Iniciar sesión</button>
      <button type="button" class="customer-tab" id="go-register-tab">Crear cuenta</button>
    </div>

    <div class="customer-form customer-access-links">
      <p class="customer-note">Accede con tu cuenta para activar beneficios, ofertas y atención personalizada.</p>
      <a class="customer-main-link" href="${prefix}cliente/login.php">Iniciar sesión</a>
      <a class="customer-secondary-link" href="${prefix}cliente/registro.php">Crear cuenta nueva</a>
      <a class="customer-recover-link" href="${prefix}cliente/forgot_password.php">Olvidé mi contraseña</a>
    </div>
  `;

  panel.querySelector("#go-register-tab")?.addEventListener("click", () => {
    window.location.href = `${prefix}cliente/registro.php`;
  });
}

function renderLoggedPanel(panel, cliente) {
  const prefix = getAssetPrefix();
  const firstName = String(cliente.nombre || "Cliente").split(" ")[0];
  panel.innerHTML = `
    <div class="customer-welcome">
      <span class="customer-badge">${cliente.nivel || "Cliente"}</span>
      <h3>Hola, ${firstName}</h3>
      <p>Tu sesión está activa. Ya puedes disfrutar beneficios y ofertas exclusivas.</p>
    </div>

    <div class="benefits-list">
      <div><strong>Beneficios activos</strong><span>Promociones para clientes registrados.</span></div>
      <div><strong>Atención preferencial</strong><span>Coordinación rápida para reservas y pedidos.</span></div>
      <div><strong>Ofertas en tiempo real</strong><span>Avisos por correo o WhatsApp según tus preferencias.</span></div>
    </div>

    <div class="customer-preferences">
      <p><strong>Preferencias:</strong></p>
      <span>${cliente.ofertas_correo ? "Correo ✓" : "Correo —"}</span>
      <span>${cliente.ofertas_whatsapp ? "WhatsApp ✓" : "WhatsApp —"}</span>
    </div>

    <div class="customer-actions">
      <a class="customer-mini-btn" href="${prefix}cliente/dashboard.php">Mi cuenta</a>
      <a class="customer-mini-btn" href="${prefix}tienda.html">Ver tienda</a>
      <a class="customer-mini-btn" href="${prefix}cliente/logout.php">Cerrar sesión</a>
    </div>
  `;
}

async function renderCustomerPanel() {
  ensureCustomerAccessExists();
  const panel = document.querySelector("#customer-panel");
  const buttonText = document.querySelector("#customer-button-text");
  if (!panel) return;

  panel.innerHTML = `<p class="customer-note">Cargando área de clientes...</p>`;
  const session = await getCustomerSession();

  if (session.logged && session.cliente) {
    if (buttonText) buttonText.textContent = String(session.cliente.nombre || "Cliente").split(" ")[0];
    renderLoggedPanel(panel, session.cliente);
  } else {
    if (buttonText) buttonText.textContent = "Área clientes";
    renderGuestPanel(panel);
  }
}

function bindCustomerAccess() {
  const access = ensureCustomerAccessExists();
  const button = document.querySelector("#customer-button");

  if (!access || !button) return;

  button.addEventListener("click", () => {
    access.classList.toggle("open");
    if (access.classList.contains("open")) {
      renderCustomerPanel();
    }
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
