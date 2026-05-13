
// Stores if submit button has been selected
// A Set is used so the same language cannot be added twice
const submitStatus = new Set();

// const submitStatus = true

function toggleSubmit(button) {

    // Retrieve the language stored in the button's data-language attribute
    const status = button.dataset.language;

    if (submitStatus.has(status)) {

        // Remove language if already selected
        submitStatus.delete(status);

        // Remove visual highlight from button
        button.classList.remove("active");

    } else {

        // Add language to the selection
        submitStatus.add(status);

        // Visually mark button as active
        button.classList.add("active");
    }
    
}