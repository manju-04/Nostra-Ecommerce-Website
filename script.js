// === Utility ===
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

// === Year in footer ===
(function setYear(){ const y = new Date().getFullYear(); $$('#year').forEach(el => el.textContent = y); })();

// === Sidebar toggle (hamburger) ===
(function sidebar(){
  const hamburger = $('#hamburger');
  const sidebar = $('#sidebar');
  const overlay = $('#overlay');
  const closeBtn = $('#closeSidebar');

  function open(){
    sidebar.classList.add('open');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
  }
  function close(){
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
  }

  if(hamburger) hamburger.addEventListener('click', open);
  if(closeBtn) closeBtn.addEventListener('click', close);
  if(overlay) overlay.addEventListener('click', close);
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();

// === Basic slider ===
(function slider(){
  const slider = $('#slider');
  if(!slider) return;
  const slides = $$('.slide', slider);
  const prev = $('#prevSlide');
  const next = $('#nextSlide');
  let i = 0;

  function show(idx){
    i = (idx + slides.length) % slides.length;
    slides.forEach((s, n) => s.style.transform = `translateX(${(n - i) * 100}%)`);
  }
  // initialize positions
  slides.forEach((s, n) => s.style.transform = `translateX(${n * 100}%)`);
  show(0);

  prev && prev.addEventListener('click', () => show(i - 1));
  next && next.addEventListener('click', () => show(i + 1));

  // auto-play
  setInterval(() => show(i + 1), 5000);
})();

// === Collections: search + filter ===
(function collections(){
  const grid = $('#productsGrid');
  if(!grid) return;
  const cards = $$('.product-card', grid);
  const search = $('#searchInput');
  const buttons = $$('.filter-btn');
  const noResults = $('#noResults');

  let currentFilter = 'all';

  function apply(){
    const q = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const cat = (card.dataset.category || '').toLowerCase();
      const matchCat = currentFilter === 'all' || cat === currentFilter;
      const matchText = !q || name.includes(q);
      const show = matchCat && matchText;
      card.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    if(noResults){
      noResults.hidden = visible !== 0;
    }
  }

  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = (btn.dataset.filter || 'all').toLowerCase();
    apply();
  }));
  if(search) search.addEventListener('input', apply);

  apply();
})();

// === Contact: simple client-side feedback ===
(function contact(){
  const form = $('#contactForm');
  const status = $('#contactStatus');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      status.textContent = 'Please fill all fields correctly.';
      return;
    }
    status.textContent = 'Thanks! Your message has been noted (demo).';
    form.reset();
  });
})();
