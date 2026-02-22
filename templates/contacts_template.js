function renderContactsSmallTemplate(key, contact, i) {
  // Dynamically get initials from the contact's name
  const initials = contact.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return `
<div class="contactCardSmall" id="${key}" onclick="openContact('${key}', '${contact.name}', '${contact.email}', '${contact.number}','${contact.color}')">
  <div class="contactInitialsSmall" id="contactInitialsSmall${i}" style="background-color: ${contact.color}";>${initials}</div>
  <div class="contactInfoSmall">
    <div class="contactName">${contact.name}</div>
    <div class="contactMail">${contact.email}</div>
  </div>
</div>
  `;
}

function renderContactLargeTemplate(key, name, mail, color) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return `
<div class="contactInicialsContainer">
  <div class="contactInitialsSmall contactInicialLarge" style="background-color: ${color};">${initials}</div>
  <div>
    <div class="contactMainName">${name}</div>
    <div class="editDeleteContainer">
      <div class="editDeleteSubContainer" onclick="openEditContact('${key}', '${color}')">
        <img class="delteEditIcon" src="assets/icons/edit.png" alt="Edit" />
        <div class="editIconContainer">Edit</div>
      </div>
      <div class="editDeleteSubContainer" onclick="deleteContact('${key}')">
        <img class="delteEditIcon" src="assets/icons/delete.png" alt="Delete" />
        <div class="deleteIconContainer">Delete</div>
      </div>
    </div>
  </div>
</div>
<div class="contactInfo">Contact Information</div>
<div class="contactEmailPhoneContainer">
  <div class="contactEmailPhone">Email</div>
  <div class="contactMail">${mail}</div>
</div>
<div class="contactEmailPhoneContainer">
  <div class="contactEmailPhone">Phone</div>
  <div id="phoneNumberContacts"></div>
</div>
`;
}

function renderEditContactTemplate(contact, key) {
  const initials = contact.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return `<img class="contactCloseIcon" src="assets/icons/close.png" alt="Close" onclick="closeContactEdit()" />
<div class="contactInitialsSmall contactInicialLarge marginTopContact">
${initials}
</div>
    <form class="inputContainer" onsubmit="editContact('${key}'); return false">
        <div class="inputSubContainer">
            <input required id="inputEditName" type="text" value="${contact.name}" />
            <img class="contactInputIcon" src="assets/icons/person.png" alt="Person" />
        </div>
        <div class="inputSubContainer">
            <input id="inputEditMail" type="text" value="${contact.email}" />
            <img class="contactInputIcon" src="assets/icons/mail.png" alt="Mail" />
        </div>
        <div class="inputSubContainer">
            <input id="inputEditNumber" type="text" value="${contact.number}"/>
            <img class="contactInputIcon" src="assets/icons/call.png" alt="Call" />
        </div>
        <div class="editOverlayButtonContainer">
            <button type="button" class="overlayDeleteButton" onclick="deleteContact('${key}')">Delete</button>
            <button type="submit" class="overlaySaveButton">
            Save
            <img class="contactCheckIcon" src="assets/icons/check.png" alt="Check" />
            </button>
        </div>
    </form>
`;
}

function optionsTemplate(key, color) {
  return `
  <div class="editDeleteSubContainer" onclick="openEditContact('${key}', '${color}')">
        <img class="delteEditIcon" src="assets/icons/edit.png" alt="Edit" />
        <div class="editIconContainer">Edit</div>
      </div>
<div class="editDeleteSubContainer" onclick="deleteContact('${key}')">
        <img class="delteEditIcon" src="assets/icons/delete.png" alt="Delete" />
        <div class="deleteIconContainer">Delete</div>
      </div>
`;
}
