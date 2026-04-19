import { addTask, deleteTask, listTasks } from './storage.js';

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

window.addNewTask = async () => {
    const task = input.value;

    if (task === "") return alert("Enter a task");

    const msg = await addTask(task);
    alert(msg);

    input.value = "";
};

window.deleteExistingTask = async () => {
    const task = input.value;

    const msg = await deleteTask(task);
    alert(msg);

    input.value = "";
};

window.showTasks = async () => {
    const tasks = await listTasks();

    list.innerHTML = tasks.map(t => `<li> ${t}</li>`).join("");
};