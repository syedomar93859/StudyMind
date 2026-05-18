const input = document.getElementById("input");
// this searches the webpage for id="input" and stores the actual HTML element in input

const button = document.getElementById("button");
    // gets the button element

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

button.addEventListener('click', responseAPI);
// when the button is clicked, run responseAPI()
// So clicking the button triggers:
// fetch request
// server response
// JSON parsing
// textbox update