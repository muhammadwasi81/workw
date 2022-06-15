import React from "react";
import "./style.css";
//import { openStickyNotes } from "../../../store/appReducer/stickyNotesSlice";
//import NewStickyNote from "./NewStickyNote";
import {
  AiOutlineDash,
  AiOutlineShareAlt,
  AiTwotoneSnippets,
  AiTwotoneDelete,
  AiOutlineClose,
} from "react-icons/ai";
import NoteList from "./NoteList";

const Notes = () => {
  //let stickyNoteTitle = useSelector((state) => state.stickyNotesSlice.addTitle);
  /* const stickyNoteValue = useSelector(
    (state) => state.stickyNotesSlice.addValue
  ); */
  //const dispatch = useDispatch();

  /* const newStickyContent = {

  } */

  const NewStickyNoteContent = {
    outline: <AiOutlineDash />,
    share: <AiOutlineShareAlt />,
    save: <AiTwotoneSnippets />,
    dlt: <AiTwotoneDelete />,
    close: <AiOutlineClose />,
  };

  // const open = useSelector((state) => state.stickyNotesSlice.open);

  //<AddStickyNoteHandler />;

  return (
    <div className="note-container">
      {/* Note Header */}
      <div className="note-header">
        <div className="note__add-btn">+</div>
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
        <NoteList />
      </div>
    </div>
  );
};

export default Notes;
