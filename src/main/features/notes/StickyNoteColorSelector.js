import React from "react";
import { AiTwotoneDelete, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  selectColor,
  deleteFromColorNoteNdList,
  openStickyNoteColorPicker,
} from "../../../store/appReducer/newStickySlice";
// import { useSelector } from "react-redux";

const StickyNoteColorSelector = (props) => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.newStickySlice.colorPicker);

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

  const selectColorHandler = (e) => {
    const colorValue = e.target.getAttribute("value");
    const id = props.id;
    dispatch(selectColor({ colorValue, id }));
  };

  const deleteNoteNdList = () => {
    dispatch(deleteFromColorNoteNdList(props.id));
  };

  const closeColorPicker = () => {
    dispatch(openStickyNoteColorPicker());
  };
  return (
    <div
      id={props.id}
      className="menu__popUp"
      style={{ display: !color ? "initial" : "none" }}
    >
      <div className="color___LIST">
        {colors.map((colors) => (
          <div
            key={colors}
            onClick={selectColorHandler}
            style={{ backgroundColor: colors, width: "100%" }}
            value={colors}
          ></div>
        ))}
      </div>
      <div className="note__iconHOVER-dlt" onClick={deleteNoteNdList}>
        <div style={delSec}>
          <AiTwotoneDelete />
        </div>
        Delete Note
      </div>
      <hr />
      <div className="note__iconHOVER-dlt" onClick={closeColorPicker}>
        <div style={delSec}>
          <AiOutlineClose />
        </div>
        Close Colors
      </div>
      <hr />
    </div>
  );
};

export default StickyNoteColorSelector;
