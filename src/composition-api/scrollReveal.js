function animate(dom, effect) {
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollTop;
    const obj = dom;
    const objTop = obj.offsetTop;
    const windowHeight = window.innerHeight;
    if (scrollHeight + windowHeight > objTop) {
      obj.classList.add('animate__animated', effect);
    }
    if (scrollHeight < objTop - windowHeight || scrollHeight > objTop + windowHeight) {
      obj.classList.remove('animate__animated', effect);
    }
  });
}
export { animate };