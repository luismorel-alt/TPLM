import { saveToLocalStorage } from "../storage/storage.js";
import { Contador, initContador } from "./contador.js";

export function Modal(prod) {
  let container = document.querySelector("#productModal");

  let template = `
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="modal-title fs-5">${prod.title}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img src="${prod.image}" class="img-fluid" alt="${prod.title}">
              </div>
              <div class="col-md-6">
                <p class="mt-3">${prod.description}</p>
                <div class="d-flex align-items-center gap-2 mt-3">
                  <button class="btn btn-dark">Contactar</button>
                </div>
              </div>
            </div>
          </div>
      <div class="modal-footer justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-center flex-wrap gap-4">
          <p class="mb-0">Precio: <small>U$S ${prod.price}</small></p>
          ${Contador()}
        </div>
        <div class="d-flex align-items-center gap-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-dark" id="addToCartBtn-${prod.id}">Agregar a carrito</button>
        </div>
      </div>
    </div>
  </div>
  `;

  container.innerHTML = template;
  initContador();

  let btnAddToCart = document.querySelector(`#addToCartBtn-${prod.id}`);
  btnAddToCart.addEventListener("click", () => {
    const qty = Number(document.querySelector("#contador").textContent);

    if (qty > 0) {
      saveToLocalStorage({ ...prod, qty });
      console.log(`Producto ${prod.id} agregado al carrito. Cantidad: ${qty}`);
    }
  });
  const bootstrapModal = new bootstrap.Modal(container);
  bootstrapModal.show();
}
