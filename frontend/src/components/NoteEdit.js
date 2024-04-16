import React from "react";
import "./styles.css";

const NoteEdit = ({ note, onSaveNote, onDeleteNote }) => {
  // State to store the edited note
  const [editedNote, setEditedNote] = React.useState(note);

  // Update the edited note state when the 'note' prop changes
  React.useEffect(() => {
    setEditedNote(note);
  }, [note]);

  // function to edit the title of the note
  const editTitle = (e) => {
    setEditedNote({ ...editedNote, title: e.target.value });
  };

  // function to edit the description of the note
  const editDescription = (e) => {
    setEditedNote({ ...editedNote, description: e.target.value }); // Add description to editedNote
  };
  // Handler function to save the edited note
  const saveNote = () => {
    // Check if the title or description is empty
    if (
      editedNote.title.trim() === "" ||
      editedNote.description.trim() === ""
    ) {
      alert("Please provide a title, and description for this note.");
      return;
    }
    // Call the onSaveNote function to save the edited note
    onSaveNote(editedNote);

    // Reset the edited note state
    setEditedNote({
      title: "",
      description: "", // Reset description
    });
  };

  // function to delete the note
  const deleteNote = () => {
    if (onDeleteNote) {
      // Call onDeleteNote function to delete the note
      onDeleteNote(editedNote);
    } else {
      console.error("onDelete error");
    }
  };

  // Render the note edit form
  if (!editedNote) {
    return null;
  }

  return (
    <div className="note-edit-form">
      <h2>Edit Note</h2>
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
