import React, { useState } from "react";
import "./styles.css";

const NewNoteForm = ({ onAddNote, addNoteForm, setAddNoteForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const newFormTitle = (e) => {
    setTitle(e.target.value);
  };

  const newFormDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAddNote = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      onAddNote({
        title,
        description,
      });
      setTitle("");
      setDescription("");
      // Close the form after adding the note
      setAddNoteForm(false);
    }
  };

  return (
    <div className="new-note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={newFormTitle}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={newFormDescription}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default NewNoteForm;
