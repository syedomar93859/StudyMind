// 1. Get the submit button safely
const button = document.getElementById('submit');

// 2. ONLY attach the listener if the button actually exists on this page
if (button) {
    button.addEventListener("click", getResponse);
    // Runs getResponse() whenever the button is clicked
}
// Gets the submit button from the webpage


async function getResponse(){

    const input = document.getElementById('submission').value;
    // Gets the text from the textarea

    if (input.length == 0){
        alert("Input box is empty!");
        // Shows an alert if the user did not type anything

    } else{
        const content = document.querySelector('.response');
        // Gets the response div from the webpage

        content.innerHTML = "Loading...";
        // Tells the user that the AI response is currently being generated

        const result = await sendQuestion(input);
        // Sends the user's question to the backend and waits for the AI response

        content.innerHTML = result;
        // Displays the AI response on the page
    }
}

async function sendQuestion(question){
    const response = await fetch('/message', {
        method: 'POST',
        // Displays the AI response on the page

        headers: {
            'Content-Type': 'application/json'
        },
        // Tells the server that JSON data is being sent

        body: JSON.stringify({
            question: question
        })
        // Converts the JavaScript object into JSON text

    });

    const data = await response.json();
    // Converts the JSON response into a JavaScript object

    return data.message;
    // Returns only the AI response text
}

function goToAIPage() {
    location.href = './ask-ai.html'
}
// navigates to the Ask AI page

// function goToHomePage() {
//     location.href = './index.html'
// }


function goToNotesPage() {
    location.href = './notes.html'
}
// navigates to the Notes page

const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './index.html';
    });
}
// navigates to the Home page















// let notes = [];

let editingNoteId = null;

// function loadNotes(){
//     const savedNotes = localStorage.getItem('quickNotes')
//     return savedNotes ? JSON.parse(savedNotes) : [];
// }

async function saveNote(event){
    event.preventDefault();
    // this function stops the form from refreshing the page

    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();


    if (editingNoteId){
        // Update existing note

        const allNotes = await getAllNotes();

        // const noteIndex = allNotes.findIndex(note => String(note.id) === String(editingNoteId));

        await updateNote(editingNoteId, title, content);

        // notes[noteIndex] = {
        //     ...notes[noteIndex],
        //     title: title,
        //     content: content
        // }
    }else{
        
        // notes.unshift({
        //     id: generateId,
        //     title: title,
        //     content: content
        // })
        const newId = await sendInfo(title, content);
        console.log(newId);
    }
    
    closeNoteDialog();
    await renderNotes();
}

// function generateId(){
//     return Date.now().toString();
// }

// function saveNotes(){
//     localStorage.setItem('quickNotes', JSON.stringify(notes))
// }


function deleteNote(noteId){
    console.log("Delete note:", noteId);
}

async function renderNotes(){
    const notesContainer = document.getElementById('notesContainer');

    const allNotes = await getAllNotes();

    if (allNotes.length === 0){
        // show some fall back elements
        notesContainer.innerHTML = `
        <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</n>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
        </div>
        `
        return
    }

    // notes.forEach(note => {
    //     console.log(note.id);
    //     console.log(note.title);
    //     console.log(note.content);
    // });

    notesContainer.innerHTML = allNotes.map(note =>`
        <div class="note-card">
            <h3>${note.title}</h3>
            <p class="note-content">${note.content}</p>
            <div class ="note-actions">
            <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note"> ✏️
            </button>
            <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note"> ❌
            </button>
            </div>
        </div>
        `
    ).join(``);
}

async function openNoteDialog(noteId = null){
    // console.log("Looking for noteId:", noteId, typeof noteId);
    // console.log("Available note IDs:", notes.map(n => ({ id: n.id, type: typeof n.id })));

    const dialog = document.getElementById('noteDialog');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');

    if(noteId){
        // Edit note

        const allNotes = await getAllNotes();

        const noteToEdit = allNotes.find(note => String(note.id) === String(noteId));
        editingNoteId = noteId;
        document.getElementById('dialogTitle').textContent = 'Edit Note';
        titleInput.value = noteToEdit.title;
        contentInput.value = noteToEdit.content;

    }else{
        // Add Note
        editingNoteId = null
        document.getElementById('dialogTitle').textContent = 'Add New Note'
        titleInput.value = '';
        contentInput.value = '';
    }

    dialog.showModal();
    titleInput.focus();
}

function closeNoteDialog(){
    document.getElementById('noteDialog').close();
}

document.addEventListener('DOMContentLoaded', function(){

    // notes = loadNotes();
    renderNotes();

    document.getElementById('noteForm').addEventListener('submit', saveNote);

    document.getElementById('noteDialog').addEventListener('click', function(event){
        if(event.target === this){
            closeNoteDialog();
        }
    })
})




// function createTable(){
//     const title = document.getElementById('title').value;
//     const content = document.getElementById('content').value;
//     const message = `Title: ${title}, Content: ${content}`;
//     alert(message);

// }





















async function getAllNotes() {

    const response = await fetch("/notes");

    const data = await response.json();

    return data.notes;
}

async function sendInfo(title, content) {

    const response = await fetch("/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    });

    const data = await response.json();

    return data.id;

}

async function updateNote(index, title, content) {

    const response = await fetch("/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            index: index,
            title: title,
            content: content
        })
    });

    // const data = await response.json();

    // return data.id;

}

