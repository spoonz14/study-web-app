import axios from "axios";
import React, { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteEdit from "./NoteEdit";
import NewNoteForm from "./NewNoteForm";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState(null);
  const [addNoteForm, setAddNoteForm] = useState(false);
  const [newNote, setNewNote] = useState(null); // State for the newly added note

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode directly
      console.log("Token: ", decodedToken);
      const userId = decodedToken.id;
      console.log("User ID: ", userId);
    }
    else {
      navigate("/login");
    }
  }, [navigate]);

  // Effect that fetched notes once a new note has been added
  useEffect(() => {
    fetchNotes();
  }, [newNote]);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(
          `http://localhost:8090/notes/${userId}`
        );
        setNotes(response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Function to add a new note
  const addNote = async (newNoteData) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        newNoteData.userId = userId;
        const response = await axios.post(
          `http://localhost:8090/notes`,
          newNoteData
        );
        setNewNote(response.data);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to save edited note
  const saveNote = async (updatedNote) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        await axios.put(
          `http://localhost:8090/notes/${userId}/${updatedNote.noteId}`,
          updatedNote
        );
        window.location.reload();
        fetchNotes();
      }
    } catch (error) {
      console.error(
        `Note ID: ${updatedNote.noteId} Error saving note: `,
        error
      );
    }
  };

  // Function to delete a note
  const deleteNote = async (deletedNote) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        await axios.delete(`http://localhost:8090/notes/${deletedNote.noteId}`);
        setNotes(notes.filter((note) => note.noteId !== deletedNote.noteId));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to update note in the notes state
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
