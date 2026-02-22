function summaryBoardTemplate(countToDo, countInProgress, countAwaitFeedback, countDone, taskCount, prioUrgent, formattedDate) {
  return `
  <div class="upperRow">
    <a href="./board.html" class="toDoDisplay">
      <div class="editIconContainer">
        <img class="editIconSummary" src="assets/icons/editSummary.png" alt="Edit">
      </div>
      <div class="displayRightSection">
        <div class="toDoDoneAmount">${countToDo}</div>
        <div class="toDoDone">To-do</div>
      </div>
    </a>
    <a href="./board.html" class="doneDisplay">
      <div class="editIconContainer">
        <img class="doneIconSummary" src="assets/icons/doneSummary.png" alt="Done">
      </div>
      <div class="displayRightSection">
        <div class="toDoDoneAmount">${countDone}</div>
        <div class="toDoDone">Done</div>
      </div>
    </a>
  </div>
  <a href="./board.html" class="middleRow">
    <div class="deadlineLeftSection">
      <div class="deadlineUrgencyStatusIcon">
        <img class="urgentIcon" src="assets/icons/urgentIcon.png" alt="Urgent">
      </div>
      <div class="amountStatusContainer">
        <div class="deadlineAmount">${prioUrgent}</div>
        <div class="urgencyStatus">Urgent</div>
      </div>
    </div>
    <div class="seperatingLine"></div>
    <div class="deadlineRightSection">
      <div class="deadlineDate">${formattedDate}</div>
      <div>Upcoming Deadline</div>
    </div>
  </a>
  <div class="lowerRow">
    <a href="./board.html" class="tasksBoardDisplay lowerRowSubContainer">
      <div class="lowerRowAmount">${taskCount}</div>
      <div class="lowerRowType">Tasks in <br> Board</div>
    </a>
    <a href="./board.html" class="tasksProgressDisplay lowerRowSubContainer">
      <div class="lowerRowAmount">${countInProgress}</div>
      <div class="lowerRowType">Tasks in <br> Progress</div>
    </a>
    <a href="./board.html" class="feedbackDisplay lowerRowSubContainer">
      <div class="lowerRowAmount">${countAwaitFeedback}</div>
      <div class="lowerRowType">Awaiting <br> Feedback</div>
    </a>
  </div>
  `;
}