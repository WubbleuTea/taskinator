var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    //prevents the page from refreshing
    event.preventDefault();

    // takes the input from the text field and stores it (value is where the text is stored otherwise it pulls nothing.)
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // grabs the dropdown selection
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //creates a list item 
    var listItemEl = document.createElement("li");
    //adds css style
    listItemEl.className = "task-item";

    // create div to hold task infor and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.classname = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // adds entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);

