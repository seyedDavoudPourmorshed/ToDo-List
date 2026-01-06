// آرایه کارها
let tasks = [];
// خواندن لیست از localStorage
let savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}
// گرفتن المنت‌ها
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
// تابع نمایش لیست
function renderTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i].text;
    // اگر انجام شده، خط بخوره
    if (tasks[i].done) {
      li.style.textDecoration = "line-through";
    }
    // کلیک روی آیتم برای خط خوردن یا برعکس
    li.addEventListener("click", function() {
      tasks[i].done = !tasks[i].done;
      saveAndRender();
    });
    // دکمه حذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.addEventListener("click", function(e) {
      e.stopPropagation(); // جلوگیری از خط خوردن هنگام حذف
      tasks.splice(i, 1);
      saveAndRender();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}
// ذخیره در localStorage و نمایش
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
// افزودن کار جدید
addBtn.addEventListener("click", function() {
  const task = input.value;
  if (task !== "") {
    tasks.push({ text: task, done: false });
    input.value = "";
    saveAndRender();
  }
});
// نمایش اولیه
renderTasks();
