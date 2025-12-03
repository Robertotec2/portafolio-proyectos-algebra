/* js/main.js
   Funciones para la página principal del portafolio:
   - Inserta un buscador y filtra las tarjetas en tiempo real
   - Soporta atajo de teclado "/" para enfocar el buscador
   - Habilita scroll suave para enlaces internos
   - Muestra la fecha de "Última actualización" en el footer
*/

(function () {
  'use strict';

  // --- Helper: formatea fecha local en formato legible ---
  function formatDate(date) {
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', opts);
  }

  // --- Inserta barra de búsqueda arriba del nav.grid ---
  function insertSearchBar() {
    const main = document.querySelector('main');
    if (!main) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'search-wrapper';
    wrapper.style.margin = '12px 0 20px';
    wrapper.innerHTML = `
      <label for="portfolio-search" style="display:block;margin-bottom:6px;font-weight:600">Buscar actividad</label>
      <input id="portfolio-search" type="search" placeholder="Ej. calculadora, factorización, complejos..." aria-label="Buscar actividad"
             style="width:100%;max-width:720px;padding:10px;border-radius:10px;border:1px solid #d0d7df;box-shadow:inset 0 1px 0 rgba(255,255,255,.6);">
    `;
    // Insert before the nav grid (if exists) or at top of main
    const grid = main.querySelector('.grid');
    main.insertBefore(wrapper, grid || main.firstChild);
  }

  // --- Filtra tarjetas según texto del input ---
  function wireSearchFilter() {
    const input = document.getElementById('portfolio-search');
    if (!input) return;
    const cards = Array.from(document.querySelectorAll('.grid .card'));

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      cards.forEach(card => {
        const text = (card.textContent || '').toLowerCase();
        const matches = q === '' || text.includes(q);
        card.style.display = matches ? '' : 'none';
      });
    });

    // Atajo: tecla ESC borra la búsqueda y la cierra
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.blur();
      }
    });
  }

  // --- Atajo global "/" para enfocar el buscador ---
  function wireShortcutFocus() {
    window.addEventListener('keydown', (e) => {
      // evita activar cuando el usuario ya está escribiendo en un input/textarea
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;

      if (e.key === '/') {
        e.preventDefault();
        const search = document.getElementById('portfolio-search');
        if (search) {
          search.focus();
          search.select();
        }
      }
    });
  }

  // --- Smooth scroll para todos los enlaces internos (si hay #) ---
  function enableSmoothScroll() {
    // Preferimos usar CSS smooth if available, but also intercept clicks
    document.documentElement.style.scrollBehavior = 'smooth';
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        // default behavior will smooth-scroll due to CSS above
        // but prevent default to avoid jump in some browsers
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Muestra fecha de última actualización en el footer (dinámica) ---
  function showLastUpdated() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const span = document.createElement('div');
    span.className = 'last-updated';
    span.style.marginTop = '8px';
    // Si quieres poner una fecha fija, cámbiala aquí. Por defecto usamos la fecha actual.
    span.textContent = `Última actualización: ${formatDate(new Date())}`;
    footer.appendChild(span);
  }

  // --- Main init ---
  function init() {
    insertSearchBar();
    wireSearchFilter();
    wireShortcutFocus();
    enableSmoothScroll();
    showLastUpdated();

    // accessibility: ensure first card focusable
    const firstCard = document.querySelector('.grid .card');
    if (firstCard && !firstCard.getAttribute('tabindex')) {
      firstCard.setAttribute('tabindex', '0');
    }

    // small enhancement: open links with Enter when focused (for accessibility)
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('card')) {
        document.activeElement.click();
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
