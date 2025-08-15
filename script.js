document.getElementById("add-task-btn").addEventListener("click", addTask);

function addTask() {
    let title = document.getElementById("task-title").value.trim();
    let desc = document.getElementById("task-desc").value.trim();

    if (!title || !desc) {
        alert("Please fill out both fields!");
        return;
    }

    let dateAdded = new Date().toLocaleString();
    let taskItem = createTaskElement(title, desc, dateAdded, false);

    document.getElementById("pending-tasks").appendChild(taskItem);

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
}

function createTaskElement(title, desc, date, completed) {
    let li = document.createElement("li");
    li.className = "task";

    let content = document.createElement("div");
    content.innerHTML = `<strong>${title}</strong><br>${desc}<br><small>${completed ? "Completed on" : "Added on"}: ${date}</small>`;

    let actions = document.createElement("div");
    actions.className = "task-actions";

    if (!completed) {
        let completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.innerText = "✔";
        completeBtn.onclick = () => markAsComplete(li, title, desc);
        actions.appendChild(completeBtn);
    }

    let editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerText = "✏";
    editBtn.onclick = () => editTask(li, title, desc, completed);
    actions.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "✖";
    deleteBtn.onclick = () => li.remove();
    actions.appendChild(deleteBtn);

    li.appendChild(content);
    li.appendChild(actions);

    return li;
}

function markAsComplete(taskItem, title, desc) {
    let dateCompleted = new Date().toLocaleString();
    let completedTask = createTaskElement(title, desc, dateCompleted, true);
    document.getElementById("completed-tasks").appendChild(completedTask);
    taskItem.remove();
}

function editTask(taskItem, oldTitle, oldDesc, completed) {
    let newTitle = prompt("Edit Title:", oldTitle);
    let newDesc = prompt("Edit Description:", oldDesc);

    if (newTitle && newDesc) {
        let date = new Date().toLocaleString();
        let updatedTask = createTaskElement(newTitle, newDesc, date, completed);

        let parentList = taskItem.parentElement;
        parentList.replaceChild(updatedTask, taskItem);
    }
}
