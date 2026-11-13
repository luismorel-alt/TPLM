const STORAGE_KEY = "cart";

export function initLocalStorage() {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function setItemToLocalStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function saveToLocalStorage(item) {
  const cart = getFromLocalStorage();
  const productInCart = cart.find((product) => product.id === item.id);
  const qtyToAdd = Number(item.qty ?? item.cantidad ?? 0);

  if (productInCart) {
    productInCart.qty = Number(productInCart.qty ?? productInCart.cantidad ?? 0) + qtyToAdd;
    delete productInCart.cantidad;
  } else {
    const product = { ...item, qty: qtyToAdd };
    delete product.cantidad;
    cart.push(product);
  }

  setItemToLocalStorage(cart);
}

export function clearLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
/*

1- guarda tipo de datos original a string y luego lo recupera y lo convierte a su tipo original
el push agrega un nuevo elemento al array y luego lo guarda en el localStorage,
no valida si ya existe el producto en el carrito, por eso se hace la validación con find para ver
si ya existe y si es así, solo se suma la cantidad.


let cart = [
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
