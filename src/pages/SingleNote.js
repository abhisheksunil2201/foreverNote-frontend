import React from "react";
import { Button } from "semantic-ui-react";

const SingleNote = ({ note, deleteNoteHandler, handleClick, viewNote }) => {
  return (
    <div className="note" key={note.id}>
      <p className="note__title">{note.title}</p>
      <p className="note__body" onClick={() => viewNote(note)}>
        {" "}
        {note.body?.replace(/<[^>]+>/g, "")}{" "}
      </p>
      <div className="note__footer">
        <Button
          circular
          icon="pencil"
          className="note__delete"
          onClick={() => handleClick("edit", note)}
        />
        <Button
          circular
          icon="trash"
          className="note__delete"
          onClick={() => deleteNoteHandler(note.id)}
        />
      </div>
    </div>
  );
};

export default SingleNote;
