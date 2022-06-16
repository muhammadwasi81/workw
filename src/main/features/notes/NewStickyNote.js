// import StickyNoteColorSelector from "./StickyNoteColorSelector";
import React from "react";
import {
  AiOutlineDash,
  AiOutlineShareAlt,
  AiTwotoneSnippets,
  AiTwotoneDelete,
  AiOutlineClose,
} from "react-icons/ai";
import style from "./NewStickyNote.module.css";

const NewStickyNote = (props) => {
  /* const abc = {
    id: Math.random().toFixed(2).toString(),
    title: "Title",
  }; */
  let a = props.y_axis;
  let b = props.x_axis;
  const stickyContainer = {
    zIndex: "10",
    border: "none",
    resize: "both",
    overflow: "auto",
    width: "300px",
    bottom: props.y_axis,
    right: props.x_axis,
    maxWidth: "600px",
    maxHeight: "600px",
    height: "260px",
    minWidth: "186px",
    minHeight: "186px",
    boxShadow:
      "0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)",
    position: "absolute",
  };
  const div = {
    position: "absolute",
    zIndex: "1",
    bottom: "0px",
    right: "0px",
  };

  return (
    <div style={stickyContainer} id={props.id}>
      {/* <StickyNoteColorSelector /> */}
      <div className={style.stickyNoteItem__item}>
        <div className={style.stickyNoteItem__title}>
          <input placeholder={props.title} />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiOutlineDash />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiOutlineShareAlt />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiTwotoneSnippets />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiTwotoneDelete />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiOutlineClose />
        </div>
      </div>
      <textarea
        className={style.stickyNoteItem__textarea}
        placeholder={props.textAreaPlaceholder}
      />
      <div style={div}>
        <img src={require("./content/halfArrow.ff8f53df.svg").default} />
      </div>
    </div>
  );
};

export default NewStickyNote;
