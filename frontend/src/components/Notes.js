import React, { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteEdit from "./NoteEdit";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState(null);
  const [addNoteForm, setAddNoteForm] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/allNotes"); // Replace '/allNotes' with your backend endpoint
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNote = async (newNote) => {
    try {
      await axios.post("/Add", newNote); // Replace '/Add' with your backend endpoint
      fetchNotes();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const deleteNote = async () => {
    if (chosenNote) {
      try {
        await axios.delete(`/delete/${chosenNote.id}`); // Replace '/delete' with your backend endpoint
        fetchNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    } else {
      console.error("Note must be selected");
    }
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
          <NoteEdit
            note={chosenNote}
            onSaveNote={doSaveNote}
            onDeleteNote={deleteNote}
          />
        )}
      </div>
    </div>
  );
};

export default Notes;
