import { getProducts } from "../services/api.js";
import { Modal } from "./modal.js";

export function RenderCards() {
  const productList = document.querySelector("#product-list");
  const categoryFilters = document.querySelector("#category-filters");
  const searchInput = document.querySelector("#search-input");
  let allProducts = [];
  let selectedCategory = "all";

  function render() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const filteredProducts = allProducts.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const searchableText = `${product.title} ${product.description} ${product.category}`.toLocaleLowerCase();
      return matchesCategory && searchableText.includes(query);
    });

    if (filteredProducts.length === 0) {
      productList.innerHTML = '<p class="col-12 text-center text-muted">No se encontraron productos.</p>';
      return;
    }

    productList.innerHTML = filteredProducts.map((p) => `
        <div class="col">
          <div class="card h-100 justify-content-center align-items-center product-card">
            <img
              src="${p.image}"
              class="card-img-top product-image"
              alt="${p.title}"
            >
            <div class="card-body d-flex flex-column w-100">
              <h2 class="card-title fs-6">${p.title}</h2>
              <p class="text-muted small">${p.category}</p>
              <p class="fw-bold mt-auto">U$S ${Number(p.price).toFixed(2)}</p>
              <button class="btn btn-dark align-self-start" data-product-id="${p.id}">Más detalles</button>
            </div>
          </div>
        </div>
      `).join("");

    productList.querySelectorAll("[data-product-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = filteredProducts.find((item) => item.id === Number(button.dataset.productId));
        if (product) Modal(product);
      });
    });
  }

  searchInput.addEventListener("input", render);

  getProducts().then((products) => {
    allProducts = products;
    const categories = [...new Set(products.map((product) => product.category))];
    categoryFilters.innerHTML = [
      '<button type="button" class="btn btn-dark" data-category="all" aria-pressed="true">Todas</button>',
      ...categories.map((category) => `<button type="button" class="btn btn-outline-dark" data-category="${category}" aria-pressed="false">${category}</button>`),
    ].join("");
    categoryFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      selectedCategory = button.dataset.category;
      categoryFilters.querySelectorAll("[data-category]").forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle("btn-dark", active);
        filter.classList.toggle("btn-outline-dark", !active);
        filter.setAttribute("aria-pressed", String(active));
      });
      render();
    });
    render();
  }).catch((error) => {
    productList.innerHTML = '<p class="col-12 text-danger">No se pudieron cargar los productos. Intentá nuevamente más tarde.</p>';
    console.error(error);
  });
}
