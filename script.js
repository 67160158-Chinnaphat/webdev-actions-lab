document.querySelector('#helloBtn').addEventListener('click', () => {
  document.querySelector('#status').textContent =
    'สวัสดีครับ ผมชินภัทร เบลเลอร์ รหัส 67160158 | คณะวิทยาการสารสนเทศ สาขา AAI | งานอดิเรก: เตะฟุตบอล ⚽';
});

document.querySelector('#themeBtn').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  document.querySelector('#themeBtn').textContent = isDark ? '☀️ โหมดสว่าง' : '🌙 สลับธีม';
});