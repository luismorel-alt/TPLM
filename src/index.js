/*import "./components/cards.js";

let productList = document.querySelector("#product-list");
console.log(productList);

getProducts().then((products) => {
  let template = "";

  products.forEach((p) => {
    template += `
        <div class="col">
            <div class="card">
                <img src="${p.image}" class="card-img-top" alt="${p.title}">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.description.substring(0, 80)}...</p>
                    <button class="btn btn-dark">Más detalles</button>
                </div>
            </div>
        </div>
        `;
  });

  productList.innerHTML = template;
}); */
/*
import { RenderCards } from "./components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
*/

import { RenderCards } from "./components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
import { initCart, renderCart } from "./components/cart.js";
import { getFromLocalStorage, setItemToLocalStorage } from "./storage/storage.js";

initLocalStorage();
initCart();
RenderCards();

const shippingForm = document.querySelector("#datos-de-envios");
const shippingImageInput = document.querySelector("#formFile");
const confirmationModalElement = document.querySelector("#exampleModal");
const confirmationModal = new bootstrap.Modal(confirmationModalElement);
const shippingStorageKey = "shippingDetails";
const savedShippingDetails = JSON.parse(localStorage.getItem(shippingStorageKey) || "null");

if (savedShippingDetails) {
  Object.entries(savedShippingDetails).forEach(([id, value]) => {
    const field = document.querySelector(`#${id}`);
    if (field) field.type === "checkbox" ? (field.checked = value) : (field.value = value);
  });
}

shippingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const fields = form.elements;
  const cart = getFromLocalStorage();
  if (cart.length === 0) {
    document.querySelector("#cart-toast-message").textContent = "Agregá productos al carrito antes de confirmar la compra.";
    bootstrap.Toast.getOrCreateInstance(document.querySelector("#cart-toast")).show();
    return;
  }
  if (!fields.gridCheck.checked) return;

  const fullName = `${fields.inputNombre.value.trim()} ${fields.inputApellido.value.trim()}`;
  const addressLines = [
    fields.inputAddress.value.trim(),
    fields.inputAddress2.value.trim(),
    fields.inputCity.value.trim(),
    fields.inputPais.value,
    fields.inputZip.value.trim(),
  ].filter(Boolean);

  console.log("Formulario enviado");
  console.dir(form.elements);
  console.log("Nombre:", fields.inputNombre.value);
  console.log("Apellido:", fields.inputApellido.value);
  console.log("Dirección:", fields.inputAddress.value);
  console.log("Ciudad:", fields.inputCity.value);
  console.log("País:", fields.inputPais.value);
  console.log("Cod. Postal:", fields.inputZip.value);
  console.log("Acepta términos:", fields.gridCheck.checked ? "Sí" : "No");
  const details = Object.fromEntries(
    [...shippingForm.elements]
      .filter((field) => field.id && field.type !== "file")
      .map((field) => [field.id, field.type === "checkbox" ? field.checked : field.value]),
  );
  localStorage.setItem(shippingStorageKey, JSON.stringify(details));
  setItemToLocalStorage([]);
  renderCart();
  document.querySelector("#shipping-data-section").classList.add("d-none");

  document.querySelector("#exampleModalLabel").textContent = `Gracias por tu compra, ${fullName}`;
  document.querySelector("#modalMessage").textContent =
    `Tu pedido será enviado a la siguiente dirección:\n${addressLines.join("\n")}\nAcepta términos y condiciones: ${fields.gridCheck.checked ? "Sí" : "No"}`;

  const imagePreview = document.querySelector("#preview");
  const selectedImage = shippingImageInput.files[0];
  shippingImageInput.value = "";
  if (!selectedImage) {
    imagePreview.removeAttribute("src");
    imagePreview.classList.add("d-none");
    confirmationModal.show();
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imagePreview.src = reader.result;
    imagePreview.classList.remove("d-none");
    console.log("Imagen cargada:", reader.result);
    confirmationModal.show();
  });
  reader.addEventListener("error", () => {
    imagePreview.removeAttribute("src");
    imagePreview.classList.add("d-none");
    confirmationModal.show();
  });
  reader.readAsDataURL(selectedImage);
});

confirmationModalElement.addEventListener("hidden.bs.modal", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
