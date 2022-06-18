import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

const StickyNoteColorSelector = () => {
  const openColor = useSelector((state) => state.newStickySlice.colorPicker);
  const delSec = {
    cursor: "default",
    margin: "10px",
  };
  const colors = [
    "rgb(208, 235, 253)",
    "rgba(205, 241, 205, 0.77)",
    "rgb(241, 211, 217)",
    "rgb(251, 251, 232)",
    "rgb(241, 241, 241)",
    "rgb(255, 255, 255)",
    "rgb(255, 250, 243)",
  ];
  return (
    <>
      {openColor && (
        <div className="menu__popUp">
          <div className="color___LIST">
            {colors.map((colors) => (
              <div
                class="color-box"
                style={{ backgroundColor: colors, width: "100%" }}
              ></div>
            ))}
          </div>
          <div className="note__iconHOVER-dlt">
            <div style={delSec}>
              <AiTwotoneDelete />
            </div>
            Delete note
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default StickyNoteColorSelector;
