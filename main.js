const form = document.querySelector('form');
const inputAdd = document.querySelector('input');
const inputSearch = document.querySelector('input.search');
const sectionTasks = document.querySelector('section.toDoList');
const btnDarkLightMode = document.querySelector('button.darkLightMode');
const main = document.body;
const label = document.getElementsByClassName('label');
const h1 = document.querySelector('h1');
const btnAdd = document.querySelector('button.addTask');

let tasks = [];
let taskElements = [];


const addTask = (e) => {
    e.preventDefault();
    if (!inputAdd.value) return alert('Nie wpisałeś żadnego zadania!')

    tasks.push(inputAdd.value);
    form.reset();
    showTasks();
    saveToLocalStorage()
}

const showTasks = (filtered) => {
    sectionTasks.innerHTML = '';
    taskElements = [];
    const this_tasks = filtered || tasks;
    this_tasks.forEach((title, index) => {
        const element = taskTemplate(title, index);
        taskElements.push(element)

    });
}

const taskTemplate = (title, index) => {
    // add div to section
    const taskList = document.createElement('div');
    taskList.classList.add('taskList')
    sectionTasks.appendChild(taskList)
    // add div-task to div-taskList
    const task = document.createElement('div');
    if (main.classList.contains('active')) {
        task.classList.add('task');
        task.classList.add('active');
    } else {
        task.classList.add('task');
    }
    const now = new Date();
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    const date = `${day}.${month}.${year}`
    task.innerHTML = `<span>${date}</span> ${title}`;
    taskList.appendChild(task);
    // add button to taskList
    const del = document.createElement('button');
    if (main.classList.contains('active')) {
        del.classList.add('delate');
        del.classList.add('active');
    } else {
        del.classList.add('delate');
    }
    del.innerHTML = `Usuń`
    taskList.appendChild(del);
    // add function removeTask
    del.addEventListener('click', () => {
        deleteTask(index);
    })
    return taskList
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveToLocalStorage()
    showTasks();
}

const searchTask = () => {
    const filteredTasks = tasks.filter((title) => {
        return title.toLowerCase().includes(inputSearch.value.toLowerCase());
    });

    showTasks(filteredTasks);
}

function darkLightMode() {
    label[0].classList.toggle('active');
    label[1].classList.toggle('active');
    h1.classList.toggle('active');
    inputAdd.classList.toggle('active');
    inputSearch.classList.toggle('active');
    btnAdd.classList.toggle('active');
    main.classList.toggle('active');
    taskElements.forEach((element) => {
        const elementFirstChild = element.getElementsByClassName('task');
        const elementLastChild = element.getElementsByClassName('delate');
        elementFirstChild[0].classList.toggle('active');
        elementLastChild[0].classList.toggle('active');

    })
}

function saveToLocalStorage() {
    let str = JSON.stringify(tasks)
    localStorage.setItem("todos", str)
}

function getTodos() {
    let str = localStorage.getItem("todos")
    tasks = JSON.parse(str)
    if (!tasks) {
        tasks = [];
    }
}

getTodos();
showTasks();

form.addEventListener('submit', addTask);
inputSearch.addEventListener('input', searchTask);
btnDarkLightMode.addEventListener('click', darkLightMode)