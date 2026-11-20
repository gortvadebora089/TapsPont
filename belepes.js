(() => {
  const byId = id => document.getElementById(id);
  const loginForm = byId('login-form');
  const registerForm = byId('register-form');
  const heading = byId('account-heading');
  const viewButtons = document.querySelectorAll('[data-view]');
  const passwordToggles = document.querySelectorAll('.password-toggle');
  const validatedFields = document.querySelectorAll('.account-form input[aria-describedby]');
  const demoAccounts = previewAccounts.load();
  let submitting = false;

  function setMessage(element, message = '') {
    element.textContent = message;
    element.hidden = !message;
  }

  function showError(field, message = '') {
    setMessage(byId(field.id + '-error'), message);
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  function setPasswordVisible(button, visible) {
    const field = byId(button.getAttribute('aria-controls'));
    const label = field.labels[0].textContent;
    field.type = visible ? 'text' : 'password';
    button.querySelector('use').setAttribute('href', visible ? '#icon-eye' : '#icon-eye-off');
    button.setAttribute('aria-label', label + (visible ? ' elrejtése' : ' megjelenítése'));
  }

  function showView(view, focus = true) {
    loginForm.hidden = view !== 'login';
    registerForm.hidden = view !== 'register';
    byId('google-option').hidden = view !== 'register';
    byId('registration-success').hidden = view !== 'success';
    document.querySelector('.demo-note').hidden = view === 'success';
    setMessage(byId('google-error'));
    for (const button of passwordToggles) setPasswordVisible(button, false);
    for (const field of validatedFields) showError(field);
    setMessage(byId('login-error'));
    setMessage(byId('register-error'));
    const titles = { login: 'Bejelentkezés', register: 'Regisztráció', success: 'Sikeres regisztráció' };
    heading.textContent = titles[view];
    document.title = heading.textContent + ' · TapsPont';
    if (focus) heading.focus();
  }

  const accountKey = username => username.trim().normalize('NFC').toLocaleLowerCase('hu');

  async function passwordFingerprint(password, salt) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({name: 'PBKDF2', hash: 'SHA-256', salt: Uint8Array.from(salt), iterations: 600000}, key, 256);
    return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  function validate(fields) {
    const invalid = fields.find(([, message]) => message);
    for (const [field, message] of fields) showError(field, message);
    invalid?.[0].focus();
    return !invalid;
  }

  const loginPopover = byId('login-popover');
  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting) return;
    const username = byId('login-username');
    const password = byId('login-password');
    const remember = byId('login-remember').checked;
    const key = accountKey(username.value);
    const passwordValue = password.value;
    const error = byId('login-error');
    setMessage(error);
    if (!validate([
      [username, key ? '' : 'Add meg a felhasználónevedet.'],
      [password, passwordValue ? '' : 'Add meg a jelszavadat.']
    ])) return;

    submitting = true;
    try {
      const accounts = loginPopover ? previewAccounts.load() : demoAccounts;
      const account = accounts.get(key);
      if (account && account.fingerprint === await passwordFingerprint(passwordValue, account.salt)) {
        if (!account.id) {
          account.id = crypto.randomUUID();
          previewAccounts.save(accounts);
        }
        openProfile(account, remember);
      } else {
        setMessage(error, 'Hibás felhasználónév vagy jelszó. Új próbafiókot a regisztrációs oldalon hozhatsz létre.');
      }
    } catch {
      setMessage(error, 'A belépés nem sikerült. Próbáld meg újra.');
    } finally {
      submitting = false;
    }
  });
  for (const button of passwordToggles) {
    button.addEventListener('click', () => {
      const field = byId(button.getAttribute('aria-controls'));
      setPasswordVisible(button, field.type === 'password');
    });
  }
  for (const field of validatedFields) {
    field.addEventListener('input', () => {
      showError(field);
      setMessage(byId(field.form === loginForm ? 'login-error' : 'register-error'));
    });
  }

  if (loginPopover) {
    document.querySelector('.profile-trigger').addEventListener('click', event => {
      if (!profileSession.get()) return;
      event.preventDefault();
      location.assign('profil.html');
    });
    byId('password-help').addEventListener('click', () => {
      setMessage(byId('password-help-message'), 'A jelszó-visszaállítás a helyi előnézetben nem érhető el.');
    });
    loginPopover.addEventListener('toggle', event => {
      if (event.newState === 'closed') setPasswordVisible(passwordToggles[0], false);
    });
    return;
  }

  function saveProfile({ id, name, picture, usernameKey }, remember) {
    profileSession.set({ id, name, picture, usernameKey, remember }, remember);
  }

  function openProfile(account, remember) {
    saveProfile(account, remember);
    if (loginPopover) location.assign('profil.html');
    else location.replace('profil.html');
  }

  function confirmRegistration(account, remember) {
    saveProfile(account, remember);
    registerForm.reset();
    loginForm.reset();
    byId('registration-message').textContent = 'A próbafiókod elkészült, és bejelentkeztél, ' + account.name + '.';
    showView('success');
  }

  if (profileSession.get()) {
    location.replace('profil.html');
    return;
  }
  if (new URLSearchParams(location.search).get('mod') === 'belepes') showView('login', false);

  byId('registration-logout').addEventListener('click', () => {
    profileSession.set(null);
    location.replace('index.html#felfedezes');
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted && !byId('registration-success').hidden && !profileSession.get()) showView('register', false);
  });

  registerForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting) return;
    const username = byId('register-username');
    const email = byId('register-email');
    const password = byId('register-password');
    const confirmation = byId('confirm-password');
    const age = byId('age');
    const remember = byId('register-remember').checked;
    const key = accountKey(username.value);
    const passwordValue = password.value;
    setMessage(byId('register-error'));
    if (!validate([
      [username, !key ? 'Adj meg egy felhasználónevet.' : demoAccounts.has(key) ? 'Ez a felhasználónév már foglalt.' : ''],
      [email, email.validity.valid ? '' : 'Adj meg egy érvényes e-mail-címet.'],
      [password, passwordValue.length < 8 ? 'Adj meg legalább 8 karaktert.' : ''],
      [confirmation, !confirmation.value ? 'Írd be újra a jelszót.' : passwordValue !== confirmation.value ? 'A két jelszó eltér.' : ''],
      [age, age.checked ? '' : 'Erősítsd meg, hogy elmúltál 18 éves.']
    ])) return;

    submitting = true;
    const name = username.value.trim();
    try {
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)));
      const fingerprint = await passwordFingerprint(passwordValue, salt);
      const account = { id: crypto.randomUUID(), name, fingerprint, salt, usernameKey: key };
      demoAccounts.set(key, account);
      try {
        previewAccounts.save(demoAccounts);
      } catch (error) {
        demoAccounts.delete(key);
        throw error;
      }
      confirmRegistration(account, remember);
    } catch {
      setMessage(byId('register-error'), 'A próbafiókot nem sikerült létrehozni. Próbáld meg újra.');
    } finally {
      submitting = false;
    }
  });


  for (const button of viewButtons) {
    button.addEventListener('click', () => {
      if (!submitting) showView(button.dataset.view);
    });
  }
  const googleButton = byId('google-button');
  const googleError = byId('google-error');
  const googleClientId = document.querySelector('meta[name="google-client-id"]').content.trim();
  const googleAccounts = new Map();
  let googleClient;
  let rememberGoogle = false;

  function finishGoogle(message = '') {
    submitting = false;
    googleButton.disabled = false;
    setMessage(googleError, message);
  }

  async function useGoogleProfile(token) {
    try {
      if (!token.access_token) throw new Error('Missing token');
      const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: 'Bearer ' + token.access_token }
      });
      if (!response.ok) throw new Error('Google profile lookup failed');
      const { sub, name, email, picture } = await response.json();
      if (!sub || !(name || email)) throw new Error('Incomplete Google profile');

      const account = googleAccounts.get(sub) ?? { id: 'google-' + sub, name: name || email, picture };
      googleAccounts.set(sub, account);
      confirmRegistration(account, rememberGoogle);
      finishGoogle();
    } catch {
      finishGoogle('A Google-belépés nem sikerült. Próbáld meg újra.');
    }
  }

  const googleOriginSupported = location.protocol === 'https:' ||
    (location.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname));
  if (googleClientId && googleOriginSupported) {
    const googleScript = document.createElement('script');
    googleScript.src = 'https://accounts.google.com/gsi/client';
    googleScript.addEventListener('load', () => {
      googleClient = globalThis.google?.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: 'openid email profile',
        include_granted_scopes: false,
        callback: useGoogleProfile,
        error_callback: ({ type }) => finishGoogle(type === 'popup_closed'
          ? 'A Google-fiókválasztás megszakadt.'
          : 'A Google bejelentkezőablaka nem nyílt meg.')
      });
    }, { once: true });
    document.head.append(googleScript);
  }

  googleButton.addEventListener('click', () => {
    if (submitting) return;
    if (!googleOriginSupported || !googleClientId) {
      setMessage(googleError, 'A Google-belépéshez beállított webcímen kell megnyitni a TapsPontot.');
      return;
    }
    if (!googleClient) {
      setMessage(googleError, 'A Google-belépés most nem érhető el. Próbáld meg később.');
      return;
    }

    submitting = true;
    rememberGoogle = byId('register-remember').checked;
    googleButton.disabled = true;
    setMessage(googleError);
    try {
      googleClient.requestAccessToken({ prompt: 'select_account' });
    } catch {
      finishGoogle('A Google bejelentkezőablaka nem nyílt meg.');
    }
  });

  for (const link of document.querySelectorAll('[data-info]')) {
    link.addEventListener('click', event => {
      event.preventDefault();
      byId('info-title').textContent = link.dataset.info;
      document.querySelector('dialog').showModal();
    });
  }
})();
