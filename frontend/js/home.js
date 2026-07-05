
import {getUsername} from './session.js';

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



document.getElementById("home-ai-button")
    .addEventListener("click", goToAIPage);



document.getElementById("home-notes-button")
    .addEventListener("click", goToNotesPage);



const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './home.html';
    });
}
// navigates to the Home page


