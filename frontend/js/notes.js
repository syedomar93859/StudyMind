import {getUsername} from './session.js';

document.getElementById("account-name").innerHTML = getUsername();

document.getElementById("go-to-ai-button")
    .addEventListener("click", goToAIPage);

function goToAIPage() {
    location.href = './ask-ai.html'
}
// navigates to the Ask AI page

// function goToHomePage() {
//     location.href = './index.html'
// }

document.getElementById("go-to-notes-button")
    .addEventListener("click", goToNotesPage);

function goToNotesPage() {
    location.href = './notes.html'
}

// navigates to the Notes page


document.getElementById("go-to-settings-button")
    .addEventListener("click", goToSettingsPage);

function goToSettingsPage(){
    location.href = './settings.html'
}



const textLink = document.getElementById("clickable-text");

if (textLink) {
    textLink.addEventListener("click", () => {
        location.href = './home.html';
    });
}
// navigates to the Home page


let editingNoteId = null;


async function saveNote(event){
    event.preventDefault();
    // this function stops the form from refreshing the page

    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();


    if (editingNoteId){
        // Update existing note

        const allNotes = await getAllNotes();

        await updateNote(editingNoteId, title, content);

    }else{
        
        const newId = await sendInfo(title, content);
        console.log(newId);
    }
    
    closeNoteDialog();
    await renderNotes();
}


async function renderNotes(){

    const notesContainer = document.getElementById('notesContainer');

    const allNotes = await getAllNotes();

    console.log(allNotes);
    console.log(allNotes.length);

    if (allNotes.length === 0){
        // show some fall back elements
        notesContainer.innerHTML = `<div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button id="firstNoteBtn" class="add-note-btn">
        + Add Your First Note
        </button>
        </div>`;
        
        document.getElementById("firstNoteBtn").addEventListener("click", () => openNoteDialog());
        return
    }

    notesContainer.innerHTML = allNotes.map(note =>`
        <div class="note-card">
            <h3>${note.title}</h3>
            <p class="note-content">${note.content}</p>
            <div class ="note-actions">
            <button class="edit-btn" data-id="${note.id}" title="Edit Note">✏️</button>
            <button class="delete-btn" data-id="${note.id}" title="Delete Note">❌</button>
            </div>
        </div>
        `
    ).join(``);
}

async function openNoteDialog(noteId = null){

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
    renderNotes();

    document.getElementById('notesContainer').addEventListener('click', async (event) => {
        const editBtn = event.target.closest('.edit-btn');
        const deleteBtn = event.target.closest('.delete-btn');

        if (editBtn) {
            const noteId = editBtn.dataset.id;
            await openNoteDialog(noteId);
        }
        if (deleteBtn) {
            const noteId = deleteBtn.dataset.id;
            await deleteNote(noteId);
        }
    });

    document.getElementById('addNoteBtn').addEventListener('click', () => openNoteDialog());
    document.getElementById('go-to-ai-button').addEventListener('click', goToAIPage);
    document.getElementById('go-to-notes-button').addEventListener('click', goToNotesPage);
    document.getElementById('closeBtn').addEventListener('click', closeNoteDialog);
    document.getElementById('cancelBtn').addEventListener('click', closeNoteDialog);

    document.getElementById('noteForm').addEventListener('submit', saveNote);

    document.getElementById('noteDialog').addEventListener('click', function(event){
        if(event.target === this) closeNoteDialog();
    });
});



async function getAllNotes() {

    const response = await fetch("/notes", {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    return data.notes ?? [];
}

async function sendInfo(title, content) {

    const response = await fetch("/new", {
        method: "POST",
        credentials: 'same-origin',
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
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            index: index,
            title: title,
            content: content
        })
    });


}


async function deleteNote(noteId) {

    const confirmed = confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
        return;
    }

    const response = await fetch("/delete", {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: noteId
        })
    });

    const data = await response.json();

    if (data.success) {
        await renderNotes();
    }
}

