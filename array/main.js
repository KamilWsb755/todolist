const addBtn = document.querySelector('.addBtn');
const addInput = document.querySelector('.add');
const list = document.querySelector('ul');
const searchInput = document.querySelector('.search');
const taskCount = document.querySelector('h2 span')
let taskList = [];


const removeElement = (e) => {
    const taskId = e.target.parentNode.getAttribute('id');
    taskList = taskList.filter(task => task.id !== taskId)
    fillList(taskList)
}

const addButtonListener = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(btn => btn.addEventListener('click', removeElement))
}
const fillList = (taskList) => {
    list.textContent = ''
    taskList.forEach((task, id) => {
        task.setAttribute('id', id);
        list.appendChild(task)
    })
    taskCount.textContent = taskList.length;

    addButtonListener()
}

const addTask = (e) => {
    e.preventDefault();

    if (!addInput.value) return alert('Wpisz treść zadania')
    let isExist = false;
    taskList.forEach(task => {
        if (task.innerText.slice(0, -1).toLowerCase() === addInput.value.toLowerCase()) isExist = true;
    })
    if (isExist) return alert('Takie zadanie już istnieje')

    const listElement = document.createElement('li');
    listElement.innerHTML = addInput.value + '<button class="delete">X</button>'
    taskList.push(listElement);
    addInput.value = ''
    fillList(taskList)
}

const searchTask = (e) => {
    let copyTaskList = [...taskList];
    if (searchInput.value) {
        copyTaskList = taskList.filter(task => task.innerText.includes(searchInput.value))
        fillList(copyTaskList)
    } else {
        taskList = copyTaskList;
        fillList(taskList)
    }
}

addBtn.addEventListener('click', addTask);
searchInput.addEventListener('keyup', searchTask)