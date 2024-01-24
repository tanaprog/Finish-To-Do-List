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


//////////////////////////////////////////////////

function editTask(id) {

    const editTaskId = TASK_LIST.find((tsk) => tsk.id === id);
    console.log(editTaskId)

    let editText = createElement('input', 'editable');
    let listT = document.querySelector('.task-title')
    editText.value = editTaskId.text;
    listT.innerHTML = ''
    console.log(editTaskId.text)
    listT.appendChild(editText);

    editText.focus()

    editText.addEventListener('blur', () => {
        listT.innerHTML = editText.value
    });
}

///////////////////////////////////////////////////


function editTask1(id) {


    // const editTaskId = TASK_LIST.find((tsk) => tsk.id === id);

    // if (event.target.dataset.action === 'edit') {
    // const parentNode = event.target.closest('.list-group-item');
    //     let editText = document.createElement('input');
    //     const taskTitle = document.querySelector('.task-title');
    //     editText.value = taskTitle.textContent;
    //     taskTitle.innerHTML = '';
    //     taskTitle.appendChild(editText);

    //     editText.focus()

    //     editText.addEventListener('blur', () => {
    //         taskTitle.textContent = editText.value

    // parentNode.contentEditable = true
    //     });
    // }
}

//////////////////////////////////////////



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
    // tasksUl.innerHTML = '';

    TASK_LIST.forEach((task) => {
        const cssClass = task.isCompleted ? "task-title checked" : "task-title";
        const item = createElement('li', 'list-group-item');
        item.setAttribute('id', task.id);

        const taskUI = `
                     <span class="${cssClass}">${task.text}</span>
                     <div class="button">
                     <button type="button" data-action="edit" class="btn-action button">ed</button>
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