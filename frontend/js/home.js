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


