// Навігація між модулями
document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  const modules = document.querySelectorAll('.module');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      modules.forEach(m => m.classList.remove('active'));
      const target = document.getElementById(btn.dataset.module);
      if (target) target.classList.add('active');
    });
  });

  // Перемикач теми
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌙 Темна тема' : '☀️ Світла тема';
  });
});
