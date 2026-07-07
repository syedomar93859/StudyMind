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




// 1. Get the submit button safely
const button = document.getElementById('submit');

// 2. ONLY attach the listener if the button actually exists on this page
if (button) {
    button.addEventListener("click", getResponse);
    // Runs getResponse() whenever the button is clicked
}
// Gets the submit button from the webpage


async function getResponse(){

    const input = document.getElementById('submission').value;
    // Gets the text from the textarea

    if (input.length == 0){
        alert("Input box is empty!");
        // Shows an alert if the user did not type anything

    } else{
        const content = document.querySelector('.response');
        // Gets the response div from the webpage

        content.innerHTML = "Loading...";
        // Tells the user that the AI response is currently being generated

        const history = await viewHistory();

        const transformedHistory = [];

        for (let i = 0; i < history.length; i++) {
            transformedHistory.push({
                role: history[i].role,
                parts: [{
                    text: history[i].message
                }]
            })
        }


        const result = await sendQuestion(input, transformedHistory);
        // Sends the user's question to the backend and waits for the AI response
        
        // transformedHistory.push({
        // role: "user",
        // parts: [
        //     {
        //         text: question
        //     }
        // ]});

        // const updatedConversation = transformedHistory.push({
        // role: "model",
        // parts: [
        //     {
        //         text: result
        //     }
        // ]});

        content.innerHTML = result;
        // Displays the AI response on the page
    }
}

async function sendQuestion(question, newHistory){
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
            history: newHistory
        })
        // converts the JavaScript object into JSON text

    });

    const data = await response.json();
    // Converts the JSON response into a JavaScript object

    return data.message;
    // Returns only the AI response text
}

const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './home.html';
    });
}
// navigates to the Home page

async function viewHistory() {
    const response = await fetch("/history", {
        method: "POST",
        credentials: 'same-origin', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        return [];  // return empty array if not authenticated or any error
    }

    const data = await response.json();

    return data.history ?? [];  // fallback to empty array if history is undefined
}