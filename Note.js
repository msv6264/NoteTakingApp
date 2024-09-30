let plus = document.querySelector('.plus');

// Function to create a new note box
function createNoteBox(noteContent = '', noteKey = null) {
    let newBox = document.createElement('div');
    newBox.classList.add('boxes');

    newBox.innerHTML = `
    <label for="text" class="text">NOTES</label><br>
    <textarea name="tasks" class="tasks" id="sticker">${noteContent}</textarea>
    <div class="options">
        <button class="save">Save</button>
        <span class="material-symbols-outlined">delete</span>
    </div>`;

    // Save button functionality
    newBox.querySelector('.save').addEventListener("click", () => {
        const textarea = newBox.querySelector('.tasks');
        const currentNoteKey = noteKey || `note_${Date.now()}`; // Use existing key or generate a new one
        const note = {
            content: textarea.value
        };
        localStorage.setItem(currentNoteKey, JSON.stringify(note)); // Save note in localStorage
        displayNotes(); // Update the displayed notes
        newBox.remove(); // Remove the note box after saving
    });

    // Delete button functionality
    newBox.querySelector('.material-symbols-outlined').addEventListener("click", () => {
        newBox.remove();
        if (noteKey) {
            localStorage.removeItem(noteKey); // Remove from localStorage
        }
    });

    document.body.appendChild(newBox);
}

// Function to display existing notes from localStorage
function displayNotes() {
    const existingContainer = document.querySelector('.notes-container');
    if (existingContainer) {
        existingContainer.remove(); // Clear previous notes
    }

    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notes-container');
    document.body.appendChild(notesContainer);

    // Loop through localStorage to get all notes
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("note_")) { // Only get notes
            const note = JSON.parse(localStorage.getItem(key));
            createNoteBox(note.content, key); // Pass the key to delete the correct note
        }
    }
}

// Event listener for the "+" button
plus.addEventListener("click", () => {
    createNoteBox(); // Create a new empty note
});

// Display notes when the page loads
window.onload = () => {
    displayNotes();
};
