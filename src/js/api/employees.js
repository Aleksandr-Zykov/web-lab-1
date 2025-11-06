export async function loadEmployees(limit = 3, { signal } = {}) {
  const url = `https://jsonplaceholder.typicode.com/users?_limit=${limit}`;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const users = await res.json();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    role: user.company?.catchPhrase ?? 'Team member',
    profileUrl: `https://jsonplaceholder.typicode.com/users/${user.id}`,
    photo: `https://picsum.photos/seed/emp-${user.id}/640/400`,
  }));
}
