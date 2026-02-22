function loginTemplate() {
  return `
  <div class="bgLogin">
        <div class="loginLegalContainer">
          <div class="loginLegalSubContainer">
            <a href="./privacy_policy_login.html">Privacy Policy</a>
            <a href="./legal_notice_login.html">Legal notice</a>
          </div>
        </div>
      <img class="LogoNavImgLogin" src="./assets/img/Capa 1.svg" />
      <div class="loginField" id="loginField">
    <div class="loginBox">
          <div class="headlineAndBorder">
            <h1 class="loginHeadline">Log in</h1>
            <div class="border"></div>
          </div>
          <form class="loginForm" onsubmit="return false;">
            <div class="inputWrapper">
              <input
                id="emailLogin"
                class="inputLogin"
                type="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                autocomplete="email"
                placeholder="Email"
                required />
              <img
                src="./assets/icons/mail.svg"
                alt="email icon"
                class="iconLogin" />
            </div>
            <div class="inputWrapper">
              <input
                id="passwordLogin"
                class="inputLogin"
                type="password"
                name="password"
                autocomplete="password"
                placeholder="Password"
                required />
              <img
                onmouseenter="showPasswordLogin()"
                src="./assets/icons/lock.svg"
                alt="lock icon"
                class="iconLogin" />
            </div>
            <div class="rememberDiv">
              <input class="hover" type="checkbox" name="" id="rememberCheck" />
              <p>Remember me</p>
            </div>
            <div class="loginButtonDiv">
              <button onclick="loginRequest()" class="hover buttonLogin">Log in</button>
              <span onclick="guestLogin()" class="hover buttonGuestLogin">Guest Log in</span>
            </div>
          </form>
        </div>
        </div>
        <div class="singUpLogin">
        <span class="singUpLoginSpan">Not a Join user?</span>
        <button onclick="renderSignUp()" class="hover buttonSingUpLogin">Sign up</button>
      </div>
    </div>
    `;
}

function signUpButtonTemplate() {
  return `
  <div class="singUpLogin">
        <span class="singUpLoginSpan">Not a Join user?</span>
        <button class="hover buttonSingUpLogin">Sign up</button>
      </div>
  `;
}

function signUpTemplate() {
  return `
  <div class="bgLogin">
        <div class="loginLegalContainer">
          <div class="loginLegalSubContainer">
            <a href="./privacy_policy_login.html">Privacy Policy</a>
            <a href="./legal_notice_login.html">Legal notice</a>
          </div>
        </div>
      <img class="LogoNavImgLogin" src="./assets/img/Capa 1.svg" />
      <div class="loginField" id="loginField">
  <div class="loginBox">
        <div class="singUpHeader">
          <img class="signupArrow" src="./assets/icons/loginArrow.png" onclick="renderLogin()">
          <div class="headlineAndBorder">
            <h1 class="loginHeadline">Sign up</h1>
            <div class="border"></div>
          </div>
        </div>
          <form class="loginForm" onsubmit="return false;">
            <div class="inputWrapper">
              <input required
                id="nameSignUp"
                class="inputLogin"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Name"
                required />
              <img
                src="./assets/icons/person.svg"
                alt="email icon"
                class="iconLogin" />
            </div>
            <div class="inputWrapper">
              <input required
                id="emailSignUp"
                class="inputLogin"
                type="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                autocomplete="email"
                placeholder="Email"
                required />
              <img
                src="./assets/icons/mail.svg"
                alt="email icon"
                class="iconLogin" />
            </div>
            <div class="inputWrapper">
              <input required
                id="passwordSignUp"
                class="inputLogin"
                type="password"
                name="password"
                autocomplete="password"
                placeholder="Password"
                minlength="4" 
                maxlength="14"
                required />
              <img onmouseenter="showPassword()"
                src="./assets/icons/lock.svg"
                alt="lock icon"
                class="iconLogin" />
            </div>
            <div class="inputWrapper">
              <input required
                id="passwordConfirmSignUp"
                class="inputLogin"
                type="password"
                name="password"
                autocomplete="password"
                placeholder="Confirm Password"
                maxlength="14"
                required />
              <img onmouseenter="showConfirmPassword()"
                src="./assets/icons/lock.svg"
                alt="lock icon"
                class="iconLogin" />
            </div>
            <div class="rememberDiv center textGrey">
              <input required class="hover" type="checkbox" name="" id="signUpCheckbox" />
              <p>
                I accept the
                <a class="noTextDeco" href="./privacy_policy.html"
                  >Privacy Policy</a
                >
              </p>
            </div>
            <div class="loginButtonDiv">
              <button onclick="postSignUp()" class="hover buttonSignIn">Sign up</button>
            </div>
          </form>
        </div>
        </div>
    </div>
  `;
}
