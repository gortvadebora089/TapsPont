/* Tartalék működés azokhoz a böngészőkhöz, amelyek nem ismerik a Popover API-t. */
(() => {
  if (typeof HTMLElement.prototype.showPopover === 'function') return;
  document.documentElement.classList.add('tp-popover-fallback');
  const openPanels = () => document.querySelectorAll('[popover][data-tp-open]');
  HTMLElement.prototype.showPopover = function () {
    if (!this.hasAttribute('popover') || this.hasAttribute('data-tp-open')) return;
    openPanels().forEach(panel => panel.hidePopover());
    this.setAttribute('data-tp-open', '');
    this.dispatchEvent(new Event('toggle'));
  };
  HTMLElement.prototype.hidePopover = function () {
    if (!this.hasAttribute('data-tp-open')) return;
    this.removeAttribute('data-tp-open');
    this.dispatchEvent(new Event('toggle'));
  };
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[popovertarget]');
    if (trigger) {
      const panel = document.getElementById(trigger.getAttribute('popovertarget'));
      if (panel && panel.hasAttribute('popover')) {
        event.preventDefault();
        if (panel.hasAttribute('data-tp-open')) panel.hidePopover();
        else panel.showPopover();
      }
      return;
    }
    openPanels().forEach(panel => { if (!panel.contains(event.target)) panel.hidePopover(); });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.defaultPrevented) openPanels().forEach(panel => panel.hidePopover());
  });
})();
