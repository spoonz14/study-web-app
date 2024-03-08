import React, { useState } from "react";
import NoteList from "./components/NoteList";
import NoteList from "./components/NoteEdit";
import NoteList from "./components/NewNoteForm";
import NoteList from "./components/NavBar";

const Notes = () => {
    const [notes, setNotes] = useState([
        {id: 1, title: "Note 1", content: "Note 1 description" }
    ]);
    const [chosenNote, setChosenNote] = useState(null);
    const [addNoteForm, setAddNoteForm] = useState(false);
};

const doSaveNote = (updatedNote) => {
    setNotes(
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
};

const createNote = (newNote) => {
    setNotes([...notes, { id: Date.now(), ...newNote}]);
    setChosenNote(null);
    setAddNoteForm(false);
};

return (
    <div className="notes">
        <NavBar />
        <div className="notes-list-panel">
        <NoteList
        notes={notes}
        onSelectNote={setChosenNote}
        onAddNote={() => setAddNoteForm(true)}
        addNoteForm={AddNoteForm}
             />
        </div>
    </div>
);
};

export default Notes;