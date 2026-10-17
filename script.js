document.querySelector('#helloBtn').addEventListener('click', () => {
  document.querySelector('#status').textContent = 'Hello from GitHub Pages!';
});

document.querySelector('#themeBtn').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  document.querySelector('#themeBtn').textContent = isDark ? '☀️ โหมดสว่าง' : '🌙 สลับธีม';
});