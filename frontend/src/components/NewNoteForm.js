import React, { useState } from "react";
import "./styles.css";

const NewNoteForm = ({ onAddNote, addNoteForm, setAddNoteForm }) => {
  //Variables to store new note Title and Description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // function to update the title state when input change is made
  const newFormTitle = (e) => {
    setTitle(e.target.value);
  };

  // function to update the description state when textarea change is made
  const newFormDescription = (e) => {
    setDescription(e.target.value);
  };

  // function to add a new note
  const handleAddNote = () => {
    // check if the title and description fields aren't empty
    if (title.trim() !== "" && description.trim() !== "") {
      onAddNote({
        title,
        description,
      });
      // Reset the title and description states
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
