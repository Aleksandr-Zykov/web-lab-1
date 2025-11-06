import { loadEmployees } from '../api/employees.js';
import { renderEmployeeCard } from '../ui/employeeCard.js';

export const initAbout = async () => {
  const list = document.querySelector('.team__list');
  const tpl = document.getElementById('employee-card-tpl');

  if (!list || !(tpl instanceof HTMLTemplateElement)) {
    console.warn('Team section is not present on the page.');
    return () => {};
  }

  const controller = new AbortController();

  try {
    const employees = await loadEmployees(6, { signal: controller.signal });

    const fragment = document.createDocumentFragment();
    for (const employee of employees) {
      fragment.append(renderEmployeeCard(tpl, employee));
    }

    list.innerHTML = '';
    list.append(fragment);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Помилка завантаження співробітників:', error);
    }
  } finally {
    console.log('finally');
  }

  return () => controller.abort();
};
