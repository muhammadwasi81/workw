import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

const NoteList = (props) => {
  const date = new Date();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const time = hours + ":" + minutes;
  return (
    <div className="noteLIST__container" id={props.id}>
      <div className="noteLIST__title-nd-date">
        <div className="noteLIST__title">{time}</div>
        <div className="noteLIST__date-sec">
          <AiTwotoneDelete />
        </div>
      </div>
      <div className="noteLIST__pad">Take a note...</div>
    </div>
  );
};

export default NoteList;
