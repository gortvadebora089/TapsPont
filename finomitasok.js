(() => {
  const normalize = value => (value || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('hu');
  const form = document.querySelector('.search');
  if (form && typeof workRecords !== 'undefined') {
    const input = form.elements.query;
    const field = input.closest('.search-field');
    const list = document.createElement('ul'); list.className = 'tp-suggestions'; list.hidden = true; list.setAttribute('aria-label', 'Keresési javaslatok'); field.append(list);
    const entries = [...theatreRecords.map(x => ({...x, category: 'Színház'})), ...artistRecords.map(x => ({...x, category: 'Színész'})), ...workRecords.map(x => ({...x, category: 'Színdarab'}))];
    function update() {
      const q = normalize(input.value.trim()); list.replaceChildren();
      if (!q) { list.hidden = true; return; }
      const score = item => { const title = normalize(item.title); return title === q ? 0 : title.startsWith(q) ? 1 : title.includes(q) ? 2 : 3; };
      entries.filter(item => normalize([item.title, item.meta].join(' ')).includes(q)).sort((a,b) => score(a)-score(b) || a.title.localeCompare(b.title, 'hu')).slice(0,5).forEach(item => {
        const li = document.createElement('li'), a = document.createElement('a'), small = document.createElement('small');
        a.href = item.detail; a.textContent = item.title; small.textContent = item.category; a.append(small); li.append(a); list.append(li);
      });
      list.hidden = !list.children.length;
    }
    input.addEventListener('input', update);
    input.addEventListener('focus', update);
    input.addEventListener('keydown', e => { if (e.key === 'Escape') list.hidden = true; });
    document.addEventListener('click', e => { if (!field.contains(e.target)) list.hidden = true; });
    form.addEventListener('submit', () => { list.hidden = true; });
  }
  const top = document.createElement('button'); top.className = 'tp-top'; top.type = 'button'; top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 14 7-7 7 7"/></svg>'; top.setAttribute('aria-label','Vissza az oldal tetejére'); top.hidden = true; document.body.append(top);
  const main = document.querySelector('main');
  const isHome = /\/(?:index\.html)?$/.test(location.pathname);
  if (main && !isHome) {
    const back = document.createElement('a'); back.className = 'tp-back'; back.href = 'index.html'; back.setAttribute('aria-label', 'Vissza az előző oldalra'); back.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5-7 7 7 7"/></svg>';
    back.addEventListener('click', event => {
      try { const previous = document.referrer && new URL(document.referrer); if (previous && previous.origin === location.origin && previous.href !== location.href && history.length > 1) { event.preventDefault(); history.back(); } } catch {}
    });
    main.prepend(back);
  }
  const updateTop = () => { top.hidden = window.scrollY < 450; };
  window.addEventListener('scroll', updateTop, {passive:true}); updateTop();
  top.addEventListener('click', () => window.scrollTo({top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}));
  function prepare(root) {
    root.querySelectorAll('dialog, [popover][role="dialog"], #login-popover').forEach(panel => {
      if (panel.querySelector(':scope > .tp-close')) return;
      const close = document.createElement('button'); close.className = 'tp-close'; close.type = 'button'; close.textContent = '×'; close.setAttribute('aria-label','Bezárás');
      close.addEventListener('click', () => panel.tagName === 'DIALOG' ? panel.close() : panel.hidePopover()); panel.prepend(close);
    });
  }
  function lock() { document.documentElement.style.overflow = document.querySelector('dialog[open], [popover][role="dialog"]:popover-open, #login-popover:popover-open') ? 'hidden' : ''; }
  prepare(document); lock();
  document.addEventListener('toggle', lock, true); document.addEventListener('close', lock, true);
  new MutationObserver(() => { prepare(document); lock(); }).observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['open']});
  document.querySelectorAll('.theatre-record').forEach(card => {
    const entry = theatreRecords.find(item => card.getAttribute('href') === item.detail); if (!entry) return;
    const wrapper = document.createElement('div'); wrapper.className = 'tp-theatre-wrap'; card.replaceWith(wrapper); wrapper.append(card);
    const button = document.createElement('button'); button.type = 'button'; button.className = 'work-save'; button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h12v15l-6-4-6 4z"/></svg>';
    const key = 'tapspont-detail-bookmark:szinhaz:' + entry.id;
    const update = () => { let saved = false; try { saved = localStorage.getItem(key) === '1'; } catch {} button.setAttribute('aria-pressed',String(saved)); button.setAttribute('aria-label', entry.title + (saved ? ' mentésének eltávolítása' : ' mentése')); };
    update(); button.addEventListener('click', () => {
      if (!profileSession.get()) { const msg = document.getElementById('login-error'); msg.textContent = 'A mentéshez jelentkezz be.'; msg.hidden = false; document.getElementById('login-popover').showPopover(); document.getElementById('login-username').focus(); return; }
      try { if (localStorage.getItem(key) === '1') localStorage.removeItem(key); else localStorage.setItem(key,'1'); update(); } catch { button.title = 'A mentés nem sikerült ebben a böngészőben.'; }
    }); wrapper.append(button);
  });
})();
