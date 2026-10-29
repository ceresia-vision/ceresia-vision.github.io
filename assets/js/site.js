document.querySelectorAll('[role="tablist"]').forEach((list) => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  function activate(tab, focus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
});
document.addEventListener('click', (event) => {
  document.querySelectorAll('.nav-actions details[open], .fruit-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const focusedMenu = event.target.closest('details[open]');
    const menu = focusedMenu || document.querySelector('.fruit-menu[open], .nav-actions details[open]');
    if (menu) { menu.open = false; menu.querySelector('summary').focus(); }
  }
});

// Manual carousel: no motion or timer until the visitor chooses a slide.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
  const count = carousel.querySelector('[data-carousel-count]');
  let current = 0;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => show(current - 1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => show(current + 1));
});

// Let visitors stop the continuously moving client ribbon.
document.querySelectorAll('[data-clients]').forEach((section) => {
  const button = section.querySelector('[data-clients-toggle]');
  button.hidden = false;
  button.addEventListener('click', () => {
    const paused = section.dataset.paused !== 'true';
    section.dataset.paused = String(paused);
    button.setAttribute('aria-label', paused ? button.dataset.play : button.dataset.pause);
    button.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
  });
});
