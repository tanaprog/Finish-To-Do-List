const form = document.getElementById('task-area');
const inputTask = document.getElementById('single-task');
const tasksUl = document.getElementById('task');
const taskLi = document.querySelector('.list-group-item');
const textError = document.getElementById('text-error');


let TASK_LIST = [];

function createElement(tag, className) {
    let element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element
}

function addNewTask(newTask) {
    TASK_LIST.push(newTask);
}

function deleteTaskForId(id) {
    const index = TASK_LIST.findIndex((tsk) => tsk.id === id);

    TASK_LIST.splice(index, 1);
}

function completeTaskForId(id) {
    const findTask = TASK_LIST.find((tsk) => tsk.id === id);
    findTask.isCompleted = !findTask.isCompleted;
}

//////////////////////////////////////////////////

function editTask(id) {

    const editTaskId = TASK_LIST.find((tsk) => tsk.id === id);

    const textN = TASK_LIST.splice(editTaskId, 1)[0];

    let editText = createElement('input', 'editable');
    let listT = document.querySelector('.task-title');
    editText.value = textN.text;
    TASK_LIST.push(textN)
    listT.innerHTML = ''
    listT.appendChild(editText);
    console.log(listT)

    editText.focus()

    editText.addEventListener('blur', () => {
        listT.innerHTML = editText.value;
    });
}

///////////////////////////////////////////////////

function changePosition(id, action) {
    const oldIndex = TASK_LIST.findIndex((tsk) => tsk.id === id);
    let newIndex;
    if (action === "up") {
        if (oldIndex === 0) return;
        newIndex = oldIndex - 1;
        const moveTask = TASK_LIST.splice(oldIndex, 1)[0];
        TASK_LIST.splice(newIndex, 0, moveTask)
    }
    if (action === "down") {
        if (oldIndex === TASK_LIST.length - 1) return;
        newIndex = oldIndex + 1;

        const moveTask = TASK_LIST.splice(oldIndex, 1)[0];
        TASK_LIST.splice(newIndex, 0, moveTask);
    }
}

function getInputText(event) {
    event.preventDefault();

    const taskText = inputTask.value;
    return taskText;
}

function removeInputText() {
    inputTask.value = "";
    inputTask.focus();
}

function getTaskId(event) {
    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);
    return id;
}

function renderTasks() {
    tasksUl.innerHTML = '';

    TASK_LIST.forEach((task) => {
        const cssClass = task.isCompleted ? "task-title checked" : "task-title";
        const item = createElement('li', 'list-group-item');
        item.setAttribute('id', task.id);

        const taskUI = `
                     <div class="${cssClass}">${task.text}</div>
                     
                     <div class="button">
                     <button type="button" data-action="edit" class="btn-action button">ed</button>
                     <button type="button" data-action="up" class="button up"></button>
                     <button type="button" data-action="down" class="button down"></button>
                     
                     <button type="button" data-action="done" class="btn-action1 button">ok</button>
                     <button type="button" data-action="delete" class="btn-action2 button">x</button>
                     </div>
                    `;

        item.innerHTML = taskUI;

        tasksUl.appendChild(item);
    });
}

function emptyTask() {
    const text = createElement('p', 'textP');
    text.innerHTML = 'You must to Add a task...';
    textError.innerHTML = "";
    textError.appendChild(text);
}

function addTaskController(e) {
    const text = getInputText(e);
    textError.innerHTML = "";

    if (!text) {
        emptyTask();
    } else {
        const newTask = {
            id: Math.floor(Math.random() * 200) + 1,
            text: text,
            isCompleted: false,
        };

        removeInputText();
        addNewTask(newTask);
        renderTasks();
    }
    // console.log(TASK_LIST)
}

function actionTaskController(e) {
    const id = getTaskId(e);
    const action = e.target.dataset.action;
    if (action === 'done') {
        completeTaskForId(id);
    }

    if (action === 'delete') {
        deleteTaskForId(id);
    }

    if (action === 'up' || action === 'down') {
        changePosition(id, action);
    }

    if (action === 'edit') {
        editTask(id);
    }

    renderTasks();
}

function init() {
    renderTasks();

    form.addEventListener('submit', addTaskController);
    tasksUl.addEventListener('click', actionTaskController);
}

init();