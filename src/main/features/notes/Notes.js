import React from "react";
import "./style.css";
//import { openStickyNotes } from "../../../store/appReducer/stickyNotesSlice";
//import NewStickyNote from "./NewStickyNote";

import NoteList from "./NoteList";
import NewStickyNote from "./NewStickyNote";
import { useDispatch, useSelector } from "react-redux";
import { incrementStickyNote } from "../../../store/appReducer/newStickySlice";

const Notes = () => {
  //let stickyNoteTitle = useSelector((state) => state.stickyNotesSlice.addTitle);
  /* const stickyNoteValue = useSelector(
    (state) => state.stickyNotesSlice.addValue
  ); */
  //const dispatch = useDispatch();

  /* const newStickyContent = {

  } */

  const dispatch = useDispatch();

  const stickyNoteData = {
    id: Math.random().toFixed(2).toString(),
    title: "Title",
    textArea_placeholder: "Take a Note",
    x_axis: Math.floor(Math.random() * 51).toString() + "%",
    y_axis: Math.floor(Math.random() * 51).toString() + "%",
  };

  const { id, title, textArea_placeholder, x_axis, y_axis } = stickyNoteData;

  // const open = useSelector((state) => state.stickyNotesSlice.open);

  //<AddStickyNoteHandler />;

  const incrementStickyNoteHandler = () => {
    dispatch(
      incrementStickyNote({
        id,
        title,
        textArea_placeholder,
        x_axis,
        y_axis,
      })
    );
  };

  const stickyNoteList = useSelector(
    (state) => state.newStickySlice.incrementArray
  );
  const xxx = stickyNoteList.map((id) => id.id);
  console.log(xxx);

  return (
    <div className="note-container">
      {/* Note Header */}
      <div className="note-header">
        <div className="note__add-btn" onClick={incrementStickyNoteHandler}>
          +
        </div>
        <div>Sticky Notes</div>
        <div className="closeAndMinimize">
          <div className="note__minus-btn">-</div>
          <div className="note__close-btn">x</div>
        </div>
      </div>
      <div className="note-searchBar-container">
        <div className="note-searchBar">
          <input
            type="text"
            placeholder="Search"
            className="note-searchBar-input"
          />
        </div>
      </div>
      <div className="noteList__sec">
        {stickyNoteList.map((stickyId) => (
          <NoteList key={stickyId.id} id={stickyId.id} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
