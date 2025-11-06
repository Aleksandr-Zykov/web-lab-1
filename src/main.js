import './styles/tw.css';
import './styles/main.scss';

import { initThemeToggle } from './js/common/theme.js';

initThemeToggle();

let cleanupFunction = () => {};
const page = document.body?.dataset.page;

const routes = {
  about: () =>
    import('./js/app/aboutPage.js').then((module) =>
      module
        .initAbout()
        .then((abortFn) => {
          cleanupFunction = abortFn;
          console.log('Ініціалізація About Page завершена. Функція скасування збережена.');
          return abortFn;
        })
    ),
};

if (page && routes[page]) {
  routes[page]().catch((error) => {
    console.error('Помилка ініціалізації сторінки:', error);
  });
}

// cleanupFunction();
