
const btn = document.querySelector('.mobile-menuBtn')
const menu = document.querySelector('.mobile-menu')

btn.addEventListener('click', () => {
menu.classList.toggle('hidden')
});