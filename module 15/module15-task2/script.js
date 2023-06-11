const btn = document.querySelector('.btn');
const btnSvg = document.querySelector('.button__svg');

btn.addEventListener('click', () => {
  alert(`width: ${window.screen.width} , height: ${window.screen.height}`);
})