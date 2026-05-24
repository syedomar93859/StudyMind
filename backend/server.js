import { run } from './AI-setup.js';
import express from 'express';

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

    const AI_response = await run(userQuestion);
    // Sends the question to Gemini and waits for the AI response

    console.log(userQuestion);
    // Prints the user's question in the terminal

    console.log(AI_response);
    // Prints the AI response in the terminal

    res.json({
        message: AI_response 
    })
    // Sends the AI response back to the frontend as JSON

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Starts the server