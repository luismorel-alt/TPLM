const STORAGE_KEY = "cart";

export function initLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function saveToLocalStorage(item) {
  let cart = getFromLocalStorage();
  cart.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/*let cart = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
  },

  {
    id: 2,
    title: "Product 2",
    price: 200,
  },
];

localStorage.setItem("cart", JSON.stringify(cart));

let data = localStorage.getItem("cart");*/
/*console.log(data);
/* localStorage.removeItem('cart'); */

/* localStorage.clear(); */
