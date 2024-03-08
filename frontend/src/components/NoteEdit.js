import React from "react";
import "./styles.css";

const NoteEdit = ({ note, saveNote }) => {
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
    saveNote(editedNote);
    setEditedNote(null);
  };

  return (
    <div className="note-edit">
      <input type="text" value={editedNote.title} onChange={editTitle} />
      <textarea value={editedNote.content} onChange={editContent} />
      <button onClick={saveNote}>Save</button>
    </div>
  );
};

export default EditNote;
