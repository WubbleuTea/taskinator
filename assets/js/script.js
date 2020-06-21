var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
//creates a task array we are going to save in local storage
var tasks = []



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
        formEl.reset();
    //    var.selectedIndex = 0;
        return false;
    }
    // resets only the form

    // takes the changes from edit
    var completeEditTask = function(taskName, taskType, taskId) {
        // find the matching task list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        //set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        // loop through tasks array and task object with new content
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === parseInt(taskId)) {
                tasks[i].name = taskName;
                tasks[i].type = taskType
            }
        };
        saveTasks();
        alert("Task Updated!");

        //return everything to normal
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";

    }

    //testing true/false if the content is an edit or original
    var isEdit = formEl.hasAttribute("data-task-id");
        //has data attribut, so get task id and call function to complete edit proess
        if (isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        }
        // no data attribute, so create object as normal and pass to createTaskEl function4
        else{
            // created an object, makes it clear this function is collecting data
            var taskDataObj = {
                name: taskNameInput,
                type: taskTypeInput,
                status: "to do"
            };

            createTaskEl(taskDataObj);
            console.log(taskDataObj);
            console.log(taskDataObj.status)
        }
};

var createTaskEl = function(taskDataObj) {
    //creates a list item 
    var listItemEl = document.createElement("li");
    //adds css style
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

    // create div to hold task infor and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.classname = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    // adds task id and pushes created task into the var tasks array
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // adds entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

    saveTasks();
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
    statusSelectEl.setAttribute("name", "status-change");
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
        var taskId = event.target.getAttribute("data-task-id")
        deleteTask(taskId);
    }
};
var editTask = function(taskId) {
        // changes submit button text
    document.querySelector("#save-task").textContent = "Save Task";
    //saves the id given at the start to te item
    formEl.setAttribute("data-task-id", taskId);
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id ='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
        document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
        document.querySelector("select[name='task-type']").value = taskType;


};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i =0; i < tasks.length; i++) {
        //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !==parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
        console.log(tasks);
    }
    saveTasks();
};
// creates a dragstart
var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);

};
// creates the drag function and tries to nestle the task in the parent of .task-list
var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        // prevents task from just bouncing back during drag
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
   
    
};
// creates the drop function for our drags
var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    //set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
    dropZoneEl.removeAttribute("style");

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
    console.log(tasks);
};

var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    // get task items from localStorage
    tasks = localStorage.getItem("tasks");
    if (!tasks) {
        tasks = [];
        return false;
    }
    // conver taks from the stgigied format back into an array of objects
    tasks = JSON.parse(tasks);
    //Iterates through tasks array and creates task elements on the page from it
    for (i =0; i < tasks.length; i++) {
        tasks[i].id = taskIdCounter;
        // creates a list item for every task
        var listItemEl = document.createElement("li");
        listItemEl.classList.add("task-item");
        listItemEl.setAttribute("data-task-id", tasks[i].id);
        listItemEl.setAttribute("draggable", true);


        // creates a div inside of the list 
        var taskInfoEl = document.createElement("div");
            taskInfoEl.classList.add("task-info");
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
            listItemEl.appendChild(taskInfoEl);
        //treats the task button for where the item is.
        var taskActionsEl = createTaskActions(tasks[i].id);
            listItemEl.appendChild(taskActionsEl);

        if (tasks[i].status === "to do") {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
        }
        else if (tasks[i].status === "in progress") {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);
        }
        else if (tasks[i].status === "completed") {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
        };

        taskIdCounter++;

        console.log(listItemEl);

    };

    

};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);

pageContentEl.addEventListener("dragleave", dragLeaveHandler);

formEl.addEventListener("submit", taskFormHandler);

loadTasks();