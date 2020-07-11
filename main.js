const form = document.querySelector('form');
const inputAdd = document.querySelector('input');
const inputSearch = document.querySelector('input.search');
const sectionTasks = document.querySelector('section.toDoList');

const addTask = (e) => {
    e.preventDefault();
    if (inputAdd.value !== "") {
        const titleTask = inputAdd.value;
        // add div to section
        const taskList = document.createElement('div');
        taskList.classList.add('taskList')
        sectionTasks.appendChild(taskList)
        // add div-task to div-taskList
        const task = document.createElement('div');
        task.classList.add('task')
        task.innerHTML = `${titleTask}`;
        taskList.appendChild(task);
        // add button to taskList
        const del = document.createElement('button');
        del.classList.add("delate");
        del.innerHTML = `Usuń zadanie`
        taskList.appendChild(del);
        // add function removeTask
        del.addEventListener('click', e => {
            e.target.parentElement.remove()
        })

        inputAdd.value = "";
    } else {
        alert('Nie wpisałeś żadnego zadania!')
    }

}

form.addEventListener('submit', addTask);