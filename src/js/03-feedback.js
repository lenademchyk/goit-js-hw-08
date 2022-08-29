// Завдання 3 - форма зворотного зв'язку
// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('[name="email"]');
const textarea = document.querySelector('[name="message"]');
const formData = {};
const KEEP_TEXT = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
inputEmail.addEventListener('input', throttle(onTextareaInput, 500));
textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateEmailOutput();
populateMessageOutput();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('відправка форми');
  evt.target.reset();
  localStorage.removeItem(KEEP_TEXT);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(KEEP_TEXT, JSON.stringify(formData));
  console.log(formData);
}

function populateEmailOutput() {
  const savedEmail = JSON.parse(localStorage.getItem(KEEP_TEXT));
  if (savedEmail) {
    console.log(savedEmail);
    inputEmail.value = savedEmail.email;
  }
}
function populateMessageOutput() {
  const savedMessage = JSON.parse(localStorage.getItem(KEEP_TEXT));
  if (savedMessage) {
    console.log(savedMessage);
    textarea.value = savedMessage.message;
  }
}
