// const BASE_URL =
//   "https://join-26d58-default-rtdb.europe-west1.firebasedatabase.app/";
 const BASE_URL = "https://join-portfolio-71702-default-rtdb.europe-west1.firebasedatabase.app/";

let userLocal = [];

function showDropDown() {
  dropdownHeader.classList.toggle("show");
}

function checkIfLogedIn() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      renderLogin();
    }
  }
}

function initAddTask() {
  addTaskNav();
  pullContactsToAssign();
  checkIfLogedIn();
  setMinDate();
}

function initBoard() {
  pullTasks();
  checkIfLogedIn();
}

function initContacts() {
  pullContacts();
  checkIfLogedIn();
}

function initSumary() {
  fetchAmounts("/tasks");
  summaryGreeting();
  renderUserIcon();
  checkIfLogedIn();
}

function renderPopup(action) {
  const popupDiv = document.getElementById("popupDiv");
  popupDiv.classList.add("slide");
  switch (action) {
    case "signup":
      popupDiv.innerHTML = `You Signed Up successfully`;
      break;
    case "addTask":
      popupDiv.innerHTML = `Task added to board <img src="/assets/icons/IconBoard.png" alt="" />`;
      break;
    case "addContact":
      popupDiv.innerHTML = `Contact succesfully created`;
      break;
    case "delContact":
      popupDiv.innerHTML = `Contact succesfully deleted`;
      break;
    case "delTask":
      popupDiv.innerHTML = `Task deleted`;
  }
  const delay = setTimeout(closePopup, 1500);
}

function closePopup() {
  const popupDiv = document.getElementById("popupDiv");
  popupDiv.classList.remove("slide");
}
