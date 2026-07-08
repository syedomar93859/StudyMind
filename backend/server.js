import { run } from './AI-setup.js';
import express from 'express';
import { marked } from 'marked';
import path from 'path';
import { fileURLToPath } from 'url';

// this executes the code in app.js
import { insertNote, viewNoteTable, editNote, getAllNotes, removeNote, insertAccount, 
    viewAccountTable, checkAccountExists, doesNameExist, doesEmailExist, getHistory,
updateHistory, deleteHistory, obtainEmail,obtainUsername, updateName, updateEmail, 
obtainPassword, changePassword, eliminateAccount  } from './app.js';

import { encryptPassword, verifyPassword  } from './password.js';


import session from 'express-session';


const app = express();
// creates the Express server app

app.use(express.json());
// Lets Express understand incoming JSON data

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
}));

function requireAuth(req, res, next) {
    if (!req.session.accountId) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    next();
}

app.get("/me", requireAuth, async (req, res) => {

    const accountId = req.session.accountId;

    const username = await obtainUsername(accountId);
    const email = await obtainEmail(accountId);

    res.json({
        success: true,
        username,
        email
    });

});



const port = 3000;
// The server will run on http://127.0.0.1:3000/


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

app.post('/message', requireAuth, async (req, res) => {
    // Runs whenever the frontend sends a POST request to /message

    const accountId = req.session.accountId;

    const userQuestion = req.body.question;
    // Gets the question sent from the frontend

    // const history = req.body.history;
    const historyRows = await getHistory(accountId);
    
    const history = historyRows.map(item => ({
        role: item.role,
        parts: [
            {
                text: item.message
            }
        ]
    }));


    const result = await run(userQuestion, history);
    
    const finalMessage = marked.parse(result.aiResponse);

    if (!result.aiResponse.startsWith("Error:")) {
        await updateHistory(accountId, "user", result.userQuestion);
        await updateHistory(accountId, "model", result.aiResponse);
    }
    

    await deleteHistory(accountId);

    res.json({
        message: finalMessage
    });

});

// This is connected with getInfo
app.post("/notes",requireAuth, async (req, res) => {

    const accountId = req.session.accountId;

    const notes = await getAllNotes(accountId);

    res.json({
        success: true,
        notes: notes
    });
});

// This is connected with sendInfo function
app.post("/new", requireAuth, async (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const accountId = req.session.accountId;

    const newId = await insertNote(accountId, title, content);
    viewNoteTable();

    res.json({
        id: newId,
        success: true
    });
});

app.post("/name", async (req, res) => {

    const username = req.body.name;

    const exist = await doesNameExist(username);
    viewAccountTable();

    res.json({
        truth: exist,
        success: true
    });
});

app.post("/newName", requireAuth, async (req, res) => {

    const username = req.body.name;
    const accountId = req.session.accountId;

    await updateName(username, accountId);
    
    res.json({
        success: true
    });
});



app.post("/newEmail", requireAuth, async (req, res) => {

    const newEmail = req.body.email;
    const accountId = req.session.accountId;

    await updateEmail(newEmail, accountId);
    viewAccountTable();
    
    res.json({
        success: true
    });
});

app.post("/getPass", requireAuth, async (req, res) => {

    const accountId = req.session.accountId;
    const password = req.body.pass;

    const storedPass = await obtainPassword(accountId);

    const same = await verifyPassword(password, storedPass);
    
    res.json({
        success: true,
        truth: same
    });
});


app.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.post("/newPass", requireAuth, async (req, res) => {
    try {

        const accountId = req.session.accountId;
        const password = req.body.pass;

        const securePass = await encryptPassword(password);

        await changePassword(accountId, securePass);

        res.json({
            success: true,
            truth: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            truth: false
        });
    }
});

app.post("/email", async (req, res) => {

    const email = req.body.email;

    const exist = await doesEmailExist(email);
    viewNoteTable();

    res.json({
        truth: exist,
        success: true
    });
});


app.post("/bringEmail", requireAuth, async (req, res) => {

    const accountId = req.session.accountId;

    const accountEmail = await obtainEmail(accountId);

    res.json({
        email: accountEmail,
        success: true
    });
});


app.post("/update", requireAuth, async (req, res) => {

    const accountId = req.session.accountId;
    const title = req.body.title;
    const content = req.body.content;
    const index = req.body.index;

    await editNote(accountId, index, title, content);

    viewNoteTable();

    res.json({
        success: true
    });
});


app.post("/delete",requireAuth, async (req, res) => {

    const deleteId = req.body.id;
    const accountId = req.session.accountId;

    await removeNote(deleteId, accountId);

    viewNoteTable();

    res.json({
        success: true
    });
});


app.post("/deleteAccount", requireAuth, async (req, res) => {
    const accountId = req.session.accountId; // from session, not req.body

    await eliminateAccount(accountId);
    req.session.destroy();
    res.json({ success: true });
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Go to http://127.0.0.1:${port}/`)
});
// Starts the server


// this is connecting with createAccount
app.post("/register", async (req, res) => {
    try {
        const username = req.body.name;
        const email = req.body.email;
        const password = req.body.pass;

        const securePass = await encryptPassword(password);

        const accountId = await insertAccount(username, email, securePass);

        res.json({
            success: true,
            id: accountId
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// this is connecting with createAccount
app.post("/check", async (req, res) => {

    const email = req.body.email;
    const pass = req.body.pass;



    const found = await checkAccountExists(email);
    
    if (!found.exists) {
        return res.json({
            truth: false
        });
    }
    
    const same = await verifyPassword(pass, found.password);

    viewAccountTable();

    

    if (same) {
        req.session.accountId = found.id;
    }
    
    res.json({ 
        truth: same, 
        username: found.username, 
    });
});

app.post("/history", requireAuth, async (req, res) => {

    const accountId = req.session.accountId;

    const details = await getHistory(accountId);

    res.json({
        history: details,
        success: true
    });
});