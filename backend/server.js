import http from 'http';
// this imports Node.js’s built-in HTTP module
// this module allows Node.js to: create web servers, receive browser requests and send responses back

import fs from 'fs';
// imports Node.js’s File System module
// The fs module allows Node to: read files, write files, delete files and modify files

const port = 3000;
// stores the port number
// localhost:3000 means to "Connect to my own computer on port 3000"

const server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    fs.readFile('../frontend/index.html',function(error, data){
        if (error){
            res.writeHead(404);
            res.write('Error: File Not Found');
        }else{
            res.write(data);
        }
        res.end();
    })
})
// line 13 creates the web server
// function(req,res){ runs every time someone visits your server

// req means request object
// contains information about the incoming browser request
// Examples: URL visited, request method (GET/POST), headers

// res means response object
// Used to send data back to the browser

// line 14 sends HTTP response headers
// 200 is the HTTP status code which means success

// 'Content-Type' tells the browser "What kind of data am I sending?"

// 'text/html' means: "This response contains HTML"
// so the browser renders it as a webpage.

// line 15 reads the HTML file asynchronously
// "Start reading the file, tell me when finished"
// ../frontend/index.html' means:
// go up one folder
// then enter frontend
// then open index.html

// data contains the contents of index.html

// res.write(data) sends the contents of index.html to the browser.

// res.end() finishes the response

server.listen(port, function(error){
    if (error){
        console.log("Something went wrong", error);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
        console.log("Server is listening on port " + port);
    }
})
