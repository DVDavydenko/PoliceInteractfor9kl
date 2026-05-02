// Слайди теорії
document.addEventListener('DOMContentLoaded', () => {
  const theoryContainer = document.getElementById('theory');
  // Вставляємо HTML слайдів (можна було б з JS, але зробимо через шаблон)
  theoryContainer.innerHTML = `
    <div class="card">
      <div class="slide active" id="slide1">
        <h2>1. Служіння суспільству</h2>
        <p>Національна поліція України — це центральний орган виконавчої влади, який <span class="term" data-term="service">служить суспільству</span> шляхом забезпечення охорони прав і свобод людини, протидії злочинності, підтримання публічної безпеки і порядку.</p>
        <div class="card" style="margin-top:1rem;">
          <p><strong>💡 Міні-перевірка:</strong></p>
          <p>Головне завдання поліції:</p>
          <button class="option-btn" data-correct="true">А) Служіння суспільству</button>
          <button class="option-btn">Б) Виключно затримання злочинців</button>
          <button class="option-btn">В) Контроль за армією</button>
          <div class="explanation" style="display:none; margin-top:0.5rem; color:#93e9a6;"></div>
        </div>
      </div>
      <div class="slide" id="slide2">
        <h2>2. Права та обов'язки поліцейського</h2>
        <p>Згідно зі ст.18 Закону, поліцейський зобов’язаний <span class="term" data-term="present">представитися</span>: назвати прізвище, посаду, спеціальне звання та пред’явити службове посвідчення. Він має право на <span class="term" data-term="preventive">превентивні заходи</span>.</p>
        <div class="card">
          <p><strong>💡 Міні-перевірка:</strong></p>
          <p>Поліцейський при зверненні до громадянина зобов'язаний:</p>
          <button class="option-btn">А) Показати зброю</button>
          <button class="option-btn" data-correct="true">Б) Назвати прізвище, посаду, звання та пред'явити посвідчення</button>
          <button class="option-btn">В) Одразу застосувати кайданки</button>
          <div class="explanation" style="display:none; margin-top:0.5rem; color:#93e9a6;"></div>
        </div>
      </div>
      <div class="slide" id="slide3">
        <h2>3. Застосування сили та зброї</h2>
        <p>Поліцейський може застосовувати фізичну силу, спецзасоби та вогнепальну зброю <strong>лише</strong> у випадках, прямо передбачених законом. Вогнепальна зброя – крайній захід.</p>
        <div class="card">
          <p><strong>💡 Міні-перевірка:</strong></p>
          <p>Поліцейський може застосувати вогнепальну зброю для:</p>
          <button class="option-btn" data-correct="true">А) Відбиття нападу, що загрожує життю</button>
          <button class="option-btn">Б) Розгону мирної демонстрації</button>
          <button class="option-btn">В) Залякування підозрюваного</button>
          <div class="explanation" style="display:none; margin-top:0.5rem; color:#93e9a6;"></div>
        </div>
      </div>
      <div class="slide-controls">
        <button class="btn" id="prevSlide">⬅️ Назад</button>
        <span id="slideIndicator">1 / 3</span>
        <button class="btn" id="nextSlide">Далі ➡️</button>
      </div>
    </div>
    <div class="card" style="text-align:center;">
      <button class="btn" id="speakBtn">🔊 Озвучити слайд</button>
    </div>
  `;

  // Терміни
  window.terms = {
    service: { title: 'Служіння суспільству', desc: 'Головний принцип діяльності поліції: захист прав і свобод людини (ст.2 Закону).' },
    present: { title: 'Представлення', desc: 'Поліцейський зобов’язаний назвати прізвище, посаду, звання та пред’явити посвідчення (ст.18).' },
    preventive: { title: 'Превентивний захід', desc: 'Дія, що обмежує права для запобігання правопорушенням (ст.31).' }
  };
  window.showTerm = (key) => {
    const t = window.terms[key];
    document.getElementById('termTitle').textContent = t.title;
    document.getElementById('termDesc').textContent = t.desc;
    document.getElementById('termPopup').classList.remove('hidden');
  };
  window.closeTerm = () => document.getElementById('termPopup').classList.add('hidden');

  // Обробка кліків на терміни
  document.querySelectorAll('.term').forEach(el => {
    el.addEventListener('click', () => showTerm(el.dataset.term));
  });

  // Слайди
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const showSlide = (i) => {
    slides.forEach(s => s.classList.remove('active'));
    slides[i].classList.add('active');
    document.getElementById('slideIndicator').textContent = `${i+1} / ${slides.length}`;
  };
  document.getElementById('nextSlide').addEventListener('click', () => {
    if (currentSlide < slides.length-1) { currentSlide++; showSlide(currentSlide); }
  });
  document.getElementById('prevSlide').addEventListener('click', () => {
    if (currentSlide > 0) { currentSlide--; showSlide(currentSlide); }
  });

  // Міні-перевірки
  window.checkMini = (btn, correct) => {
    const card = btn.closest('.card');
    const btns = card.querySelectorAll('.option-btn');
    const expl = card.querySelector('.explanation');
    btns.forEach(b => b.disabled = true);
    if (correct) {
      btn.classList.add('correct');
      expl.textContent = '✅ Правильно!';
    } else {
      btn.classList.add('wrong');
      expl.textContent = '❌ Помилка.';
      btns.forEach(b => { if (b.dataset.correct === 'true') b.classList.add('correct'); });
    }
    expl.style.display = 'block';
  };
  document.querySelectorAll('#theory .option-btn').forEach(btn => {
    btn.addEventListener('click', () => checkMini(btn, btn.dataset.correct === 'true'));
  });

  // Озвучення
  document.getElementById('speakBtn').addEventListener('click', () => {
    const text = slides[currentSlide].innerText;
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  });
});
