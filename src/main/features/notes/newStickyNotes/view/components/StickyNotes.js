import React, { useState } from "react";
import NewStickyNote from "./NewStickyNote";
import StickyContainer from "./StickyContainer";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";

function StickyNotes() {
  const stickynote = useSelector((state) => { return state.stickySlice.listArray });
  return (
    <>
      {stickynote.filter(it => it.isOpen).map((item, index) => (
        <NewStickyNote
          item={item}
          index={item.id}
          key={item.id}
        />
      ))}
      <StickyContainer />
    </>
  );
}
export default StickyNotes;
