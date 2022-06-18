import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { decrementStickyNote } from "../../../store/appReducer/newStickySlice";

const NoteList = (props) => {
  const date = new Date();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const time = hours + ":" + minutes;
  const dispatch = useDispatch();
  const decrementStickyNoteHandler = () => {
    dispatch(decrementStickyNote(props.id));
  };

  return (
    <div className="noteLIST__container" id={props.id}>
      <div className="noteLIST__title-nd-date">
        <div className="noteLIST__title">{time}</div>
        <div
          className="noteLIST__date-sec"
          onClick={decrementStickyNoteHandler}
        >
          <AiTwotoneDelete />
        </div>
      </div>
      <div className="noteLIST__pad">Take a note...</div>
    </div>
  );
};

export default NoteList;
