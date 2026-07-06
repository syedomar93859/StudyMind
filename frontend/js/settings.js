import {getAccountId, getUsername} from './session.js';

document.getElementById("account-name").innerHTML = getUsername();

document.getElementById("go-to-ai-button")
    .addEventListener("click", goToAIPage);

function goToAIPage() {
    location.href = './ask-ai.html'
}
// navigates to the Ask AI page

// function goToHomePage() {
//     location.href = './index.html'
// }

document.getElementById("go-to-notes-button")
    .addEventListener("click", goToNotesPage);

function goToNotesPage() {
    location.href = './notes.html'
}

// navigates to the Notes page

document.getElementById("go-to-settings-button")
    .addEventListener("click", goToSettingsPage);

function goToSettingsPage(){
    location.href = './settings.html'
}

const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './home.html';
    });
}
// navigates to the Home page


const content = document.getElementById("settings-content");

document.getElementById("account-link")
    .addEventListener("click", showAccount);

document.getElementById("security-link")
    .addEventListener("click", showSecurity);

document.getElementById("privacy-link")
    .addEventListener("click", showPrivacy);

// show the Account section when the page first loads
showAccount();

async function showAccount() {

    setActive("account-link");

    const email = await getEmail(getAccountId());

    content.innerHTML = `
        <h2>Account</h2>
        <label>Update your account information below:</label><br><br>

        <label for="username">Username</label><br>
        <input
            id="username"
            type="text"
            value="${getUsername()}"
        ><br><br>

        <label for="email">Email</label><br>
        <input
            id="email"
            type="email"
            value="${email}"
        ><br><br>

        <button id="save-btn">Save Changes</button>
    `;

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const saveButton = document.getElementById("save-btn");

    saveButton.addEventListener("click", () => {
        alert(
            "Your new email is " +
            emailInput.value +
            " and your new username is " +
            usernameInput.value
        );
    });
}

async function getEmail(accountId) {

    const response = await fetch("/bringEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: accountId
        })
    });

    const data = await response.json();

    return data.email;

}


// document.getElementById("go-to-ai-button")
//     .addEventListener("click", goToAIPage);
// document.getElementById('save-btn').addEventListener('click', getChanges());

// function getChanges(){
//     const newName = document.getElementById("username");
//     const newEmail = document.getElementById("email");
//     alert("Your new email is " + newEmail + " and your new username is " + newName + ".");
// }


function showSecurity() {

    setActive("security-link");

    content.innerHTML = `
        <h2>Security</h2>
        <label>Update your account password below:</label><br><br>

        <label>Current Password</label><br>
        <input id="password" type="password"><br><br>

        <label>New Password</label><br>
        <input id="newPassword" type="password"><br><br>

        <label>Confirm Password</label><br>
        <input id="confirmPassword" type="password"><br><br>

        <button id="save-pass">Update Password</button>
    `;

    const pass = document.getElementById("password");
    const newPass = document.getElementById("newPassword");
    const confirmPass = document.getElementById("confirmPassword");
    const passButton = document.getElementById("save-pass");

passButton.addEventListener("click", () => {
    alert("Your current password is " + pass.value + " and your new password is " + newPass.value + " and your confirmed password is " + confirmPass.value + ".");
});
}

function showPrivacy() {

    setActive("privacy-link");

    content.innerHTML = `
        <h2>Data & Privacy</h2>

        <button id="log-out" class="logout-btn">
            Log Out
        </button>

        <br><br>

        <button id="delete-acc" class="delete-btn">
            Delete Account
        </button>
    `;

    const logOut = document.getElementById("log-out");
    const deleteAccount = document.getElementById("delete-acc");

logOut.addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?") == true) {
    location.href = './index.html'
  } else {
  }


    // alert("You clicked the log out button.");
});

deleteAccount.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this account? Deleting this account means you cannot log in with it anymore.") == true) {
    console.log("User wants to delete account");
  } else {
    console.log("User does not want to delete account");
  }
});
}

function setActive(id){
    document.querySelectorAll(".sidenav a").forEach(link => link.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}