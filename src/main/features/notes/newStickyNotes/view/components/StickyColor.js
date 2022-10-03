import React,{useState} from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../style.css";
import {} from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import {getColorCodeAction} from "../../store/actions";
import {  selectStickyNoteColor, closeStickyNoteColor} from "../../store/stickySlice";


const StickyColor = ({item}) => {
  const dispatch=useDispatch();
  // const color=useSelector((state)=>state.stickySlice.colorCode);
  // console.log("COLORSSSSSS",color);



  const selectColorHandler = (e) => {
    // console.log("clicked");
    // console.log(item);
    const colorValue = e.target.getAttribute("value");
    console.log(colorValue);
    // const id=item.id;
    // console.log("idddd",id);
    dispatch(getColorCodeAction({...item,colorCode:colorValue,}));
    console.log("COLOR VALUE",colorValue);
console.log("color codeeeeeee",item.colorCode);
  };

  const closeColorHandler=()=>{
    dispatch(closeStickyNoteColor());
  }
  const colors = [
    "#FDEBD0",
    "#cdf1cd",
    "#f1d3d9",
    "#fbfbe8",
    "#f1f1f1",
    "#ffffff",
    "#fffaf3",
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
        <div className="note__iconHOVER-dlt" onClick={closeColorHandler}>
          <div>
           <CloseOutlined  />
          </div>
          Close Colors
        </div>
        <hr />
      </div>
    </>
  );
};
export default StickyColor;
