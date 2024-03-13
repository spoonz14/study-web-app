// NoteEdit.js

import React from "react";
import "./styles.css";

const NoteEdit = ({ note, onSaveNote, onDeleteNote }) => {
  const [editedNote, setEditedNote] = React.useState(note);

  React.useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const editTitle = (e) => {
    setEditedNote({ ...editedNote, title: e.target.value });
  };

  const editDescription = (e) => {
    setEditedNote({ ...editedNote, description: e.target.value }); // Add description to editedNote
  };

  const saveNote = () => {
    if (
      editedNote.title.trim() === "" ||
      editedNote.description.trim() === "" // Ensure description is not empty
    ) {
      alert("Please provide a title, and description for this note.");
      return;
    }

    onSaveNote(editedNote);

    setEditedNote({
      title: "",
      description: "", // Reset description
    });
  };

  const deleteNote = () => {
    if (onDeleteNote) {
      onDeleteNote(editedNote);
    } else {
      console.error("onDelete error");
    }
  };

  if (!editedNote) {
    return null;
  }

  return (
    <div className="note-edit-form">
      <input type="text" value={editedNote.title} onChange={editTitle} />
      <textarea
        value={editedNote.description} // Bind description value
        onChange={editDescription} // Bind editDescription function
      />
      <button className="save-button" onClick={saveNote}>
        Save
      </button>
      <button className="delete-button" onClick={deleteNote}>
        Delete
      </button>
    </div>
  );
};

export default NoteEdit;
