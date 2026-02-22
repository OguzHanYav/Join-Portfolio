let assignedContacts = [];
let subtasksArray = [];
let sortedContacts = [];

/**
 * This function opens add-contact-form
 *
 * @param {string} [status="to-do"] - The status of the task (default is "to-do")
 * @param {string} [editTask="false"] - The editTask value of the task (default is "false")
 * @param {string} [key=""] - The created key of the task when saved in the API, given by the pullTasks() funktion(default is "")
 */
function addTask(status = "to-do", editTask = false, key = "") {
  const addTaskMain = document.getElementById("addTaskMain");
  const addTask = document.getElementById("addTask");
  addTaskMain.style.display = "flex";
  setTimeout(() => addTaskMain.classList.add("show"), 10);
  setTimeout(() => addTask.classList.add("show"), 10);
  if (editTask === true) {
    editTaskTemplateAdjustemt(status, key, addTask);
  } else {
    addTask.innerHTML = templateAddTask(status);
  }
  pullContactsToAssign();
  setMinDate();
}

/**
 * This function opens add-task-form in the add Task Navigation
 */
function addTaskNav() {
  const addTaskMain = document.getElementById("addTaskMain");
  const addTask = document.getElementById("addTask");
  addTask.innerHTML = templateAddTaskNav();
  renderUserIcon();
  subtasksArray = [];
}

/**
 * This function closes add-task-form
 */
function closeAddTask() {
  const addTaskMain = document.getElementById("addTaskMain");
  const addTask = document.getElementById("addTask");
  assignedContacts = [];
  addTask.classList.remove("show");
  setTimeout(() => {
    addTaskMain.classList.remove("show");
    setTimeout(() => {
      addTaskMain.style.display = "none";
    }, 100);
  }, 100);
  let overlay = document.getElementById("addTask");
  overlay.classList.remove("w600");
}

/**
 * Renders the assigned contacts in the "Add Task" form.
 */
// function renderAssignedContactsInAddTask() {
//   let div = document.getElementById("assignedContactsImgDiv");
//   div.innerHTML = "";
//   assignedContacts.forEach((obj) => {
//     div.innerHTML += assignedContactInitialsTemplate(obj.initials, obj.color);
//   });
// }
function renderAssignedContactsInAddTask() {
  const div = document.getElementById("assignedContactsImgDiv");
  div.innerHTML = "";
  const maxVisible = 4;
  const visibleContacts = assignedContacts.slice(0, maxVisible);
  const remainingCount = assignedContacts.length - maxVisible;
  const content = visibleContacts.map((obj) => assignedContactInitialsTemplate(obj.initials, obj.color)).join("");
  div.innerHTML = content;
  if (remainingCount > 0) {
    div.innerHTML += `
      <div class="contactRemainingCount contactInitialsExtraSmall addTaskInitals">
        +${remainingCount}
      </div>
    `;
  }
}

/**
 * This function assigns or removes a contact to/from a task when the checkbox is toggled.
 *
 * @param {string} key - The unique identifier of the contact
 * @param {string} ini - The initials of the contact
 * @param {string} c - The color associated with the contact
 * @param {number} i - The index of the contact in the dropdown list
 */
function assignContactToTask(key, ini, c, i) {
  checkBox = document.getElementById(key);
  let obj = {id: key, initials: ini, color: c};
  let div = document.getElementById("inDropdown" + i);
  if (div.classList.contains("assignedContactInList")) {
    checkBox.checked = false;
    div.classList.remove("assignedContactInList");
    const pos = assignedContacts.map((e) => e.id).indexOf(key);
    assignedContacts.splice(pos, 1);
  } else {
    checkBox.checked = true;
    div.classList.add("assignedContactInList");
    assignedContacts.push(obj);
  }
  renderAssignedContactsInAddTask();
}

/**
 * Renders the subtasks list in the "Add Task" form.
 */
function renderSubtasks() {
  let subtask = document.getElementById("addTaskInputSubtask");
  let div = document.getElementById("subtasksList");
  div.innerHTML = "";
  if (subtask.value) {
    subtasksArray.push({task: subtask.value, undone: true});
  }
  if (subtasksArray) {
    subtasksArray.forEach((task, index) => {
      div.innerHTML += subtaskTemplate(task.task, index);
    });
  }
  subtask.value = "";
}

/**
 * Prepares the task data and determines whether to edit or create a task.
 *
 * @param {string} status - The status of the task (default is "to-do")
 * @param {boolean} editTask - Whether the task is being edited (true) or created (false)
 * @param {string} key - The unique key of the task (only needed when editing)
 */
async function setDataForTask(status = "to-do", editTask = false, key = "") {
  let title = document.getElementById("addTaskInputTitle").value;
  let description = document.getElementById("addTaskInputDescription").value;
  description = description.replace("<", ".");
  let assigned = assignedContacts;
  let date = document.getElementById("addTaskInputDate").value;
  let prio = document.getElementsByClassName("chosenPrio")[0].id;
  let category = document.getElementById("addTaskInputCategory").value;
  let subtasks = subtasksArray;
  let data = {Title: title, Description: description, AssignedTo: assigned, DueDate: date, Priority: prio, Category: category, Subtasks: subtasks, Status: status};
  await handleTaskSaving(editTask, key, data);
  location.replace("https://join-390.developerakademie.net/Join/board.html");
}

/**
 * Handles task saving logic, either editing an existing task or creating a new one.
 *
 * @param {boolean} editTask - Whether the task is being edited (true) or created (false)
 * @param {string} key - The unique key of the task (only needed when editing)
 * @param {Object} data - The task data to be saved or updated
 */
async function handleTaskSaving(editTask, key, data) {
  if (editTask === true) {
    await editTaskInDatabase(key, data);
  } else {
    await postTask(data);
    renderPopup("addTask");
    const delay = setTimeout(() => {
      addTaskNav();
      subtasksArray = [];
    }, 1600);
  }
}

/**
 * Sends a new task to the database via a POST request.
 *
 * @param {Object} data - The task data to be sent to the database
 */
async function postTask(data) {
  let response = await fetch(BASE_URL + "tasks/.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Fetches the data of a specific task for the editing task window.
 *
 * @param {string} key - The unique key of the task to be edited
 */
async function getDataForEditTask(key) {
  let response = await fetch(BASE_URL + `tasks/${key}.json`);
  let dataTask = await response.json();
  let status = dataTask.Status;
  addTask(status, true, key);
  changeWindowToMobile();
  closetaskCardLarge();
  fillInputsEditTask(dataTask);
}

/**
 * Adjusts the "Add Task" window to fit a mobile layout for the editing task window.
 */
function changeWindowToMobile() {
  let div = document.getElementById("addTaskSplit");
  let overlay = document.getElementById("addTask");
  let portion = document.querySelectorAll(".addTaskPortion").forEach((e) => {
    e.classList.add("portionMobile");
  });
  div.classList.add("editMobile");
  overlay.classList.add("w600");
}

/**
 * Populates the input fields of the "Edit Task" form with task data.
 *
 * @param {Object} dataTask - The data of the task to be edited
 */
async function fillInputsEditTask(dataTask) {
  let title = document.getElementById("addTaskInputTitle");
  let description = document.getElementById("addTaskInputDescription");
  let date = document.getElementById("addTaskInputDate");
  let category = document.getElementById("addTaskInputCategory");
  date.value = dataTask.DueDate;
  category.value = dataTask.Category;
  subtasksArray = dataTask.Subtasks;
  title.value = dataTask.Title;
  description.value = dataTask.Description;
  await pullContactsToAssign();
  renderEditInputs(dataTask.Priority);
  let assigned = pullContactDetails(dataTask.AssignedTo);
}

/**
 * Processes and assigns contacts to the edit task form.
 *
 * @param {Array} assigned - An array of assigned contact objects
 */
async function pullContactDetails(assigned) {
  assigned.forEach(async (contact) => {
    const nameOfContact = await pullAssignedContact(contact.id);
    const index = sortedContacts[0].findIndex((contact) => contact[1]?.name === nameOfContact);
    assignContactToTask(contact.id, contact.initials, contact.color, index);
  });
}

/**
 * Fetches the name of a contact from the database using their key.
 *
 * @param {string} key - The unique identifier of the contact in the database
 */
async function pullAssignedContact(key) {
  let response = await fetch(BASE_URL + "contacts/" + key + "/name" + "/.json");
  let responseToJson = await response.json();
  return responseToJson;
}

/**
 * Renders the inputs for the edit task form.
 *
 * @param {string} prio - The priority of the task to be rendered
 */
function renderEditInputs(prio) {
  changePrio(prio);
  renderSubtasks();
  renderAssignedContactsInAddTask();
}

/**
 * Edits an existing task and updates the User Interface accordingly.
 *
 * @param {string} key - The unique key of the task to be edited
 */
async function editTask(key) {
  let response = await fetch(BASE_URL + "tasks/" + key + "/Status" + "/.json");
  let status = await response.json();
  await setDataForTask(status, true, key);
  closeAddTask();
  closetaskCardLarge();
  await pullTasks();
  taskCardLarge(key);
}

/**
 * Updates a task in the database with new data.
 *
 * @param {string} key - The unique key of the task to be updated
 * @param {Object} data - The updated task data
 */
async function editTaskInDatabase(key, data) {
  let response = await fetch(BASE_URL + `tasks/${key}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Toggles the visibility of the dropdown menu for assigning contacts in the "Add Task" form.
 */
document.addEventListener("click", function (e) {
  let dropdown = document.getElementById("dropdownContent");
  let arrow = document.getElementById("fakeInputArrow");
  let assignedAddTasks = document.getElementById("assignedAddTaks");
  if (dropdown && arrow && assignedAddTasks) {
    let isInsideDropdown = dropdown.contains(e.target);
    let isInsideAssignedAddTasks = assignedAddTasks.contains(e.target);
    if (!isInsideDropdown && !isInsideAssignedAddTasks && dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      arrow.classList.remove("rotate");
    }
    if (isInsideAssignedAddTasks && !dropdown.classList.contains("show")) {
      dropdown.classList.add("show");
      arrow.classList.add("rotate");
    }
  }
});

/**
 * Deletes a task from the database and updates the User Interface.
 *
 * @param {string} key - The unique key of the task to be deleted
 */
async function deleteTaskCardLarge(key) {
  let response = await fetch(BASE_URL + `tasks/${key}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  closetaskCardLarge();
  pullTasks();
  renderPopup("delTask");
}

/**
 * Fetches contacts from the database and renders them in the dropdown menu.
 */
async function pullContactsToAssign() {
  let dropdown = document.getElementById("dropdownContent");
  let response = await fetch(BASE_URL + ".json");
  let data = await response.json();
  let contacts = data.contacts;
  if (contacts) {
    renderContactsToAssign(dropdown, contacts);
  }
}

/**
 * Renders a list of contacts in the dropdown menu in the add task form for task assignment.
 *
 * @param {HTMLElement} dropdown - The dropdown menu element where the contacts will be displayed
 * @param {Object} contacts - An object containing the list of contacts
 */
function renderContactsToAssign(dropdown, contacts) {
  dropdown.innerHTML = "";
  sortedContacts = [];
  sortedContacts.push(sortContacts(contacts));
  sortedContacts[0].forEach(([key, contact], index) => {
    dropdown.innerHTML += assigneContactTemplate(key, contact, index, contact.color);
  });
}

/**
 * Updates the priority selection in the add task form by changing styles and classes for the selected priority.
 *
 * @param {string} prio - The priority of the task
 */
function changePrio(prio) {
  const prioritieIcons = ["prioUrgent", "prioMedium", "prioLow"];
  let prioId = prioritieIcons.indexOf(prio);
  prioritieIcons.forEach((prioritie, i) => {
    document.getElementById(prioritie).classList.add(prioritie + "Color");
    document.getElementById(prioritie).classList.remove(prioritie + "White");
    document.getElementById(prioritie).classList.remove("chosenPrio");
    document.getElementById(prioritie + "Div").classList.remove(prioritie + "ColorDiv");
  });
  document.getElementById(prioritieIcons[prioId]).classList.add(prioritieIcons[prioId] + "White");
  document.getElementById(prioritieIcons[prioId]).classList.add("chosenPrio");
  document.getElementById(prioritieIcons[prioId] + "Div").classList.add(prioritieIcons[prioId] + "ColorDiv");
  document.getElementById(prioritieIcons[prioId]).classList.remove(prioritieIcons[prioId] + "Color");
}

/**
 * Sets the minimum selectable date in the date input field to today's date.
 */
function setMinDate() {
  const today = new Date().toISOString().slice(0, 10);
  document.getElementsByName("date")[0].min = today;
  renderUserIcon();
}

/**
 * Toggles the visibility of the subtask icons in the add task form.
 *
 * @param {number} i - The index of the subtask whose icons are to be toggled
 */
function showIconsAddTask(i) {
  let div = document.getElementById("subtaskIcons" + i);
  div.classList.toggle("show");
}

/**
 * Switches a subtask to edit mode by rendering an input field with its current value.
 *
 * @param {number} i - The index of the subtask in the `subtasksArray` to be edited
 */
function editSubtask(i) {
  let task = document.getElementById("subtaskDiv" + i);
  let subtask = subtasksArray[i].task;
  task.innerHTML = subtaskEditTemplate(subtask, i);
}

/**
 * Deletes a subtask from the `subtasksArray` and updates the subtasks shown in the add task form.
 *
 * @param {number} i - The index of the subtask in the `subtasksArray` to be deleted
 */
function delSubtask(i) {
  subtasksArray.splice(i, 1);
  renderSubtasks();
}

/**
 * Saves the edited value of a subtask and updates the subtasks shown in the add task form.
 *
 * @param {number} i - The index of the subtask in the `subtasksArray` to be added
 */
function saveEditSubtask(i) {
  let editTask = document.getElementById("addTaskInputSubtaskEdit" + i);
  subtasksArray[i].task = editTask.value;
  renderSubtasks();
}
