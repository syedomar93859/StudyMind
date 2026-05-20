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

app.get('/message', async (req, res) => {
    // Runs when the frontend sends a GET request to /message

    const AI_response = await run("Explain what Node.js is in simple words.");
    // Wait for Gemini to generate a response

    res.json({ message: AI_response });
    // Send the AI response back to the frontend as JSON
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Starts the server