export function getProducts() {
  return fetch("https://fakestoreapi.com/products").then((response) => {
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    return response.json();
  });
}
