const searchForm = document.querySelector('.search');
const categoryMenu = searchForm.querySelector('.category-menu');
const categoryToggle = searchForm.querySelector('.category-toggle');
categoryMenu?.addEventListener('change', ({ target: option }) => {
  categoryToggle.setAttribute('aria-label', 'Keresési kategória: ' + option.labels[0].textContent);
  categoryToggle.toggleAttribute('data-filtered', Boolean(option.value));
});
categoryMenu?.addEventListener('click', event => {
  if (event.target.matches('input')) {
    categoryMenu.hidePopover();
    searchForm.elements.query.focus();
  }
});
