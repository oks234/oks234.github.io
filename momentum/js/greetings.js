const HIDDEN_CLASSNAME = 'd-none';
const USERNAME_KEY = 'username';

const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const greetingContent = document.querySelector('#greeting-content');
const editBtn = document.querySelector('#edit-greeting-btn');

function handleLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreeting(username);
}

function paintGreeting(username) {
  greetingContent.innerText = `Hello, ${username}.`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

function removeName() {
  localStorage.removeItem(USERNAME_KEY);
}

function editName() {
  removeName();
  loginInput.value = '';
  greeting.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginInput.focus();
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
  paintGreeting(savedUsername);
}

loginForm.addEventListener('submit', handleLoginSubmit);
editBtn.addEventListener('click', editName);
