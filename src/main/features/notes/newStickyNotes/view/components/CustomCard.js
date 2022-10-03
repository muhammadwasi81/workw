import React, { useState } from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import Draggable from "react-draggable";
import { DeleteOutlined } from "@ant-design/icons";
import "../../style.css";
import { deleteStickyAction } from "../../store/actions";
import { useDispatch,useSelector } from "react-redux";



const CustomCard = ({ item, onDoubleClick }) => {
  console.log("COLORCODEEEEEE",item.colorCode);
  const dispatch=useDispatch();

  const color=useSelector((state)=>state.stickySlice.colorCode);
  console.log("COLORSSSSSS",color);
  //********current date in sticky notes********
  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(time);

  //**********Current time in sticky notes*********
  let dates =
    current.getFullYear() +
    "/" +
    (current.getMonth() + 1) +
    "/" +
    current.getDate();
  console.log(dates);

  const [date, setDate] = useState(dates);

  const deleteStickyNoteHandler=()=>{
    dispatch(deleteStickyAction(item.id));
    console.log("deleted",item.id);
  }
//  const colorCodee=item.colorCode;
//  console.log(colorCodee,"COLORSSSS");
  return (
    <>
      <Card
        // onClick={openNoteList}
        onDoubleClick={() => onDoubleClick(item)}
        size="small"
        title={item.title}
        hoverable
        bordered
        
        headStyle={{ fontWeight: "bold", fontSize: "14px" }}
        bodyStyle={{ padding: "0" }}
        extra={[
          <div className="time_delete">
            <p className="sticky_time">{time}</p>
            <DeleteOutlined style={{ fontSize: "12px", marginLeft: "5px" }} onClick={deleteStickyNoteHandler}/>
          </div>,
        ]}
        style={{
          width: 300,
          // height:120,
          marginLeft: "10px",
          marginTop: "10px",
          // alignItems:"center",
          borderRadius: "5px",
          backgroundColor:item.colorCode,
        }}
      >
        <p className="sticky_content">
          {item.description}
          </p>
        <p className="sticky_date">{date}</p>
      </Card>
    </>
  );
};
export default CustomCard;
