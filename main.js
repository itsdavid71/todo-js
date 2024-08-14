

function init () {
    const taskAddForm = document.getElementById('task-add');
    const taskField = document.getElementById('task-field')
    let tasks = new Map();


    const generateKey = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    const saveTasks = () => {
        const tasksArr = Array.from(tasks.values());
        console.log(tasksArr);
        window.localStorage.setItem('tasks', JSON.stringify(tasksArr));
    }

    const addTask = (text, status, storage, key) => {

        const taskObj = {
            text, status, key
        }
        if (storage === false) {
            key = generateKey();
            taskObj.key = key;
            tasks.set(key, taskObj)
            console.log(tasks);
            saveTasks();
        }

        const newTask = document.createElement("div");
        newTask.className = "task-item";
        newTask.dataset.key = key;
        newTask.classList.add(status);

        const taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.textContent = text;
        newTask.append(taskText);

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const taskActionDone = document.createElement("div");
        taskActionDone.className = 'task-done';
        taskActionDone.textContent = 'Готово';
        taskActions.append(taskActionDone);

        const taskActionDelete = document.createElement("div");
        taskActionDelete.className = 'task-delete';
        taskActionDelete.textContent = 'Удалить';
        taskActions.append(taskActionDelete);
        newTask.append(taskActions);

        const taskStatus = document.createElement("div");
        taskStatus.classList = 'task-status';

        if (status === 'done') taskStatus.textContent = 'Сделано';
        else taskStatus.textContent = 'Не сделано';
        newTask.append(taskStatus);
        taskField.append(newTask);
    }

    // Отображаем таски из localStorage, если есть
    const tasksStorage = localStorage.getItem('tasks');
    if (tasksStorage != "") {
        const tasksArr = JSON.parse(tasksStorage)
        if (tasksArr !== null && tasksArr !== undefined) {
            if (tasksArr.length > 0) {
                tasksArr.forEach(task => { 
                    tasks.set(task.key, task)
                    addTask(task.text, task.status, true, task.key );
                });
            };
        }
    } 

    const deleteTask = (e) => {
        const key = e.dataset.key;
        tasks.delete(key);
        e.remove();
        saveTasks();
    }

    const doneTask = (e) => {
        const key = e.dataset.key;
        const task = tasks.get(key);
        task.status = 'done';
        tasks.set(key, task);
        e.classList.add('done');
        const taskStatus = e.querySelector('.task-status');
        taskStatus.textContent = "Сделано";
        saveTasks();
    }
    
    
    

    taskField.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if (e.target.classList.contains ('task-done')) doneTask(e.target.parentElement.parentElement);
        if (e.target.classList.contains('task-delete')) deleteTask(e.target.parentElement.parentElement);
        
    });


    taskAddForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textTask = taskAddForm.querySelector('.task-add-text').value;
        if (textTask != '') addTask(textTask, 'processing', false);
        else alert('Заполните поле');
    });


}

window.onload = init;