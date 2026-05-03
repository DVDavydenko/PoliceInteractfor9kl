// scripts/app.js
// Відповідає тільки за навігацію між модулями та перемикання теми.

document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  const modules = document.querySelectorAll('.module');
  const themeToggle = document.getElementById('themeToggle');

  function showModule(moduleId) {
    modules.forEach(module => {
      module.classList.toggle('active', module.id === moduleId);
    });

    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.module === moduleId);
    });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.module;
      const target = document.getElementById(targetId);

      if (!target) {
        console.error('Модуль не знайдено:', targetId);
        return;
      }

      showModule(targetId);
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      themeToggle.textContent = document.body.classList.contains('light')
        ? '🌙 Темна тема'
        : '☀️ Світла тема';
    });
  }
});
