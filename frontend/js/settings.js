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

function showAccount() {

    setActive("account-link");

    content.innerHTML = `
        <h2>Account</h2>

        <label>Username</label><br>
        <input type="text" value=${getUsername()}><br><br>

        <label>Email</label><br>
        <input type="email" value="syed@email.com"><br><br>

        <button>Save Changes</button>
    `;
}

function showSecurity() {

    setActive("security-link");

    content.innerHTML = `
        <h2>Security</h2>

        <label>Current Password</label><br>
        <input type="password"><br><br>

        <label>New Password</label><br>
        <input type="password"><br><br>

        <label>Confirm Password</label><br>
        <input type="password"><br><br>

        <button>Update Password</button>
    `;
}

function showPrivacy() {

    setActive("privacy-link");

    content.innerHTML = `
        <h2>Data & Privacy</h2>

        <button class="logout-btn">
            Log Out
        </button>

        <br><br>

        <button class="delete-btn">
            Delete Account
        </button>
    `;
}

function setActive(id){
    document.querySelectorAll(".sidenav a").forEach(link => link.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}