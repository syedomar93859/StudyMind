import http from 'http';
import fs from 'fs';

const port = 3000;
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
    // res.end("Hello! This is a simple Node.js server.");
    // read.write("Hello Node");
})

server.listen(port, function(error){
    if (error){
        console.log("Something went wrong", error);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
        console.log("Server is listening on port " + port);
    }
})
