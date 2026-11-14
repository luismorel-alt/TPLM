import { getFromLocalStorage, setItemToLocalStorage } from "../storage/storage.js";

const money = (value) => `U$S ${Number(value).toFixed(2)}`;

export function renderCart() {
  const cart = getFromLocalStorage();
  const itemsContainer = document.querySelector("#cart-items");
  const countElement = document.querySelector("#cart-count");
  const totalElement = document.querySelector("#cart-total");
  const itemCount = cart.reduce((sum, item) => sum + Number(item.qty ?? item.cantidad ?? 0), 0);
  const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty ?? item.cantidad ?? 0), 0);

  countElement.textContent = itemCount;
  totalElement.textContent = money(total);

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="text-muted">El carrito está vacío.</p>';
    return;
  }

  itemsContainer.innerHTML = cart.map((item) => {
    const qty = Number(item.qty ?? item.cantidad ?? 0);
    return `
      <article class="cart-item py-3" data-cart-item="${item.id}">
        <div class="d-flex gap-3 align-items-center">
          <img class="cart-item-image" src="${item.image}" alt="${item.title}">
          <div class="flex-grow-1">
            <h3 class="fs-6 mb-1">${item.title}</h3>
            <p class="small mb-2">${money(item.price)} c/u</p>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-dark" type="button" data-cart-action="decrease" aria-label="Disminuir cantidad de ${item.title}">−</button>
              <span aria-live="polite">${qty}</span>
              <button class="btn btn-sm btn-outline-dark" type="button" data-cart-action="increase" aria-label="Aumentar cantidad de ${item.title}">+</button>
              <button class="btn btn-sm btn-link text-danger ms-auto" type="button" data-cart-action="remove">Quitar</button>
            </div>
          </div>
        </div>
      </article>`;
  }).join("");
}

function showCartMessage(message) {
  document.querySelector("#cart-toast-message").textContent = message;
  bootstrap.Toast.getOrCreateInstance(document.querySelector("#cart-toast")).show();
}

export function initCart() {
  const itemsContainer = document.querySelector("#cart-items");

  itemsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const itemId = Number(button.closest("[data-cart-item]").dataset.cartItem);
    const cart = getFromLocalStorage();
    const item = cart.find((product) => product.id === itemId);
    if (!item) return;

    const action = button.dataset.cartAction;
    const qty = Number(item.qty ?? item.cantidad ?? 0);
    if (action === "increase") item.qty = qty + 1;
    if (action === "decrease") item.qty = qty - 1;
    if (action === "remove" || item.qty <= 0) {
      setItemToLocalStorage(cart.filter((product) => product.id !== itemId));
    } else {
      delete item.cantidad;
      setItemToLocalStorage(cart);
    }
    renderCart();
  });

  document.querySelector("#clear-cart-btn").addEventListener("click", () => {
    setItemToLocalStorage([]);
    renderCart();
    showCartMessage("Se vació el carrito.");
  });

  document.querySelector("#checkout-btn").addEventListener("click", () => {
    const cart = getFromLocalStorage();
    if (cart.length === 0) {
      showCartMessage("Agregá productos antes de finalizar la compra.");
      return;
    }
    const shippingSection = document.querySelector("#shipping-data-section");
    const openShippingForm = () => {
      shippingSection.classList.remove("d-none");
      showCartMessage("Para continuar, completá los datos de envío y aceptá los términos y condiciones.");
      shippingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      shippingSection.focus({ preventScroll: true });
    };
    const cartPanel = document.querySelector("#offcanvasRight");
    if (cartPanel.classList.contains("show")) {
      cartPanel.addEventListener("hidden.bs.offcanvas", openShippingForm, { once: true });
      bootstrap.Offcanvas.getOrCreateInstance(cartPanel).hide();
    } else {
      openShippingForm();
    }
  });

  renderCart();
}
