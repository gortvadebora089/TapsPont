(() => {
  const byId = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const type = params.get('tipus');
  const nav = {
    szinesz: ['Színészek', 'szineszek', 'Színész', artistRecords],
    szinhaz: ['Színházak', 'szinhazak', 'Színház', theatreRecords],
    mu: ['Színdarabok', 'szindarabok', 'Mű', workRecords],
  };
  const category = Object.hasOwn(nav, type) ? nav[type] : null;
  const entry = category?.[3].find(item => item.id === params.get('id'));
  if (!entry) {
    byId('detail-missing').hidden = false;
    return;
  }

  const node = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const link = (text, href, className) => {
    const element = node('a', text, className);
    element.href = href;
    return element;
  };
  const copy = (id, value) => byId(id).replaceChildren(value);
  const notes = {
    wunderlich: 'https://vigszinhaz.hu/hu/hirek/hirarchivum/wunderlich-jozsef-junior-prima-dijas-2016-09-29',
    wunderlichProfile: 'https://vigszinhaz.hu/hu/szemelyek/wunderlich_jozsef',
    pal: 'https://mek.oszk.hu/00900/00960/',
  };

  const imageFrame = byId('detail-image');
  function addPhoto(frame, src, alt, onError) {
    if (!src) return;
    const img = node('img');
    img.alt = alt;
    img.decoding = 'async';
    if (frame !== imageFrame) img.loading = 'lazy';
    img.addEventListener('error', () => { img.remove(); onError?.(); }, { once: true });
    img.src = src;
    frame.append(img);
  }
  function addFacts(facts) {
    const fragment = document.createDocumentFragment();
    for (const [label, value] of facts) {
      if (!value) continue;
      const group = node('div');
      const content = node('dd');
      content.append(value);
      group.append(node('dt', label), content);
      fragment.append(group);
    }
    copy('detail-facts', fragment);
  }
  function place(title) {
    const theatre = theatreForVenue(title);
    const venue = venues.find(item => item.title === title);
    if (theatre?.title === title) return link(title, theatre.detail);
    return venue ? link(title, venue.url) : title;
  }
  function setPortrait() {
    const initials = entry.title.split(' ').slice(0, 2).map(word => word[0]).join('');
    const monogram = node('span', initials, 'detail-monogram');
    monogram.setAttribute('aria-hidden', 'true');
    imageFrame.append(monogram);
    imageFrame.classList.toggle('logo', Boolean(entry.logo && !entry.image));
    imageFrame.classList.toggle('theatre', type === 'szinhaz');
    const caption = byId('detail-credit');
    if (entry.credit) {
      caption.textContent = 'Fotó: ' + entry.credit;
      caption.hidden = false;
    }
    addPhoto(imageFrame, entry.image || entry.logo, entry.imageAlt || entry.title, () => {
      caption.hidden = true;
    });
  }
  function setCover() {
    const cover = node('div', '', 'detail-cover');
    cover.setAttribute('aria-hidden', 'true');
    const typography = node('div');
    typography.append(node('span', entry.author), node('strong', entry.title));
    cover.append(typography, node('span', entry.kind));
    imageFrame.append(cover);
  }
  const panel = byId('detail-panel-body');
  const count = (n, noun) => n + ' ' + noun;
  const button = (text, url) => link(text, url, 'btn btn-outline');
  document.title = entry.title + ' · TapsPont';
  copy('detail-kicker', category[2]);
  copy('detail-title', entry.title);

  let related = [];
  let relatedTitle = 'Kapcsolódó produkciók';
  let sources = [];
  if (type === 'szinesz') {
    byId('detail-content').classList.add('work-detail', 'artist-work-detail');
    byId('detail-panel-body').closest('.detail-panel').hidden = true;
    byId('detail-kicker').replaceChildren();
    const [venueName, role] = entry.meta.split(' · ');
    const theatre = theatreForVenue(venueName);
    const affiliations = {
      'wunderlich-jozsef': { 'pal': 'Boka János szerepében' },
      'balla-eszter': { 'fair': 'Eliza Doolittle szerepében' },
      'medveczky-balazs': { 'dzsungel': '' },
    };
    const credits = affiliations[entry.id] || {};
    const rich = entry.id === 'wunderlich-jozsef';
    related = productions.filter(p => p.id && Object.hasOwn(credits, p.id))
      .map(p => ({ ...p, role: credits[p.id] }));
    if (entry.id === 'janosi-david') {
      related.push({ ...premieres.find(p => p.title === 'La Grange'), role: 'Erkel Ferenc szerepében' });
    }

    byId('detail-kicker').hidden = true;
    const affiliation = byId('detail-subtitle');
    affiliation.hidden = true;
    if (rich) {
      const awards = node('div', '', 'artist-awards');
      const icon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 5h12v6c0 6-2.7 9-6 9s-6-3-6-9V5Zm0 2H5v3c0 3 2 5 5 5M22 7h5v3c0 3-2 5-5 5M16 20v5m-5 3h10m-8-3h6"/></svg>';
      const awardSource = 'https://vigszinhaz.jegy.hu/person/wunderlich-jozsef-7337';
      for (const [label, url] of [['Junior Prima Díj · 2016', notes.wunderlich], ['Ruttkai Éva-emlékdíj · 2016', awardSource], ['Soós Imre-díj · 2017', awardSource]]) {
        const item = node('span', label, 'artist-award');
        item.insertAdjacentHTML('afterbegin', icon);
        awards.append(item);
      }
      byId('detail-title').after(awards);
    }
    copy('detail-description', rich
      ? 'A Színház- és Filmművészeti Egyetem zenés színművész szakán végzett. Pályáját Pécsett kezdte, majd 2015-ben csatlakozott a Vígszínházhoz, ahol A Pál utcai fiúk zenés játékában Boka Jánost alakította.'
      : role && role !== 'színművész' ? role + '.' : '');
    addFacts(rich ? [
      ['Születési év', '1989'], ['Születési hely', 'Pécs'],
      ['Társulat', place(venueName)],
    ] : [
      ['Színház', place(venueName)], ['Szakma', 'Színművész'],
    ]);
    copy('detail-panel-title', 'Színpadon');
    panel.append(node('p', related.length
      ? count(related.length, 'kapcsolódó produkció') + ' a TapsPont katalógusában.'
      : 'Ehhez a színészhez még nem került produkció a TapsPontba.'));
    if (related.length) panel.append(button('Szerepek megtekintése', '#detail-related-title'));
    if (theatre) panel.append(button('Színház adatlapja', theatre.detail));
    relatedTitle = 'Kapcsolódó színpadi szerepei';
    document.querySelector('.detail-intro').insertBefore(byId('detail-facts'), byId('detail-description'));
    const previous = node('section', '', 'detail-related artist-previous');
    previous.append(node('h2', 'Korábbi emlékezetes alakítások'), node('p', 'Korábbi szerepekről még nincs adat a katalógusban.', 'muted'));
    document.querySelector('.detail-intro').append(previous);
    sources = rich ? [['Vígszínház · Művészadatlap', notes.wunderlichProfile], ['Vígszínház · Junior Prima Díj', notes.wunderlich], ['Vígszínház · Díjak és elismerések', 'https://vigszinhaz.jegy.hu/person/wunderlich-jozsef-7337']]
      : [['Színházi forrás', entry.url]];
    setPortrait();
  } else if (type === 'szinhaz') {
    byId('detail-content').classList.add('work-detail', 'theatre-work-detail');
    const isVig = entry.id === 'vigszinhaz';
    const places = isVig ? ['Vígszínház · Nagyszínpad', 'Pesti Színház', 'Házi Színpad', 'Víg Szalon']
      : entry.id === 'katona-jozsef-szinhaz' ? ['Kamra'] : [];
    related = [...productions, ...premieres].filter(p => theatreForVenue(p.venue || p.meta)?.id === entry.id);
    byId('detail-kicker').hidden = true;
    copy('detail-subtitle', entry.meta || '');
    copy('detail-description', isVig
      ? 'A Vígszínház 1896. május 1-jén nyitotta meg kapuit Budapesten. A Szent István körúti épületet a Fellner és Helmer építészpáros tervezte, és alig egy év alatt épült fel. A színház alkotói kezdettől fontos szerepet vállaltak a korszerű magyar színjátszás formálásában, műsorán magyar és külföldi szerzők darabjai egyaránt helyet kaptak. A nagyszínház mellett az 1967-ben megnyílt Pesti Színház kamarateret ad a kisebb léptékű előadásoknak. A társulat a Házi Színpadon és a Víg Szalonban is játszik.'
      : '');
    byId('detail-facts').remove();
    const ratingPanel = panel.closest('.detail-panel');
    copy('detail-panel-title', 'A színház értékelései');
    panel.append(node('p', '★ — / 10 · Még nincs összesített értékelés', 'work-rating-average'), node('p', 'A színház értékelései később lesznek elérhetők.', 'muted'));
    ratingPanel.append(document.querySelector('.detail-actions'));
    byId('detail-title').after(byId('detail-subtitle'), ratingPanel, byId('detail-feedback'));
    relatedTitle = 'Előadások és bemutatók';
    const venueSection = node('section', '', 'detail-related work-extra theatre-venues');
    venueSection.append(node('h2', 'Játszóhelyek'));
    const venueLinks = node('div', '', 'theatre-tags');
    for (const name of places) {
      const venue = venues.find(v => v.title === name || v.title.endsWith(' · ' + name));
      venueLinks.append(venue ? link(name, venue.url, 'theatre-tag') : node('span', name, 'theatre-tag'));
    }
    venueLinks.append(link('A színház honlapja', new URL(entry.url).origin, 'theatre-tag'));
    venueSection.append(venueLinks);
    document.querySelector('.detail-intro').append(venueSection);
    sources = [['Hivatalos színházi oldal', entry.url]];
    setPortrait();
  } else {
    byId('detail-content').classList.add('work-detail');
    copy('detail-kicker', entry.kind || 'Színdarab');
    const isPal = entry.id === 'pal';
    related = productions.filter(p => p.id === entry.id);
    copy('detail-subtitle', entry.author);
    const duration = node('p', '', 'work-duration');
    const durationValue = related[0]?.duration || '';
    duration.textContent = durationValue ? 'Időtartam: ' + durationValue : 'Időtartam: nincs megadva';
    byId('detail-subtitle').after(duration);
    copy('detail-description', isPal
      ? 'A Pál utcai fiúk egy budapesti diákcsapat története, amelynek tagjai a grundot, kedves játékterüket védik a vörösingesekkel szemben. A fiúk saját szabályaik szerint szerveződnek, miközben a két csapat közötti ellentét egyre komolyabb próbatétellé válik. Boka és társai történetében különös szerepet kap a legkisebb közlegény, Nemecsek Ernő bátorsága és hűsége. Molnár Ferenc regénye barátságról, összetartozásról, árulásról és áldozatvállalásról mesél.'
      : '');
    addFacts([['Alkotó', entry.author], ['Műfaj', entry.kind], ['Első könyvkiadás', isPal ? '1907' : '']]);
    copy('detail-panel-title', 'A mű értékelései');
    const stars = node('p', '☆☆☆☆☆', 'detail-stars');
    stars.setAttribute('aria-hidden', 'true');
    panel.append(stars, node('p', 'Még nincs összesített értékelés.', 'detail-panel-rule'),
      node('p', 'A mű és a produkciók értékelése külön jelenik meg.', 'muted'));
    const workIntro = document.querySelector('.detail-intro');
    const ratingPanel = byId('detail-panel-body').closest('.detail-panel');
    ratingPanel.append(document.querySelector('.detail-actions'));
    document.querySelector('.detail-media').append(ratingPanel, byId('detail-feedback'));
    workIntro.insertBefore(byId('detail-facts'), byId('detail-description'));
    relatedTitle = 'Színpadi változatok';
    sources = isPal ? [['Magyar Elektronikus Könyvtár · A Pál utcai fiúk', notes.pal], ['Vígszínház · Színpadi változat', entry.url]]
      : [['Kapcsolódó produkció hivatalos oldala', entry.url]];
    setCover();
  }

  // Az üres ismertető ne hagyjon üres bekezdést az adatlapon.
  const intro = byId('detail-description');
  if (!intro.textContent) intro.classList.add('detail-no-description');
  const reviewSection = byId('nezoi-velemenyek');
  if (type !== 'szinesz') {
    const reviewList = byId('detail-review-list');
    for (const review of audienceReviews) {
      const production = related.find(item => item.id === review.productionId);
      if (!production) continue;
      const card = node('article');
      card.append(node('blockquote', review.quote), node('p', production.title + ' · ' + production.venue, 'muted'),
        link('Forrás a színház oldalán', production.url, 'text-link'));
      reviewList.append(card);
    }
    reviewSection.hidden = type === 'szinhaz' ? false : !reviewList.children.length;
    if (type === 'szinhaz' && !reviewList.children.length) reviewList.append(node('p', 'Még nincs megjeleníthető nézői vélemény.', 'muted'));
    if (type === 'szinhaz') byId('detail-reviews-title').textContent = 'Nézői vélemények a színház előadásairól';
  }
  copy('detail-related-title', relatedTitle);
  copy('detail-related-count', count(related.length, 'produkció'));
  const rows = byId('detail-related-list');

  if (!related.length) {
    rows.append(node('p', 'Még nincs kapcsolódó produkció az adatlapon.', 'muted'));
  } else if (type === 'szinesz') {
    rows.setAttribute('aria-live', 'polite');
    const group = node('div', '', 'production-group');
    for (const item of related) {
      const card = node('article', '', 'production-row');
      const banner = node('div', '', 'work-production-banner');
      if (item.image) addPhoto(banner, item.image, '');
      banner.append(node('span', item.venue || item.meta || '', 'work-production-banner-label'));
      const text = node('div', '', 'production-row-content');
      text.append(node('h3', item.title));
      const meta = node('div', '', 'production-meta');
      if (item.role) meta.append(node('span', 'Szerep: ' + item.role.replace(/\s+szerepében$/i, ''), 'production-role'));
      if (item.kind) meta.append(node('span', item.kind));
      text.append(meta);
      const body = node('div', '', 'work-production-body');
      body.append(text, button('Produkció részletei', item.url));
      card.append(banner, body); group.append(card);
    }
    rows.append(group);
  } else {
    const controls = node('div', '', 'production-filters');
    const search = node('input');
    search.type = 'search';
    search.placeholder = type === 'szinesz' ? 'Keresés szerepre vagy produkcióra…' : 'Keresés produkció címére…';
    search.setAttribute('aria-label', 'Keresés a kapcsolódó produkciók között');
    controls.append(search);
    const venuesAvailable = [...new Set(related.map(item => item.venue || item.meta).filter(Boolean))];
    let venueFilter;
    if (venuesAvailable.length > 1) {
      venueFilter = node('select');
      venueFilter.setAttribute('aria-label', 'Színház vagy játszóhely szűrése');
      const all = node('option', 'Minden színház / játszóhely');
      all.value = '';
      venueFilter.append(all);
      for (const venue of venuesAvailable.sort((a, b) => a.localeCompare(b, 'hu'))) {
        const option = node('option', venue);
        option.value = venue;
        venueFilter.append(option);
      }
      controls.append(venueFilter);
    }
    let order;
    if (related.length > 1) {
      order = node('select');
      order.setAttribute('aria-label', 'Produkciók rendezése');
      for (const [value, label] of [['title', 'Cím szerint (A–Z)'], ['title-desc', 'Cím szerint (Z–A)']]) {
        const option = node('option', label);
        option.value = value;
        order.append(option);
      }
      controls.append(order);
    }
    if (related.length > 1 && type !== 'szinhaz') rows.before(controls);
    rows.setAttribute('aria-live', 'polite');
    const normalize = value => (value || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('hu');
    function renderRelated() {
      const query = normalize(search.value.trim());
      const selected = related.filter(item => {
        const venue = item.venue || item.meta || '';
        return (!venueFilter || !venueFilter.value || venue === venueFilter.value) &&
          normalize([item.title, item.role, item.author, venue].filter(Boolean).join(' ')).includes(query);
      }).sort((a, b) => a.title.localeCompare(b.title, 'hu') * (order?.value === 'title-desc' ? -1 : 1));
      rows.replaceChildren();
      byId('detail-related-count').textContent = count(selected.length, 'produkció');
      if (!selected.length) {
        rows.append(node('p', 'Nincs találat. Próbálj más keresést vagy szűrőt.', 'production-empty'));
        return;
      }
      if (type === 'szinhaz') {
        const group = node('div', '', 'production-group');
        for (const item of selected) {
          const card = node('article', '', 'production-row');
          const banner = node('div', '', 'work-production-banner');
          if (item.image) addPhoto(banner, item.image, '');
          banner.append(node('span', item.venue || item.meta || '', 'work-production-banner-label'));
          const text = node('div', '', 'production-row-content');
          text.append(node('h3', item.title));
          const meta = node('div', '', 'production-meta');
          if (item.kind) meta.append(node('span', item.kind));
          if (item.director) meta.append(node('span', 'Rendező: ' + item.director));
          if (item.displayDate) meta.append(node('span', 'Bemutató: ' + item.displayDate));
          text.append(meta);
          const body = node('div', '', 'work-production-body');
          body.append(text, button('Produkció részletei', item.url));
          card.append(banner, body); group.append(card);
        }
        rows.append(group);
        return;
      }

      const group = node('div', '', 'production-group');
      const heading = node('div', '', 'production-group-heading');
      heading.append(node('h3', 'Kapcsolódó produkciók'), node('span', count(selected.length, 'produkció')));
      group.append(heading);
      for (const item of selected) {
        const row = node('article', '', 'production-row');
        if (type === 'mu') { const banner = node('div', '', 'work-production-banner'); if (item.image) addPhoto(banner, item.image, ''); const label = node('span', item.venue || item.meta || '', 'work-production-banner-label'); banner.append(label); row.append(banner); }
        const text = node('div', '', 'production-row-content');
        const title = node('h3', item.title);
        if (item.author) title.append(' ', node('span', '(' + item.author + ')'));
        text.append(title);
        const meta = node('div', '', 'production-meta');
        if (item.role) meta.append(node('span', 'Szerep: ' + item.role, 'production-role'));
        meta.append(place(item.venue || item.meta));
        if (item.kind) meta.append(node('span', item.kind));
        if (item.displayDate) meta.append(node('span', 'Bemutató: ' + item.displayDate));
        const work = type !== 'mu' && workRecords.find(record => record.id === item.id);
        if (work) meta.append(link('Mű adatlapja', work.detail));
        text.append(meta);
        const rowContent = node('div', '', 'work-production-body'); rowContent.append(text, button('Produkció részletei', item.url));
        if (type === 'mu') row.append(rowContent); else row.append(text, button('Produkció részletei', item.url));
        group.append(row);
      }
      rows.append(group);
    }
    search.addEventListener('input', renderRelated);
    venueFilter?.addEventListener('change', renderRelated);
    order?.addEventListener('change', renderRelated);
    renderRelated();
  }

  if (type === 'szinesz') {
    const relatedSection = byId('detail-related-title').closest('.detail-related');
    const previous = document.querySelector('.artist-previous');
    document.querySelector('.detail-intro').insertBefore(relatedSection, previous);
  }

  if (type === 'szinhaz') {
    const cast = node('section', '', 'detail-related work-extra');
    cast.append(node('h2', 'Társulat és közreműködők'));
    const list = node('div', '', 'work-cast');
    for (const artist of artistRecords) {
      const venue = (artist.meta || '').split(' · ')[0];
      if (theatreForVenue(venue)?.id !== entry.id) continue;
      const item = link('', artist.detail, 'theatre-artist-card');
      item.setAttribute('aria-label', artist.title + ' – adatlap, ' + venue);
      const photo = node('span', '', 'theatre-artist-photo');
      if (artist.image) addPhoto(photo, artist.image, '');
      const info = node('span', '', 'theatre-artist-info');
      info.append(node('span', venue, 'theatre-artist-venue'), node('strong', artist.title), node('small', (artist.meta || '').split(' · ')[1] || 'Színművész'));
      const footer = node('span', '', 'theatre-artist-footer');
      footer.innerHTML = '<span class="theatre-artist-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span>';
      item.append(photo, info, footer); list.append(item);
    }
    cast.append(list.children.length ? list : node('p', 'Még nincs kapcsolódó művész a katalógusban.', 'muted'));
    const relatedSection = byId('detail-related-title').closest('.detail-related');
    const columns = node('div', '', 'theatre-sections'); columns.append(relatedSection, cast);
    const dates = node('section', '', 'detail-related work-extra'); dates.append(node('h2', 'Következő előadásidőpontok'));
    let dateCount = 0;
    for (const item of related) {
      if (!item.next || new Date(item.next).getTime() < Date.now()) continue;
      const row = node('div', '', 'work-date-row');
      const info = node('div', '', 'work-date-content');
      const formatted = new Intl.DateTimeFormat('hu-HU', {timeZone:'Europe/Budapest', dateStyle:'full', timeStyle:'short'}).format(new Date(item.next));
      info.append(node('strong', formatted), node('p', item.title + ' · ' + item.venue, 'muted'));
      row.append(info, link('Jegyinformáció', item.url, 'btn btn-outline')); dates.append(row); dateCount++;
    }
    if (!dateCount) dates.append(node('p', 'Jelenleg nincs ismert következő előadásidőpont.', 'muted'));
    const theatreIntro = document.querySelector('.theatre-work-detail .detail-intro');
    theatreIntro.insertBefore(columns, theatreIntro.querySelector('.theatre-venues'));
    theatreIntro.insertBefore(dates, theatreIntro.querySelector('.theatre-venues'));
    document.querySelector('.theatre-work-detail .detail-media').append(reviewSection);
  }

  if (type === 'mu') {
    const ratingPanel = byId('detail-panel-body');
    ratingPanel.replaceChildren();
    const average = node('p', 'Még nincs értékelés.', 'work-rating-average');
    const rate = node('button', '★ Értékelem', 'btn work-rate'); rate.type = 'button';
    ratingPanel.append(average, rate, node('p', 'Az értékelések ebben a böngészőben tárolódnak.', 'muted')); 
    const chart = node('section', '', 'work-rating-chart');
    const chartHead = node('div', '', 'work-chart-head');
    const chartAverage = node('div', '', 'work-chart-average');
    const chartNumber = node('strong', '–', 'work-chart-number');
    chartAverage.append(chartNumber, node('span', '/ 5', 'work-chart-out-of'));
    const chartSummary = node('div', '', 'work-chart-summary');
    const chartStars = node('div', '', 'work-chart-stars');
    chartStars.setAttribute('aria-hidden', 'true');
    const chartCount = node('span', '0 értékelés', 'work-chart-count');
    chartSummary.append(chartStars, chartCount); chartHead.append(chartAverage, chartSummary);
    const bars = node('div', '', 'work-chart-bars');
    bars.setAttribute('aria-label', 'Értékelések megoszlása');
    chart.append(chartHead, bars); document.querySelector('.detail-media').append(chart);
    const ratingKey = 'tapspont-work-ratings-v2:' + entry.id;
    const getRatings = () => workRatings(entry);
    function renderRatings() {
      const votes = Object.values(getRatings()).filter(n => Number.isInteger(n) && n >= 1 && n <= 5);
      const mean = votes.length ? votes.reduce((a, b) => a + b, 0) / votes.length : 0;
      const formatted = votes.length ? mean.toFixed(1).replace('.', ',') : '–';
      average.textContent = votes.length ? '★ ' + formatted + ' / 5 - ' + votes.length + ' szavazat' : '★ — / 5 - Még nincs értékelés.';
      chartNumber.textContent = formatted;
      chartCount.textContent = votes.length + ' értékelés';
      chartStars.replaceChildren();
      for (let star = 1; star <= 5; star++) { const icon = node('span', '★', star <= Math.round(mean) ? 'work-chart-star is-filled' : 'work-chart-star'); chartStars.append(icon); }
      bars.replaceChildren();
      for (let score = 5; score >= 1; score--) {
        const count = votes.filter(v => v === score).length;
        const percent = votes.length ? Math.round(count / votes.length * 100) : 0;
        const row = node('div', '', 'work-chart-column');
        const label = node('span', String(score), 'work-chart-label');
        const star = node('span', '★', 'work-chart-row-star'); star.setAttribute('aria-hidden', 'true'); label.append(star);
        const track = node('span', '', 'work-chart-track'); const fill = node('span', '', 'work-chart-fill'); fill.style.width = percent + '%'; track.append(fill);
        const value = node('span', percent + '%', 'work-chart-percent');
        row.append(label, track, value); row.setAttribute('aria-label', score + ' pont: ' + count + ' szavazat, ' + percent + '%'); bars.append(row);
      }
    }
    const dialog = node('dialog', '', 'detail-panel work-rating-dialog');
    const form = node('form'); form.method = 'dialog'; const label = node('label', 'Pontszámod (1–5)'); const select = node('select');
    for (let i = 1; i <= 5; i++) { const option = node('option', String(i)); option.value = i; select.append(option); } select.value = '5'; label.append(select);
    const buttons = node('div', '', 'work-dialog-actions'); const cancel = node('button', 'Mégse', 'btn btn-outline'); cancel.type = 'button'; cancel.addEventListener('click', () => dialog.close()); const submit = node('button', 'Értékelés mentése', 'btn account-primary'); submit.type = 'submit'; buttons.append(cancel, submit); form.append(node('h2', 'Értékelés'), label, buttons); dialog.append(form); document.body.append(dialog);
    rate.addEventListener('click', () => { if (!profileSession.get()) { const message = byId('login-error'); message.textContent = 'Az értékeléshez jelentkezz be.'; message.hidden = false; byId('login-popover').showPopover(); byId('login-username').focus(); return; } dialog.showModal(); });
    form.addEventListener('submit', event => { event.preventDefault(); const profile = profileSession.get(); if (!profile) return; try { const ratings = getRatings(); ratings[profile.id || profile.name] = Number(select.value); localStorage.setItem(ratingKey, JSON.stringify(ratings)); renderRatings(); dialog.close(); } catch { average.textContent = 'Az értékelés mentése nem sikerült.'; } });
    renderRatings();
    const castMap = { pal: [['Wunderlich József', 'Boka János']], fair: [['Balla Eszter', 'Eliza Doolittle']] };
    const cast = node('section', '', 'detail-related work-extra'); cast.append(node('h2', 'Szereposztás')); const castList = node('div', '', 'work-cast');
    castList.classList.add('topic-records'); castList.dataset.topic = 'szineszek';
    for (const [name, role] of castMap[entry.id] || []) {
      const artist = artistRecords.find(a => a.title === name); if (!artist) continue;
      const item = link('', artist.detail, 'card topic-record');
      item.setAttribute('aria-label', name + ' - adatlap' + (role ? ', ' + role + ' szerepében' : ''));
      const photo = node('div', '', 'topic-photo'); photo.setAttribute('aria-hidden', 'true');
      if (artist.image) { const img = node('img'); img.src = artist.image; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove(), { once: true }); photo.append(img); }
      const text = node('div', '', 'topic-caption');
      const theatre = (artist.meta || '').split(' · ')[0];
      if (theatre) text.append(node('p', theatre, 'actor-theatre'));
      text.append(node('h2', name)); if (role) text.append(node('p', role + ' szerepében'));
      const footer = node('div', '', 'actor-footer'); const arrow = node('span', '', 'actor-detail-arrow'); arrow.setAttribute('aria-hidden', 'true');
      arrow.innerHTML = '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>';
      footer.append(arrow); item.append(photo, text, footer); castList.append(item);
    }
    cast.append(castList.children.length ? castList : node('p', 'A szereposztás adatai még nem állnak rendelkezésre.', 'muted'));
    const dates = node('section', '', 'detail-related work-extra'); dates.append(node('h2', 'Következő előadásidőpontok')); let dateCount = 0;
    for (const item of related) { if (!item.next || new Date(item.next).getTime() < Date.now()) continue; const row = node('div', '', 'work-date-row'); const text = node('div', '', 'work-date-content'); const formatted = new Intl.DateTimeFormat('hu-HU', { timeZone: 'Europe/Budapest', dateStyle: 'full', timeStyle: 'short' }).format(new Date(item.next)); text.append(node('strong', formatted), node('p', item.title + ' · ' + item.venue, 'muted')); const actions = node('div', '', 'work-date-actions'); const status = node('span', 'Teltház · minta', 'work-date-status'); status.title = 'Mintajelzés, a jegyállapot nem ellenőrzött'; status.setAttribute('aria-label', 'Teltház – mintajelzés, a jegyállapot nem ellenőrzött'); actions.append(status, link('Jegyinformáció', item.url, 'btn btn-outline')); row.append(text, actions); dates.append(row); dateCount++; }
    if (!dateCount) dates.append(node('p', 'Jelenleg nincs ismert következő előadásidőpont.', 'muted'));
    const reviews = byId('nezoi-velemenyek'); reviews.hidden = false; byId('detail-reviews-title').textContent = 'Nézői vélemények';
    if (!byId('detail-review-list').children.length) byId('detail-review-list').append(node('p', 'Még nincs megjeleníthető nézői vélemény.', 'muted'));
    const reviewButton = node('button', '+', 'btn review-add'); reviewButton.type = 'button'; reviewButton.setAttribute('aria-label', 'Vélemény írása'); reviewButton.title = 'Vélemény írása'; byId('detail-reviews-title').after(reviewButton);
    const reviewDialog = node('dialog', '', 'detail-panel work-rating-dialog'); const reviewForm = node('form'); const reviewLabel = node('label', 'Véleményed'); const reviewText = node('textarea'); reviewText.required = true; reviewText.maxLength = 2000; reviewLabel.append(reviewText); const reviewButtons = node('div', '', 'work-dialog-actions'); const reviewCancel = node('button', 'Mégse', 'btn btn-outline'); reviewCancel.type = 'button'; reviewCancel.addEventListener('click', () => reviewDialog.close()); const reviewSubmit = node('button', 'Vélemény mentése', 'btn account-primary'); reviewSubmit.type = 'submit'; reviewButtons.append(reviewCancel, reviewSubmit); reviewForm.append(node('h2', 'Vélemény írása'), reviewLabel, reviewButtons); reviewDialog.append(reviewForm); document.body.append(reviewDialog);
    const reviewKey = 'tapspont-work-reviews:' + entry.id;
    function renderLocalReviews() { const list = byId('detail-review-list'); list.querySelectorAll('.work-local-review, .work-review-empty').forEach(el => el.remove()); let entries = []; try { entries = JSON.parse(localStorage.getItem(reviewKey) || '[]'); if (!Array.isArray(entries)) entries = []; } catch {} for (const r of entries) { const card = node('article', '', 'work-local-review'); card.append(node('blockquote', r.text), node('p', r.author + ' · ' + new Intl.DateTimeFormat('hu-HU', {dateStyle:'medium'}).format(new Date(r.date)), 'muted')); list.append(card); } if (!list.children.length) list.append(node('p', 'Még nincs megjeleníthető nézői vélemény.', 'muted work-review-empty')); }
    if (byId('detail-review-list').firstElementChild?.tagName === 'P') byId('detail-review-list').firstElementChild.classList.add('work-review-empty'); renderLocalReviews();
    reviewButton.addEventListener('click', () => { if (!profileSession.get()) { const message = byId('login-error'); message.textContent = 'A véleményíráshoz jelentkezz be.'; message.hidden = false; byId('login-popover').showPopover(); byId('login-username').focus(); return; } reviewDialog.showModal(); });
    reviewForm.addEventListener('submit', event => { event.preventDefault(); const profile = profileSession.get(); const value = reviewText.value.trim(); if (!profile || !value) return; try { let items = JSON.parse(localStorage.getItem(reviewKey) || '[]'); if (!Array.isArray(items)) items = []; items.unshift({text:value, author:profile.name, date:new Date().toISOString()}); localStorage.setItem(reviewKey, JSON.stringify(items)); reviewText.value = ''; renderLocalReviews(); reviewDialog.close(); } catch { reviewText.setCustomValidity('A mentés nem sikerült.'); reviewText.reportValidity(); } }); reviewText.addEventListener('input', () => reviewText.setCustomValidity(''));
    const relatedSection = byId('detail-related-title').closest('.detail-related');
    const columns = node('div', '', 'work-content-columns'); columns.append(relatedSection, cast);
    document.querySelector('.work-detail .detail-intro').append(columns, dates);
    document.querySelector('.work-detail .detail-media').append(reviews);
    // A két oszlop tartalma eltérő hosszúságú, ezért a gombot és a címet azonos magassághoz igazítjuk.
    const alignWorkSections = () => {
      columns.style.paddingTop = '';
      const ratingBox = byId('detail-panel-title').closest('.detail-panel');
      ratingBox.style.marginTop = '';
      if (window.matchMedia('(max-width: 700px)').matches) return;
      const difference = rate.getBoundingClientRect().top - byId('detail-related-title').getBoundingClientRect().top;
      if (difference > 0) columns.style.paddingTop = difference + 'px';
      else if (difference < 0) ratingBox.style.marginTop = -difference + 'px';
    };
    requestAnimationFrame(alignWorkSections);
    window.addEventListener('resize', alignWorkSections);
    document.fonts?.ready.then(alignWorkSections);
  }

  for (const [label, url] of sources) {
    const item = node('li');
    item.append(link(label, url));
    byId('detail-source-list').append(item);
  }

  const save = byId('detail-save');
  const feedback = byId('detail-feedback');
  const bookmarkKey = 'tapspont-detail-bookmark:' + type + ':' + entry.id;
  const updateBookmark = saved => {
    save.setAttribute('aria-pressed', String(saved));
    save.querySelector('span').textContent = saved ? 'Mentve' : 'Mentés';
    save.setAttribute('title', saved ? 'Mentve' : 'Mentés');
  };
  try { updateBookmark(localStorage.getItem(bookmarkKey) === '1'); } catch {}
  save.addEventListener('click', () => {
    if (!profileSession.get()) { feedback.textContent = 'A mentéshez jelentkezz be.'; const message = byId('login-error'); message.textContent = 'A mentéshez jelentkezz be.'; message.hidden = false; byId('login-popover').showPopover(); byId('login-username').focus(); return; }
    const saved = save.getAttribute('aria-pressed') === 'true';
    try {
      if (saved) localStorage.removeItem(bookmarkKey);
      else localStorage.setItem(bookmarkKey, '1');
      updateBookmark(!saved);
      feedback.textContent = saved ? 'Mentés eltávolítva.' : 'Mentve ebben a böngészőben.';
    } catch {
      feedback.textContent = 'Ez a böngésző nem engedélyezi a mentést.';
    }
  });
  byId('detail-share').addEventListener('click', async () => {
    const url = new URL(entry.detail, location.href).href;
    if (location.protocol !== 'file:') {
      try {
        await navigator.clipboard.writeText(url);
        feedback.textContent = 'Az adatlap hivatkozása a vágólapra került.';
        return;
      } catch {}
    }
    const field = byId('share-link');
    field.value = url;
    byId('share-dialog').showModal();
    field.focus();
    field.select();
  });
  byId('detail-content').hidden = false;
  if (location.hash === '#nezoi-velemenyek' && !reviewSection.hidden) reviewSection.scrollIntoView();
})();
