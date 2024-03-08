import axios from "../axios-config";
import React from "react";

const NoteList = ({ notes, onSelectNote, onAddNote, addNoteForm }) => {
  return (
    <div className="note-List">
      <h2>Notes</h2>
      {!addNoteForm && (
        <div className="add-note-container">
          <button onClick={onAddNote}>Add Note</button>
        </div>
      )}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <button onClick={() => onSelectNote(note)}>{note.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
