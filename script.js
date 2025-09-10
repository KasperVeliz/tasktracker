//Set global variables
let tasks = [];
let tasksCompleted = 0;
const tasksCompletedElement = document.getElementById("tasksComplete");
const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

function handleSubmission(event) {
    event.preventDefault();
    //get values
    const taskName = document.getElementById("taskName").value;
    const taskDescription = ":: " + document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;

    console.log(taskName)
    //validate
    if(!taskName || !taskDeadline){
        alert("Task name and deadline required!");
        return;
    }
    //update tasks array and rerender task table
    tasks.push({name:taskName, description:taskDescription, deadline:taskDeadline});
    render();
    
}

function removeTarget(target){
    tasks.splice(target,1);
}

function markTaskComplete(task) {
    removeTarget(task);
    tasksCompleted += 1;
    render();
}

function removeTask(task) {
    removeTarget(task)
    render();
}

function render(){
    tasksCompletedElement.innerHTML = "Tasks Completed: " + tasksCompleted;
    taskTable.innerHTML = '';
    if (tasks.length==0){
        taskTable.innerHTML += `
        <tr>
            <td>^^^ Add Some Tasks ^^^</td>
        </tr>
        `;
    }
    for (let i = 0; i < tasks.length; i++){
        taskTable.innerHTML += `
        <tr>
            <td>${tasks[i].name} @</td>
            <td>${tasks[i].deadline}</td>
            <td id="taskDescriptionText">${tasks[i].description}</td>
            <td><button id="markComplete" onclick="markTaskComplete(${i})">Complete</button></td>
            <td><button id="remove" onclick="removeTask(${i})">Remove</button></td>
        </tr>
        ` + " ";
    }
    taskForm.reset();
}

function init(){
    tasksCompletedElement.innerHTML = "Tasks Completed: 0";
    tasks = [];
    tasksCompleted = 0;
    render();
}

taskForm.addEventListener("submit", handleSubmission);
init();