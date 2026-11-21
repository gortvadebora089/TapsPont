(() => {
  const list = document.querySelector('.tp-ranking-list');
  const controls = document.querySelectorAll('[data-ranking]');
  function render(type) {
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.ranking === type)));
    const entries = type === 'mu' ? workRecords : theatreRecords;
    const scores = entries.map(entry => ({ entry, rating: type === 'mu' ? workRating(entry) : { value: sampleRating(entry), sample: true } }));
    scores.sort((a, b) => Number(b.rating.value.replace(',', '.')) - Number(a.rating.value.replace(',', '.')) || a.entry.title.localeCompare(b.entry.title, 'hu'));
    list.replaceChildren(...scores.map(({ entry, rating }, index) => {
      const item = document.createElement('li');
      const link = document.createElement('a'); link.href = entry.detail;
      const number = document.createElement('span'); number.className = 'tp-rank-number'; number.textContent = index + 1;
      const caption = document.createElement('span'); caption.className = 'tp-rank-caption';
      const title = document.createElement('strong'); title.textContent = entry.title;
      const score = document.createElement('span'); score.className = 'tp-rank-score'; score.textContent = '★ ' + rating.value + (type === 'mu' ? ' / 5' : ' / 10') + (rating.sample ? ' - mintapontszám' : '');
      const detail = document.createElement('span'); detail.className = 'tp-rank-detail';
      detail.textContent = type === 'mu' ? [entry.author, entry.kind].filter(Boolean).join(' - ') : (entry.meta || 'Színház');
      caption.append(title, score, detail); link.append(number, caption); item.append(link); return item;
    }));
  }
  controls.forEach(button => button.addEventListener('click', () => render(button.dataset.ranking)));
  render('mu');
})();
