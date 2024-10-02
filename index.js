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
        saveCurrentNote(currentNoteKey); // Update the displayed notes
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

//this function is written to save the current note
function saveCurrentNote(currentNoteKey) {
    const existingContainer = document.querySelector('.notes-container');
    existingContainer.innerHTML = ""; // Clear previous notes

    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notes-container');
    document.body.appendChild(notesContainer);
}


// Function to display existing notes from localStorage
function displayNotes() {
    const existingContainer = document.querySelector('.notes-container');
    existingContainer.innerHTML = ""; // Clear previous notes

    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notes-container'); //giving class to notes-container
    document.body.appendChild(notesContainer);

    //using the below snippet i will not get the notes according to order since the notes are stored in string format and displayed according its lexicographical order
    // Loop through localStorage to get all notes
    // for (let i = 0; i < localStorage.length; i++) {
    //     let key = localStorage.key(i);
    //     if (key.startsWith("note_")) { // Only get notes
    //         const note = JSON.parse(localStorage.getItem(key));
    //         createNoteBox(note.content, key); // Pass the key to display the correct note
    //     }
    // }

    let notesArray = [];
    for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith("note_")) {
                const note = JSON.parse(localStorage.getItem(key));

                let timestamp = key.split("_")[1];
                notesArray.push({key, content: note.content, timestamp: parseInt(timestamp)}); //object creation it contain every thing about a note
            }
    }

    notesArray.sort((a, b) => a.timestamp - b.timestamp);
    //sort fn is used for strings and keys are stored in string format so to convert it from string to integer and sort we can subtract for sorting according to return value i.e 0, 1, -1 the array will be sorted
    notesArray.forEach(note => {
        createNoteBox(note.content, note.key);
    })
}

// Event listener for the "+" button
plus.addEventListener("click", () => {
    createNoteBox(); // Create a new empty note
});

// Display notes when the page loads
window.onload = () => {
    displayNotes();
};
