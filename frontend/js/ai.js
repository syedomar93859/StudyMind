import {getUsername, restoreSession} from './session.js';

(async () => {

    const loggedIn = await restoreSession();

    if (!loggedIn) {
        location.href = "./index.html";
        return;
    }

    document.getElementById("account-name").textContent =
        getUsername();

})();



document.getElementById("go-to-ai-button")
    .addEventListener("click", goToAIPage);

function goToAIPage() {
    location.href = './ask-ai.html'
}
// navigates to the Ask AI page



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
// navigates to the settings page



const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './home.html';
    });
}
// navigates to the Home page




// get the submit button
const button = document.getElementById('submit');

if (button) {
    button.addEventListener("click", getResponse);
    // runs getResponse() whenever the button is clicked
}
// Gets the submit button from the webpage


async function getResponse(){

    const input = document.getElementById('submission').value;
    // Gets the text from the textarea

    if (input.length == 0){
        const customAlert = document.getElementById("customAlert");
        const closeBox = document.getElementById("closeAlert");
        const confirmBox = document.getElementById("confirmAlert");

        customAlert.style.display = "flex";
        
        closeBox.addEventListener("click", () => {
            customAlert.style.display = "none";
        });
        
        confirmBox.addEventListener("click", () => {
            customAlert.style.display = "none";
        });


        // alert("Input box is empty!");
        // Shows an alert if the user did not type anything

    } else{
        const content = document.querySelector('.response');
        // Gets the response div from the webpage

        content.innerHTML = "Loading...";
        // Tells the user that the AI response is currently being generated

        const result = await sendQuestion(input);

        content.innerHTML = result;
        // displays the AI response on the page
    }
}



async function sendQuestion(question){
    const response = await fetch('/message', {
        method: 'POST',
        // displays the AI response on the page
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        // tells the server that JSON data is being sent

        body: JSON.stringify({
            question: question,
        })
        // converts the JavaScript object into JSON text

    });

    const data = await response.json();
    // Converts the JSON response into a JavaScript object

    return data.message;
    // Returns only the AI response text
}
