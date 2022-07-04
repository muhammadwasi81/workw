import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decrementStickyNote,
  openClickedStickyNote,
} from "../../../store/appReducer/newStickySlice";

const NoteList = (props) => {
  const dispatch = useDispatch();
  const decrementStickyNoteHandler = () => {
    dispatch(decrementStickyNote(props.id));
  };

  const openStickyNoteHandler = () => {
    dispatch(
      openClickedStickyNote({
        id: props.id,
        title: props.title,
        stickyNoteTitle: props.stickyNoteTitle,
        text: props.text,
        textArea_placeholder: props.textArea_placeholder,
        x_axis: props.sticky__x_axis,
        y_axis: props.sticky__y_axis,
        bgColor: props.bgColor,
        img: props.img,
      })
    );
  };

  //const bgColor = useSelector((state) => state.newStickySlice.bgColor);
  //console.log(bgColor);

  const imgSrc = props.img;

  return (
    <div
      style={{ backgroundColor: props.bgColor }}
      className="noteLIST__container"
      id={props.id}
      onDoubleClick={openStickyNoteHandler}
    >
      <div className="noteLIST__title-nd-date">
        <div className="noteLIST__title">{props.title}</div>
        <div
          className="noteLIST__date-sec"
          onClick={decrementStickyNoteHandler}
        >
          {props.time}
          <AiTwotoneDelete />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          wrap: "nowrap",
          overflowX: "auto",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {imgSrc.map((imagegSrc) => (
          <img id={props.id} src={imagegSrc} alt="" style={{ width: "30px" }} />
        ))}
      </div>

      <div className="noteLIST__pad">{props.text}</div>
    </div>
  );
};

export default NoteList;
