import { run } from './AI-setup.js';
import express from 'express';
import { marked } from 'marked';

const app = express();
// Creates the Express server app

const port = 3000;
// The server will run on http://localhost:3000

app.use(express.json());
// Lets Express understand incoming JSON data

app.use(express.static('../frontend'));
// Serves frontend files like index.html, CSS, and JS


app.post('/message', async (req, res) => {
    // Runs whenever the frontend sends a POST request to /message

    const userQuestion = req.body.question;
    // Gets the question sent from the frontend

    const aiResponse = await run(userQuestion);
    // Sends the question to Gemini and waits for the AI response

    const finalMessage = marked.parse(aiResponse);
    // converting markdown into html

    console.log(userQuestion);
    // Prints the user's question in the terminal

    console.log(aiResponse);
    // Prints the AI response in the terminal

    console.log(finalMessage);
    // prints the converted response

    res.json({
        message: finalMessage 
    })
    // Sends the AI response back to the frontend as JSON

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Starts the server