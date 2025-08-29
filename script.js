const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const emptyState = document.querySelector(".empty-state");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const filters = document.querySelectorAll(".filter");

let tasks = [];

function renderTasks(filter = "all") {
  todosList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "active") filteredTasks = tasks.filter((t) => !t.completed);
  if (filter === "completed") filteredTasks = tasks.filter((t) => t.completed);

  if (filteredTasks.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" class="todo-checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
        <span class="checkmark"></span>
      </label>
      <span class="todo-item-text">${task.text}</span>
      <button class="delete-btn" data-index="${index}"><i class="fas fa-times"></i></button>
    `;
    todosList.appendChild(li);
  });

  updateItemsLeft();
}

function updateItemsLeft() {
  const activeTasks = tasks.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${activeTasks} item${activeTasks !== 1 ? "s" : ""} left`;
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks(document.querySelector(".filter.active").dataset.filter);
  }
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = "";
      renderTasks(document.querySelector(".filter.active").dataset.filter);
    }
  }
});


todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-checkbox")) {
    const index = e.target.dataset.index;
    tasks[index].completed = e.target.checked;
    renderTasks(document.querySelector(".filter.active").dataset.filter);
  }

  if (e.target.closest(".delete-btn")) {
    const index = e.target.closest(".delete-btn").dataset.index;
    tasks.splice(index, 1);
    renderTasks(document.querySelector(".filter.active").dataset.filter);
  }
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.completed);
  renderTasks(document.querySelector(".filter.active").dataset.filter);
});

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});

// Date display
document.getElementById("date").textContent = new Date().toDateString();

// Initial render
renderTasks();
