const inputText = document.getElementById("input-text");
const btnAdd = document.getElementById("btn-add");
const tasksList = document.getElementById("tasks-list");
const form = document.getElementById("form");
let tasks = [];

function loadTasksFromLocalStorage() {
  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasksList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");

    const label = document.createElement("label");

    const checkBox = document.createElement("input");
    checkBox.className = "check-box";
    checkBox.type = "checkbox";

    if (task.completed) {
      label.style.textDecoration = "line-through";
      label.style.color = "#a8a8a8";
      checkBox.checked = true;
    }

    checkBox.addEventListener("change", isCompleted);

    label.appendChild(checkBox);
    label.appendChild(document.createTextNode(task.text));

    const deleteIcon = document.createElement("ion-icon");
    deleteIcon.className = "delete-btn";
    deleteIcon.name = "close";

    deleteIcon.addEventListener("click", () => {
      removeTask(task);
    });

    listItem.appendChild(label);
    listItem.appendChild(deleteIcon);

    tasksList.appendChild(listItem);
  });
}

window.addEventListener("load", () => {
  loadTasksFromLocalStorage();
});

function addTask() {
  let taskText = inputText.value;

  if (taskText !== "") {
    const task = document.createElement("li");

    const label = document.createElement("label");

    const checkBox = document.createElement("input");
    checkBox.className = "check-box";
    checkBox.type = "checkbox";

    const deleteIcon = document.createElement("ion-icon");
    deleteIcon.className = "delete-btn";
    deleteIcon.name = "close";

    label.appendChild(checkBox);
    label.appendChild(document.createTextNode(taskText));
    task.appendChild(label);
    task.appendChild(deleteIcon);

    tasksList.appendChild(task);

    const checkBoxes = document.querySelectorAll(".check-box");
    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("change", isCompleted);
    });

    const btnDelete = task.querySelector(".delete-btn");
    btnDelete.addEventListener("click", () => {
      removeTask(task);
    });

    inputText.value = "";

    saveTaskToLocalStorage(taskText, false);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

btnAdd.addEventListener("click", addTask);

function isCompleted(e) {
  const checkBox = e.target;
  const label = checkBox.parentElement;
  const taskText = label.innerText;

  if (checkBox.checked) {
    label.style.textDecoration = "line-through";
    label.style.color = "#a8a8a8";
  } else {
    label.style.textDecoration = "none";
    label.style.color = "#313131";
  }

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const taskIndex = tasks.findIndex((task) => task.text === taskText);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = checkBox.checked;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTask(taskToRemove) {
  const taskIndex = tasks.findIndex((task) => task.text === taskToRemove.text);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage();
}

function saveTaskToLocalStorage(taskText, isCompleted) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
