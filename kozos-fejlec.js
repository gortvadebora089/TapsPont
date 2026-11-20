(() => {
  const header = document.querySelector('.site-header');
  if (window.ResizeObserver) new ResizeObserver(() => document.documentElement.style.setProperty('--home-header-height', header.getBoundingClientRect().height + 'px')).observe(header);
  const form = header.querySelector('.search');
  const filters = document.getElementById('search-filters');
  const toggle = document.getElementById('filter-toggle');
  const { category, theatre, genre, from, until } = form.elements;
  for (const name of theatreRecords.map(entry => entry.title).sort((a, b) => a.localeCompare(b, 'hu'))) theatre.add(new Option(name, name));
  const kinds = new Map([...productions, ...workRecords].filter(item => item.kind).map(item => [item.kind.toLocaleLowerCase('hu'), item.kind]));
  for (const [key, name] of [...kinds].sort((a, b) => a[1].localeCompare(b[1], 'hu'))) genre.add(new Option(name, key));
  function sync() {
    until.min = from.value;
    const active = Boolean(category.value || theatre.value || genre.value || from.value || until.value);
    toggle.toggleAttribute('data-filtered', active);
    toggle.setAttribute('aria-label', active ? 'Keresési szűrők · aktív' : 'Keresési szűrők');
  }
  filters.addEventListener('change', sync);
  document.getElementById('clear-filters').addEventListener('click', () => {
    category.value = ''; theatre.value = ''; genre.value = ''; from.value = ''; until.value = ''; sync();
  });
})();
