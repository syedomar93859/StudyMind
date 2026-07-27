# StudyMind

StudyMind is a web app designed to help students learn and stay organized. It lets you ask an AI questions about any topic you want to study, take notes, and manage your account altogether.

## Live Demo

A live Render deployment is available through my LinkedIn project page.

**Note:** The demo uses Render's free hosting tier, which does not provide persistent storage. User accounts, notes, and chat history may reset whenever the service restarts.

## Features

- **Ask AI:** Chat with an AI to learn, review, and practice any topic. The AI remembers your conversation history so follow-up questions work naturally.
- **Notes:** Create, edit, and delete personal notes that are saved to your account.
- **Accounts:** Register and log in securely. Passwords are hashed with bcrypt and sessions are managed server-side.
- **Settings:** Update your username, email, and password, or delete your account entirely.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite
- **AI:** Google Gemini API
- **Auth:** bcryptjs, express-session

## Architecture

- Frontend served as static files by Express
- REST API endpoints for authentication, notes, account management, and AI chat
- SQLite database for user accounts, notes, and AI conversation history
- Google Gemini API integration for AI-powered responses
- Session-based authentication using Express Session

# Running Locally
<u>Prerequisites</u>

Node.js 18+

npm

## Installation
<u>Clone the repository and install dependencies:</u>

git clone https://github.com/syedomar93859/StudyMind.git

cd StudyMind/backend

npm install
<br><br>
<u>Create a .env file inside the backend folder:</u>

GEMINI_API_KEY=your_gemini_api_key

SESSION_SECRET=your_random_secret
<br><br>
<u>Start the development server:</u>

npm run dev
<br><br>
<u>Open your browser and go to:</u>

http://127.0.0.1:3000
<br><br>
<u>To stop the server, press:</u>

Ctrl + C


## Acknowledgements

This project was built independently while using the following resources for learning and reference:

- MDN Web Docs
- Boxicons Documentation
- Express Documentation
- JavaScript.info
- YouTube tutorials by Coding2GO, Web Dev Simplified, and Kevin Powell
- Various Stack Overflow discussions for troubleshooting