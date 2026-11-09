export function Modal(prod) {
  let comtent = document.querySelector("#productModal");

  let template = `
     <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <img src="${p.image}" class="card-img-top" alt="${p.title}">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.description.substring(0, 80)}...</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
  `;

  container.innerHTML = template;

  const bootstramoddal = new boostrap.Modal(coniner);
  boostrapModal.show();
}
