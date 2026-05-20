import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
// Loads environment variables from the .env file

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
// Creates the Gemini AI client using the API key

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
// Settings that control how the AI generates responses

export async function run(questions) {
    try {
        // Send the prompt to Gemini and wait for a response
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: questions,
            generationConfig,
        });

        return response.text;
        // Return only the AI-generated text

    } catch (error) {
        console.error("Error:", error);
        // Print errors in the terminal if something fails

        return "Error";
    }
}