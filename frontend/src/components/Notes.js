import axios from "axios";
import React, { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteEdit from "./NoteEdit";
import NewNoteForm from "./NewNoteForm";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState(null);
  const [addNoteForm, setAddNoteForm] = useState(false);
  const [newNote, setNewNote] = useState(null); // State for the newly added note

  useEffect(() => {
    fetchNotes();
  }, [newNote]); // Fetch notes whenever a new note is added

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8090/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (newNoteData) => {
    try {
      const response = await axios.post(
        "http://localhost:8090/notes",
        newNoteData
      );
      setNewNote(response.data); // Update newNote with the newly added note data
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const saveNote = async (updatedNote) => {
    try {
      console.log("Updated Note:", updatedNote);
      // Fetching updatedNote from the backend
      await axios.put(
        `http://localhost:8090/notes/${updatedNote.noteId}`,
        updatedNote
      );
      window.location.reload();
      fetchNotes();
    } catch (error) {
      console.error(
        `Note ID: ${updatedNote.noteId} Error saving note: `,
        error
      );
    }
  };

  const deleteNote = async (deletedNote) => {
    try {
      await axios.delete(`http://localhost:8090/notes/${deletedNote.noteId}`);
      setNotes(notes.filter((note) => note.noteId !== deletedNote.noteId)); // Update notes state to remove the deleted note
      window.location.reload();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.noteId === updatedNote.noteId ? updatedNote : note
      )
    );
  };

  return (
    <div className="notes">
      <div className="notes-list-panel">
        <NoteList
          notes={notes}
          onSelectNote={setChosenNote}
          onAddNote={() => setAddNoteForm(true)}
          addNoteForm={addNoteForm}
          onDeleteNote={deleteNote}
          newNote={newNote} // Pass newNote to NoteList
        />
      </div>
      <div className="note-content-panel">
        <NoteEdit
          note={chosenNote}
          onSaveNote={saveNote}
          onDeleteNote={deleteNote}
          onUpdateNote={updateNote}
        />
      </div>
      {addNoteForm && (
        <NewNoteForm onAddNote={addNote} setAddNoteForm={setAddNoteForm} />
      )}
    </div>
  );
};

export default Notes;
