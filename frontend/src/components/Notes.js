import React, { useState } from "react";
import NoteList from "./NoteList";
import NoteEdit from "./NoteEdit";
import NavBar from "./NavBar";
import NewNoteForm from "./NewNoteForm";
import { Route, Routes } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", content: "Note 1 description" },
  ]);
  const [chosenNote, setChosenNote] = useState(null);
  const [addNoteForm, setAddNoteForm] = useState(false);

  const doSaveNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const createNote = (newNote) => {
    setNotes([...notes, { id: Date.now(), ...newNote }]);
    setChosenNote(null);
    setAddNoteForm(false);
  };

  return (
    <div className="notes">
      <div className="notes-list-panel">
        <NoteList
          notes={notes}
          onSelectNote={setChosenNote}
          onAddNote={() => setAddNoteForm(true)}
          addNoteForm={addNoteForm}
        />
      </div>
      <div className="note-content-panel">
        {addNoteForm ? (
          <NewNoteForm onCreateNote={createNote} />
        ) : (
          <NoteEdit note={chosenNote} onSaveNote={doSaveNote} />
        )}
      </div>
    </div>
  );
};

export default Notes;
