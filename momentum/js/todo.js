const TODOS_KEY = 'todos';
const DATE_ATTRNAME = 'data-date';

const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todo-list');

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const date = parseInt(deleteButton.getAttribute(DATE_ATTRNAME));
  const div = deleteButton.parentElement;
  div.remove();
  todos = todos.filter(todo => todo.date !== date);
  saveTodos();
}

function paintTodo(newTodoObj) {
  const div = document.createElement('div');
  div.classList.add('todo');
  div.classList.add('d-flex');
  div.classList.add('justify-content-center');
  div.classList.add('align-items-stretch');
  div.classList.add('my-1');
  
  const p = document.createElement('p');
  p.classList.add('todo__content');
  p.innerText = newTodoObj.text;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('todo__delete-button');
  deleteButton.classList.add('btn-danger');
  deleteButton.setAttribute(DATE_ATTRNAME, newTodoObj.date);
  deleteButton.addEventListener('click', deleteTodo);
  deleteButton.innerText = 'delete';

  div.appendChild(p);
  div.appendChild(deleteButton);
  todoList.appendChild(div);
  todos.push(newTodoObj);
  saveTodos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodoObj = {
    date: Date.now(),
    text: todoInput.value
  };
  todoInput.value = '';
  paintTodo(newTodoObj);
}

todoForm.addEventListener('submit', handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  parsedTodos.forEach(paintTodo);
}
