document.querySelector('#hamburger-menu').addEventListener('click', toggleClass)

function toggleClass() {
  document.querySelector('nav').classList.toggle('active')
}