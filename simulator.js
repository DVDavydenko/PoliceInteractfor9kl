// Модуль екзамену: тестування учнів із випадковим набором запитань та аналітикою.
document.addEventListener('DOMContentLoaded', () => {
  // Повний банк запитань. Для кожного запитання вказано текст, варіанти, правильний індекс, тег та пояснення.
  const qData = [
    { text: "Який основний закон регулює діяльність Національної поліції України?", options: ["Кримінальний кодекс України", "Закон України «Про Національну поліцію»", "Кодекс законів про працю", "Конституція США"], correct: 1, tag: "закон", expl: "Діяльність поліції регулює Закон України «Про Національну поліцію» (№ 580-VIII)." },
    { text: "З якого віку громадянин України може вступити на службу в поліцію?", options: ["16 років", "18 років", "21 рік", "25 років"], correct: 1, tag: "вимоги", expl: "Відповідно до ст. 49 Закону, на службу в поліцію приймаються громадяни України віком від 18 років." },
    { text: "Що зобов’язаний зробити поліцейський, звертаючись до особи?", options: ["Показати зброю", "Назвати прізвище, посаду, звання та пред’явити службове посвідчення", "Одразу надягнути кайданки", "Нічого не пояснювати"], correct: 1, tag: "представлення", expl: "Стаття 18 Закону вимагає: поліцейський зобов’язаний назвати своє прізвище, посаду, спеціальне звання та пред’явити службове посвідчення." },
    { text: "Яке з цих повноважень НЕ належить поліції?", options: ["Охорона прав і свобод людини", "Винесення вироку за вбивство", "Протидія злочинності", "Регулювання дорожнього руху"], correct: 1, tag: "повноваження", expl: "Виносити вирок може лише суд. Поліція здійснює досудове розслідування." },
    { text: "Що таке «поліцейське піклування»?", options: ["Штраф за порушення", "Тимчасовий догляд за неповнолітніми або безпорадними особами", "Видача зброї", "Патрулювання на авто"], correct: 1, tag: "піклування", expl: "Згідно зі ст. 41, це превентивний захід для допомоги неповнолітнім, особам із психічними розладами або у стані сп’яніння." },
    { text: "У якому випадку поліцейський може застосувати вогнепальну зброю?", options: ["Для залякування натовпу", "Для відбиття нападу, що загрожує життю", "Якщо особа відмовляється показати паспорт", "Для зупинки велосипедиста"], correct: 1, tag: "зброя", expl: "Зброя застосовується лише у виняткових випадках: захист життя, відбиття нападу, затримання небезпечного злочинця (ст. 46)." },
    { text: "Яка максимальна тривалість адміністративного арешту?", options: ["5 діб", "10 діб", "15 діб", "30 діб"], correct: 2, tag: "відповідальність", expl: "Кодекс про адміністративні правопорушення передбачає арешт до 15 діб. До неповнолітніх арешт не застосовується." },
    { text: "Хто має право звільнити неповнолітнього працівника з ініціативи власника?", options: ["Тільки директор", "Директор за згодою служби у справах дітей", "Батьки", "Сам працівник"], correct: 1, tag: "праця", expl: "Звільнення неповнолітнього з ініціативи роботодавця потребує згоди служби у справах дітей." },
    { text: "Який документ повинен пред’явити поліцейський на вимогу громадянина?", options: ["Паспорт", "Службове посвідчення", "Водійські права", "Довідку про доходи"], correct: 1, tag: "представлення", expl: "Ст. 18 Закону: на вимогу особи поліцейський зобов’язаний пред’явити службове посвідчення." },
    { text: "У якому віці настає адміністративна відповідальність?", options: ["14 років", "16 років", "18 років", "21 рік"], correct: 1, tag: "відповідальність", expl: "Відповідно до ст. 12 КпАП, адміністративна відповідальність настає з 16 років." },
    { text: "Яке покарання НЕ може бути застосоване до неповнолітнього?", options: ["Штраф", "Громадські роботи", "Адміністративний арешт", "Попередження"], correct: 2, tag: "відповідальність", expl: "До неповнолітніх не застосовується адміністративний арешт (ст. 32 КпАП)." },
    { text: "Основним завданням Національної поліції є:", options: ["Збирання податків", "Служіння суспільству шляхом забезпечення охорони прав і свобод людини", "Контроль за кордоном", "Видача дозволів на зброю"], correct: 1, tag: "завдання", expl: "Ст. 2 Закону: завданням поліції є служіння суспільству шляхом забезпечення охорони прав і свобод людини, протидії злочинності, підтримання публічної безпеки і порядку." },
    // Додані питання
    { text: "Який підрозділ поліції займається кіберзлочинами?", options: ["Патрульна поліція", "Кіберполіція", "ДСНС", "Міграційна служба"], correct: 1, tag: "кібер", expl: "Боротьбою з кіберзлочинністю займається окремий підрозділ — Кіберполіція." },
    { text: "Що повинен зробити поліцейський на місці ДТП із постраждалими?", options: ["Забезпечити безпеку, викликати швидку та оформити ДТП", "Відразу штрафувати всіх учасників", "Ігнорувати постраждалих", "Тільки відвезти усіх до відділку"], correct: 0, tag: "дтп", expl: "Першочергово слід убезпечити місце події, викликати медиків, надати допомогу постраждалим та задокументувати ДТП." },
    { text: "Під час комендантської години поліцейський зупинив волонтера без перепустки. Що слід зробити?", options: ["Порахувати причину та відпустити з попередженням", "Одразу затримати та застосувати силу", "Ігнорувати порушення", "Виписати штраф без з’ясування причин"], correct: 0, tag: "комендантська", expl: "У першу чергу слід з’ясувати обставини та зробити попередження, зафіксувавши дані." },
    { text: "Що НЕ є прикладом кіберзлочину?", options: ["Фішинг", "Шантаж у соцмережах", "Спам", "Порушення правил дорожнього руху"], correct: 3, tag: "кібер", expl: "Порушення ПДР — це адміністративне порушення, а не кіберзлочин." }
  ];

  const MAX_QUESTIONS = 12; // Кількість запитань у тесті
  let testActive = false;
  let testEnded = false;
  let shuffledQuestions = [];
  let userAnswers = [];
  let currentQ = 0;
  let timeLeft = 20 * 60; // 20 хвилин
  let timer = null;

  // DOM елементи
  const studentNameInput = document.getElementById('studentName');
  const startTestBtn = document.getElementById('startTestBtn');
  const nameError = document.getElementById('nameError');
  const testArea = document.getElementById('testArea');
  const finalScreen = document.getElementById('finalTestScreen');
  const resultsPanel = document.getElementById('resultsPanel');
  const timerDisplay = document.getElementById('timerDisplay');
  const currentQSpan = document.getElementById('currentQSpan');
  const totalQSpan = document.getElementById('totalQSpan');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const testExplanation = document.getElementById('testExplanation');
  const nextTestBtn = document.getElementById('nextTestBtn');
  const prevTestBtn = document.getElementById('prevTestBtn');
  const progressFill = document.getElementById('progressFill');
  const finalScore = document.getElementById('finalScore');
  const analyticsPanel = document.getElementById('analyticsPanel');
  const reportStatus = document.getElementById('reportStatus');
  const viewResultsBtn = document.getElementById('viewResultsBtn');
  const resultsBody = document.getElementById('resultsBody');
  const clearResultsBtn = document.getElementById('clearResultsBtn');
  const gasUrlInput = document.getElementById('gasUrlInput');
  const gasSecretInput = document.getElementById('gasSecretInput');
  const saveGasUrlBtn = document.getElementById('saveGasUrl');
  const gasStatus = document.getElementById('gasStatus');

  // Допоміжна функція перемішування масиву
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Перевірка, чи ім'я вже використовувалось
  function isNameUsed(name) {
    const saved = JSON.parse(localStorage.getItem('policeExamResults') || '[]');
    return saved.some(entry => entry.name === name);
  }

  // Завантажити збережені налаштування GAS
  gasUrlInput.value = localStorage.getItem('gasUrl') || '';
  gasSecretInput.value = localStorage.getItem('gasSecret') || '';
  gasStatus.textContent = gasUrlInput.value ? 'URL збережено' : '';
  saveGasUrlBtn.addEventListener('click', () => {
    const url = gasUrlInput.value.trim();
    const secret = gasSecretInput.value.trim();
    if (url) {
      localStorage.setItem('gasUrl', url);
      gasStatus.textContent = 'URL збережено';
    } else {
      localStorage.removeItem('gasUrl');
      gasStatus.textContent = 'URL видалено';
    }
    if (secret) {
      localStorage.setItem('gasSecret', secret);
    } else {
      localStorage.removeItem('gasSecret');
    }
  });

  // Обробник запуску екзамену
  startTestBtn.addEventListener('click', () => {
    const name = studentNameInput.value.trim();
    if (!name) {
      nameError.textContent = 'Будь ласка, введіть ім’я.';
      nameError.style.display = 'block';
      return;
    }
    if (isNameUsed(name)) {
      nameError.textContent = 'Це ім’я вже використовувалось для проходження екзамену. Введіть інше або очистіть результати.';
      nameError.style.display = 'block';
      return;
    }
    nameError.style.display = 'none';
    startExam();
  });

  // Запуск екзамену: ініціалізуємо стан і показуємо перше питання
  function startExam() {
    testActive = true;
    testEnded = false;
    // Перемішуємо питання та відбираємо необхідну кількість
    shuffledQuestions = shuffleArray([...qData]).slice(0, MAX_QUESTIONS);
    userAnswers = new Array(shuffledQuestions.length).fill(null);
    currentQ = 0;
    timeLeft = 20 * 60;
    totalQSpan.textContent = shuffledQuestions.length;
    updateTimerDisplay();
    // Запускаємо таймер
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        finishExam();
      }
    }, 1000);
    // UI
    document.querySelector('.student-input').classList.add('hidden');
    testArea.classList.remove('hidden');
    finalScreen.classList.add('hidden');
    resultsPanel.classList.add('hidden');
    renderQuestion();
  }

  // Оновлення відображення таймера
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    if (timeLeft < 60) {
      timerDisplay.classList.add('warning');
    } else {
      timerDisplay.classList.remove('warning');
    }
  }

  // Відобразити поточне питання й варіанти
  function renderQuestion() {
    if (testEnded) return;
    const q = shuffledQuestions[currentQ];
    currentQSpan.textContent = currentQ + 1;
    questionText.textContent = q.text;
    // Перемішуємо варіанти, але запам’ятовуємо індекси
    const options = q.options.map((text, idx) => ({ text, originalIndex: idx }));
    shuffleArray(options);
    optionsContainer.innerHTML = '';
    testExplanation.textContent = '';
    const savedAnswer = userAnswers[currentQ];
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => selectAnswer(opt.originalIndex, btn));
      if (savedAnswer !== null) {
        btn.disabled = true;
        if (opt.originalIndex === q.correct) {
          btn.classList.add('correct');
        } else if (opt.originalIndex === savedAnswer && savedAnswer !== q.correct) {
          btn.classList.add('wrong');
        }
      }
      optionsContainer.appendChild(btn);
    });
    if (savedAnswer !== null) {
      testExplanation.textContent = `💡 ${q.expl}`;
      nextTestBtn.disabled = false;
    } else {
      nextTestBtn.disabled = true;
    }
    // Вмикаємо/вимикаємо кнопку "Назад"
    prevTestBtn.disabled = currentQ === 0;
    // Оновлюємо прогрес бар
    progressFill.style.width = `${(currentQ / shuffledQuestions.length) * 100}%`;
  }

  // Обробити вибір відповіді
  function selectAnswer(originalIndex, btn) {
    if (testEnded || userAnswers[currentQ] !== null) return;
    const q = shuffledQuestions[currentQ];
    userAnswers[currentQ] = originalIndex;
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    allBtns.forEach(b => {
      const optText = b.textContent;
      const correctText = q.options[q.correct];
      if (optText === correctText) {
        b.classList.add('correct');
      } else if (b === btn && originalIndex !== q.correct) {
        b.classList.add('wrong');
      }
    });
    testExplanation.textContent = `💡 ${q.expl}`;
    nextTestBtn.disabled = false;
  }

  // Кнопка "Далі"
  nextTestBtn.addEventListener('click', () => {
    if (currentQ < shuffledQuestions.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      finishExam();
    }
  });

  // Кнопка "Назад"
  prevTestBtn.addEventListener('click', () => {
    if (currentQ > 0) {
      currentQ--;
      renderQuestion();
    }
  });

  // Завершення тесту: підрахунок балів, аналітика та відправка результату
  function finishExam() {
    if (testEnded) return;
    testEnded = true;
    clearInterval(timer);
    let score = 0;
    const wrongTags = [];
    shuffledQuestions.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans === q.correct) {
        score++;
      } else {
        wrongTags.push(q.tag);
      }
    });
    const name = studentNameInput.value.trim();
    const result = {
      name,
      score,
      total: shuffledQuestions.length,
      date: new Date().toLocaleString()
    };
    // Зберігаємо у localStorage
    const saved = JSON.parse(localStorage.getItem('policeExamResults') || '[]');
    saved.push(result);
    localStorage.setItem('policeExamResults', JSON.stringify(saved));
    // Оновлюємо UI
    testArea.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    finalScore.textContent = `Ви набрали ${score} з ${shuffledQuestions.length}.`;
    // Розумна аналітика
    const uniqueTags = [...new Set(wrongTags)];
    const tagNames = {
      'закон': 'Основний закон',
      'вимоги': 'Вимоги до поліцейських',
      'представлення': 'Правила представлення',
      'повноваження': 'Повноваження поліції',
      'піклування': 'Поліцейське піклування',
      'зброя': 'Застосування зброї',
      'відповідальність': 'Адміністративна відповідальність',
      'праця': 'Праця неповнолітніх',
      'завдання': 'Завдання поліції',
      'кібер': 'Кібербезпека',
      'дтп': 'Дорожньо-транспортні пригоди',
      'комендантська': 'Комендантська година'
    };
    const topics = uniqueTags.map(t => tagNames[t] || t).join(', ');
    analyticsPanel.innerHTML = wrongTags.length === 0
      ? '😊 Чудово! Помилок немає.'
      : `⚠️ <strong>Рекомендація:</strong> зверніть увагу на теми: ${topics}.`;
    // Відправка звіту в Telegram через GAS
    const gasUrl = localStorage.getItem('gasUrl');
    const secret = localStorage.getItem('gasSecret');
    if (gasUrl) {
      fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report: {
            name: name,
            score: score,
            total: shuffledQuestions.length,
            date: result.date,
            wrongTags: uniqueTags.map(t => tagNames[t] || t)
          },
          secret: secret || undefined
        })
      })
        .then(() => { reportStatus.textContent = 'Звіт надіслано в Telegram.'; })
        .catch(() => { reportStatus.textContent = 'Не вдалося надіслати звіт. Перевірте налаштування.'; });
    } else {
      reportStatus.textContent = '';
    }
    testActive = false;
  }

  // Перегляд результатів
  viewResultsBtn.addEventListener('click', () => {
    resultsPanel.classList.remove('hidden');
    renderResults();
  });
  function renderResults() {
    const data = JSON.parse(localStorage.getItem('policeExamResults') || '[]');
    resultsBody.innerHTML = data.map(r => `<tr><td>${r.name}</td><td>${r.score}/${r.total}</td><td>${r.date}</td></tr>`).join('');
  }
  // Очищення результатів
  clearResultsBtn.addEventListener('click', () => {
    if (confirm('Ви впевнені, що хочете видалити всі результати? Після цього учні зможуть повторно пройти екзамен.')) {
      localStorage.removeItem('policeExamResults');
      renderResults();
    }
  });
  // Якщо відкрили модуль екзамену, а тест не активний, показати форму введення
  const testNavBtn = document.querySelector('[data-module="test"]');
  if (testNavBtn) {
    testNavBtn.addEventListener('click', () => {
      if (!testActive && !testEnded) {
        document.querySelector('.student-input').classList.remove('hidden');
        testArea.classList.add('hidden');
        finalScreen.classList.add('hidden');
        resultsPanel.classList.add('hidden');
      }
    });
  }
});