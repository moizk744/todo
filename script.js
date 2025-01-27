const taskInput = document.getElementById("taskInput");
const todoBtn = document.getElementById("todoBtn");
const list_container = document.getElementById("list_container");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    let userTask = taskInput.value;
    if (!userTask) {
        alert("Please enter a task");
        return;
    }
    
    tasks.push(userTask);
    saveTasks();

    let todoList = document.createElement("li");
    let todoTxt = document.createElement("span");
    let removeBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    todoTxt.innerText = userTask;
    removeBtn.setAttribute("class", "btn btn-danger ");
    removeBtn.innerText = "Remove Task";
    editBtn.setAttribute("class", "btn btn-success ");
    editBtn.innerText = "Edit Task";
    todoTxt.setAttribute("title", userTask);
    todoList.appendChild(todoTxt);
    todoList.appendChild(editBtn);
    todoList.appendChild(removeBtn);
    list_container.appendChild(todoList);
    taskInput.value = "";

    removeBtn.addEventListener("click", function () {
        list_container.removeChild(todoList);

        const index = tasks.indexOf(userTask);
        if (index > -1) {
            tasks.splice(index, 1);
            saveTasks();
        }
    });

    editBtn.addEventListener("click", function () {
        let editTask = prompt("Edit Task", userTask);
        if (editTask !== null) {
            todoTxt.innerText = editTask;

            const index = tasks.indexOf(userTask);
            if (index > -1) {
                tasks[index] = editTask;
                saveTasks();
            }
            userTask = editTask;
        }
    });
}

todoBtn.addEventListener("click", addTask);


function loadTasks() {
    tasks.forEach(task => {
        let todoList = document.createElement("li");
        let todoTxt = document.createElement("span");
        let removeBtn = document.createElement("button");
        let editBtn = document.createElement("button");

        todoTxt.innerText = task;
        removeBtn.setAttribute("class", "btn btn-danger ");
        removeBtn.innerText = "Remove Task";
        editBtn.setAttribute("class", "btn btn-success ");
        editBtn.innerText = "Edit Task";
        todoTxt.setAttribute("title", task);
        todoList.appendChild(todoTxt);
        todoList.appendChild(editBtn);
        todoList.appendChild(removeBtn);
        list_container.appendChild(todoList);

        removeBtn.addEventListener("click", function () {
            list_container.removeChild(todoList);
            const index = tasks.indexOf(task);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        editBtn.addEventListener("click", function () {
            let editTask = prompt("Edit Task", task);
            if (editTask !== null) {
                todoTxt.innerText = editTask;
                const index = tasks.indexOf(task);
                if (index > -1) {
                    tasks[index] = editTask;
                    saveTasks();
                }
                task = editTask; 
            }
        });
    });
}

loadTasks();