/**
 * Renders the sign-up form by replacing the inner HTML of the login content div.
 */
function renderSignUp() {
  let div = document.getElementById("loginContent");
  div.innerHTML = signUpTemplate();
}

/**
 * Clears the login content by setting its inner HTML to an empty string.
 */
function closeLogin() {
  let div = document.getElementById("loginContent");
  div.innerHTML = "";
}

/**
 * Renders the login screen with an animation and then replaces it with the login form.
 * Hides the scrollbar while the login content is displayed.
 */
function renderLogin() {
  let div = document.getElementById("loginContent");

  div.innerHTML = `
    <div class="bgLogin">
      <img class="LogoNavImgLogin animateLogo" src="./assets/img/Capa 1.svg" />
    </div>
  `;
  setTimeout(() => {
    div.innerHTML = loginTemplate();
  }, 1000);
  hideScrollbarLogin();
}

/**
 * Hides the vertical scrollbar when the login content is displayed.
 */
function hideScrollbarLogin() {
  let bodyId = document.body;
  let loginContent = document.getElementById("loginContent");
  if ((loginContent = "")) {
  } else {
    bodyId.style.overflowY = "hidden";
  }
}

/**
 * Handles the sign-up process by validating user inputs and sending data to the server
 * Displays alerts for invalid input and clears inputs upon success
 *
 * @param {*} data - Optional user data object to post to the server
 */
async function postSignUp(data = "") {
  const formValues = getFormValues();
  const { nameSignup, emailSignUp, passwordSignUp, passwordConfirmSignUp, signUpCheckbox } = formValues;

  if (!validateSignUpInputs(nameSignup, emailSignUp, passwordSignUp, passwordConfirmSignUp, signUpCheckbox)) {
    return false;
  }

  const userColor = AddColorToUser();
  data = {
    name: nameSignup,
    email: emailSignUp,
    password: passwordSignUp,
    passwordconfirm: passwordConfirmSignUp,
    color: userColor,
  };

  await fetchContact(data);
  await postContact({ name: nameSignup, email: emailSignUp, color: userColor });
  handleSignUpSuccess();
}

function getFormValues() {
  const getInputValue = (id) => document.getElementById(id).value;
  const isCheckboxChecked = (id) => document.getElementById(id).checked;

  return {
    nameSignup: getInputValue("nameSignUp"),
    emailSignUp: getInputValue("emailSignUp"),
    passwordSignUp: getInputValue("passwordSignUp"),
    passwordConfirmSignUp: getInputValue("passwordConfirmSignUp"),
    signUpCheckbox: isCheckboxChecked("signUpCheckbox"),
  };
}

function handleSignUpSuccess() {
  renderPopup("signup");
  setTimeout(() => {
    clearInputSignUp();
    renderLogin();
  }, 1600);
}

async function fetchContact(data) {
  await fetch(`${BASE_URL}users/.json`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
}

/**
 * This funktion validates the inputs given in the signup process
 * @param {string} name
 * @param {email} email
 * @param {password} password
 * @param {password} passwordConfirm
 * @param {checkbox} checkbox
 * @returns validation
 */
function validateSignUpInputs(name, email, password, passwordConfirm, checkbox) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !password || !passwordConfirm) return false;
  if (!emailRegex.test(email)) {
    invalidEmail();
    return false;
  }
  if (password.length < 4) return false;
  if (password !== passwordConfirm) {
    passwordsNotMatching();
    return false;
  }
  if (!checkbox) return false;

  return true;
}

/**
 * If two passwords at sign-up are not matching, this function sets an error message on the password confirmation input field
 */
function passwordsNotMatching() {
  const passwordInput = document.getElementById("passwordConfirmSignUp");
  passwordInput.setCustomValidity("Die Passwörter stimmen nicht überein!");
  passwordInput.reportValidity();
  passwordInput.addEventListener("input", function () {
    passwordInput.setCustomValidity("");
  });
}

/**
 * If the email is invalid at sign-up, this function sets an error message on the email input field
 */
function invalidEmail() {
  const passwordInput = document.getElementById("emailSignUp");
  passwordInput.setCustomValidity("Ungültige E-Mail-Adresse!");
  passwordInput.reportValidity();
  passwordInput.addEventListener("input", function () {
    passwordInput.setCustomValidity("");
  });
}

/**
 * Posts contact data to the server
 *
 * @param {*} contactData - The contact data object to post
 */
async function postContact(contactData) {
  await fetch(BASE_URL + "contacts/.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
}

/**
 * Validates user login credentials and logs in the user
 * Redirects to the summary page if successful
 */
async function loginRequest() {
  let response = await fetch(BASE_URL + ".json");
  let data = await response.json();
  let users = data.users;
  let emailLogin = document.getElementById("emailLogin").value;
  let passwordLogin = document.getElementById("passwordLogin").value;
  let rememberCheck = document.getElementById("rememberCheck");
  let validUser = checkIfValidLogin(users, emailLogin, passwordLogin, rememberCheck);
  if (!validUser) {
    const passwordInput = document.getElementById("passwordLogin");
    passwordInput.setCustomValidity("Email oder Passwort ist Falsch!");
    passwordInput.reportValidity();
    passwordInput.addEventListener("input", function () {
      passwordInput.setCustomValidity("");
    });
  }
}

/**
 * This function is used to check if the login request is valid
 * @param {object} users
 * @param {email} emailLogin
 * @param {password} passwordLogin
 * @param {password} rememberCheck
 * @returns the validation of the user
 */
function checkIfValidLogin(users, emailLogin, passwordLogin, rememberCheck) {
  let validUser = false;
  for (let userId in users) {
    if (users[userId].email === emailLogin && users[userId].password === passwordLogin) {
      validUser = true;
      if (rememberCheck.checked) {
        let user = {...users[userId], id: userId};
        saveUserInLocal(user);
      } else {
        let user = {...users[userId], id: userId};
        saveUserInSession(user);
      }
      clearInputLogin();
      window.location.href = "summary.html";
      break;
    }
  }
  return validUser;
}

/**
 * Logs in as a guest user by retrieving guest credentials from the server
 * Redirects to the summary page if successful
 */
async function guestLogin() {
  try {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    const guestUserId = "guest";
    const guestUser = data.users[guestUserId];

    if (guestUser) {
      let user = {...guestUser, id: guestUserId};
      renderUserIcon();
      saveUserInSession(user);
      window.location.href = "summary.html";
    } else {
      console.error("Gastbenutzer nicht gefunden!");
    }
  } catch (error) {
    console.error("Fehler beim Gast-Login:", error);
  }
}

/**
 * Logs out the user by clearing all local and session storage
 * Redirects to the login screen
 */
function logOut() {
  localStorage.clear();
  sessionStorage.clear();
  renderLogin();
}

/**
 * Saves user data in local storage for persistent login
 *
 * @param {*} user - The user data object to save
 */
function saveUserInLocal(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Saves user data in session storage for temporary login
 *
 * @param {*} user - The user data object to save.
 */
function saveUserInSession(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

/**
 * Clears all input fields in the sign-up form
 */
function clearInputSignUp() {
  document.getElementById("nameSignUp").value = "";
  document.getElementById("emailSignUp").value = "";
  document.getElementById("passwordSignUp").value = "";
  document.getElementById("passwordConfirmSignUp").value = "";
}

/**
 * Clears all input fields in the login form
 */
function clearInputLogin() {
  document.getElementById("emailLogin").value = "";
  document.getElementById("passwordLogin").value = "";
}

/**
 * Toggles the visibility of the password input field in the sign-up form
 */
function showPassword() {
  let input = document.getElementById("passwordSignUp");
  input.type = input.type === "password" ? "text" : "password";
}

/**
 * Toggles the visibility of the password input field in the login form
 */
function showPasswordLogin() {
  let input = document.getElementById("passwordLogin");
  input.type = input.type === "password" ? "text" : "password";
}

/**
 * Toggles the visibility of the confirm password input field in the sign-up form
 */
function showConfirmPassword() {
  let input = document.getElementById("passwordConfirmSignUp");
  input.type = input.type === "password" ? "text" : "password";
}

/**
 * Renders the user icon by displaying the user's initials from their name
 */
function renderUserIcon() {
  let userIcon = document.getElementById("userIcon");
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.name) {
    let initials = getInitials(user.name);
    userIcon.innerHTML = initials;
  } else {
    user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.name) {
      let initials = getInitials(user.name);
      userIcon.innerHTML = initials;
    }
  }
}

/**
 * Generates initials from a user's name
 *
 * @param {*} name - The full name of the user
 * @returns {string} The initials of the user's name
 */
function getInitials(name) {
  let parts = name.split(" ");
  return parts.length > 1 ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase() : name[0].toUpperCase();
}
