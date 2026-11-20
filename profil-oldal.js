(() => {
  const byId = id => document.getElementById(id);
  let profile = profileSession.get();
  if (!profile) {
    location.replace('belepes.html?mod=belepes');
    return;
  }

  // Give accounts created before the profile page an isolated space as well.
  if (!profile.id) {
    const accounts = previewAccounts.load();
    const account = accounts.get(profile.usernameKey);
    profile = { ...profile, id: account?.id || crypto.randomUUID() };
    if (account && !account.id) {
      account.id = profile.id;
      previewAccounts.save(accounts);
    }
    profileSession.set(profile, profile.remember);
  }

  const sectionInfo = {
    attekintes: { title: 'Áttekintés', description: 'A saját színházi élményeid egy helyen.' },
    naplo: {
      title: 'Színházi naplóm', description: 'Látott alkalmak', activity: 'Naplózott előadás',
      action: 'Látott előadás hozzáadása', empty: 'A megtekintett előadásaid itt jelennek meg.', date: true
    },
    ertekelesek: {
      title: 'Értékeléseim', description: 'Pontszámok és vélemények', activity: 'Értékelt előadás',
      action: 'Új értékelés', empty: 'Az értékeléseid itt jelennek meg.', rating: true, text: 'Vélemény'
    },
    mentettek: {
      title: 'Mentett előadások', description: 'Szeretném megnézni', activity: 'Mentett előadás',
      action: 'Előadás mentése', empty: 'A megnézni kívánt előadásaid itt jelennek meg.'
    },
    jegyzetek: {
      title: 'Privát bejegyzések', description: 'Személyes megjegyzések', activity: 'Privát bejegyzés',
      action: 'Új bejegyzés', empty: 'A személyes bejegyzéseid itt jelennek meg.', text: 'Megjegyzés'
    },
    beallitasok: { title: 'Fiókbeállítások', description: 'Profilkép és bejelentkezés' }
  };

  const isSampleProfile = profile.id === 'helyi-profil';
  document.body.classList.toggle('sample-profile', isSampleProfile);
  const storageKey = 'tapspont-profile-entries:' + profile.id;
  const dateFormat = new Intl.DateTimeFormat('hu-HU', { dateStyle: 'medium' });
  const title = byId('profile-title');
  const editor = byId('entry-dialog');
  let section = 'mentettek';
  let editing = null;

  function readEntries() {
    try {
      const entries = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(entries) ? entries : [];
    } catch {
      return [];
    }
  }

  function buildRow(entry, overview) {
    const row = document.createElement('li');
    const details = document.createElement('div');
    const heading = document.createElement('h3');
    if (overview) {
      const link = document.createElement('a');
      link.href = '#' + entry.section;
      link.textContent = entry.section === 'jegyzetek' ? 'Privát bejegyzés' : entry.name;
      heading.append(link);
    } else {
      heading.textContent = entry.name;
    }
    details.append(heading);

    if (overview || entry.date) {
      const meta = document.createElement('p');
      meta.className = 'profile-entry-meta';
      const date = entry.date ? new Date(entry.date + 'T12:00:00') : new Date(entry.created);
      meta.textContent = dateFormat.format(date) + (overview ? ' · ' + sectionInfo[entry.section].activity : '');
      details.append(meta);
    }
    if (!overview && entry.text) {
      const text = document.createElement('p');
      text.className = 'profile-entry-text';
      text.textContent = entry.text;
      details.append(text);
    }
    row.append(details);

    if (entry.rating) {
      const rating = document.createElement('span');
      rating.className = 'profile-rating';
      rating.textContent = entry.rating + ' / 10';
      row.append(rating);
    }
    if (!overview) {
      const edit = document.createElement('button');
      edit.className = 'btn btn-outline entry-edit';
      edit.type = 'button';
      edit.textContent = 'Szerkesztés';
      edit.setAttribute('aria-label', 'Szerkesztés: ' + entry.name);
      edit.addEventListener('click', () => openEditor(entry));
      row.append(edit);
    }
    return row;
  }

  function buildCard(entry) {
    const card = document.createElement('li');
    card.className = 'profile-entry-card';
    const production = [...productions, ...premieres].find(item => item.title.toLocaleLowerCase('hu') === entry.name.toLocaleLowerCase('hu'));
    const cover = document.createElement('div');
    cover.className = 'profile-card-cover';
    if (production?.image) {
      const image = document.createElement('img');
      image.src = production.image; image.alt = ''; image.loading = 'lazy';
      image.addEventListener('error', () => image.remove(), { once: true });
      cover.append(image);
    }
    const coverText = document.createElement('div');
    coverText.className = 'profile-card-cover-text';
    const kind = document.createElement('small'); kind.textContent = production?.kind || 'Előadás';
    const coverTitle = document.createElement('strong'); coverTitle.textContent = entry.name;
    coverText.append(kind, coverTitle); cover.append(coverText);
    const content = document.createElement('div'); content.className = 'profile-card-content';
    const heading = document.createElement('h3');
    if (production?.url) { const link = document.createElement('a'); link.href = production.url; link.textContent = entry.name; heading.append(link); }
    else heading.textContent = entry.name;
    content.append(heading);
    if (production) {
      const venue = document.createElement('p'); venue.className = 'profile-card-venue'; venue.textContent = production.venue || production.meta || ''; content.append(venue);
      if (production.author) { const author = document.createElement('p'); author.className = 'profile-card-meta'; author.textContent = production.author; content.append(author); }
    }
    if (entry.date) { const date = document.createElement('p'); date.className = 'profile-card-meta'; date.textContent = 'Megtekintve: ' + dateFormat.format(new Date(entry.date + 'T12:00:00')); content.append(date); }
    if (entry.rating) { const rating = document.createElement('p'); rating.className = 'profile-rating'; rating.textContent = '★ ' + entry.rating + ' / 10 · Saját értékelés'; content.append(rating); }
    if (entry.text) { const text = document.createElement('p'); text.className = 'profile-entry-text'; text.textContent = entry.text; content.append(text); }
    const edit = document.createElement('button'); edit.className = 'btn btn-outline entry-edit'; edit.type = 'button'; edit.textContent = 'Szerkesztés'; edit.setAttribute('aria-label', 'Szerkesztés: ' + entry.name); edit.addEventListener('click', () => openEditor(entry)); content.append(edit);
    card.append(cover, content); return card;
  }

  function renderEntries() {
    const entries = readEntries();
    for (const [key, id] of [['naplo', 'seen'], ['ertekelesek', 'reviews'], ['mentettek', 'saved']]) {
      const amount = entries.filter(entry => entry.section === key).length;
      byId('stat-' + id).textContent = amount;
    }
    const seen = entries.filter(entry => entry.section === 'naplo');
    const reviews = entries.filter(entry => entry.section === 'ertekelesek' && entry.rating);
    const year = seen.filter(entry => entry.date && entry.date.startsWith(String(new Date().getFullYear()))).length;
    byId('stat-year').textContent = year;
    byId('dashboard-year').textContent = year;
    byId('stat-average').textContent = reviews.length ? '★ ' + (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1).replace('.', ',') : '–';
    const chart = byId('rating-chart');
    const counts = Array.from({ length: 10 }, (_, i) => reviews.filter(item => item.rating === i + 1).length);
    const values = isSampleProfile ? [0, 0, 0, 0, 0, 0, 1, 2, 5, 10] : counts;
    const maxCount = Math.max(1, ...values);
    chart.replaceChildren(...values.map((count, i) => {
      const row = document.createElement('div'); row.className = 'rating-column';
      const label = document.createElement('span'); label.className = 'rating-label'; label.textContent = (i + 1) + ' ★';
      const track = document.createElement('span'); track.className = 'rating-track';
      const fill = document.createElement('span'); fill.className = 'rating-fill'; fill.style.width = (count / maxCount * 100) + '%';
      const total = document.createElement('span'); total.className = 'rating-count'; total.textContent = count;
      row.setAttribute('aria-label', (i + 1) + ' pont: ' + count + ' értékelés');
      track.append(fill); row.append(label, track, total); return row;
    }).reverse());
    byId('rating-empty').hidden = reviews.length > 0;
    if (isSampleProfile) {
      byId('stat-seen').textContent = '39'; byId('stat-year').textContent = '18'; byId('stat-average').textContent = '★ 9,4'; byId('stat-reviews').textContent = '3'; byId('dashboard-year').textContent = '18';
      byId('sample-actors').hidden = false; byId('sample-genres').hidden = false; byId('rating-empty').hidden = true;
    }
    if (section === 'attekintes') {
      const favorites = entries.filter(entry => entry.section === 'mentettek').slice(0, 4);
      byId('dashboard-favorites').replaceChildren(...favorites.map(entry => { const item = document.createElement('a'); item.href = '#mentettek'; item.className = 'dashboard-favorite'; const cover = document.createElement('span'); cover.className = 'dashboard-favorite-cover'; const name = document.createElement('strong'); name.textContent = entry.name; item.append(cover, name); return item; }));
      byId('dashboard-favorites-empty').hidden = favorites.length > 0;
      const recent = seen.slice(0, 4);
      byId('profile-activity').replaceChildren(...recent.map(entry => buildRow(entry, true)));
      byId('activity-empty').hidden = recent.length > 0;
      if (isSampleProfile && !entries.length) {
        const favoritesSample = [['A Pál utcai fiúk','Vígszínház'],['A diótörő','Operaház'],['Tisztogatás','Örkény Színház'],['Meseautó','Centrál Színház']];
        byId('dashboard-favorites').innerHTML = favoritesSample.map(([name, venue]) => '<a class="dashboard-favorite" href="#mentettek"><span class="dashboard-favorite-cover"></span><strong>' + name + '</strong><small>' + venue + ' · ★ 9,4</small></a>').join('');
        byId('dashboard-favorites-empty').hidden = true;
        byId('profile-activity').innerHTML = [['NOV','14','A Pál utcai fiúk','Vígszínház','10,0'],['NOV','02','Tisztogatás','Örkény Színház','9,5'],['OKT','19','A diótörő','Operaház','9,5']].map(([month,day,name,venue,rating]) => '<li class="sample-evening"><span class="sample-date">'+month+'<b>'+day+'</b>2026</span><span class="sample-poster"></span><span class="sample-evening-copy"><strong>'+name+'</strong><small>'+venue+' · Budapest</small><small>Egy emlékezetes színházi este.</small></span><span class="sample-score">★ '+rating+'</span></li>').join('');
        byId('activity-empty').hidden = true;
      }
    } else if (section !== 'beallitasok') {
      const items = entries.filter(entry => entry.section === section);
      byId('entry-list').classList.toggle('profile-card-list', section !== 'jegyzetek');
      byId('entry-list').replaceChildren(...items.map(entry => section === 'jegyzetek' ? buildRow(entry, false) : buildCard(entry)));
      byId('entry-empty').hidden = items.length > 0;
    }
  }

  function renderPage(focus = false) {
    const target = location.hash.slice(1);
    section = Object.hasOwn(sectionInfo, target) ? target : 'attekintes';
    const info = sectionInfo[section];
    title.textContent = info.title;
    byId('profile-crumb').textContent = info.title;
    byId('profile-description').textContent = info.description;
    document.title = info.title + ' · Saját TapsPontom';
    byId('profile-overview').hidden = section !== 'attekintes';
    byId('profile-settings').hidden = section !== 'beallitasok';
    byId('profile-entries').hidden = !info.action;
    byId('add-entry').textContent = info.action ?? '';
    byId('entry-empty').textContent = info.empty ?? '';
    for (const link of document.querySelectorAll('[data-profile-section]')) {
      if (link.dataset.profileSection === section) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    renderEntries();
    if (focus) title.focus();
  }

  function openEditor(entry = null) {
    const info = sectionInfo[section];
    editing = entry;
    byId('entry-title').textContent = entry ? 'Bejegyzés szerkesztése' : info.action;
    byId('entry-name-label').textContent = section === 'jegyzetek' ? 'Cím' : 'Előadás címe';
    byId('entry-name').value = entry?.name ?? '';
    byId('entry-name').setCustomValidity('');
    byId('entry-date-field').hidden = !info.date;
    byId('entry-date').value = entry?.date ?? '';
    byId('entry-rating-field').hidden = !info.rating;
    byId('entry-rating').required = Boolean(info.rating);
    byId('entry-rating').value = entry?.rating ?? '';
    byId('entry-text-field').hidden = !info.text;
    byId('entry-text-label').textContent = info.text ?? '';
    byId('entry-text').required = section === 'jegyzetek';
    byId('entry-text').value = entry?.text ?? '';
    byId('entry-error').hidden = true;
    editor.showModal();
    byId('entry-name').focus();
  }

  byId('add-entry').addEventListener('click', () => openEditor());
  byId('new-evening').addEventListener('click', () => { location.hash = 'naplo'; renderPage(); openEditor(); });
  byId('cancel-entry').addEventListener('click', () => editor.close());
  byId('entry-name').addEventListener('input', event => event.target.setCustomValidity(''));
  byId('entry-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = byId('entry-name');
    const text = byId('entry-text').value.trim();
    const info = sectionInfo[section];
    if (!name.value.trim()) {
      name.setCustomValidity('Adj meg egy címet.');
      name.reportValidity();
      return;
    }
    const error = byId('entry-error');
    if (section === 'jegyzetek' && !text) {
      error.textContent = 'Írd be a személyes megjegyzésedet.';
      error.hidden = false;
      byId('entry-text').focus();
      return;
    }
    const entry = {
      id: editing?.id ?? crypto.randomUUID(),
      created: editing?.created ?? Date.now(),
      section, name: name.value.trim(),
      date: info.date ? byId('entry-date').value : '',
      rating: info.rating ? Number(byId('entry-rating').value) : null,
      text: info.text ? text : ''
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify([entry, ...readEntries().filter(item => item.id !== entry.id)]));
      editor.close();
      renderEntries();
      byId('add-entry').focus();
    } catch {
      error.textContent = 'A mentés nem sikerült. Próbáld meg újra.';
      error.hidden = false;
    }
  });

  const pictureInput = byId('profile-picture');
  const pictureStatus = byId('picture-status');

  async function makeProfilePicture(file) {
    const image = await createImageBitmap(file);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const context = canvas.getContext('2d', { alpha: false });
      const side = Math.min(image.width, image.height);
      context.fillStyle = '#f8f5f0';
      context.fillRect(0, 0, 128, 128);
      context.drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, 128, 128);
      return canvas.toDataURL('image/jpeg', 0.88);
    } finally {
      image.close();
    }
  }

  pictureInput.addEventListener('change', async () => {
    const file = pictureInput.files[0];
    pictureInput.value = '';
    if (!file) return;
    pictureStatus.hidden = false;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      pictureStatus.textContent = 'Válassz JPG, PNG vagy WebP képet.';
      return;
    }
    pictureInput.disabled = true;
    pictureStatus.textContent = 'Profilkép feldolgozása…';
    try {
      const picture = await makeProfilePicture(file);
      if (profileSession.get()?.id !== profile.id) return;
      const accounts = previewAccounts.load();
      const account = accounts.get(profile.usernameKey);
      if (account?.id === profile.id) {
        account.picture = picture;
        previewAccounts.save(accounts);
      }
      profile = { ...profile, picture };
      profileSession.set(profile, profile.remember);
      pictureStatus.textContent = 'A profilkép frissült.';
    } catch {
      pictureStatus.textContent = 'A képet nem sikerült beállítani.';
    } finally {
      pictureInput.disabled = false;
    }
  });

  byId('profile-logout').addEventListener('click', () => {
    profileSession.set(null);
    location.replace('index.html#felfedezes');
  });

  function verifySession() {
    if (profileSession.get()?.id !== profile.id) {
      byId('profile-content').hidden = true;
      location.replace('belepes.html?mod=belepes');
    }
  }

  byId('profile-name').textContent = profile.name;
  byId('summary-name').textContent = isSampleProfile ? 'Kovács Anna' : profile.name;
  byId('summary-username').textContent = isSampleProfile ? '@kovacs_anna · Tag 2024 óta' : (profile.usernameKey ? '@' + profile.usernameKey : 'Személyes profil');
  byId('profile-content').hidden = false;
  renderPage();
  window.addEventListener('hashchange', () => {
    if (editor.open) editor.close();
    renderPage(true);
  });
  window.addEventListener('pageshow', verifySession);
  window.addEventListener('storage', event => {
    if (event.key === storageKey) renderEntries();
    if (event.key === 'tapspont-preview-profile' || event.key === null) verifySession();
  });

  for (const link of document.querySelectorAll('[data-info]')) {
    link.addEventListener('click', event => {
      event.preventDefault();
      byId('info-title').textContent = link.dataset.info;
      byId('profile-info').showModal();
    });
  }
})();
