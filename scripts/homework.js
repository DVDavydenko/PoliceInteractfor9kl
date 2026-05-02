document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submitHomework').addEventListener('click', () => {
    const text = document.getElementById('homeworkText').value.trim();
    if (!text) return alert('Введіть текст');
    const works = JSON.parse(localStorage.getItem('homework') || '[]');
    works.push({ name: document.getElementById('studentName')?.value || 'Анонім', text, date: new Date().toLocaleString() });
    localStorage.setItem('homework', JSON.stringify(works));
    document.getElementById('homeworkSavedMsg').style.display = 'block';
  });
});
