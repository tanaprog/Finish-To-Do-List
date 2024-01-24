const spanTask = document.querySelector('.span-task');
const btnTask = document.querySelector('.btn');

function editTask() {
    let inputTask = document.createElement('input');
    inputTask.value = spanTask.textContent
    spanTask.innerHTML = '';
    spanTask.appendChild(inputTask)

    inputTask.addEventListener('blur', () => {
        spanTask.textContent = inputTask.value
    });
}

btnTask.addEventListener('click', editTask);