import React, { useState } from "react";
import NewStickyNote from "./NewStickyNote";
import StickyContainer from "./StickyContainer";
import Draggable from "react-draggable";
import DetailedStickyNote from "./DetailedStickyNote";
import StickyColor from "./StickyColor";

// *********import redux*********
import { useSelector, useDispatch } from "react-redux";


function StickyNotes() {
  const stickynote=useSelector((state)=>{return state.stickySlice.listArray})
  return (
    <>
      {stickynote.filter(it=>it.isOpen).map((item, index) => (
        
        // <Draggable defaultPosition={{ x: 12, y: 450 }} key={index}>
          <NewStickyNote item={item} index={item.id}/>
        // </Draggable>
      ))}
      <StickyContainer />
    </>
  );
}
export default StickyNotes;
