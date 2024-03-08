import React from "react";
import "./styles.css";

const NewNoteForm = ({ onCreateNote }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const newFormTitle = (e) => {
    setTitle(e.target.value);
  };

  const newFormContent = (e) => {
    setContent(e.target.value);
  };

  const doCreateNote = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      onCreateNote({
        title,
        content,
      });
      setTitle("");
      setContent("");
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
        placeholder="Content"
        value={content}
        onChange={newFormContent}
      />
      <button onClick={doCreateNote}>Add Note</button>
    </div>
  );
};

export default NewNoteForm;
