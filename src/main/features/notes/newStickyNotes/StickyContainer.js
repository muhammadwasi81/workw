import React, { useState, } from "react";
import { Typography } from "antd";
import Draggable from "react-draggable";
import { MinusOutlined, CloseOutlined,PlusOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import CustomCard from "./CustomCard";
import SearchBox from "./SearchBox";
import "./style.css";
import NewStickyNote from "./NewStickyNote";
const { Title } = Typography;

const StickyContainer = () => {
  const [stickyNoteOpen,setStickyOpen]=useState(true);

  const openStickyNoteHandler=()=>{
    setStickyOpen(true);
  }

  console.log(stickyNoteOpen);
  if(stickyNoteOpen){
    <NewStickyNote/>
  }
  // {stickyNoteOpen && <NewStickyNote/> }
  
  return (
    <>
     <NewStickyNote/>
      <Draggable defaultPosition={{ x: 11, y: 456 }}>
        <div className="sticky_container">
          <div className="sticky-header">
            <div className="left_Icon">
              {/* {stickyNoteOpen ? <NewStickyNote/> : null} */}
          <PlusOutlined onClick={openStickyNoteHandler}/>
          </div>
            <p className="heading">Sticky Notes</p>
           <div className="right_Icons">
            <MinusOutlined/>
            <CloseOutlined />
            </div>
          </div>
          
          <SearchBox/>
         
          <CustomCard title="sanjna" cardContent="Miletap"/>
          <CustomCard title="How to Draw professional Wireframe" cardContent="Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap"/>
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
