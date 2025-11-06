const root = document.documentElement;
const storageKey = 'theme-preference';

const getStoredTheme = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
};

const storeTheme = (value) => {
  try {
    localStorage.setItem(storageKey, value);
  } catch (error) {
    
  }
};

const resolveInitialTheme = () => {
  const stored = getStoredTheme();
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (mode) => {
  const isDark = mode === 'dark';

  root.classList.toggle('dark', isDark);

  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark));
    const label = toggle.querySelector('[data-theme-label]');
    if (label) {
      label.textContent = isDark ? 'Світла тема' : 'Темна тема';
    }
  }
};

const handleToggleClick = (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const toggle = target.closest('[data-theme-toggle]');
  if (!toggle) {
    return;
  }

  const isDark = !root.classList.contains('dark');
  const mode = isDark ? 'dark' : 'light';

  applyTheme(mode);
  storeTheme(mode);
};

let initialized = false;

export const initThemeToggle = () => {
  if (initialized) {
    return;
  }
  initialized = true;

  const initialTheme = resolveInitialTheme();
  applyTheme(initialTheme);

  document.addEventListener('click', handleToggleClick);
};
