const button = document.getElementById('submit')
// Gets the submit button from the webpage

button.addEventListener("click", getResponse);
// Runs getResponse() whenever the button is clicked

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

        const result = await sendQuestion(input);
        // Sends the user's question to the backend and waits for the AI response

        content.innerHTML = result;
        // Displays the AI response on the page
    }
}

async function sendQuestion(question){
    const response = await fetch('/message', {
        method: 'POST',
        // Displays the AI response on the page

        headers: {
            'Content-Type': 'application/json'
        },
        // Tells the server that JSON data is being sent

        body: JSON.stringify({
            question: question
        })
        // Converts the JavaScript object into JSON text

    });

    const data = await response.json();
    // Converts the JSON response into a JavaScript object

    return data.message;
    // Returns only the AI response text
}

function goToAIPage() {
    location.href = './ask-ai.html'
}
// navigates to the Ask AI page

function goToHomePage() {
    location.href = './index.html'
}
// navigates to the Home page