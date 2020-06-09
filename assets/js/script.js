var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
    
    //prevents the page from refreshing
    event.preventDefault();

    // takes the input from the text field and stores it (value is where the text is stored otherwise it pulls nothing.)
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // grabs the dropdown selection
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // if null answers prompts to fill it out
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // resets only the form
    formEl.reset();
    // created an object, makes it clear this function is collecting data
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj) {
    //creates a list item 
    var listItemEl = document.createElement("li");
    //adds css style
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task infor and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.classname = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // adds entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // creat edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "staus-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do","In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    var targetEl = event.target;
    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    else if (event.target.matches(".delete-btn")) {
        //get the element's task id
        var taskId =event.target.getAttribute("data-task-id")
        deleteTask(taskId);
    }
};
var editTask = function(taskId) {
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id ='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
        document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
        document.querySelector("select[name='task-type']").value = taskType;
    // changes submit button text

};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);