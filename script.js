const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }
});
function filterPapers(topic) {
  let count = 0;
  document.querySelectorAll('.paper').forEach(paper => {
    paper.hidden = topic !== 'All' && paper.dataset.topic !== topic;
    if (!paper.hidden) count++;
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    const active = button.dataset.filter === topic;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const status = document.querySelector('#filter-status');
  if (status) status.textContent = `${count} selected publications shown`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => filterPapers(button.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(link => link.addEventListener('click', () => filterPapers(link.dataset.filterLink)));
const canvas = document.querySelector('#map-canvas');
if (canvas) {
  let zoom = 1;
  const renderZoom = () => {
    canvas.style.width = `${zoom * 100}%`;
    document.querySelector('#zoom-level').textContent = zoom === 1 ? 'Fit' : `${Math.round(zoom * 100)}%`;
    document.querySelector('#zoom-out').disabled = zoom <= 1;
    document.querySelector('#zoom-in').disabled = zoom >= 4;
  };
  document.querySelector('#zoom-in').addEventListener('click', () => { zoom = Math.min(4, zoom + .5); renderZoom(); });
  document.querySelector('#zoom-out').addEventListener('click', () => { zoom = Math.max(1, zoom - .5); renderZoom(); });
  document.querySelector('#zoom-fit').addEventListener('click', () => { zoom = 1; renderZoom(); });
  renderZoom();
}
