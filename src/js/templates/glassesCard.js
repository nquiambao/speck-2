function glassesCard ({title, description, price, glassesImage}){
  const template = `
  <div class="card flex col">
    <img src="${glassesImage}" alt="${title} glasses" />
    <div class="card-container flex col">
      <div class="info">
        <h3 class="title">${title}</h3>
        <p class="price">$${price}</p>
        <p class="description">${description}</p>
      </div>
      <button class="cart" id="cart">Add to cart</button>
    </div>
  </div>
  `
  const element = document.createRange().createContextualFragment(template).children[0]
  return element
}

export {glassesCard}