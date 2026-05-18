const button = document.getElementById('submit')

const input = document.getElementById('input');

button.addEventListener("click", getResponse);


const responseAPI = async(e) =>{
    // creates an asynchronous function Because fetch() takes time
    // the browser sends a network request and waits for a server response

    e.preventDefault();
    // e is the event object, his line prevents default browser behavior
    // for buttons alone, it usually does nothing important here, you often see it in forms

    const res = await fetch('http://localhost:3000/message',{
        method: 'GET'
    });
    // The browser sends an HTTP request to http://localhost:3000/message using GET method
    // server responds with an HTTP response object, that gets stored in res
    // this contains status code, headers, body, metadata

    console.log(res);

    const data = await res.json();
    // servers often send JSON
    // example server response:
    // {
    // "message": "Hello from backend"
    // } 
    // res.json() converts JSON text into a JavaScript object
    // so now data.message works

    input.value = data.message;
    // This changes the text inside the input box.
    // If the server returned:
    // {
    // "message": "Hello"
    // }
    // then the textbox becomes Hello
}

button.addEventListener("click", responseAPI);

function getResponse(){
    const input = document.getElementById('submission').value;
    // responseAPI();

    if (input.length == 0){
        alert("Input box is empty!");
    } else{
        alert("Input box is not empty!");
        // Get the quiz container element from the page
        const content = document.querySelector('.response');
        // Clear previous quiz content
        content.innerHTML = input;

    }
}