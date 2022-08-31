// Завдання 3 - форма зворотного зв'язку
// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

let formData = {};

const KEEP_TEXT = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));

savedInputData();

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('відправка форми');

  evt.currentTarget.reset();
  localStorage.removeItem(KEEP_TEXT);
}

function onTextInput(evt) {
  evt.preventDefault();
  formData = {
    email: form.email.value,
    message: form.message.value,
  };
  localStorage.setItem(KEEP_TEXT, JSON.stringify(formData));
  console.log(formData);
}

function savedInputData() {
  const inputData = JSON.parse(localStorage.getItem(KEEP_TEXT));
  if (inputData) {
    console.log(inputData);
    form.elements.email.value = inputData.email;
    form.elements.message.value = inputData.message;
  }
}
