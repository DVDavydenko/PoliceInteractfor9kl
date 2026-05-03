// scripts/exam.js
// Модуль екзамену з універсальним звітом у GAS → Telegram-канал.

document.addEventListener('DOMContentLoaded', () => {
  // =====================================================
  // КОНФІГУРАЦІЯ ПРОЄКТУ
  // =====================================================
  // Учні цього не бачать. Для наступних проєктів змінюються тільки ці поля.
  const PROJECT_CONFIG = {
    gasUrl: 'https://script.google.com/macros/s/AKfycbwRbbNLhmzBU2ibivB_gt35glvZCHOvGOYFHim54qp_uqCK-JPFCIbjznwCb95dcml9/exec',
    secret: 'school_reports_2026_secret',
    projectId: 'police-9kl',
    subject: 'Основи правознавства',
    topic: 'Нова українська поліція',
    workType: 'Інтерактивний екзамен'
  };

  const MAX_QUESTIONS = 12;
  const TIME_LIMIT_SECONDS = 20 * 60;

  // =====================================================
  // БАНК ПИТАНЬ
  // =====================================================
  const qData = [
    {
      text: 'Який основний закон регулює діяльність Національної поліції України?',
      options: ['Кримінальний кодекс України', 'Закон України «Про Національну поліцію»', 'Кодекс законів про працю', 'Конституція США'],
      correct: 1,
      tag: 'закон',
      expl: 'Діяльність поліції регулює Закон України «Про Національну поліцію» (№ 580-VIII).'
    },
    {
      text: 'З якого віку громадянин України може вступити на службу в поліцію?',
      options: ['16 років', '18 років', '21 рік', '25 років'],
      correct: 1,
      tag: 'вимоги',
      expl: 'Відповідно до ст. 49 Закону, на службу в поліцію приймаються громадяни України віком від 18 років.'
    },
    {
      text: 'Що зобов’язаний зробити поліцейський, звертаючись до особи?',
      options: ['Показати зброю', 'Назвати прізвище, посаду, звання та пред’явити службове посвідчення', 'Одразу надягнути кайданки', 'Нічого не пояснювати'],
      correct: 1,
      tag: 'представлення',
      expl: 'Стаття 18 Закону вимагає: поліцейський зобов’язаний назвати своє прізвище, посаду, спеціальне звання та пред’явити службове посвідчення.'
    },
    {
      text: 'Яке з цих повноважень НЕ належить поліції?',
      options: ['Охорона прав і свобод людини', 'Винесення вироку за вбивство', 'Протидія злочинності', 'Регулювання дорожнього руху'],
      correct: 1,
      tag: 'повноваження',
      expl: 'Виносити вирок може лише суд. Поліція здійснює досудове розслідування.'
    },
    {
      text: 'Що таке «поліцейське піклування»?',
      options: ['Штраф за порушення', 'Тимчасовий догляд за неповнолітніми або безпорадними особами', 'Видача зброї', 'Патрулювання на авто'],
      correct: 1,
      tag: 'піклування',
      expl: 'Згідно зі ст. 41, це превентивний захід для допомоги неповнолітнім, особам із психічними розладами або у стані сп’яніння.'
    },
    {
      text: 'У якому випадку поліцейський може застосувати вогнепальну зброю?',
      options: ['Для залякування натовпу', 'Для відбиття нападу, що загрожує життю', 'Якщо особа відмовляється показати паспорт', 'Для зупинки велосипедиста'],
      correct: 1,
      tag: 'зброя',
      expl: 'Зброя застосовується лише у виняткових випадках: захист життя, відбиття нападу, затримання небезпечного злочинця (ст. 46).'
    },
    {
      text: 'Яка максимальна тривалість адміністративного арешту?',
      options: ['5 діб', '10 діб', '15 діб', '30 діб'],
      correct: 2,
      tag: 'відповідальність',
      expl: 'Кодекс про адміністративні правопорушення передбачає арешт до 15 діб. До неповнолітніх арешт не застосовується.'
    },
    {
      text: 'Хто має право звільнити неповнолітнього працівника з ініціативи власника?',
      options: ['Тільки директор', 'Директор за згодою служби у справах дітей', 'Батьки', 'Сам працівник'],
      correct: 1,
      tag: 'праця',
      expl: 'Звільнення неповнолітнього з ініціативи роботодавця потребує згоди служби у справах дітей.'
    },
    {
      text: 'Який документ повинен пред’явити поліцейський на вимогу громадянина?',
      options: ['Паспорт', 'Службове посвідчення', 'Водійські права', 'Довідку про доходи'],
      correct: 1,
      tag: 'представлення',
      expl: 'Ст. 18 Закону: на вимогу особи поліцейський зобов’язаний пред’явити службове посвідчення.'
    },
    {
      text: 'У якому віці настає адміністративна відповідальність?',
      options: ['14 років', '16 років', '18 років', '21 рік'],
      correct: 1,
      tag: 'відповідальність',
      expl: 'Відповідно до ст. 12 КпАП, адміністративна відповідальність настає з 16 років.'
    },
    {
      text: 'Яке покарання НЕ може бути застосоване до неповнолітнього?',
      options: ['Штраф', 'Громадські роботи', 'Адміністративний арешт', 'Попередження'],
      correct: 2,
      tag: 'відповідальність',
      expl: 'До неповнолітніх не застосовується адміністративний арешт.'
    },
    {
      text: 'Основним завданням Національної поліції є:',
      options: ['Збирання податків', 'Служіння суспільству шляхом забезпечення охорони прав і свобод людини', 'Контроль за кордоном', 'Видача дозволів на зброю'],
      correct: 1,
      tag: 'завдання',
      expl: 'Ст. 2 Закону: завданням поліції є служіння суспільству шляхом забезпечення охорони прав і свобод людини, протидії злочинності, підтримання публічної безпеки і порядку.'
    }
  ];

  // =====================================================
  // СТАН ТЕСТУ
  // =====================================================
  let testActive = false;
  let testEnded = false;
  let shuffledQuestions = [];
  let userAnswers = [];
  let currentQ = 0;
  let timeLeft = TIME_LIMIT_SECONDS;
  let timer = null;

  // =====================================================
  // DOM
  // =====================================================
  const studentLastNameInput = document.getElementById('studentLastName');
  const studentFirstNameInput = document.getElementById('studentFirstName');
  const studentClassInput = document.getElementById('studentClass');
  const startTestBtn = document.getElementById('startTestBtn');
  const nameError = document.getElementById('nameError');
  const studentStartPanel = document.getElementById('studentStartPanel') || document.querySelector('.student-input');

  const testArea = document.getElementById('testArea');
  const finalScreen = document.getElementById('finalTestScreen');
  const timerDisplay = document.getElementById('timerDisplay');
  const currentQSpan = document.getElementById('currentQSpan');
  const totalQSpan = document.getElementById('totalQSpan');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const testExplanation = document.getElementById('testExplanation');
  const nextTestBtn = document.getElementById('nextTestBtn');
  const progressFill = document.getElementById('progressFill');
  const finalScore = document.getElementById('finalScore');
  const analyticsPanel = document.getElementById('analyticsPanel');
  const reportStatus = document.getElementById('reportStatus');

  if (!studentLastNameInput || !studentFirstNameInput || !studentClassInput || !startTestBtn || !testArea || !finalScreen) {
    console.error('Модуль екзамену не ініціалізовано: перевірте index.html та id елементів.');
    return;
  }

  const tagNames = {
    закон: 'Основний закон',
    вимоги: 'Вимоги до поліцейських',
    представлення: 'Правила представлення',
    повноваження: 'Повноваження поліції',
    піклування: 'Поліцейське піклування',
    зброя: 'Застосування зброї',
    відповідальність: 'Адміністративна відповідальність',
    праця: 'Праця неповнолітніх',
    завдання: 'Завдання поліції'
  };

  function normalizeText(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
  }

  function buildStudentData() {
    const lastName = normalizeText(studentLastNameInput.value);
    const firstName = normalizeText(studentFirstNameInput.value);
    const className = normalizeText(studentClassInput.value);

    return {
      lastName,
      firstName,
      className,
      fullName: `${lastName} ${firstName}`.trim(),
      studentKey: `${className}|${lastName}|${firstName}`.toLowerCase()
    };
  }

  function isStudentUsed(studentKey) {
    const saved = JSON.parse(localStorage.getItem('policeExamResults') || '[]');
    return saved.some(entry => entry.studentKey === studentKey);
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function showError(message) {
    nameError.textContent = message;
    nameError.style.display = 'block';
  }

  function hideError() {
    nameError.textContent = '';
    nameError.style.display = 'none';
  }

  startTestBtn.addEventListener('click', () => {
    const student = buildStudentData();

    if (!student.lastName) {
      showError('Будь ласка, введіть прізвище.');
      return;
    }

    if (!student.firstName) {
      showError('Будь ласка, введіть ім’я.');
      return;
    }

    if (!student.className) {
      showError('Будь ласка, введіть клас.');
      return;
    }

    if (isStudentUsed(student.studentKey)) {
      showError('Цей учень уже проходив екзамен на цьому пристрої.');
      return;
    }

    hideError();
    startExam();
  });

  function startExam() {
    testActive = true;
    testEnded = false;
    currentQ = 0;
    timeLeft = TIME_LIMIT_SECONDS;

    shuffledQuestions = shuffleArray([...qData]).slice(0, MAX_QUESTIONS);
    userAnswers = new Array(shuffledQuestions.length).fill(null);

    if (totalQSpan) totalQSpan.textContent = shuffledQuestions.length;

    clearInterval(timer);
    updateTimerDisplay();

    timer = setInterval(() => {
      timeLeft -= 1;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        finishExam();
      }
    }, 1000);

    studentStartPanel.classList.add('hidden');
    testArea.classList.remove('hidden');
    finalScreen.classList.add('hidden');

    renderQuestion();
  }

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

  function renderQuestion() {
    if (testEnded) return;

    const q = shuffledQuestions[currentQ];

    currentQSpan.textContent = currentQ + 1;
    questionText.textContent = q.text;

    const options = q.options.map((text, idx) => ({
      text,
      originalIndex: idx
    }));

    shuffleArray(options);

    optionsContainer.innerHTML = '';
    testExplanation.textContent = '';

    const savedAnswer = userAnswers[currentQ];

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
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

    progressFill.style.width = `${(currentQ / shuffledQuestions.length) * 100}%`;
  }

  function selectAnswer(originalIndex, selectedBtn) {
    if (testEnded || userAnswers[currentQ] !== null) return;

    const q = shuffledQuestions[currentQ];
    userAnswers[currentQ] = originalIndex;

    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(btn => {
      btn.disabled = true;

      if (btn.textContent === q.options[q.correct]) {
        btn.classList.add('correct');
      } else if (btn === selectedBtn && originalIndex !== q.correct) {
        btn.classList.add('wrong');
      }
    });

    testExplanation.textContent = `💡 ${q.expl}`;
    nextTestBtn.disabled = false;
  }

  nextTestBtn.addEventListener('click', () => {
    if (currentQ < shuffledQuestions.length - 1) {
      currentQ += 1;
      renderQuestion();
    } else {
      finishExam();
    }
  });

  function finishExam() {
    if (testEnded) return;

    testEnded = true;
    testActive = false;
    clearInterval(timer);

    let score = 0;
    const wrongTags = [];

    shuffledQuestions.forEach((q, idx) => {
      const answer = userAnswers[idx];

      if (answer === q.correct) {
        score += 1;
      } else {
        wrongTags.push(q.tag);
      }
    });

    const uniqueTags = [...new Set(wrongTags)];
    const wrongTagNames = uniqueTags.map(tag => tagNames[tag] || tag);
    const student = buildStudentData();
    const date = new Date().toLocaleString();

    const result = {
      studentKey: student.studentKey,
      name: student.fullName,
      lastName: student.lastName,
      firstName: student.firstName,
      studentClass: student.className,
      score,
      total: shuffledQuestions.length,
      date
    };

    const saved = JSON.parse(localStorage.getItem('policeExamResults') || '[]');
    saved.push(result);
    localStorage.setItem('policeExamResults', JSON.stringify(saved));

    testArea.classList.add('hidden');
    finalScreen.classList.remove('hidden');

    finalScore.textContent = `Ви набрали ${score} з ${shuffledQuestions.length}.`;

    analyticsPanel.innerHTML = wrongTags.length === 0
      ? '😊 Чудово! Помилок немає.'
      : `⚠️ <strong>Рекомендація:</strong> повторіть теми: ${wrongTagNames.join(', ')}.`;

    sendUniversalReport({
      date,
      student: {
        lastName: student.lastName,
        firstName: student.firstName,
        fullName: student.fullName,
        className: student.className
      },
      subject: PROJECT_CONFIG.subject,
      topic: PROJECT_CONFIG.topic,
      workType: PROJECT_CONFIG.workType,
      projectId: PROJECT_CONFIG.projectId,
      score,
      total: shuffledQuestions.length,
      wrongTags: wrongTagNames
    })
      .then(() => {
        reportStatus.textContent = 'Роботу завершено. Звіт передано вчителю.';
      })
      .catch(() => {
        reportStatus.textContent = 'Роботу завершено, але звіт не вдалося передати. Повідомте вчителя.';
      });
  }

  function sendUniversalReport(reportData) {
    return fetch(PROJECT_CONFIG.gasUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        secret: PROJECT_CONFIG.secret,
        report: reportData
      })
    });
  }

  const testNavBtn = document.querySelector('[data-module="test"]');

  if (testNavBtn) {
    testNavBtn.addEventListener('click', () => {
      if (!testActive && !testEnded) {
        studentStartPanel.classList.remove('hidden');
        testArea.classList.add('hidden');
        finalScreen.classList.add('hidden');
      }
    });
  }
});
