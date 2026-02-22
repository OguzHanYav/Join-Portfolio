/**
 * Passes task status variables to the template function for rendering
 *
 * @param {number} countToDo - The number of tasks with "to-do" status
 * @param {number} countInProgress - The number of tasks with "in-progress" status
 * @param {number} countAwaitFeedback - The number of tasks with "await-feedback" status
 * @param {number} countDone - The number of tasks with "done" status
 * @param {number} taskCount - The total number of tasks
 * @param {number} prioUrgent - The number of tasks with "prioUrgent" priority
 * @param {string} formattedDate - The formatted next due date or a placeholder text if unavailable
 */
function renderAmountSummary(
  countToDo,
  countInProgress,
  countAwaitFeedback,
  countDone,
  taskCount,
  prioUrgent,
  formattedDate
) {
  let summaryBoardContainer = document.getElementById("summaryBoardContainer");
  summaryBoardContainer.innerHTML = summaryBoardTemplate(
    countToDo,
    countInProgress,
    countAwaitFeedback,
    countDone,
    taskCount,
    prioUrgent,
    formattedDate
  );
}

/**
 * Function retrieves data from BASE_URL and converts it to JSON
 *
 * @param {string} path - The path added to the BASE_URL for fetching data
 */
async function fetchAmounts(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let data = await response.json();
  filterStatus(data);
}

/**
 * Function filters status/priority of tasks and count them
 *
 * @param {object} data - An object containing task data, where each value has a "Status", "Priority" property
 */
function filterStatus(data) {
  const asArray = Object.entries(data);
  const filteredToDo = asArray.filter(([key, value]) => value.Status === "to-do");
  const filteredInProgress = asArray.filter(([key, value]) => value.Status === "in-progress");
  const filteredAwaitFeedback = asArray.filter(([key, value]) => value.Status === "await-feedback");
  const filteredDone = asArray.filter(([key, value]) => value.Status === "done");
  const filteredPrio = asArray.filter(([key, value]) => value.Priority === "prioUrgent");

  let formattedDate = sortDates(filteredPrio);

  const countToDo = filteredToDo.length;
  const countInProgress = filteredInProgress.length;
  const countAwaitFeedback = filteredAwaitFeedback.length;
  const countDone = filteredDone.length;
  const taskCount = asArray.length;
  const prioUrgent = filteredPrio.length;
  renderAmountSummary(countToDo, countInProgress, countAwaitFeedback, countDone, taskCount, prioUrgent, formattedDate);
}

/**
 * Filters and sorts tasks with "prioUrgent" priority to determine the next due date
 *
 * @param {array} filteredPrio - An array of tasks with "prioUrgent" priority
 * @returns {string} - Formats date into a string
 */
function sortDates(filteredPrio) {
  const currentDate = new Date();

  const upcomingDates = filteredPrio
    .map(([key, value]) => new Date(value.DueDate))
    .filter((date) => date > currentDate)
    .sort((a, b) => a - b);

  const nextDueDate = upcomingDates.length > 0 ? upcomingDates[0] : null;

  return nextDueDate
    ? `${nextDueDate.getDate()} ${nextDueDate.toLocaleString("default", {
        month: "long",
      })}, ${nextDueDate.getFullYear()}`
    : "Out of date";
}

/**
 * Retrieves user-name from local and session storage and determines the appropriate greeting by calling corresponding functions
 */
function summaryGreeting() {
  if (localStorage.getItem("user")) {
    let userName = localStorage.getItem("user");
    let userObject = JSON.parse(userName);
    let entries = Object.entries(userObject);
    dayTime(entries);
  } else if (sessionStorage.getItem("user")) {
    let userName = sessionStorage.getItem("user");
    let userObject = JSON.parse(userName);
    let entries = Object.entries(userObject);
    dayTime(entries);
    if (entries[1][1] == "guest") {
      dayTimeGuest();
    }
  }
}

/**
 * Updates the greeting message based on the time of day
 *
 * @param {array} entries - A nested array where `entries[2][1]` contains the user's name
 */
function dayTime(entries) {
  let greetingSummary = document.getElementById("greetingSummary");
  let today = new Date();
  let currentHr = today.getHours();

  if (currentHr < 12) {
    greetingSummary.innerHTML = `Good morning, <br> <div class="userNameSummary">${entries[2][1]}</div>`;
  } else if (currentHr < 18) {
    greetingSummary.innerHTML = `Good afternoon, <br> <div class="userNameSummary">${entries[2][1]}</div>`;
  } else {
    greetingSummary.innerHTML = `Good evening, <br> <div class="userNameSummary">${entries[2][1]}</div>`;
  }
}

/**
 * Updates the greeting message based on the time of day without user's name
 */
function dayTimeGuest() {
  let greetingSummary = document.getElementById("greetingSummary");
  let today = new Date();
  let currentHr = today.getHours();

  if (currentHr < 12) {
    greetingSummary.innerHTML = "Good morning";
  } else if (currentHr < 18) {
    greetingSummary.innerHTML = "Good afternoon";
  } else {
    greetingSummary.innerHTML = "Good evening";
  }
}
