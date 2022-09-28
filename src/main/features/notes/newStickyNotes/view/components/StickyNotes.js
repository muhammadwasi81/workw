import React, { useState } from "react";
import NewStickyNote from "./NewStickyNote";
import StickyContainer from "./StickyContainer";
import Draggable from "react-draggable";
import DetailedStickyNote from "./DetailedStickyNote";
import StickyColor from "./StickyColor";

// *********import redux*********
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";


function StickyNotes() {
  const [tempState, setState] = useState([1, 2, 3]);
  const dispatch=useDispatch();
  const stickynote=useSelector((state)=>{return state.stickySlice.listArray})
  console.log("sticky notesss",stickynote);
  return (
    <>
      {stickynote.map((item, index) => (
        // <Draggable defaultPosition={{ x: 12, y: 450 }} key={index}>
          <NewStickyNote />
        // </Draggable>
      ))}
      <StickyContainer />
      {/* <StickyColor/> */}
      {/* </Provider> */}
    </>
  );
}
export default StickyNotes;
