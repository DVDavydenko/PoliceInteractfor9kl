// Основна логіка для перемикання модулів та теми.
document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  const modules = document.querySelectorAll('.module');

  // Перемикання між модулями
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      modules.forEach(m => m.classList.remove('active'));
      const target = document.getElementById(btn.dataset.module);
      if (target) target.classList.add('active');
    });
  });

  // Перемикач теми: змінює клас на <body> і текст кнопки
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const light = document.body.classList.contains('light');
    themeToggle.textContent = light ? '🌙 Темна тема' : '☀️ Світла тема';
  });
});