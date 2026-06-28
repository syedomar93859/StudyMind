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

    document.getElementById('noteForm').addEventListener('submit', saveNote);

    document.getElementById('noteDialog').addEventListener('click', function(event){
        if(event.target === this){
            closeNoteDialog();
        }
    })
})



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


}


async function deleteNote(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
        return;
    }

    const response = await fetch("/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    });

    const data = await response.json();

    if (data.success) {
        await renderNotes();
    }
}

