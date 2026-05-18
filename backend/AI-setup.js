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


export async function run(questions) {
    try {
        //gemini gives a response
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: questions,
            generationConfig,
        });

        // setTimeout(myFunction, 15000)

        // print AI response
        // console.log(response.text);
        return response.text;
    } catch (error) {
        console.error("Error:", error);
        return "Error";
    }
}

// run("Explain what Node.js is in simple words.");
// run(input);