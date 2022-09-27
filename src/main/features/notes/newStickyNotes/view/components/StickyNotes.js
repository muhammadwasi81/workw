import React, { useState } from "react";
import NewStickyNote from "./NewStickyNote";
import StickyContainer from "./StickyContainer";
import Draggable from "react-draggable";
import DetailedStickyNote from "./DetailedStickyNote";
import StickyColor from "./StickyColor";

function StickyNotes() {
  const [tempState, setState] = useState([1, 2, 3]);
  return (
    <>
      {tempState.map((item, index) => (
        // <Draggable defaultPosition={{ x: 12, y: 450 }} key={index}>
          <NewStickyNote />
        // </Draggable>
      ))}

      <StickyContainer />
      <StickyColor/>
      {/* <DetailedStickyNote/> */}
    </>
  );
}
export default StickyNotes;
