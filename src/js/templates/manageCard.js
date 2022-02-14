function manageCard ({key, title, description, price, glassesImage}){
  const template = `
  <div class="card flex col">
    <img src="${glassesImage}" alt="${title} glasses" />
    <div class="card-container flex col">
      <div class="info">
        <h3 class="title">${title}</h3>
        <p class="price">$${price}</p>
        <p class="description">${description}</p>
      </div>
      <div class="flex justify manage-btns">
        <button class="manage-btn" id="edit" data-key="${key}" >edit</button>
        <button class="manage-btn" id="delete" data-key="${key}" >delete</button>
      </div>
    </div>
  </div>
  `
  const element = document.createRange().createContextualFragment(template).children[0]
  addCardControls(element)
  return element
}

function addCardControls(glasses){
  glasses.querySelector('#edit').addEventListener('click', onEditGlasses)
  glasses.querySelector('#delete').addEventListener('click', onRemoveGlasses)
}

function onEditGlasses(e){
  const key = e.target.dataset.key 
  sessionStorage.setItem('key', key)
  window.location.assign('update.html')
}

function onRemoveGlasses(e){
  const key = e.target.dataset.key 
  sessionStorage.setItem('key', key)
  window.location.assign('delete.html')
}

export {manageCard}