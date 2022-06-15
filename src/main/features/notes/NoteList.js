import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

const NoteList = () => {
  return (
    <div className="noteLIST__container">
      <div className="noteLIST__title-nd-date">
        <div className="noteLIST__title"></div>
        <div className="noteLIST__date-sec">
          <AiTwotoneDelete />
        </div>
      </div>
      <div className="noteLIST__pad">Take a note...</div>
    </div>
  );
};

export default NoteList;
