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

let data = localStorage.getItem("cart");
console.log(data);
/* localStorage.removeItem('cart'); */

/* localStorage.clear(); */
