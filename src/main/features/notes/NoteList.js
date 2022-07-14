import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decrementStickyNote,
  openClickedStickyNote,
} from "../../../store/appReducer/newStickySlice";

const NoteList = (props) => {
  const dispatch = useDispatch();
  const [dotsIsVisible, setDotsIsVisible] = useState(false);
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

  const dotsOnMouseOverHandler = () => {
    setDotsIsVisible(true);
  };

  const dotsOnMouseOut = () => {
    setDotsIsVisible(false);
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
          onMouseOver={dotsOnMouseOverHandler}
          onMouseOut={dotsOnMouseOut}
        >
          <div className={`time ${dotsIsVisible ? "invisible" : ""}`}>
            {props.time}
          </div>
          <div
            onClick={decrementStickyNoteHandler}
            className={`dots ${dotsIsVisible ? "isVisible" : ""}`}
          >
            <AiTwotoneDelete />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "8px 0px",
          overflowX: "auto",
          alignItems: "center",
          height: imgSrc.length < 1 ? "3px" : "auto",
        }}
      >
        {imgSrc.map((imagegSrc) => (
          <img
            id={props.id}
            src={imagegSrc}
            alt=""
            style={{ width: "30px", margin: "0px 5px" }}
          />
        ))}
      </div>

      <div className="noteLIST__pad">{props.text}</div>
    </div>
  );
};

export default NoteList;
