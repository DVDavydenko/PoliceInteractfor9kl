document.addEventListener('DOMContentLoaded', () => {
  const scenarios = [
    {
      steps: [
        {
          text: 'Ви патрульний. Отримали виклик: "Підозрілий чоловік біля школи". Ваші дії:',
          options: [
            { text: 'Підійти, представитися, попросити документи', correct: true, feedback: 'Правильно! (ст.18) — поліцейський зобов’язаний представитись.' },
            { text: 'Застосувати силу одразу', correct: false, feedback: 'Застосування сили без попередження — порушення закону.' }
          ]
        },
        {
          text: 'Чоловік тікає. Що робите?',
          options: [
            { text: 'Переслідувати та затримати', correct: true, feedback: 'Ви маєте право затримати особу за підозрою у вчиненні правопорушення (ст. 32).' },
            { text: 'Відпустити', correct: false, feedback: 'Втеча — достатня підстава для затримання.' }
          ]
        },
        {
          text: 'Під час затримання чоловік дістає ніж. Ваші дії:',
          options: [
            { text: 'Застосувати вогнепальну зброю для захисту', correct: true, feedback: 'Загроза життю — законна підстава для застосування зброї (ст. 46).' },
            { text: 'Продовжити словесні перемовини', correct: false, feedback: 'Коли є пряма загроза життю, необхідно діяти рішуче.' }
          ]
        }
      ]
    },
    {
      steps: [
        {
          text: 'Ви патрульний. Комендантська година. Людина без перепустки. Що робите?',
          options: [
            { text: 'Перевірити документи, з\'ясувати причину', correct: true, feedback: 'Ст. 32: поліцейський має право перевіряти документи та з\'ясовувати обставини.' },
            { text: 'Одразу затримати та доставити до відділку', correct: false, feedback: 'Спочатку треба з\'ясувати, чи є поважна причина.' }
          ]
        },
        {
          text: 'Це волонтер, який допомагає евакуювати тварин. Ваші дії:',
          options: [
            { text: 'Попередити, відпустити, але зафіксувати дані', correct: true, feedback: 'Гуманне ставлення та врахування обставин — ознака нової поліції.' },
            { text: 'Виписати штраф', correct: false, feedback: 'За наявності поважної причини можна обмежитись попередженням.' }
          ]
        }
      ]
    },
    {
      steps: [
        {
          text: 'Ви першим прибули на місце ракетного удару. Що робите насамперед?',
          options: [
            { text: 'Оцінити безпеку, викликати ДСНС, надати першу допомогу', correct: true, feedback: 'Алгоритм дій у надзвичайних ситуаціях: безпека → порятунок → повідомлення.' },
            { text: 'Почати розбирати завали самотужки', correct: false, feedback: 'Спочатку переконайтеся, що немає загрози повторного обстрілу або обвалу.' }
          ]
        },
        {
          text: 'Під завалами чути голос дитини. Ваші дії:',
          options: [
            { text: 'Підтримувати голосовий контакт, чекати рятувальників', correct: true, feedback: 'Головне — не нашкодити. Рятувальники мають спеціальне обладнання.' },
            { text: 'Негайно лізти під завали', correct: false, feedback: 'Ви ризикуєте спричинити обвал і загинути самі.' }
          ]
        }
      ]
    }
  ];

  let currentScenario = 0;
  let simStep = 0;
  let simHistory = [];

  const simScenarioEl = document.getElementById('simScenario');
  const simOptionsEl = document.getElementById('simOptions');
  const simResultEl = document.getElementById('simResult');
  const simBackBtn = document.getElementById('simBackBtn');
  const simRestartBtn = document.getElementById('simRestartBtn');
  const scenarioSelector = document.getElementById('scenarioSelector');

  function renderSimulator() {
    const scenario = scenarios[currentScenario];
    const step = scenario.steps[simStep];
    simScenarioEl.innerHTML = `<h3>Сценарій ${currentScenario + 1}</h3><p><strong>Крок ${simStep + 1}:</strong> ${step.text}</p>`;
    simOptionsEl.innerHTML = '';
    simResultEl.style.display = 'none';
    simResultEl.innerHTML = '';

    step.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleSimAnswer(opt, btn));
      simOptionsEl.appendChild(btn);
    });

    simBackBtn.disabled = (simStep === 0 && currentScenario === 0);
  }

  function handleSimAnswer(opt, btn) {
    const allBtns = simOptionsEl.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (opt.correct) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      allBtns.forEach(b => {
        const correctOpt = scenarios[currentScenario].steps[simStep].options.find(o => o.correct);
        if (correctOpt && b.textContent === correctOpt.text) {
          b.classList.add('correct');
        }
      });
    }

    simResultEl.style.display = 'block';
    simResultEl.innerHTML = `<p>${opt.feedback}</p>`;
    simHistory.push({ scenario: currentScenario, step: simStep });

    if (simStep < scenarios[currentScenario].steps.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn';
      nextBtn.textContent = 'Далі →';
      nextBtn.addEventListener('click', () => {
        simStep++;
        renderSimulator();
      });
      simResultEl.appendChild(nextBtn);
    } else {
      simResultEl.innerHTML += '<p>✅ Сценарій завершено!</p>';
    }
  }

  simBackBtn.addEventListener('click', () => {
    if (simHistory.length > 0) {
      const prev = simHistory.pop();
      currentScenario = prev.scenario;
      simStep = prev.step;
      renderSimulator();
    }
  });

  simRestartBtn.addEventListener('click', () => {
    simStep = 0;
    simHistory = [];
    renderSimulator();
  });

  // Вибір сценарію
  scenarioSelector.innerHTML = '<h3>Оберіть сценарій:</h3>';
  scenarios.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.margin = '5px';
    btn.textContent = `Сценарій ${idx + 1}`;
    btn.addEventListener('click', () => {
      currentScenario = idx;
      simStep = 0;
      simHistory = [];
      renderSimulator();
    });
    scenarioSelector.appendChild(btn);
  });

  // Початковий рендер
  renderSimulator();
});
