// Реєстрація Service Worker для підтримки PWA.
// Цей файл замінює базову реалізацію, щоб він спрацьовував для каталогу "police-improved".
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Файл service-worker.js знаходиться в корені каталогу police‑improved
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      // Помилка реєстрації не є критичною, тому нічого не робимо
    });
  });
}