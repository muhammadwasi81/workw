// import StickyNoteColorSelector from "./StickyNoteColorSelector";
import { React, useState } from "react";
import {
  AiOutlineDash,
  AiOutlineShareAlt,
  AiTwotoneSnippets,
  AiTwotoneDelete,
  AiOutlineClose,
} from "react-icons/ai";
import style from "./NewStickyNote.module.css";
import { useDispatch, useSelector } from "react-redux/";
import {
  decrementStickyNote,
  stickyNoteColorPicker,
  closeStickyNoteColorPicker,
  closeStickyNote,
} from "../../../store/appReducer/newStickySlice";
import StickyNoteColorSelector from "./StickyNoteColorSelector";

const NewStickyNote = (props) => {
  /* const abc = {
    id: Math.random().toFixed(2).toString(),
    title: "Title",
  }; */

  // const closeSticky = useSelector((state) => state.newStickySlice.closeSticky);
  const [close, setClose] = useState("initial");
  // const open = useSelector((state) => state.newStickySlice.show);
  const dispatch = useDispatch();

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
    display: close,
  };
  const div = {
    position: "absolute",
    zIndex: "1",
    bottom: "0px",
    right: "0px",
  };

  const { id } = props;
  const decrementStickyNoteHandler = () => {
    dispatch(decrementStickyNote(id));
  };
  const closeStickyNoteHandler = () => {
    if (close === "initial") {
      setClose("none");
    }
  };
  const openColorPicker = () => {
    dispatch(stickyNoteColorPicker());
  };
  const closeColorPicker = () => {
    dispatch(closeStickyNoteColorPicker());
  };
  return (
    <div style={stickyContainer} id={props.id}>
      <StickyNoteColorSelector />

      <div className={style.stickyNoteItem__item}>
        <div className={style.stickyNoteItem__title}>
          <input placeholder={props.title} />
        </div>
        <div className={style.stickyNoteItem__icons} onClick={openColorPicker}>
          <AiOutlineDash />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiOutlineShareAlt />
        </div>
        <div className={style.stickyNoteItem__icons}>
          <AiTwotoneSnippets />
        </div>
        <div
          className={style.stickyNoteItem__icons}
          onClick={decrementStickyNoteHandler}
        >
          <AiTwotoneDelete />
        </div>
        <div
          className={style.stickyNoteItem__icons}
          onClick={closeStickyNoteHandler}
        >
          <AiOutlineClose />
        </div>
      </div>
      <textarea
        onClick={closeColorPicker}
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
