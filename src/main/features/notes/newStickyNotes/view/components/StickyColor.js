import React from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../style.css";
import {} from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import {  selectStickyNoteColor, closeStickyNoteColor} from "../../store/stickySlice";


const StickyColor = ({item}) => {
  const dispatch=useDispatch();
  const color=useSelector((state)=>state.stickySlice.colorPicker);

  console.log(item, "ITem Heree");


  const selectColorHandler = (e) => {
    // console.log("clicked");
    // console.log(item);


    const colorValue = e.target.getAttribute("value");
    console.log(colorValue);
    const id=item.id;
    console.log("idddd",id);
    dispatch(selectStickyNoteColor({colorValue,id}));
  };

  const closeColorHandler=()=>{
    dispatch(closeStickyNoteColor());
  }
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
      <div
        className="menu__popUp"
        // style={{ display: !color ? "initial" : "none" }}
      >
        <div className="color___LIST">
          {colors.map((colors) => (
            <div
              key={colors}
              onClick={selectColorHandler}
              style={{ backgroundColor: colors,width: "100%" }}
              value={colors}
            ></div>
          ))}
        </div>
        {/* <div className="note__iconHOVER-dlt">
          <div>
            <DeleteOutlined />
          </div>
          Delete Note
        </div> */}
        <hr />
        <div className="note__iconHOVER-dlt">
          <div>
            <CloseOutlined onClick={closeColorHandler} />
          </div>
          Close Colors
        </div>
        <hr />
      </div>
    </>
  );
};
export default StickyColor;
