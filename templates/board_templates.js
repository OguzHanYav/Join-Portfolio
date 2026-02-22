function templateTaskCardLarge(key) {
  const {category, title, description, assignedTo, priority, dueDate, categoryClass} = getTaskData(key);
  return `
        <div class="taskCardLargeContent">
          <div class="categoryCardLargeTop"> <div id="categoryCardLarge${key}" class="categoryCardLarge ${categoryClass}">${category}</div> <img onclick="closetaskCardLarge()" class="closeButtonLargeView" src=./assets/icons/close.png></div>
          <div class="titleCardLarge">${title}</div>
          <div class="descriptionCardLarge">${description}</div>
          <div class="dueDateCardLarge"><div class="headingsFontColor">Due Date:</div> <div>${dueDate}</div></div>
          <div class="dueDateCardLarge"><div class="headingsFontColor">Priority:</div> <div class="prioLargeViewRight"> <div id="priorityCardLarge${key}"></div> <div class="prioImgLargeView">${priority}</div> </div></div>
          <div class="assignedToCardLarge"><div class="headingsFontColor">Assigned To:</div> <div class="assignedToLargeViewBottom" id="assignedToLargeViewBottom">${assignedTo}</div></div>
          <div class="subtasksLarge">
            <div class="headerSubtasks headingsFontColor">Subtasks</div>
            <div id="subtasksToClickLarge${key}" class="subTasksToClickLarge"></div>    
          </div>
          <div class="bottomCardLarge">
            <div class="hoverEffectDeleteEditTask" onclick="deleteTaskCardLarge('${key}')"> <div class="deleteButtonLargeView"></div><div class="hoverBlue">Delete</div></div>
            <div class="mobileNoShow">|</div>
            <div class="hoverEffectDeleteEditTask" onclick="getDataForEditTask('${key}')"> <div class="editButtonLargeView"></div> <div class="hoverBlue">Edit</div> </div>
          </div>
        </div>
      `;
}

function renderTaskCard(key, taskdetails, categoryClass) {
  return `
<div id="categoryCard${key}" class="categoryCard ${categoryClass}">${taskdetails.Category}</div>
<div id="titleCard${key}" class="titleCard">${taskdetails.Title}</div>
<div id="descriptionCard${key}" class="descriptionCard">${taskdetails.Description}</div>
<div class="dueDateCardLarge" id="dueDate${key}">${taskdetails.DueDate}</div>
<div id="subtasksCard${key}" class="subtasksCard"></div>
<div class="bottomCard">
  <div class="assignedToCard" id="assignedToCard${key}"></div>
  <div id="priorityCard${key}"></div>
</div>`;
}

function htmlAssignedContacts(backgroundColor, initials, contactName) {
  return `
            <div class="assignedToContainer">
              <div class="contactInitialsBoard" style="background-color: ${backgroundColor};">
                ${initials}
              </div>
              <div class="hideSmallView">
                ${contactName}
              </div>
            </div>`;
}

function htmlsubtaskSmallView(key) {
  return `
          <div class="subtasksSmall">
            <div class="myProgress">
              <div class="myBar" id="myBar${key}"></div>
            </div>
            <div class="subtasksCount">
              <div class="doneSubtasksCount" id="doneSubtasksCount${key}"></div>
              <div> &nbsp;Subtasks</div>
            </div>
          </div>
    `;
}

function htmlSubtasksLargeView(key, index, subtaskTask) {
  return `
    <div id="subtaskClickButton${key}-${index}" class="subtaskClickButton" onclick="changeCheckbox('${key}', '${index}')"></div>
    <div class="singleSubtaskClick">${subtaskTask}</div>
    `;
}

function htmlSubtaskCount(doneCount, totalSubtasks) {
  return `
            <div> ${doneCount}/ </div>
            <div> ${totalSubtasks} </div>
           `;
}
