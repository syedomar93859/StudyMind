import express from 'express';
// this imports the Express library
// express is a framework that helps Node.js:
// create servers
// handle routes
// send responses
// manage APIs
// without Express, you would use the lower-level http module

const app = express();
// this creates the Express application object
// think of app as, the web server controller
// you use app to create routes, add middleware, start the server

const port = 3000;
// this is the port your server listens on
// to your server becomes available at http://localhost:3000

app.use(express.json());
// this enables JSON parsing
// It allows Express to automatically understand incoming JSON data.
// Useful for:
// POST requests
// PUT requests
// API data
// Example:

// frontend sends:
// {
//   "name": "Syed"
// }

// then Express converts it into req.body
// without this middleware, req.body would often be undefined

app.use(express.static('../frontend'));
// This tells Express “Serve frontend files from the public folder.”
// So if your folder contains:
// public/
   // index.html
   // main.js
   // style.css
// then Express automatically serves them

app.get('/message',(req, res) =>{
    res.json({message: 'Hello, World!'});
})
// this creates a GET route, this means when someone visits /message, run this function
// req is the incoming request object
// contains:
// headers
// URL
// method
// body
// query parameters
// Represents what the browser asked for

// res
// the response object
// Used to:
// send data back
// send JSON
// send HTML
// set status codes

// Represents what the server sends back

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

// This sends JSON back to the browser.
// The server response becomes:
// {
  // "message": "Hello, World!"
// }

// Express automatically:

// converts object → JSON
// sets Content-Type to application/json