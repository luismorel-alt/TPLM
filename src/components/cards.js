import { getProducts } from "../services/api.js";
import { Modal } from "./modal.js";

export function RenderCards() {
  const productList = document.querySelector("#product-list");

  getProducts().then((products) => {
    let template = "";

    products.forEach((p) => {
      template += `
        <div class="col">
          <div class="card justify-content-center align-items-center" style="width: 200px;">
            <img
              src="${p.image}"
              class="card-img-top"
              alt="${p.title}"
              style="width: 220px; height: 220px; object-fit: contain;"
            >

            <div class="card-body" style="width: 180px;">
              <h5 class="card-title text-truncate">
                ${p.title}
              </h5>

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
