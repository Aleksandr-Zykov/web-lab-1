import './styles/tw.css';
import './styles/main.scss';

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
  const toggle = document.querySelector('[data-theme-toggle]');
  const label = toggle?.querySelector('[data-theme-label]');
  const isDark = mode === 'dark';

  root.classList.toggle('dark', isDark);

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark));
  }

  if (label) {
    label.textContent = isDark ? 'Світла тема' : 'Темна тема';
  }
};

const initialTheme = resolveInitialTheme();
applyTheme(initialTheme);

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const toggle = target.closest('[data-theme-toggle]');
  if (!toggle) {
    return;
  }

  const isDark = root.classList.toggle('dark');
  const mode = isDark ? 'dark' : 'light';
  storeTheme(mode);
  applyTheme(mode);
});
