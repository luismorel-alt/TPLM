export function Contador() {
  return `
    <div class="d-flex justify-content-center align-items-center gap-3">
      <button type="button" id="decrementBtn" class="btn btn-dark" aria-label="Disminuir cantidad" disabled>-</button>
      <span>Cantidad: <span id="contador" aria-live="polite">0</span></span>
      <button type="button" id="incrementBtn" class="btn btn-dark" aria-label="Aumentar cantidad">+</button>
    </div>
  `;
}

export function initContador() {
  const counterDisplay = document.querySelector("#contador");
  const incrementButton = document.querySelector("#incrementBtn");
  const decrementButton = document.querySelector("#decrementBtn");

  incrementButton.addEventListener("click", () => {
    counterDisplay.textContent = Number(counterDisplay.textContent) + 1;
    decrementButton.disabled = false;
  });

  decrementButton.addEventListener("click", () => {
    const quantity = Math.max(0, Number(counterDisplay.textContent) - 1);
    counterDisplay.textContent = quantity;
    decrementButton.disabled = quantity === 0;
  });
}
