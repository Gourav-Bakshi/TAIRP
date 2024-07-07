const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task;
        li.appendChild(span);

        const editInput = document.createElement('input');
        editInput.className = 'edit-input';
        editInput.value = task;
        editInput.style.display = 'none';
        li.appendChild(editInput);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeTask(index);
        li.appendChild(removeButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.onclick = () => toggleEdit(index);
        li.appendChild(editButton);

        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.textContent = 'Save';
        saveButton.style.display = 'none';
        saveButton.onclick = () => saveTask(index);
        li.appendChild(saveButton);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleEdit(index) {
    const li = document.querySelectorAll('li')[index];
    const span = li.querySelector('span');
    const editInput = li.querySelector('.edit-input');
    const editButton = li.querySelector('.edit-button');
    const saveButton = li.querySelector('.save-button');
    const removeButton = li.querySelector('.remove-button');

    span.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.focus();

    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
    removeButton.style.display = 'none';
}

function saveTask(index) {
    const li = document.querySelectorAll('li')[index];
    const span = li.querySelector('span');
    const editInput = li.querySelector('.edit-input');
    const editButton = li.querySelector('.edit-button');
    const saveButton = li.querySelector('.save-button');
    const removeButton = li.querySelector('.remove-button');

    const updatedTask = editInput.value.trim();
    tasks[index] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    span.textContent = updatedTask;
    span.style.display = 'inline-block';
    editInput.style.display = 'none';

    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    removeButton.style.display = 'inline-block';
}

renderTasks();
