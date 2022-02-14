import { remove } from "firebase/database"

function deleteCard ({key, title, description, price, glassesImage}, ref){
  const template = `
  <div class="delete-card">
    <div class="card">
      <img src="${glassesImage}" alt="${title} glasses" />
      <div class="card-container">
        <h3 class="title">${title}</h3>
        <p class="price">$${price}</p>
        <p class="description">${description}</p>
      </div>
    </div>
    <div class="flex col buttons delete-btns">
      <button id="confirmDelete" data-key="${key}">delete</button>
      <button id="return" data-key="${key}">return</button>
    </div>
  </div>
  `
  const element = document.createRange().createContextualFragment(template).children[0]
  addCardControls(element, ref)
  return element
}

function addCardControls(glasses, ref){
  const deleteBtn = glasses.querySelector('#confirmDelete')
  deleteBtn.dataRef = ref
  deleteBtn.addEventListener('click', onConfirmDelete)
  glasses.querySelector('#return').addEventListener('click', onReturn)
}

function onConfirmDelete(e){
  const ref = e.target.dataRef
  remove(ref)
  window.location.assign('manage.html')
}

function onReturn(){
  window.location.assign('manage.html')
}

export {deleteCard}