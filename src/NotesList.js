import React from "react";
import Note from "./Note.js";
import "./index.css";

const NotesList = (props) => {
  const renderNote = (note) => (
    <Note
      onType={props.onType}
      note={note}
      key={note.id}
      removeNote={props.removeNote}
    />
  );

  const renderNoteList = props.notes.map(renderNote);
  const newRender = renderNoteList.filter(
    (notes) => notes.props.note.doesMatchSearch !== false
  );
  return <ul className="notes-list">{newRender}</ul>;
};

export default NotesList;
