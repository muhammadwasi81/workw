import React from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import Draggable from "react-draggable";

import { MinusOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import "./style.css";

const { TextArea } = Input;
const axis = {
  // x_axis: Math.floor(Math.random() * 40) + 300,
  // y_axis: Math.floor(Math.random() * 40) + 150,
};

const NewStickyNote = () => {
  //   const onChange = (e) => {
  //     console.log("Change:", e.target.value);
  //   };
  return (
    <>
      <Draggable defaultPosition={{ x: 20, y: 256 }}>
        <div className="stickyNote_container">
          <div className="stickyNote_header">
            <p>Title</p>
            <div className="left_Icon">
              <CloseOutlined />
            </div>
          
          </div>
          <p>Take a note</p>
          {/* <TextArea
            showCount
            maxLength={100}
            style={{
              height: 120,
            }}
            onChange={onChange}
          /> */}
        </div>
      </Draggable>
    </>
  );
};
export default NewStickyNote;
