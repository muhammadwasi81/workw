// import StickyNoteColorSelector from "./StickyNoteColorSelector";
import { React, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  AiOutlineDash,
  AiOutlineShareAlt,
  AiTwotoneSnippets,
  AiTwotoneDelete,
  AiOutlineClose,
} from "react-icons/ai";
import style from "./NewStickyNote.module.css";
import { useDispatch } from "react-redux";
import {
  decrementStickyNote,
  closeStickyNote,
  targetTitleVal,
  targetTextVal,
} from "../../../store/appReducer/newStickySlice";
import StickyNoteColorSelector from "./StickyNoteColorSelector";

const NewStickyNote = (props) => {
  /* const abc = {
    id: Math.random().toFixed(2).toString(),
    title: "Title",
  }; */

  // const closeSticky = useSelector((state) => state.newStickySlice.closeSticky);

  // const open = useSelector((state) => state.newStickySlice.show);
  const [color, setColor] = useState(true);
  let [title, setTitle] = useState(props.titleVal);
  //const [textAreaValue, setTextAreaValue] = useState(props.textAreaValue);

  const dispatch = useDispatch();

  const stickyContainer = {
    bottom: props.y_axis,
    right: props.x_axis,
  };
  const div = {
    position: "absolute",
    zIndex: "1",
    bottom: "0px",
    right: "0px",
  };

  //const ref = useRef();
  const { id } = props;
  const decrementStickyNoteHandler = () => {
    dispatch(decrementStickyNote(id));
  };
  const closeStickyNoteHandler = () => {
    dispatch(closeStickyNote(id));
  };
  const openColorPicker = () => {
    setColor(false);
  };
  const closeColorPicker = () => {
    setColor(true);
  };

  var stickyTitle;
  const getTitleValue = (e) => {
    stickyTitle = e.target.value;
    setTitle(e.target.value);
    dispatch(targetTitleVal({ stickyTitle, id }));
  };

  var stickyText;
  const getTextVal = (e) => {
    stickyText = e.target.value;
    //setTextAreaValue(e.target.value);
    dispatch(targetTextVal({ stickyText, id }));
  };

  props.onGetTitleVal(stickyTitle);

  return (
    <>
      <div
        style={stickyContainer}
        id={props.id}
        className={style.stickyNoteItem__container}
      >
        <StickyNoteColorSelector color={color} id={props.id} />

        <div
          style={{ backgroundColor: props.titleBg }}
          className={style.stickyNoteItem__item}
        >
          <div className={style.stickyNoteItem__title}>
            <input
              placeholder={props.title}
              value={title}
              onChange={getTitleValue}
            />
          </div>
          <div
            className={style.stickyNoteItem__icons}
            onClick={openColorPicker}
          >
            <AiOutlineDash />
          </div>
          <div className={style.stickyNoteItem__icons}>
            <AiOutlineShareAlt />
          </div>
          <CopyToClipboard text={props.textAreaValue}>
            <div className={style.stickyNoteItem__icons}>
              <AiTwotoneSnippets />
            </div>
          </CopyToClipboard>
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
          onChange={getTextVal}
          className={style.stickyNoteItem__textarea}
          placeholder={props.textAreaPlaceholder}
          value={props.textAreaValue}
        />
        <div style={div}>
          <img
            src={require("./content/halfArrow.ff8f53df.svg").default}
            style={{ height: "17px" }}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default NewStickyNote;
