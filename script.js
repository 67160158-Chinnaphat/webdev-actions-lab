document.querySelector('#helloBtn').addEventListener('click', () => {
  document.querySelector('#status').textContent = '👋';
  document.querySelector('#info').classList.remove('hidden');
});

document.querySelector('#themeBtn').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  document.querySelector('#themeBtn').textContent = isDark ? '☀️ โหมดสว่าง' : '🌙 สลับธีม';
});