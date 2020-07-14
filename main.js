const form = document.querySelector('form');
const inputAdd = document.querySelector('input');
const inputSearch = document.querySelector('input.search');
const sectionTasks = document.querySelector('section.toDoList');
const btnDarkLightMode = document.querySelector('button.darkLightMode');
const main = document.body

let tasks = [];

const addTask = (e) => {
    e.preventDefault();
    if (!inputAdd.value) return alert('Nie wpisałeś żadnego zadania!')

    tasks.push(inputAdd.value);
    form.reset();
    showTasks();
}

const showTasks = (filtered) => {
    sectionTasks.innerHTML = '';
    const this_tasks = filtered || tasks;
    this_tasks.forEach((title, index) => {
        taskTemplate(title, index);

    });
}

const taskTemplate = (title, index) => {
    // add div to section
    const taskList = document.createElement('div');
    taskList.classList.add('taskList')
    sectionTasks.appendChild(taskList)
    // add div-task to div-taskList
    const task = document.createElement('div');
    task.classList.add('task')
    task.innerHTML = title;
    taskList.appendChild(task);
    // add button to taskList
    const del = document.createElement('button');
    del.classList.add("delate");
    del.innerHTML = `Usuń zadanie`
    taskList.appendChild(del);
    // add function removeTask
    del.addEventListener('click', () => {
        deleteTask(index);
    });
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    showTasks();
}

const searchTask = () => {
    const filteredTasks = tasks.filter((title) => {
        return title.toLowerCase().includes(inputSearch.value.toLowerCase());
    });

    showTasks(filteredTasks);
}

function darkLightMode() {
    main.classList.toggle('active');
}

form.addEventListener('submit', addTask);
inputSearch.addEventListener('input', searchTask);
btnDarkLightMode.addEventListener('click', darkLightMode)