let taskItemsContainer = document.getElementById("taskItemsContainer");
let addTaskButton = document.getElementById("addTaskButton");

function getTaskListFromLocalStorage() {
    let stringifiedTaskList = localStorage.getItem("taskList");
    let parsedTaskList = JSON.parse(stringifiedTaskList);
    if (parsedTaskList === null) {
        return [];
    } else {
        return parsedTaskList;
    }
}

let taskList = getTaskListFromLocalStorage();
let taskCount = taskList.length;

function onAddTask() {
    let userInputElement = document.getElementById("taskUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Text is not valid");
        return;
    }

    taskCount = taskCount + 1;

    let newTask = {
        text: userInputValue,
        uniqueNo: taskCount,
    };
    taskList.push(newTask);
    createAndAppendTask(newTask);
    userInputElement.value = "";
}

addTaskButton.onclick = function() {
    onAddTask();
};

function onTaskStatusChange(checkboxId, labelId, taskId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let taskObjectIndex = taskList.findIndex(function(eachTask) {
        let eachTaskId = "task" + eachTask.uniqueNo;
        if (eachTaskId === taskId) {
            return true;
        } else {
            return false;
        }
    });
    let taskObject = taskList[taskObjectIndex];
    if (taskObject.isChecked === true) {
        taskObject.isChecked = false;
    } else {
        taskObject.isChecked = true;
    }
}

function onDeleteTask(taskId) {
    let taskElement = document.getElementById(taskId);
    taskItemsContainer.removeChild(taskElement);

    let deleteElementIndex = taskList.findIndex(function(eachTask) {
        let eachTaskId = "task" + eachTask.uniqueNo;
        if (eachTaskId === taskId) {
            return true;
        } else {
            return false;
        }
    });

    taskList.splice(deleteElementIndex, 1);
}

function createAndAppendTask(task) {
    let taskId = "task" + task.uniqueNo;
    let checkboxId = "checkbox" + task.uniqueNo;
    let labelId = "label" + task.uniqueNo;

    let taskElement = document.createElement("li");
    taskElement.classList.add("task-item-container", "d-flex", "flex-row");
    taskElement.id = taskId;
    taskItemsContainer.appendChild(taskElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = task.isChecked;

    inputElement.onclick = function() {
        onTaskStatusChange(checkboxId, labelId, taskId);
    };

    inputElement.classList.add("checkbox-input");
    taskElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    taskElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = task.text;
    if (task.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTask(taskId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let task of taskList) {
    createAndAppendTask(task);
}
