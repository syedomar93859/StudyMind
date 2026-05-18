const button = document.getElementById('submit')

// const input = document.getElementById('input');

button.addEventListener("click", getResponse);


async function responseAPI() {

    const res = await fetch('http://localhost:3000/message', {
        method: 'GET'
    });

    const data = await res.json();

    // return ONLY the AI message string
    return data.message;
}

// button.addEventListener("click", responseAPI);

async function getResponse(){
    const input = document.getElementById('submission').value;
    // responseAPI();

    if (input.length == 0){
        alert("Input box is empty!");
    } else{
        alert("Input box is not empty!");

        // wait for backend response
        const AI_message = await responseAPI();

        // Get the quiz container element from the page
        const content = document.querySelector('.response');
        // Clear previous quiz content
        content.innerHTML = AI_message;

    }
}