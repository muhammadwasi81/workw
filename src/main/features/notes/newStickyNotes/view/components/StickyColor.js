import React,{useState} from "react";
import { CloseOutlined } from "@ant-design/icons";
import "../../style.css";
import {} from "antd";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import {getColorCodeAction} from "../../store/actions";
import {  selectStickyNoteColor} from "../../store/stickySlice";


const StickyColor = ({item}) => {
  const [closeColor,setCloseColor]=useState(true);
  const dispatch=useDispatch();


  // ******select color handler*****
  const selectColorHandler = (e) => {
    const colorValue = e.target.getAttribute("value");
    const id=item.id;
    dispatch(selectStickyNoteColor({id,colorValue}));
    dispatch(getColorCodeAction({...item,colorCode:colorValue,}));

  };

  const closeColorHandler=()=>{
    setCloseColor(false);
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
     {closeColor &&
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
       
   
   <div className="note__iconHOVER-dlt" onClick={closeColorHandler}>
          <div>
           <CloseOutlined  />
          </div>
          Close Colors
        </div>
        
      </div>
}
    </>
  );
};
export default StickyColor;
