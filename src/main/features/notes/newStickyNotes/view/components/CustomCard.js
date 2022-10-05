import React, { useState } from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import "../../style.css";
import { deleteStickyAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";



const CustomCard = ({ item, onDoubleClick }) => {
  const dispatch=useDispatch();

  //********current date in sticky notes********
  let notesTime = !moment(new Date()).isAfter(item.createDate)
		? moment(item.createDate).format("LT")
		: moment(item.createDate).format("MMM Do");

  const deleteStickyNoteHandler=()=>{
    dispatch(deleteStickyAction(item.id));
  }

  return (
    <>
      <Card
        onDoubleClick={() => onDoubleClick(item)}
        size="small"
        title={item.title}
        hoverable
        bordered
        
        headStyle={{ fontWeight: "bold", fontSize: "14px" }}
        bodyStyle={{ padding: "1" }}
        extra={[
          <div className="time_delete">
            <p className="sticky_time text-xs">{notesTime}</p>
            <DeleteOutlined style={{ fontSize: "12px", marginLeft: "5px" }} onClick={deleteStickyNoteHandler}/>
          </div>,
        ]}
        style={{
          width: 290,
          // height:100,
          // maxHeight:200,
          marginLeft: "10px",
          marginTop: "10px",
          // alignItems:"center",
          borderRadius: "5px",
          backgroundColor:item.colorCode,
        }}
      >
        <div className="sticky_content" dangerouslySetInnerHTML={{__html:item.description}} />

      </Card>
    </>
  );
};
export default CustomCard;
