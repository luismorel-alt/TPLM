import { getProducts } from "./api.js";

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
});
