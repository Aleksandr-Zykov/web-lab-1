export const renderEmployeeCard = (tpl, emp) => {
  const node = tpl.content.cloneNode(true);
  const img = node.querySelector('.employee-card__photo');
  const name = node.querySelector('.employee-card__name');
  const role = node.querySelector('.employee-card__role');
  const cta = node.querySelector('.employee-card__cta');

  if (img) {
    img.src = emp.photo;
    img.alt = `Фото: ${emp.name}`;
  }

  if (name) {
    name.textContent = emp.name;
  }

  if (role) {
    role.textContent = emp.role;
  }

  if (cta) {
    cta.href = emp.profileUrl;
  }

  return node;
};
