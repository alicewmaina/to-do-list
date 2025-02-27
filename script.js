const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos.length > 0) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value.trim();

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.textContent = todoText;

    // Toggle completed
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    // Right-click to delete
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);
    input.value = '';

    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.textContent,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
