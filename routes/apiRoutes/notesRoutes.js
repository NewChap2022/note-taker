const router = require('express').Router();
const generateUniqueId = require('generate-unique-id');
const { createNewNote, validateNotes, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
})

router.post('/notes', (req, res) => {
    req.body.id = generateUniqueId({
        length: 5,
    });

    if (!validateNotes(req.body)) {
        res.status(400).send('Some information is missing in the notes!')
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    if (deleteNote) {
        res.json(notes);
    } else {
        res.send(404);
    }
});

module.exports = router;