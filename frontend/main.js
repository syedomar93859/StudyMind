const button = document.getElementById('submit')
// Gets the submit button from the webpage

// const input = document.getElementById('input');

button.addEventListener("click", getResponse);
// Runs getResponse() whenever the button is clicked

async function responseAPI() {

    const res = await fetch('http://localhost:3000/message', {
        method: 'GET'
    });
    // Sends a GET request to the backend server

    const data = await res.json();
    // Converts the server response from JSON into a JavaScript object

    return data.message;
    // Return only the AI response text
}

// button.addEventListener("click", responseAPI);

async function getResponse(){

    const input = document.getElementById('submission').value;
    // Gets the text from the textarea

    if (input.length == 0){
        alert("Input box is empty!");
    } else{
        alert("Input box is not empty!");

        const AI_message = await responseAPI();
        // Wait for the backend to send back the AI response

        const content = document.querySelector('.response');
        // Gets the response div from the webpage

        content.innerHTML = AI_message;
        // Displays the AI response on the page
    }
}