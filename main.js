function todayDate() {
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  let fullDate = day + "/" + month + "/" + year;
  const todayDateDiv = document.getElementById("todayDate");
  todayDateDiv.innerHTML = "Today is: " + fullDate;
}
todayDate();

function validateForm() {
  const taskDetailsBox = document.getElementById("taskDetailsBox");
  const taskDateBox = document.getElementById("taskDateBox");

  const taskDetails = taskDetailsBox.value;
  const taskDate = taskDateBox.value;
  taskDetailsBox.style.backgroundColor = "";
  taskDateBox.style.backgroundColor = "";

  //change fields valid/invalid icons

  //validate empty fields
  if (taskDetails == "") {
    alert("Missing Task Details");
    taskDetailsBox.setAttribute(
      "class",
      " taskDetailsBox form-control is-invalid" // add rounded pink border with invalid
    );
    taskDetailsBox.focus();
    return false;
  } else {
    taskDetailsBox.setAttribute("class", " taskDetailsBox form-control");
  }
  if (taskDate == "") {
    alert("Missing Task Due Date");
    taskDateBox.setAttribute("class", " taskDateBox form-control is-invalid"); // add rounded pink border with invalid

    taskDateBox.focus();
    return false;
  } else {
    taskDateBox.setAttribute("class", " taskDateBox form-control");
  }
  saveTasks();
}

function saveTasks() {
  const taskDetailsBox = document.getElementById("taskDetailsBox");
  const taskDateBox = document.getElementById("taskDateBox");
  const taskTimeBox = document.getElementById("taskTimeBox");

  const taskDetails = taskDetailsBox.value;
  const taskDate = taskDateBox.value;
  const taskTime = taskTimeBox.value;

  const tasks = { taskDetails, taskDate, taskTime };
  let allTasks = [];
  let allTasksJsonString = localStorage.getItem("allTasks"); // return null if there is no array!
  if (allTasksJsonString != null) {
    allTasks = JSON.parse(allTasksJsonString);
  }
  allTasks.push(tasks);

  // Save the new array back to local storage:
  allTasksJsonString = JSON.stringify(allTasks);
  localStorage.setItem("allTasks", allTasksJsonString);

  // Clear all text boxes:
  taskDetailsBox.value = "";
  taskDateBox.value = "";
  taskTimeBox.value = "";
  taskDetailsBox.focus();
  displayAllTasks();
}

function displayAllTasks() {
  const container = document.getElementById("stickyNotesContainer");
  // Load all tasks from local storage:
  let allTasks = [];
  let allTasksJsonString = localStorage.getItem("allTasks"); // return null if there is no array!
  if (allTasksJsonString != null) {
    allTasks = JSON.parse(allTasksJsonString); // המרה של מחרוזת למשהו אחר
  }

  // Clear previous data:
  container.innerHTML = "";

  // Display all tasks:
  let index = 0;
  for (const task of allTasks) {
    // Create new div with textarea and delete button:
    const div = document.createElement("div");
    const textarea = document.createElement("TEXTAREA"); // create textarea
    const deleteTask = document.createElement("i"); // create icon
    const dateTimePar = document.createElement("p"); // create paragraph

    // Set class to div
    div.setAttribute("class", "stickyNote");

    // Set class to textarea
    textarea.setAttribute("class", "stickyText");
    textarea.setAttribute("disabled", "true");
    // Set class to deleteTask icon
    deleteTask.setAttribute("class", "fas fa-window-close deleteTask");

    // Set class to dateTimePar
    dateTimePar.setAttribute("class", "dateTimePar");

    deleteTask.setAttribute("onclick", "deleteTask(" + index + ")");
    deleteTask.style.cursor = "pointer";
    div.setAttribute("onmouseover", "showIcon(" + index + ")");
    div.setAttribute("onmouseout", "hideIcon(" + index + ")");
    index++;

    //set textarea value
    textarea.value = task.taskDetails;

    // Add div to container:
    container.appendChild(div);
    div.appendChild(deleteTask);
    div.appendChild(textarea);
    div.appendChild(dateTimePar);
    dateTimePar.innerHTML = task.taskDate + "<br> " + task.taskTime;
  }
}

displayAllTasks();

//delete object from array

function deleteTask(index) {
  let allTasksJsonString = localStorage.getItem("allTasks");
  allTasks = JSON.parse(allTasksJsonString);
  allTasks.splice(index, 1);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  displayAllTasks();
  noTaskAlert();
}

function showIcon(index) {
  const deleteIcon = document.getElementsByClassName("deleteTask");
  deleteIcon[index].style.visibility = "visible";
}

function hideIcon(index) {
  const deleteIcon = document.getElementsByClassName("deleteTask");
  deleteIcon[index].style.visibility = "hidden";
}

function resetForm() {
  const taskForm = document.getElementById("taskForm");
  taskForm.reset();
  taskDateBox.setAttribute("class", " taskDateBox form-control");
  taskDetailsBox.setAttribute("class", " taskDetailsBox form-control");
}

function noTaskAlert() {
  let allTasks = [];
  let allTasksJsonString = localStorage.getItem("allTasks");
  const container = document.getElementById("stickyNotesContainer");
  const alertDivContainer = document.createElement("div");
  const alertDiv = document.createElement("div");
  alertDivContainer.setAttribute("class", "noTaskAlertContainer ");
  alertDiv.setAttribute("class", "alert alert-warning noTaskAlert");
  alertDiv.innerHTML = "No Tasks On The Board, Please Add New Task";

  if (allTasksJsonString == "[]" || allTasksJsonString == null) {
    allTasks = JSON.parse(allTasksJsonString);
    container.appendChild(alertDivContainer);
    alertDivContainer.appendChild(alertDiv);
  }
}
noTaskAlert();
