
const form = document.getElementById('task-area');
const inputTask = document.getElementById('single-task');
const buttonAdd = document.getElementById('btn');
const tasksUl = document.getElementById('task');
const taskLi = document.getElementById('list-group-item');

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
        item.setAttribute('id', task.id)

        const taskUI = `
                     <span class="${cssClass}">${task.text}</span>
                     <div class="button">
                     <button type="button" data-action="done" class="btn-action1 button">ok</button>
                     <button type="button" data-action="delete" class="btn-action2 button">x</button>
                     </div>
                    `;

        item.innerHTML = taskUI;

        tasksUl.appendChild(item);
    });
}

function addTaskController(e) {
    const text = getInputText(e);
    const newTask = {
        id: Math.floor(Math.random() * 200) + 1,
        text: text,
        isCompleted: false
    };
    removeInputText();
    addNewTask(newTask);
    renderTasks();
}

function actionTaskController(e) {
    const id = getTaskId(e);
    const action = e.target.dataset.action;
    if (action === 'done') {
        completeTaskForId(id);
    }

    if (action == 'delete') {
        deleteTaskForId(id);
    }
    renderTasks();
}

function init() {
    renderTasks();

    form.addEventListener('submit', addTaskController);
    tasksUl.addEventListener('click', actionTaskController);
}

init();


/////////////////////////////////////////////////////////////////////////////////


// const form = document.getElementById('task-area');
// const inputTask = document.getElementById('single-task');
// const buttonAdd = document.getElementById('btn');
// const tasksUl = document.getElementById('task');
// const taskLi = document.getElementById('list-group-item');

// let TASK_LIST = [];

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

function changePosition(id) {
    const position = TASK_LIST.findIndex((tsk) => tsk.id === id);

    if (!(position === 0) && !(!position === TASK_LIST.length - 1)) {
        const positionChange = (position) ? -1 : 1;

        TASK_LIST[position].position += positionChange;
        TASK_LIST[position + positionChange].position += positionChange * -1;

        TASK_LIST.sort((a, b) => a.position - b.position);
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
        item.setAttribute('id', task.id)

        const taskUI = `
                     <span class="${cssClass}">${task.text}</span>
                     <div class="button">
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

function emptyTask (){
    const text = createElement('p', 'textP');
    text.innerHTML = 'You must to Add a task...';
    tasksUl.innerHTML = '';
    tasksUl.appendChild(text);
}

function addTaskController(e) {
    const text = getInputText(e);

    if (inputTask.value === '') {
        emptyTask();
    } else {
        const newTask = {
            id: Math.floor(Math.random() * 200) + 1,
            text: text,
            isCompleted: false,
            position: 0,
        };

        removeInputText();
        addNewTask(newTask);
        renderTasks();
    }
    console.log(TASK_LIST)
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
        changePosition(id);
    }

    renderTasks();
}

function init() {
    renderTasks();

    form.addEventListener('submit', addTaskController);
    tasksUl.addEventListener('click', actionTaskController);
}

init();





















///////////////////////////////////////////////////////////////////////////////////////////

// const form = document.getElementById('task-area');
// const inputTask = document.getElementById('single-task');
// const buttonAdd = document.getElementById('btn');
// const tasksUl = document.getElementById('task');
// const taskLi = document.getElementById('list-group-item');

// let TASK_LIST = [];

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

function changePosition(id) {
    const position = TASK_LIST.findIndex((tsk) => tsk.id === id);

    if (!(position === 0) && !(!position === TASK_LIST.length - 1)) {
        const positionChange = (position) ? -1 : 1;

        TASK_LIST[position].position += positionChange;
        TASK_LIST[position + positionChange].position += positionChange * -1;

        TASK_LIST.sort((a, b) => a.position - b.position);
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
        item.setAttribute('id', task.id)

        const taskUI = `
                     <span class="${cssClass}">${task.text}</span>
                     <div class="button">
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

function emptyTask (){
    const text = createElement('p', 'textP');
    text.innerHTML = 'You must to Add a task...';
    tasksUl.innerHTML = '';
    tasksUl.appendChild(text);
}

function addTaskController(e) {
    const text = getInputText(e);

    if (inputTask.value === '') {
        emptyTask();
    } else {
        const newTask = {
            id: Math.floor(Math.random() * 200) + 1,
            text: text,
            isCompleted: false,
            position: 0,
        };

        removeInputText();
        addNewTask(newTask);
        renderTasks();
    }
    console.log(TASK_LIST)
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
        changePosition(id);
    }

    renderTasks();
}

function init() {
    renderTasks();

    form.addEventListener('submit', addTaskController);
    tasksUl.addEventListener('click', actionTaskController);
}

init();