var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    //prevents the page from refreshing
    event.preventDefault();
    //creates a list item 
    var listItemEl = document.createElement("li");
    //adds css style
    listItemEl.className = "task-item";
    // adds text to the item
    listItemEl.textContent = "This is a new task.";
    // puts it at the bottom of the unordered list
    tasksToDoEl.appendChild(listItemEl);
    console.log(event);
};

formEl.addEventListener("submit", createTaskHandler);

