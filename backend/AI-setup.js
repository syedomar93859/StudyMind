import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
// Loads environment variables from the .env file

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
// Creates the Gemini AI client using the API key

// console.log("API KEY LOADED:", process.env.GEMINI_API_KEY);

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
        console.error("Status:", error.status);
        // Print error in the terminal if something fails

        switch(error.status){ 
            case 400: 
                return "Error: Invalid request sent to AI" 
            case 401: 
                return "Error: Service configuration issue" 
            case 403: 
                return "Error: Access denied" 
            case 404: 
                return "Error: Resource not found" 
            case 429: 
                return "Error: Too many requests, please wait a moment" 
            case 500: 
                return "Error: AI service encountered an error" 
            case 503: 
                return "Error: AI service is temporarily experiencing high demand, please try again later" 
            default: 
                return "Error: An unexpected error happened" 
        } 
        // error handling for different error codes
    }
    
}