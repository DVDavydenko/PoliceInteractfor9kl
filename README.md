# Нова українська поліція – навчальний застосунок

Інтерактивний урок з правознавства для 9 класу на тему «Нова українська поліція» (§24).  
Містить теорію, симулятор, екзамен, домашнє завдання та посилання на ресурси.

## Можливості
- Слайди теорії з термінами-підказками та міні-перевірками.
- Симулятор роботи патрульного (3 сценарії).
- Екзамен у режимі реального часу (20 хв, випадкові питання, одна спроба на ім'я).
- Автоматичне збереження результатів у локальному сховищі.
- Опціональне надсилання звіту в Telegram через Google Apps Script.
- Домашнє завдання з можливістю збереження тексту.
- Темна/світла тема.
- PWA: можна встановити на пристрій, працює офлайн.

## Налаштування звітів у Telegram
1. Створіть бота в @BotFather, отримайте токен.
2. Дізнайтеся chat_id вашого чату/каналу (через @getidsbot).
3. У Google Apps Script створіть веб-додаток з кодом:
   ```javascript
   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     const botToken = "YOUR_BOT_TOKEN";
     const chatId = "YOUR_CHAT_ID";
     const text = `📝 Новий результат екзамену:\n👤 ${data.name}\n✅ Бали: ${data.score}/${data.total}\n📅 ${data.date}\n${data.wrongTags.length ? '⚠️ Помилки за темами: ' + data.wrongTags.join(', ') : '😊 Помилок немає'}`;
     UrlFetchApp.fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
       method: 'post',
       payload: { chat_id: chatId, text: text }
     });
     return ContentService.createTextOutput('OK');
   }
