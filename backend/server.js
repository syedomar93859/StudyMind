import { run } from './AI-setup.js';
import express from 'express';
import { marked } from 'marked';
import path from 'path';
import { fileURLToPath } from 'url';

// This executes the code in app.js
import { add, insertNote, viewNoteTable, deleteNoteTable,editNote, getAllNotes, removeNote } from './app.js';




const app = express();
// Creates the Express server app

const port = 3000;
// The server will run on http://127.0.0.1:3000/

app.use(express.json());
// Lets Express understand incoming JSON data


const __filename = fileURLToPath(import.meta.url);
// Gets the absolute file path of the current file (server.js)

const __dirname = path.dirname(__filename);
// Extracts the directory path that contains this file

app.use(express.static(path.join(__dirname, '../frontend')));
// Serves static frontend files (HTML, CSS, JS) from the frontend folder

app.get('/test', (req, res) => {
    res.send('server is working');
});
// Defines a test route to confirm the server is running correctly
// When a GET request is made to /test, it sends a simple text response

app.post('/message', async (req, res) => {
    // Runs whenever the frontend sends a POST request to /message

    const userQuestion = req.body.question;
    // Gets the question sent from the frontend

    const aiResponse = await run(userQuestion);
    // Sends the question to Gemini and waits for the AI response

    const finalMessage = marked.parse(aiResponse);
    // converting markdown into html

    // console.log(userQuestion);
    // Prints the user's question in the terminal

    // console.log(aiResponse);
    // Prints the AI response in the terminal

    // console.log(finalMessage);
    // prints the converted response

    res.json({
        message: finalMessage 
    })
    // Sends the AI response back to the frontend as JSON

});

// This is connected with getInfo
app.get("/notes", async (req, res) => {

    const notes = await getAllNotes();

    // notes.forEach(note => {
    //     console.log(note.id);
    //     console.log(note.title);
    //     console.log(note.content);
    // });

    
    // sum = add(2, 3);
    // console.log(subtract(10, 4));

    // const randomNumber =
    //     // Math.floor(Math.random() * 100);
    //     add(2, 3);

    res.json({
        // number: randomNumber,
        success: true,
        notes: notes
    });
});

// This is connected with sendInfo function
app.post("/test", async (req, res) => {

    const title = req.body.title;
    const content = req.body.content;

    const newId = await insertNote(title, content);
    viewNoteTable();
    // deleteNoteTable();
    // viewNoteTable();

    // console.log("Received from frontend:");

    res.json({
        id: newId,
        success: true
    });
});

app.post("/update", async (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const index = req.body.index;

    editNote(index, title, content);

    viewNoteTable();

    res.json({
        success: true
    });
});


app.post("/delete", async (req, res) => {

    const deleteId = req.body.id;

    await removeNote(deleteId);

    viewNoteTable();

    res.json({
        success: true
    });
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Go to http://127.0.0.1:${port}/`)
});
// Starts the server


