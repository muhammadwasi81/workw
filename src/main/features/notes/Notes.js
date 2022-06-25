import { React, useState } from "react";
import "./style.css";
//import { openStickyNotes } from "../../../store/appReducer/stickyNotesSlice";
//import NewStickyNote from "./NewStickyNote";

import NoteList from "./NoteList";
import NewStickyNote from "./NewStickyNote";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementStickyNote,
  closeNote,
} from "../../../store/appReducer/newStickySlice";
import { object } from "prop-types";

const Notes = (props) => {
  //let stickyNoteTitle = useSelector((state) => state.stickyNotesSlice.addTitle);
  /* const stickyNoteValue = useSelector(
    (state) => state.stickyNotesSlice.addValue
  ); */
  //const dispatch = useDispatch();

  /* const newStickyContent = {

  } */
  const [minimize, setMinimize] = useState(true);

  const date = new Date();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const time = hours + ":" + minutes;
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.newStickySlice.listArray);
  //const bgColor = useSelector((state) => state.newStickySlice.bgColor);
  const [searchInput, setSearchInput] = useState("");

  const stickyNoteData = {
    id: String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    ),
    title: "Title",
    textArea_placeholder: "Take a Note",
    textArea_value: "",
    x_axis: Math.floor(Math.random() * 51).toString() + "%",
    y_axis: Math.floor(Math.random() * 51).toString() + "%",
    notelistTime: time,
    noteListTitle: props.stickyNoteTitle,
    noteListText: "Take a Note...",
  };

  const {
    id,
    title,
    textArea_placeholder,
    textArea_value,
    x_axis,
    y_axis,
    notelistTime,
    noteListTitle,
    noteListText,
  } = stickyNoteData;

  // const open = useSelector((state) => state.stickyNotesSlice.open);

  //<AddStickyNoteHandler />;

  const incrementStickyNoteHandler = () => {
    dispatch(
      incrementStickyNote({
        id,
        title,
        textArea_placeholder,
        textArea_value,
        x_axis,
        y_axis,
        notelistTime,
        noteListTitle,
        noteListText,
      })
    );
  };

  const minimizeHandler = () => {
    setMinimize(!minimize);
  };

  const closeNoteHandler = () => {
    dispatch(closeNote());
  };

  // const xxx = stickyNoteList.map((id) => id.id);
  // console.log(xxx);

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
  };

  const filteredData = noteList.filter((list) => {
    if (searchInput === "") {
      return list;
    } else {
      return Object.values(list)
        .join(" ")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    }
  });

  return (
    <div
      className="note-container"
      style={{
        bottom: !minimize ? "1%" : "5%",
        height: !minimize ? "37px" : "400px",
        maxHeight: !minimize ? "37px" : "400px",
      }}
    >
      {/* Note Header */}
      <div className="note-header">
        <div className="note__add-btn" onClick={incrementStickyNoteHandler}>
          +
        </div>
        <div>Sticky Notes</div>
        <div className="closeAndMinimize">
          <div className="note__minus-btn" onClick={minimizeHandler}>
            -
          </div>
          <div className="note__close-btn" onClick={closeNoteHandler}>
            x
          </div>
        </div>
      </div>
      <div
        className="note-searchBar-container"
        style={{
          display: !minimize ? "none" : "flex",
        }}
      >
        <div className="note-searchBar">
          <img src={require("./content/searchNew.d75a6c56.svg").default} />
          <input
            type="text"
            placeholder="Search"
            className="note-searchBar-input"
            onChange={searchHandler}
          />
        </div>
      </div>
      <div
        className="noteList__sec"
        style={{ display: !minimize ? "none" : "block" }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((list) => (
            <NoteList
              key={list.id}
              id={list.id}
              time={list.time}
              title={list.title}
              stickyNoteTitle={title}
              textArea_placeholder={textArea_placeholder}
              text={list.text}
              sticky__x_axis={x_axis}
              sticky__y_axis={y_axis}
              bgColor={list.bgColor}
            />
          ))
        ) : (
          <div className="no-notes-found">
            <img
              src={require("./content/no-notes-found.svg").default}
              style={{ width: "110px", height: "110px" }}
            />
            <p>No notes found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
