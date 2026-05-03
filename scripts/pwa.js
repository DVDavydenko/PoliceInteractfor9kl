// scripts/pwa.js
// Відповідає тільки за реєстрацію Service Worker.

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        registration.update();
      })
      .catch(error => {
        console.warn('Service Worker не зареєстровано:', error);
      });
  });
}
