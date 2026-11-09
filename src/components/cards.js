import { getProducts } from "./api.js";

let productList = document.querySelector("#product-list");
console.log(productList);

getProducts().then((products) => {
  let tempalte = "";

  products.forEach((p) => {
    tempalte += `
            <div class="col">
                <div class="card justify-content-center align-items-center" style="width: 300px;">
                    <img 
                        src="${p.image}" 
                        class="card-img-top" 
                        alt="${p.title}"
                        style="width: 250px; height: 300px; object-fit: cover;"
                    >

                    <div class="card-body" style="width: 300px;">
                        <h5 class="card-title text-truncate">
                            ${p.title}
                        </h5>

                        <p class="card-text">
                            ${p.description.substring(0, 80)}...
                        </p>
                    </div>

                    <div class="mb-3">
                        <button class="btn btn-dark">
                            Más detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
  });

  productList.innerHTML = tempalte;
});
