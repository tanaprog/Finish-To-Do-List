const form = document.getElementById('task-area');
const inputTask = document.getElementById('single-task');
const tasksUl = document.getElementById('task');
const textError = document.getElementById('text-error');

let TASK_LIST = [];

function createElement(tag, className) {
    let element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
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

function editTask(id, newText) {
    const editTaskId = TASK_LIST.find((tsk) => tsk.id === id);
    editTaskId.text = newText;
}

function editableTasks(id) {
    const editableTaskId = TASK_LIST.find((tsk) => tsk.id === id);
    editableTaskId.isEdit = !editableTaskId.isEdit;
}

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

function getTaskText(id) {
    const textElemId = document.getElementById(id).children;
    let textTask;

    for (let elem of textElemId) {
        if (elem.isContentEditable) {
            textTask = elem.textContent;
        }
    }
    return textTask;
}

function renderTasks() {
    tasksUl.innerHTML = '';

    TASK_LIST.forEach((task) => {
        const cssClass = task.isCompleted ? "task-title checked" : "task-title";
        const editableClass = task.isEdit ? "border: 1px solid green" : "";
        const item = createElement('li', 'list-group-item');
        item.setAttribute('id', task.id);

        const taskUI = `
                     <span style = "${editableClass}" 
                     contenteditable = ${task.isEdit}
                     class="${cssClass}">${task.text}</span>
                     
                     <div class="buttons">
                     <button type="button" data-action="up" class="button up"><img class="icon-img" src="img/btn-upp.png" alt="icon button"></button>
                     <button type="button" data-action="down" class="button down"><img class="icon-img" src="img/btn-down.png" alt="icon button"></button>
                     ${task.isEdit
                ? `<button type="button" data-action="save" class="btn-action button"><img class="icon-img" src="img/save.png" alt="save button"></button>`
                : `<button type="button" data-action="edit" class="btn-action button"><img class="icon-img" src="img/edit.png" alt="edit button"></button>`
            }
                     
                     <button type="button" data-action="done" class="btn-action1 button"><img class="icon-img" src="img/checked.png" alt="checked button"></button>
                     <button type="button" data-action="delete" class="btn-action2 button"><img class="icon-img" src="img/delete.png" alt="delete button"></button>
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
            isEdit: false,
        };

        removeInputText();
        addNewTask(newTask);
        renderTasks();
    }
}

function actionTaskController(e) {
    const id = getTaskId(e);
    const action = e.target.dataset.action;

    if (action === 'done') {
        completeTaskForId(id);
        renderTasks();
    }

    if (action === 'delete') {
        deleteTaskForId(id);
        renderTasks();
    }

    if (action === 'up' || action === 'down') {
        changePosition(id, action);
        renderTasks();
    }

    if (action === 'edit') {
        editableTasks(id);
        renderTasks();
    }

    if (action === 'save') {
        const newText = getTaskText(id);
        editTask(id, newText);
        editableTasks(id);
        renderTasks();
    }
}

function init() {
    renderTasks();

    form.addEventListener('submit', addTaskController);
    tasksUl.addEventListener('click', actionTaskController);
}

init();