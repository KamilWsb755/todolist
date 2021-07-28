const inputTask = document.querySelector('.task');
const btnAdd = document.querySelector('.add');
const list = document.querySelector('ul');
const emptyInformation = document.querySelector('.empty')
const editPopup = document.querySelector('.popup');
const editInput = document.querySelector('.editInput');
const btnCancelPopup = document.querySelector('.cancel');
const btnAcceptPopup = document.querySelector('.accept');
let newTask = '';
let countSpan = document.querySelector('.count');

deleteInfo = () => {
    if (list.childElementCount !== 0) {
        emptyInformation.style.display = 'none'
    } else {
        emptyInformation.style.display = 'block'
    }
}

const checkKey = (e) => {
    if (e.key === 'Enter') {
        if (e.target.classList.contains('editInput')) {
            return changeTask()
        } else {
            return addTask()
        }
    }
}

const addTask = () => {
    const listElement = document.createElement('li');
    listElement.innerHTML = `${inputTask.value} <div class="tools">
    <button class="finish"><i class="fas fa-check"></i></button><button class="edit">edit</button><button class="delete"><i class="fas fa-times" aria-hidden="true"></i></button>
</div>`
    if (inputTask.value === '') {
        return alert('Task nie może być pusty!')
    }
    list.appendChild(listElement);
    countSpan.textContent = list.childElementCount;
    inputTask.value = ''
    deleteInfo()
}

const editTask = () => {
    editPopup.style.display = 'block'
    editInput.value = newTask.firstChild.textContent.trim()
    editInput.focus()
}

const changeTask = () => {
    newTask.firstChild.textContent = editInput.value
    editPopup.style.display = 'none'
}


const cancelPopup = () => {
    editPopup.style.display = 'none'
}

const toolsClick = (e) => {

    if (!e.target.closest('button')) {
        return;
    }

    const btn = e.target.closest('button')

    if (btn.classList.contains('finish')) {
        e.target.closest('li').classList.toggle('finished');
    } else if (btn.classList.contains('delete')) {
        e.target.closest('li').remove();
        countSpan.textContent = list.childElementCount;
        deleteInfo()
    } else if (btn.classList.contains('edit')) {
        newTask = e.target.closest('li')
        editTask()
    }
}

btnAdd.addEventListener('click', addTask);
inputTask.addEventListener('keyup', checkKey)
editInput.addEventListener('keyup', checkKey)
list.addEventListener('click', toolsClick)
btnCancelPopup.addEventListener('click', cancelPopup);
btnAcceptPopup.addEventListener('click', changeTask);