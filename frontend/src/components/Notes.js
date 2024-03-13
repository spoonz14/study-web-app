import axios from "axios";
import React, { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteEdit from "./NoteEdit";
import NewNoteForm from "./NewNoteForm";

const Notes = () => {
  //stating variables to manage add notes, selected notes, and newly added notes
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState(null);
  const [addNoteForm, setAddNoteForm] = useState(false);
  const [newNote, setNewNote] = useState(null); // State for the newly added note

  //Effect that fetched notes once a new note has been added
  useEffect(() => {
    fetchNotes();
  }, [newNote]);

  //fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8090/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  //function to add a new note
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

  //function to save edited note
  const saveNote = async (updatedNote) => {
    try {
      console.log("Updated Note:", updatedNote);
      // Fetching updatedNote from the backend
      await axios.put(
        `http://localhost:8090/notes/${updatedNote.noteId}`,
        updatedNote
      );
      window.location.reload(); //refresh page after saving note
      fetchNotes();
    } catch (error) {
      console.error(
        `Note ID: ${updatedNote.noteId} Error saving note: `,
        error
      );
    }
  };

  //function to delete a note
  const deleteNote = async (deletedNote) => {
    try {
      //delete note from backend
      await axios.delete(`http://localhost:8090/notes/${deletedNote.noteId}`);
      // update state of notes to remove deleted note
      setNotes(notes.filter((note) => note.noteId !== deletedNote.noteId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //function to update note in the notes state
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
          newNote={newNote}
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
