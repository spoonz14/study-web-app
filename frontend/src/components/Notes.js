import axios from "axios";
import React, { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteEdit from "./NoteEdit";
import NewNoteForm from "./NewNoteForm"; // Import NewNoteForm component

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState(null);
  const [addNoteForm, setAddNoteForm] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8090/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      // Send a POST request to your backend API with the new note data
      const response = await axios.post("http://localhost:8090/notes", newNote);

      // Update the notes state with the response data, which should contain the newly added note
      setNotes([...notes, response.data]);

      // Reset the addNoteForm state to close the form after adding the note
      setAddNoteForm(false);
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
      fetchNotes();
    } catch (error) {
      console.error(
        `Note ID: ${updatedNote.noteId} Error saving note: `,
        error
      );
    }
  };

  const deleteNote = async (updatedNote) => {
    try {
      await axios.delete(`http://localhost:8090/notes/${updatedNote.noteId}`); // Replace with your backend endpoint
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="notes">
      <div className="notes-list-panel">
        <NoteList
          notes={notes}
          onSelectNote={setChosenNote}
          onAddNote={() => setAddNoteForm(true)} // Open the add note form when this function is called
          addNoteForm={addNoteForm}
          onDeleteNote={deleteNote}
        />
      </div>
      <div className="note-content-panel">
        <NoteEdit
          note={chosenNote}
          onSaveNote={saveNote}
          onDeleteNote={deleteNote}
        />
      </div>
      {/* Render NewNoteForm component */}
      {addNoteForm && (
        <NewNoteForm onAddNote={addNote} setAddNoteForm={setAddNoteForm} />
      )}
    </div>
  );
};

export default Notes;
