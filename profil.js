const profileSession = (() => {
  const storageKey = 'tapspont-preview-profile';
  let fallback = null;
  let storageFailed = false;

  function get() {
    if (storageFailed) return fallback;
    try {
      const profile = JSON.parse(sessionStorage.getItem(storageKey) ?? localStorage.getItem(storageKey));
      return typeof profile?.name === 'string' && profile.name.trim() ? profile : null;
    } catch {
      return fallback;
    }
  }

  function render() {
    const profile = get();
    const initial = profile?.name.trim().match(/^\P{Mark}\p{Mark}*/u)?.[0].toLocaleUpperCase('hu') ?? '';
    for (const avatar of document.querySelectorAll('[data-profile-avatar]')) {
      const icon = avatar.querySelector('svg');
      avatar.querySelector('.avatar-initial')?.remove();
      avatar.querySelector('.avatar-photo')?.remove();
      avatar.classList.toggle('has-profile', Boolean(profile));
      icon.toggleAttribute('hidden', Boolean(initial));
      if (avatar.matches('a, button')) {
        avatar.setAttribute('aria-label', profile ? 'Profil: ' + profile.name : 'Profil / Belépés');
      }
      if (!profile) continue;

      const letter = document.createElement('span');
      letter.className = 'avatar-initial';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = initial;
      avatar.append(letter);

      const picture = typeof profile.picture === 'string' ? profile.picture : '';
      if (!/^https:\/\/(?:[a-z0-9-]+\.)*googleusercontent\.com\//i.test(picture) &&
          !/^data:image\/jpeg;base64,[\w+/=]+$/.test(picture)) continue;
      const photo = document.createElement('img');
      photo.className = 'avatar-photo';
      photo.alt = '';
      photo.referrerPolicy = 'no-referrer';
      photo.hidden = true;
      photo.addEventListener('load', () => {
        letter.hidden = true;
        icon.setAttribute('hidden', '');
        photo.hidden = false;
      }, { once: true });
      avatar.append(photo);
      photo.src = picture;
    }
  }

  function set(profile, remember = false) {
    fallback = profile;
    try {
      if (!profile) {
        sessionStorage.removeItem(storageKey);
        localStorage.removeItem(storageKey);
      } else if (remember) {
        localStorage.setItem(storageKey, JSON.stringify(profile));
        sessionStorage.removeItem(storageKey);
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(profile));
        localStorage.removeItem(storageKey);
      }
      storageFailed = false;
    } catch {
      storageFailed = true;
    }
    render();
  }

  render();
  window.addEventListener('pageshow', render);
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) render();
  });
  return { get, set };
})();

const previewAccounts = {
  load() {
    try {
      return new Map(JSON.parse(sessionStorage.getItem('tapspont-preview-accounts')) ?? []);
    } catch {
      return new Map();
    }
  },
  save(accounts) {
    sessionStorage.setItem('tapspont-preview-accounts', JSON.stringify([...accounts]));
  }
};
