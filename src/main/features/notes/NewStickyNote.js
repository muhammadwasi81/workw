// import StickyNoteColorSelector from "./StickyNoteColorSelector";
import React from "react";
import {
  AiOutlineDash,
  AiOutlineShareAlt,
  AiTwotoneSnippets,
  AiTwotoneDelete,
  AiOutlineClose,
} from "react-icons/ai";

const TextArea = () => {
  return (
    <textarea className="stickyNote-item__textarea" placeholder="Take a Note" />
  );
};

const Img = () => {
  return <img src={require("./content/halfArrow.ff8f53df.svg").default} />;
};
const NewStickyNote = () => {
  const abc = {
    title: "Title",
    outline: <AiOutlineDash />,
    share: <AiOutlineShareAlt />,
    save: <AiTwotoneSnippets />,
    dlt: <AiTwotoneDelete />,
    close: <AiOutlineClose />,
    textArea: <TextArea />,
    img: <Img />,
  };

  const div = {
    position: "absolute",
    zIndex: "1",
    bottom: "0px",
    right: "0px",
  };

  return (
    <div className="stickyNote-item__container">
      {/* <StickyNoteColorSelector /> */}
      <div className="stickyNote-item__item">
        <div className="stickyNote-item__title">
          <input placeholder={abc.title} />
        </div>
        <div className="stickyNote-item__icons">{abc.outline}</div>
        <div className="stickyNote-item__icons">{abc.share}</div>
        <div className="stickyNote-item__icons">{abc.save}</div>
        <div className="stickyNote-item__icons">{abc.dlt}</div>
        <div className="stickyNote-item__icons">{abc.close}</div>
      </div>
      {abc.textArea}
      <div style={div}>{abc.img}</div>
    </div>
  );
};

export default NewStickyNote;
