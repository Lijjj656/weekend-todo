const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const count = document.querySelector("#task-count");

let todos = JSON.parse(localStorage.getItem("weekend-todos") || "[]");
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item" + (todo.completed ? " completed" : "");
    item.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} />
      <span class="todo-title"></span>
      <button class="delete-button" type="button">删</button>
    `;

    item.querySelector(".todo-title").textContent = todo.title;

    item.querySelector("input").addEventListener("change", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    item.querySelector(".delete-button").addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    list.append(item);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  count.textContent = `还有 ${remaining} 件事等着你`;
}
function saveTodos() {
  localStorage.setItem("weekend-todos", JSON.stringify(todos));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  todos.push({ id: Date.now(), title, completed: false });
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

renderTodos();
