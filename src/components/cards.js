import { getProducts } from "../services/api.js";
import { Modal } from "./modal.js";

export function RenderCards() {
  const productList = document.querySelector("#product-list");

  getProducts().then((products) => {
    let template = "";

    products.forEach((p) => {
      template += `
        <div class="col">
          <div class="card justify-content-center align-items-center" style="width: 250px;">
            <img
              src="${p.image}"
              class="card-img-top"
              alt="${p.title}"
              style="width: 250px; height: 250px; object-fit: cover;"
            >

            <div class="card-body" style="width: 250px;">
              <h5 class="card-title text-truncate">
                ${p.title}
              </h5>

              <p class="card-text">
                ${p.description.substring(0, 100)}...
              </p>
            </div>

            <div class="mb-3">
              <button class="btn btn-dark" id="btn-${p.id}">
                Más detalles
              </button>
            </div>
          </div>
        </div>
      `;
    });

    productList.innerHTML = template;

    products.forEach((p) => {
      const btn = document.querySelector(`#btn-${p.id}`);

      btn.addEventListener("click", () => {
        Modal(p);
      });
    });
  });
}
