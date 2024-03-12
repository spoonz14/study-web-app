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

  const editContent = (e) => {
    setEditedNote({ ...editedNote, content: e.target.value });
  };

  const saveNote = () => {
    if (editedNote.title.trim() === "" || editedNote.content.trim() === "") {
      alert("Please provide a title and content for the note.");
      return;
    }

    onSaveNote(editedNote);

    setEditedNote({
      title: "",
      content: "",
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
      <textarea value={editedNote.content} onChange={editContent} />
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
