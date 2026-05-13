import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

// Create an AI client object
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Configuration for the model
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run() {
    try {
        //gemini gives a response
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: "Explain what Node.js is in simple words.",
            generationConfig,
        });

        // print AI response
        console.log(response.text);

    } catch (error) {
        console.error("Error:", error);
    }
}

run();