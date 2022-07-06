const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

function validateNotes(note) {
    if(!note.title) {
        return false;
    }
    if(!note.text) {
        return false;
    }
    return true;
}

function deleteNote(id, notesArray) {
    const index = notesArray.findIndex(element => element.id === id);
    notesArray.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return notesArray;
};

module.exports = {
    createNewNote,
    validateNotes,
    deleteNote
};